export interface Course {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  instructor: string;
  instructorAr: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  categoryAr: string;
  specialization: string[];
  tags: string[];
  rating: number;
  studentsCount: number;
  price: number;
  image: string;
  university: string;
  universityAr: string;
  language: "ar" | "en" | "both";
  startDate: string;
  endDate: string;
  isActive: boolean;
  prerequisites?: string[];
  certificateType?: string;
  difficulty?: number; // 1-10 scale
}

export interface UserPreferences {
  specialization: string;
  level: "beginner" | "intermediate" | "advanced";
  interests: string[];
  language: "ar" | "en" | "both";
  duration: "short" | "medium" | "long";
  priceRange: "free" | "paid" | "any";
  preferredTechnologies?: string[];
}

export interface RecommendationScore {
  courseId: string;
  score: number;
  reasons: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface CourseFilters {
  specialization?: string;
  level?: string;
  category?: string;
  language?: string;
  priceRange?: string;
  search?: string;
  page?: number;
  limit?: number;
}
