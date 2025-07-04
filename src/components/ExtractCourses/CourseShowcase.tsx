import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, BookOpen, Star, Calendar } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface Course {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  duration: {
    ar: string;
    en: string;
  };
  level: {
    ar: string;
    en: string;
  };
  learners: number;
  rating: number;
  image: string;
  gradient: string;
  iconColor: string;
  price: {
    original: number;
    discounted: number;
    currency: {
      ar: 'ر.س';
      en: '$';
    };
  };
  features: {
    ar: string[];
    en: string[];
  };
}

const courses: Course[] = [
  {
    id: '1',
    title: {
      ar: 'مقدمة في شبكات الحاسوب',
      en: 'Introduction to Computer Networks'
    },
    description: {
      ar: 'تعرف على أساسيات شبكات الحاسوب وتقنياتها',
      en: 'Learn the basics of computer networks and technologies'
    },
    duration: {
      ar: '6 أسابيع',
      en: '6 weeks'
    },
    level: {
      ar: 'مبتدئ',
      en: 'Beginner'
    },
    learners: 1200,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-blue-500 to-blue-700',
    iconColor: 'text-blue-400',
    price: {
      original: 150000,
      discounted: 100000,
      currency: {
        ar: 'ل.س',
        en: 'SYP'
      }
    },
    features: {
      ar: [
        'دروس فيديو عالية الجودة',
        'تمارين عملية على الشبكات',
        'شهادة إتمام الدورة',
        'دعم فني عبر الإنترنت'
      ],
      en: [
        'High-quality video lessons',
        'Practical network exercises',
        'Course completion certificate',
        'Online technical support'
      ]
    },
    category: 'technology',
  },
  {
    id: '2',
    title: {
      ar: 'أساسيات البرمجة بلغة بايثون',
      en: 'Python Programming Basics'
    },
    description: {
      ar: 'تعلم البرمجة بلغة بايثون من البداية حتى الاحتراف',
      en: 'Learn Python programming from beginner to advanced'
    },
    duration: {
      ar: '8 أسابيع',
      en: '8 weeks'
    },
    level: {
      ar: 'مبتدئ',
      en: 'Beginner'
    },
    learners: 1800,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-green-500 to-green-700',
    iconColor: 'text-green-400',
    price: {
      original: 180000,
      discounted: 120000,
      currency: {
        ar: 'ل.س',
        en: 'SYP'
      }
    },
    features: {
      ar: [
        'شروحات تطبيقية مع أمثلة حية',
        'مشاريع صغيرة لتثبيت التعلم',
        'شهادة معتمدة',
        'مساعدة ودعم من المحاضرين'
      ],
      en: [
        'Practical tutorials with live examples',
        'Small projects for practice',
        'Certified certificate',
        'Instructor support'
      ]
    },
    category: 'programming',
  },
  {
    id: '3',
    title: {
      ar: 'أمن المعلومات وحماية البيانات',
      en: 'Information Security and Data Protection'
    },
    description: {
      ar: 'تعرف على تقنيات حماية البيانات وأمن الشبكات',
      en: 'Learn data protection and network security techniques'
    },
    duration: {
      ar: '7 أسابيع',
      en: '7 weeks'
    },
    level: {
      ar: 'متوسط',
      en: 'Intermediate'
    },
    learners: 900,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-red-500 to-red-700',
    iconColor: 'text-red-400',
    price: {
      original: 200000,
      discounted: 150000,
      currency: {
        ar: 'ل.س',
        en: 'SYP'
      }
    },
    features: {
      ar: [
        'مبادئ أمن المعلومات',
        'تحليل التهديدات والهجمات',
        'أساليب التشفير والحماية',
        'ورش عمل عملية'
      ],
      en: [
        'Information security principles',
        'Threat and attack analysis',
        'Encryption and protection methods',
        'Hands-on workshops'
      ]
    },
    category: 'cybersecurity',
  },
  {
    id: '4',
    title: {
      ar: 'تطوير الويب باستخدام React',
      en: 'Web Development with React'
    },
    description: {
      ar: 'تعلم بناء واجهات المستخدم الحديثة باستخدام React',
      en: 'Learn to build modern user interfaces with React'
    },
    duration: {
      ar: '9 أسابيع',
      en: '9 weeks'
    },
    level: {
      ar: 'متوسط',
      en: 'Intermediate'
    },
    learners: 1300,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-purple-500 to-purple-700',
    iconColor: 'text-purple-400',
    price: {
      original: 220000,
      discounted: 170000,
      currency: {
        ar: 'ل.س',
        en: 'SYP'
      }
    },
    features: {
      ar: [
        'مشاريع تطبيقية',
        'دروس فيديو مفصلة',
        'شهادة معتمدة',
        'تحديثات مستمرة'
      ],
      en: [
        'Practical projects',
        'Detailed video lessons',
        'Certified certificate',
        'Continuous updates'
      ]
    },
    category: 'programming',
  },
  {
    id: '5',
    title: {
      ar: 'إدارة قواعد البيانات مع MySQL',
      en: 'Database Management with MySQL'
    },
    description: {
      ar: 'تعلم كيفية تصميم وإدارة قواعد البيانات باستخدام MySQL',
      en: 'Learn to design and manage databases using MySQL'
    },
    duration: {
      ar: '6 أسابيع',
      en: '6 weeks'
    },
    level: {
      ar: 'مبتدئ',
      en: 'Beginner'
    },
    learners: 1100,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/267614/pexels-photo-267614.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-indigo-500 to-indigo-700',
    iconColor: 'text-indigo-400',
    price: {
      original: 140000,
      discounted: 90000,
      currency: {
        ar: 'ل.س',
        en: 'SYP'
      }
    },
    features: {
      ar: [
        'دروس نظرية وعملية',
        'مشاريع قواعد بيانات',
        'شهادة إتمام',
        'دعم مباشر'
      ],
      en: [
        'Theoretical and practical lessons',
        'Database projects',
        'Completion certificate',
        'Live support'
      ]
    },
    category: 'technology',
  },
  {
    id: '6',
    title: {
      ar: 'أساسيات الذكاء الاصطناعي',
      en: 'Introduction to Artificial Intelligence'
    },
    description: {
      ar: 'تعرف على مفاهيم الذكاء الاصطناعي وتطبيقاته الحديثة',
      en: 'Learn AI concepts and modern applications'
    },
    duration: {
      ar: '8 أسابيع',
      en: '8 weeks'
    },
    level: {
      ar: 'متوسط',
      en: 'Intermediate'
    },
    learners: 950,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-yellow-500 to-yellow-700',
    iconColor: 'text-yellow-400',
    price: {
      original: 210000,
      discounted: 160000,
      currency: {
        ar: 'ل.س',
        en: 'SYP'
      }
    },
    features: {
      ar: [
        'مبادئ الذكاء الاصطناعي',
        'مشاريع تطبيقية',
        'شهادة معتمدة',
        'دعم فني'
      ],
      en: [
        'AI fundamentals',
        'Applied projects',
        'Certified certificate',
        'Technical support'
      ]
    },
    category: 'technology',
  }
];


