import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Authentication
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب جديد',
    'auth.firstName': 'الاسم الأول',
    'auth.lastName': 'الاسم الأخير',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.accountType': 'نوع الحساب',
    'auth.teacher': 'معلم',
    'auth.student': 'طالب',
    'auth.agreeTerms': 'أوافق على الشروط والأحكام',
    'auth.createAccount': 'إنشاء حساب',
    'auth.haveAccount': 'لديك حساب بالفعل؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.joinCommunity': 'انضم إلى مجتمع أكاديمية البرمجة التعليمي',
    
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.courses': 'الكورسات',
    'nav.students': 'الطلاب',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',
    'nav.about': 'عن المنصة',
    'nav.discover': 'اكتشف',
    'nav.programs': 'البرامج',
    
    // Teacher Dashboard
    'teacher.welcome': 'مرحباً بك في لوحة تحكم المعلم',
    'teacher.addCourse': 'إضافة كورس جديد',
    'teacher.manageCourses': 'إدارة الكورسات',
    'teacher.addStudent': 'إضافة طالب',
    'teacher.manageStudents': 'إدارة الطلاب',
    'teacher.uploadVideo': 'رفع فيديو',
    'teacher.createQuiz': 'إنشاء اختبار',
    'teacher.analytics': 'الإحصائيات',
    'teacher.myCourses': 'كورساتي',
    'teacher.totalStudents': 'إجمالي الطلاب',
    'teacher.totalCourses': 'إجمالي الكورسات',
    'teacher.totalVideos': 'إجمالي الفيديوهات',
    
    // Student Dashboard
    'student.welcome': 'مرحباً بك في لوحة تحكم الطالب',
    'student.enrolledCourses': 'الكورسات المسجلة',
    'student.browseCourses': 'تصفح الكورسات',
    'student.myProgress': 'تقدمي',
    'student.certificates': 'الشهادات',
    'student.assignments': 'الواجبات',
    'student.schedule': 'الجدول الزمني',
    
    // Course Management
    'course.title': 'عنوان الكورس',
    'course.description': 'وصف الكورس',
    'course.thumbnail': 'صورة الكورس',
    'course.create': 'إنشاء كورس',
    'course.edit': 'تعديل الكورس',
    'course.delete': 'حذف الكورس',
    'course.lessons': 'الدروس',
    'course.students': 'الطلاب',
    'course.quizzes': 'الاختبارات',
    'course.duration': 'المدة',
    'course.level': 'المستوى',
    
    // Common
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.view': 'عرض',
    'common.search': 'البحث',
    'common.loading': 'جاري التحميل...',
    'common.welcome': 'مرحباً',
  },
  en: {
    // Authentication
    'auth.login': 'Sign In',
    'auth.register': 'Create New Account',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.accountType': 'Account Type',
    'auth.teacher': 'Teacher',
    'auth.student': 'Student',
    'auth.agreeTerms': 'I agree to the Terms and Conditions',
    'auth.createAccount': 'Create Account',
    'auth.haveAccount': 'Already have an account?',
    'auth.noAccount': "Don't have an account?",
    'auth.joinCommunity': 'Join the Educational Programming Academy Community',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.students': 'Students',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.about': 'About',
    'nav.discover': 'Discover',
    'nav.programs': 'Programs',
    
    // Teacher Dashboard
    'teacher.welcome': 'Welcome to Teacher Dashboard',
    'teacher.addCourse': 'Add New Course',
    'teacher.manageCourses': 'Manage Courses',
    'teacher.addStudent': 'Add Student',
    'teacher.manageStudents': 'Manage Students',
    'teacher.uploadVideo': 'Upload Video',
    'teacher.createQuiz': 'Create Quiz',
    'teacher.analytics': 'Analytics',
    'teacher.myCourses': 'My Courses',
    'teacher.totalStudents': 'Total Students',
    'teacher.totalCourses': 'Total Courses',
    'teacher.totalVideos': 'Total Videos',
    
    // Student Dashboard
    'student.welcome': 'Welcome to Student Dashboard',
    'student.enrolledCourses': 'Enrolled Courses',
    'student.browseCourses': 'Browse Courses',
    'student.myProgress': 'My Progress',
    'student.certificates': 'Certificates',
    'student.assignments': 'Assignments',
    'student.schedule': 'Schedule',
    
    // Course Management
    'course.title': 'Course Title',
    'course.description': 'Course Description',
    'course.thumbnail': 'Course Thumbnail',
    'course.create': 'Create Course',
    'course.edit': 'Edit Course',
    'course.delete': 'Delete Course',
    'course.lessons': 'Lessons',
    'course.students': 'Students',
    'course.quizzes': 'Quizzes',
    'course.duration': 'Duration',
    'course.level': 'Level',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.welcome': 'Welcome',
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as 'ar' | 'en';
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    
    // Set document direction and lang
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};