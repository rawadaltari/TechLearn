import { Course, UserPreferences, RecommendationScore, CourseFilters } from '../types/Course';
import { apiService } from './apiService';

export class RecommendationEngine {
  private courses: Course[] = [];
  private isLoaded: boolean = false;

  constructor() {
    this.loadCourses();
  }

  private async loadCourses(): Promise<void> {
    try {
      const response = await apiService.getCourses();
      if (response.success) {
        this.courses = response.data;
        this.isLoaded = true;
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }

  async recommendCourses(preferences: UserPreferences): Promise<Course[]> {
    // التأكد من تحميل الكورسات
    if (!this.isLoaded) {
      await this.loadCourses();
    }

    const scores = this.calculateRecommendationScores(preferences);
    const sortedScores = scores.sort((a, b) => b.score - a.score);
    
    return sortedScores
      .slice(0, 6) // أفضل 6 توصيات
      .map(score => this.courses.find(course => course.id === score.courseId)!)
      .filter(course => course && course.isActive);
  }

  async searchCourses(filters: CourseFilters): Promise<Course[]> {
    try {
      const response = await apiService.getCourses(filters);
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error searching courses:', error);
      return [];
    }
  }

  private calculateRecommendationScores(preferences: UserPreferences): RecommendationScore[] {
    return this.courses.map(course => ({
      courseId: course.id,
      score: this.calculateCourseScore(course, preferences),
      reasons: this.getRecommendationReasons(course, preferences)
    }));
  }

  private calculateCourseScore(course: Course, preferences: UserPreferences): number {
    let score = 0;

    // تطابق التخصص (40% من الوزن)
    if (course.specialization.includes(preferences.specialization)) {
      score += 40;
    }

    // تطابق المستوى (25% من الوزن)
    if (course.level === preferences.level) {
      score += 25;
    } else if (
      (preferences.level === 'beginner' && course.level === 'intermediate') ||
      (preferences.level === 'intermediate' && course.level === 'advanced')
    ) {
      score += 15; // تطابق جزئي للتقدم
    }

    // تطابق الاهتمامات/العلامات (20% من الوزن)
    const matchingTags = course.tags.filter(tag => 
      preferences.interests.some(interest => 
        this.normalizeText(interest).includes(this.normalizeText(tag)) ||
        this.normalizeText(tag).includes(this.normalizeText(interest))
      )
    );
    score += (matchingTags.length / Math.max(course.tags.length, 1)) * 20;

    // تطابق التقنيات المفضلة
    if (preferences.preferredTechnologies) {
      const matchingTech = course.tags.filter(tag =>
        preferences.preferredTechnologies!.some(tech =>
          this.normalizeText(tag).includes(this.normalizeText(tech))
        )
      );
      score += (matchingTech.length / Math.max(preferences.preferredTechnologies.length, 1)) * 10;
    }

    // تفضيل اللغة (10% من الوزن)
    if (course.language === preferences.language || course.language === 'both') {
      score += 10;
    }

    // تفضيل السعر (5% من الوزن)
    if (preferences.priceRange === 'free' && course.price === 0) {
      score += 5;
    } else if (preferences.priceRange === 'paid' && course.price > 0) {
      score += 5;
    } else if (preferences.priceRange === 'any') {
      score += 3;
    }

    // مكافأة جودة الكورس (التقييم والشعبية)
    score += (course.rating - 4) * 2; // مكافأة للتقييمات العالية
    score += Math.min(course.studentsCount / 10000, 1) * 3; // مكافأة الشعبية

    // مكافأة الصعوبة المناسبة
    if (course.difficulty) {
      const idealDifficulty = preferences.level === 'beginner' ? 3 : 
                             preferences.level === 'intermediate' ? 6 : 8;
      const difficultyDiff = Math.abs(course.difficulty - idealDifficulty);
      score += Math.max(0, 5 - difficultyDiff);
    }

    return Math.max(0, Math.min(100, score)); // تحديد النتيجة بين 0-100
  }

  private getRecommendationReasons(course: Course, preferences: UserPreferences): string[] {
    const reasons: string[] = [];

    if (course.specialization.includes(preferences.specialization)) {
      reasons.push('يتماشى مع تخصصك في تكنولوجيا المعلومات');
    }

    if (course.level === preferences.level) {
      reasons.push('مناسب لمستواك التقني');
    }

    if (course.rating >= 4.5) {
      reasons.push('تقييم عالي من المطورين والمتخصصين');
    }

    if (course.price === 0) {
      reasons.push('مجاني بالكامل');
    }

    if (course.studentsCount > 10000) {
      reasons.push('شائع بين المطورين والمتخصصين');
    }

    if (course.certificateType) {
      reasons.push(`يوفر ${course.certificateType}`);
    }

    if (course.prerequisites && course.prerequisites.length > 0) {
      reasons.push('متطلبات واضحة ومحددة');
    }

    const matchingTags = course.tags.filter(tag => 
      preferences.interests.some(interest => 
        this.normalizeText(interest).includes(this.normalizeText(tag))
      )
    );

    if (matchingTags.length > 0) {
      reasons.push(`يغطي اهتماماتك في ${matchingTags.slice(0, 2).join(' و ')}`);
    }

    return reasons.slice(0, 3); // أقصى 3 أسباب
  }

  private normalizeText(text: string): string {
    return text.toLowerCase().trim();
  }

  async getSpecializations(): Promise<string[]> {
    try {
      const response = await apiService.getSpecializations();
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error getting specializations:', error);
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await apiService.getCategories();
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  }
}