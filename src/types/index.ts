export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  courses: number;
  progress: number;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  address?: string;
  birthDate?: string;
}
 export interface AuthContextType {
  user: User | null;
  //...
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  courses: number;
  students: number;
  rating: number;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  bio?: string;
  experience?: number;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorId: number;
  category: string;
  students: number;
  duration: string;
  rating: number;
  price: number;
  status: 'published' | 'draft' | 'archived';
  thumbnail: string;
  description: string;
  createdDate: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface DashboardStats {
  totalStudents: number;
  activeTeachers: number;
  totalCourses: number;
  certificatesIssued: number;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'teacher' | 'student';
  createdAt: Date;
}
export interface CourseCategory {
  id: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  count: number;
  color: string;
  bgColor: string;
}

export interface Language {
  code: 'ar' | 'en';
  name: string;
  direction: 'rtl' | 'ltr';
}

export interface Course {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  teacherId: string;
  teacherName: string;
  thumbnail: string;
  duration: string;
  studentsCount: number;
  lessonsCount: number;
  createdAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  videoUrl: string;
  duration: string;
  order: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  titleAr: string;
  questions: Question[];
  duration: number;
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  questionAr: string;
  options: string[];
  optionsAr: string[];
  correctAnswer: number;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  enrolledCourses: string[];
  progress: Record<string, number>;
}