interface CourseShowcaseProps {
  language?: 'ar' | 'en';
}

const CourseShowcase: React.FC<CourseShowcaseProps> = ({ language = 'ar' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const isArabic = language === 'ar';
  const coursesPerPage = 3;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentCourses = () => {
    const start = currentIndex * coursesPerPage;
    return courses.slice(start, start + coursesPerPage);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}${isArabic ? 'ألف' : 'K'}`;
    }
    return num.toString();
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsPaymentModalOpen(true);
  };

  const texts = {
    ar: {
      title: 'الدورات الأكثر طلباً',
      subtitle: 'اكتشف أبرز الدورات التي تساهم في تعزيز مهاراتك وتطوير مسيرتك المهنية، مصممة بعناية لتوفير أعلى مستويات الجودة والتأثير',
      viewCourse: 'عرض الدورة',
      learners: 'متعلم',
      rating: 'التقييم'
    },
    en: {
      title: 'Most Popular Courses',
      subtitle: 'Discover our top courses that contribute to enhancing your skills and developing your career, carefully designed to provide the highest levels of quality and impact',
      viewCourse: 'View Course',
      learners: 'learners',
      rating: 'Rating'
    }
  };

  return (
    <>
      <div className={`w-full bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16 px-4 ${isArabic ? 'rtl' : 'ltr'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {texts[language].title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {texts[language].subtitle}
            </p>
          </div>

          {/* Courses Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={isArabic ? nextSlide : prevSlide}
              className={`absolute ${isArabic ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-4 hover:bg-gray-50 transition-all duration-300 hover:scale-110 group`}
              disabled={totalPages <= 1}
            >
              
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
            </button>
            
            <button
              onClick={isArabic ? prevSlide : nextSlide}
              className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-4 hover:bg-gray-50 transition-all duration-300 hover:scale-110 group`}
              disabled={totalPages <= 1}
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
            </button>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
              {getCurrentCourses().map((course) => (
                <div
                  key={course.id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleCourseClick(course)}
                >
                  {/* Course Image */}
                  <div className={`relative h-64 bg-gradient-to-br ${course.gradient} overflow-hidden`}>
                    <img
                      src={course.image}
                      alt={course.title[language]}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Duration Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-gray-800">
                        {course.duration[language]}
                      </span>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 bg-teal-600 text-white rounded-full px-4 py-2">
                      <span className="text-sm font-semibold">
                        {course.level[language]}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors">
                      {course.title[language]}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {course.description[language]}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {formatNumber(course.learners)}+ {texts[language].learners}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm">{course.level[language]}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-gray-400 line-through text-sm">
                          {isArabic ? `${course.price.original} ${course.price.currency.ar}` : `${course.price.currency.en}${course.price.original}`}
                        </span>
                        <span className="text-2xl font-bold text-teal-600 ml-2">
                          {isArabic ? `${course.price.discounted} ${course.price.currency.ar}` : `${course.price.currency.en}${course.price.discounted}`}
                        </span>
                      </div>
                      <div className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-semibold">
                        {Math.round((1 - course.price.discounted / course.price.original) * 100)}% OFF
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      {texts[language].viewCourse}
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  {hoveredCard === course.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-600/10 pointer-events-none" />
                  )}
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-teal-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedCourse && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
          language={language}
        />
      )}
    </>
  );
};

export default CourseShowcase;