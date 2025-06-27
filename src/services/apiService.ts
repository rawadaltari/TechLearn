import { Course, ApiResponse, CourseFilters } from '../types/Course';

class ApiService {
  private baseUrl: string;

  constructor() {
    // في بيئة الإنتاج، استخدم الـ API الحقيقي
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://raghadsvu-001-site1.jtempurl.com/api/Courses/student';
  }

  // محاكاة API للكورسات - في الواقع ستكون هذه استدعاءات حقيقية
  async getCourses(filters?: CourseFilters): Promise<ApiResponse<Course[]>> {
    try {
      // محاكاة تأخير الشبكة
      await this.delay(800);

      // بيانات محاكاة لكورسات تكنولوجيا المعلومات
      const mockCourses: Course[] = [
        {
          id: '1',
          title: 'Full Stack Web Development',
          titleAr: 'تطوير المواقع الشامل',
          description: 'Complete web development course covering frontend and backend technologies',
          descriptionAr: 'كورس شامل لتطوير المواقع يغطي تقنيات الواجهة الأمامية والخلفية',
          instructor: 'Ahmed Al-Rashid',
          instructorAr: 'أحمد الراشد',
          duration: '16 weeks',
          level: 'intermediate',
          category: 'Web Development',
          categoryAr: 'تطوير المواقع',
          specialization: ['web-development', 'full-stack'],
          tags: ['javascript', 'react', 'nodejs', 'mongodb', 'express'],
          rating: 4.8,
          studentsCount: 12500,
          price: 299,
          image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'Tech Academy',
          universityAr: 'أكاديمية التقنية',
          language: 'both',
          startDate: '2024-03-01',
          endDate: '2024-06-15',
          isActive: true,
          prerequisites: ['HTML', 'CSS', 'Basic JavaScript'],
          certificateType: 'Professional Certificate',
          difficulty: 6
        },
        {
          id: '2',
          title: 'Machine Learning & AI Fundamentals',
          titleAr: 'أساسيات التعلم الآلي والذكاء الاصطناعي',
          description: 'Comprehensive introduction to ML algorithms and AI applications',
          descriptionAr: 'مقدمة شاملة لخوارزميات التعلم الآلي وتطبيقات الذكاء الاصطناعي',
          instructor: 'Dr. Sarah Johnson',
          instructorAr: 'د. سارة جونسون',
          duration: '12 weeks',
          level: 'advanced',
          category: 'Artificial Intelligence',
          categoryAr: 'الذكاء الاصطناعي',
          specialization: ['ai', 'machine-learning', 'data-science'],
          tags: ['python', 'tensorflow', 'scikit-learn', 'neural-networks', 'deep-learning'],
          rating: 4.9,
          studentsCount: 8900,
          price: 399,
          image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'AI Institute',
          universityAr: 'معهد الذكاء الاصطناعي',
          language: 'en',
          startDate: '2024-02-15',
          endDate: '2024-05-10',
          isActive: true,
          prerequisites: ['Python Programming', 'Statistics', 'Linear Algebra'],
          certificateType: 'Specialization Certificate',
          difficulty: 8
        },
        {
          id: '3',
          title: 'Cloud Computing with AWS',
          titleAr: 'الحوسبة السحابية مع أمازون',
          description: 'Master cloud infrastructure and services with Amazon Web Services',
          descriptionAr: 'أتقن البنية التحتية السحابية والخدمات مع خدمات أمازون الويب',
          instructor: 'Omar Hassan',
          instructorAr: 'عمر حسن',
          duration: '10 weeks',
          level: 'intermediate',
          category: 'Cloud Computing',
          categoryAr: 'الحوسبة السحابية',
          specialization: ['cloud-computing', 'devops', 'infrastructure'],
          tags: ['aws', 'ec2', 's3', 'lambda', 'docker', 'kubernetes'],
          rating: 4.7,
          studentsCount: 6700,
          price: 249,
          image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'Cloud Academy',
          universityAr: 'أكاديمية السحابة',
          language: 'both',
          startDate: '2024-03-10',
          endDate: '2024-05-20',
          isActive: true,
          prerequisites: ['Basic Linux', 'Networking Fundamentals'],
          certificateType: 'AWS Certification Prep',
          difficulty: 7
        },
        {
          id: '4',
          title: 'Cybersecurity Essentials',
          titleAr: 'أساسيات الأمن السيبراني',
          description: 'Learn to protect systems and networks from cyber threats',
          descriptionAr: 'تعلم حماية الأنظمة والشبكات من التهديدات السيبرانية',
          instructor: 'Fatima Al-Zahra',
          instructorAr: 'فاطمة الزهراء',
          duration: '8 weeks',
          level: 'beginner',
          category: 'Cybersecurity',
          categoryAr: 'الأمن السيبراني',
          specialization: ['cybersecurity', 'network-security', 'ethical-hacking'],
          tags: ['security', 'penetration-testing', 'firewall', 'encryption', 'vulnerability'],
          rating: 4.6,
          studentsCount: 9200,
          price: 199,
          image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'Security Institute',
          universityAr: 'معهد الأمان',
          language: 'ar',
          startDate: '2024-02-20',
          endDate: '2024-04-15',
          isActive: true,
          prerequisites: ['Basic Networking', 'Computer Fundamentals'],
          certificateType: 'Security+ Prep',
          difficulty: 5
        },
        {
          id: '5',
          title: 'Mobile App Development',
          titleAr: 'تطوير تطبيقات الهاتف المحمول',
          description: 'Build native and cross-platform mobile applications',
          descriptionAr: 'بناء تطبيقات الهاتف المحمول الأصلية ومتعددة المنصات',
          instructor: 'Mohammed Ali',
          instructorAr: 'محمد علي',
          duration: '14 weeks',
          level: 'intermediate',
          category: 'Mobile Development',
          categoryAr: 'تطوير التطبيقات',
          specialization: ['mobile-development', 'app-development'],
          tags: ['react-native', 'flutter', 'ios', 'android', 'firebase'],
          rating: 4.5,
          studentsCount: 7800,
          price: 279,
          image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'Mobile Academy',
          universityAr: 'أكاديمية التطبيقات',
          language: 'both',
          startDate: '2024-03-05',
          endDate: '2024-06-10',
          isActive: true,
          prerequisites: ['JavaScript', 'Basic Programming'],
          certificateType: 'Mobile Developer Certificate',
          difficulty: 6
        },
        {
          id: '6',
          title: 'Data Science & Analytics',
          titleAr: 'علم البيانات والتحليلات',
          description: 'Extract insights from data using statistical methods and tools',
          descriptionAr: 'استخراج الرؤى من البيانات باستخدام الطرق والأدوات الإحصائية',
          instructor: 'Dr. Rania Mahmoud',
          instructorAr: 'د. رانيا محمود',
          duration: '12 weeks',
          level: 'intermediate',
          category: 'Data Science',
          categoryAr: 'علم البيانات',
          specialization: ['data-science', 'analytics', 'big-data'],
          tags: ['python', 'pandas', 'numpy', 'matplotlib', 'sql', 'tableau'],
          rating: 4.8,
          studentsCount: 11200,
          price: 329,
          image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'Data Institute',
          universityAr: 'معهد البيانات',
          language: 'both',
          startDate: '2024-02-25',
          endDate: '2024-05-20',
          isActive: true,
          prerequisites: ['Statistics', 'Basic Programming'],
          certificateType: 'Data Analyst Certificate',
          difficulty: 7
        },
        {
          id: '7',
          title: 'DevOps & CI/CD',
          titleAr: 'DevOps والتكامل المستمر',
          description: 'Streamline development and deployment processes',
          descriptionAr: 'تبسيط عمليات التطوير والنشر',
          instructor: 'Khalid Al-Mansouri',
          instructorAr: 'خالد المنصوري',
          duration: '10 weeks',
          level: 'advanced',
          category: 'DevOps',
          categoryAr: 'DevOps',
          specialization: ['devops', 'automation', 'infrastructure'],
          tags: ['jenkins', 'docker', 'kubernetes', 'ansible', 'terraform', 'git'],
          rating: 4.7,
          studentsCount: 5400,
          price: 349,
          image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'DevOps Academy',
          universityAr: 'أكاديمية DevOps',
          language: 'en',
          startDate: '2024-03-15',
          endDate: '2024-05-25',
          isActive: true,
          prerequisites: ['Linux', 'Basic Scripting', 'Version Control'],
          certificateType: 'DevOps Engineer Certificate',
          difficulty: 8
        },
        {
          id: '8',
          title: 'Blockchain Development',
          titleAr: 'تطوير البلوك تشين',
          description: 'Build decentralized applications and smart contracts',
          descriptionAr: 'بناء التطبيقات اللامركزية والعقود الذكية',
          instructor: 'Amira Farouk',
          instructorAr: 'أميرة فاروق',
          duration: '8 weeks',
          level: 'advanced',
          category: 'Blockchain',
          categoryAr: 'البلوك تشين',
          specialization: ['blockchain', 'cryptocurrency', 'web3'],
          tags: ['solidity', 'ethereum', 'smart-contracts', 'web3', 'defi'],
          rating: 4.4,
          studentsCount: 3200,
          price: 399,
          image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600',
          university: 'Blockchain Institute',
          universityAr: 'معهد البلوك تشين',
          language: 'both',
          startDate: '2024-04-01',
          endDate: '2024-05-30',
          isActive: true,
          prerequisites: ['JavaScript', 'Basic Cryptography'],
          certificateType: 'Blockchain Developer Certificate',
          difficulty: 9
        }
      ];

      // تطبيق الفلاتر
      let filteredCourses = mockCourses;

      if (filters) {
        if (filters.specialization) {
          filteredCourses = filteredCourses.filter(course =>
            course.specialization.includes(filters.specialization!)
          );
        }

        if (filters.level) {
          filteredCourses = filteredCourses.filter(course =>
            course.level === filters.level
          );
        }

        if (filters.category) {
          filteredCourses = filteredCourses.filter(course =>
            course.category.toLowerCase().includes(filters.category!.toLowerCase())
          );
        }

        if (filters.language && filters.language !== 'both') {
          filteredCourses = filteredCourses.filter(course =>
            course.language === filters.language || course.language === 'both'
          );
        }

        if (filters.priceRange) {
          if (filters.priceRange === 'free') {
            filteredCourses = filteredCourses.filter(course => course.price === 0);
          } else if (filters.priceRange === 'paid') {
            filteredCourses = filteredCourses.filter(course => course.price > 0);
          }
        }

        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredCourses = filteredCourses.filter(course =>
            course.title.toLowerCase().includes(searchTerm) ||
            course.titleAr.includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        }
      }

      return {
        data: filteredCourses,
        success: true,
        total: filteredCourses.length,
        page: filters?.page || 1,
        limit: filters?.limit || 10
      };

    } catch (error) {
      console.error('Error fetching courses:', error);
      return {
        data: [],
        success: false,
        message: 'فشل في جلب الكورسات'
      };
    }
  }

  async getCourseById(id: string): Promise<ApiResponse<Course | null>> {
    try {
      await this.delay(300);
      const coursesResponse = await this.getCourses();
      const course = coursesResponse.data.find(c => c.id === id) || null;

      return {
        data: course,
        success: true
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: 'فشل في جلب تفاصيل الكورس'
      };
    }
  }

  async getSpecializations(): Promise<ApiResponse<string[]>> {
    try {
      await this.delay(200);
      const specializations = [
        'web-development',
        'mobile-development',
        'data-science',
        'ai',
        'machine-learning',
        'cybersecurity',
        'cloud-computing',
        'devops',
        'blockchain',
        'full-stack',
        'backend-development',
        'frontend-development',
        'database-administration',
        'network-administration',
        'software-engineering'
      ];

      return {
        data: specializations,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'فشل في جلب التخصصات'
      };
    }
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    try {
      await this.delay(200);
      const categories = [
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Artificial Intelligence',
        'Cybersecurity',
        'Cloud Computing',
        'DevOps',
        'Blockchain',
        'Database',
        'Networking'
      ];

      return {
        data: categories,
        success: true
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message: 'فشل في جلب الفئات'
      };
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();