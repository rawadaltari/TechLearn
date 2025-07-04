interface Course {
  id: number;
  title: {
    ar: string;
    en: string;
  };
  category: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: {
      ar: 'أساسيات تطوير الويب',
      en: 'Web Development Basics'
    },
    category: 'technology',
    instructor: 'Dr. Ali Ahmed',
    rating: 4.8,
    reviewCount: 320,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    title: {
      ar: 'مقدمة في هندسة البرمجيات',
      en: 'Introduction to Software Engineering'
    },
    category: 'technology',
    instructor: 'Prof. Sarah Johnson',
    rating: 4.9,
    reviewCount: 450,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    title: {
      ar: 'تطوير تطبيقات الموبايل',
      en: 'Mobile Application Development'
    },
    category: 'technology',
    instructor: 'Dr. Mohammed Ali',
    rating: 4.7,
    reviewCount: 612,
    duration: '12 weeks',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    title: {
      ar: 'تصميم واجهات المستخدم',
      en: 'User  Interface Design'
    },
    category: 'technology',
    instructor: 'Layla Mahmoud',
    rating: 4.5,
    reviewCount: 378,
    duration: '6 weeks',
    image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    title: {
      ar: 'أساسيات البيانات الضخمة',
      en: 'Big Data Fundamentals'
    },
    category: 'webdevelopment',
    instructor: 'Dr. Omar Khalid',
    rating: 4.6,
    reviewCount: 295,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    title: {
      ar: 'الأمن السيبراني',
      en: 'Cybersecurity'
    },
    category: 'webdevelopment',
    instructor: 'Prof. Fatima Rahman',
    rating: 4.9,
    reviewCount: 187,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 7,
    title: {
      ar: 'تطوير تطبيقات الويب',
      en: 'Web Application Development'
    },
    category: 'technology',
    instructor: 'Dr. Samir El-Sayed',
    rating: 4.8,
    reviewCount: 400,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 8,
    title: {
      ar: 'تحليل البيانات باستخدام بايثون',
      en: 'Data Analysis with Python'
    },
    category: 'webdevelopment',
    instructor: 'Prof. Amina Zaki',
    rating: 4.7,
    reviewCount: 250,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 9,
    title: {
      ar: 'أساسيات البرمجة بلغة جافا',
      en: 'Java Programming Basics'
    },
    category: 'technology',
    instructor: 'Dr. Hossam Farouk',
    rating: 4.6,
    reviewCount: 300,
    duration: '6 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 10,
    title: {
      ar: 'تطوير الألعاب باستخدام يونتي',
      en: 'Game Development with Unity'
    },
    category: 'webdevelopment',
    instructor: 'Prof. Khaled Nabil',
    rating: 4.8,
    reviewCount: 150,
    duration: '12 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 11,
    title: {
      ar: 'تطوير تطبيقات الأندرويد',
      en: 'Android App Development'
    },
    category: 'webdevelopment',
    instructor: 'Dr. Layla Ahmed',
    rating: 4.9,
    reviewCount: 500,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 12,
    title: {
      ar: 'تطوير تطبيقات iOS',
      en: 'iOS App Development'
    },
    category: 'webdevelopment',
    instructor: 'Prof. Omar Khalid',
    rating: 4.7,
    reviewCount: 320,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 13,
    title: {
      ar: 'أساسيات الشبكات',
      en: 'Networking Fundamentals'
    },
    category: 'cybersecurity',
    instructor: 'Dr. Ahmed Samir',
    rating: 4.6,
    reviewCount: 280,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 14,
    title: {
      ar: 'تطوير البرمجيات باستخدام Agile',
      en: 'Software Development with Agile'
    },
    category: 'cybersecurity',
    instructor: 'Prof. Fatima Rahman',
    rating: 4.8,
    reviewCount: 220,
    duration: '6 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 15,
    title: {
      ar: 'تطوير تطبيقات الويب باستخدام React',
      en: 'Web Development with React'
    },
    category: 'cybersecurity',
    instructor: 'Dr. Hossam Farouk',
    rating: 4.9,
    reviewCount: 350,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 16,
    title: {
      ar: 'أساسيات قواعد البيانات',
      en: 'Database Fundamentals'
    },
    category: 'technology',
    instructor: 'Prof. Amina Zaki',
    rating: 4.7,
    reviewCount: 400,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 17,
    title: {
      ar: 'تطوير تطبيقات الويب باستخدام Node.js',
      en: 'Web Development with Node.js'
    },
    category: 'technology',
    instructor: 'Dr. Samir El-Sayed',
    rating: 4.8,
    reviewCount: 300,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 18,
    title: {
      ar: 'تحليل البيانات باستخدام R',
      en: 'Data Analysis with R'
    },
    category: 'programming',
    instructor: 'Prof. Khaled Nabil',
    rating: 4.6,
    reviewCount: 250,
    duration: '8 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 19,
    title: {
      ar: 'تطوير البرمجيات باستخدام بايثون',
      en: 'Software Development with Python'
    },
    category: 'programming',
    instructor: 'Dr. Layla Ahmed',
    rating: 4.9,
    reviewCount: 450,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 20,
    title: {
      ar: 'أساسيات الذكاء الاصطناعي',
      en: 'Artificial Intelligence Basics'
    },
    category: 'programming',
    instructor: 'Prof. Omar Khalid',
    rating: 4.8,
    reviewCount: 500,
    duration: '10 weeks',
    image: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];
