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
      ar: 'رحلة التحول الرقمي: انطلق بشركتك نحو المستقبل',
      en: 'Digital Transformation Journey: Launch Your Company to the Future'
    },
    description: {
      ar: 'تعلم استراتيجيات التحول الرقمي وقيادة شركتك نحو المستقبل',
      en: 'Learn digital transformation strategies and lead your company to the future'
    },
    duration: {
      ar: '8 أسابيع',
      en: '8 weeks'
    },
    level: {
      ar: 'تعلم ذاتي',
      en: 'Self-paced'
    },
    learners: 1500,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-slate-600 to-slate-800',
    iconColor: 'text-orange-400',
    price: {
      original: 299,
      discounted: 199,
      currency: {
        ar: 'ر.س',
        en: '$'
      }
    },
    features: {
      ar: [
        'محتوى فيديو عالي الجودة لمدة 12 ساعة',
        'مواد تدريبية قابلة للتحميل',
        'شهادة إتمام معتمدة',
        'وصول مدى الحياة للمحتوى',
        'دعم فني على مدار الساعة'
      ],
      en: [
        '12 hours of high-quality video content',
        'Downloadable training materials',
        'Certified completion certificate',
        'Lifetime access to content',
        '24/7 technical support'
      ]
    }
  },
  {
    id: '2',
    title: {
      ar: 'تقييم الأثر: من التصميم إلى التأثير والتوثيق',
      en: 'Impact Assessment: From Design to Documentation'
    },
    description: {
      ar: 'دورة شاملة لتعلم تقييم وتوثيق الأثر في المشاريع',
      en: 'Comprehensive course on impact assessment and documentation'
    },
    duration: {
      ar: '12 أسابيع',
      en: '12 weeks'
    },
    level: {
      ar: 'متوسط',
      en: 'Intermediate'
    },
    learners: 1000,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-green-400 to-green-600',
    iconColor: 'text-red-400',
    price: {
      original: 399,
      discounted: 249,
      currency: {
        ar: 'ر.س',
        en: '$'
      }
    },
    features: {
      ar: [
        'محتوى فيديو لمدة 18 ساعة',
        'قوالب وأدوات تقييم الأثر',
        'دراسات حالة عملية',
        'جلسات تفاعلية مباشرة',
        'مجتمع المتعلمين الحصري'
      ],
      en: [
        '18 hours of video content',
        'Impact assessment templates and tools',
        'Practical case studies',
        'Live interactive sessions',
        'Exclusive learner community'
      ]
    }
  },
  {
    id: '3',
    title: {
      ar: 'كيف تبدأ وتدير مشروعاً ناجحاً',
      en: 'How to Start and Manage a Successful Project'
    },
    description: {
      ar: 'تعلم أساسيات إدارة المشاريع وتطبيق أفضل الممارسات',
      en: 'Learn project management fundamentals and best practices'
    },
    duration: {
      ar: '4 أسابيع',
      en: '4 weeks'
    },
    level: {
      ar: 'سهل',
      en: 'Easy'
    },
    learners: 28900,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-blue-500 to-purple-600',
    iconColor: 'text-yellow-400',
    price: {
      original: 199,
      discounted: 99,
      currency: {
        ar: 'ر.س',
        en: '$'
      }
    },
    features: {
      ar: [
        'محتوى فيديو لمدة 8 ساعات',
        'أدوات إدارة المشاريع',
        'قوالب التخطيط والتنفيذ',
        'اختبارات تفاعلية',
        'شهادة إتمام'
      ],
      en: [
        '8 hours of video content',
        'Project management tools',
        'Planning and execution templates',
        'Interactive quizzes',
        'Completion certificate'
      ]
    }
  },
  {
    id: '4',
    title: {
      ar: 'إدارة الموارد البشرية الحديثة',
      en: 'Modern Human Resource Management'
    },
    description: {
      ar: 'استراتيجيات متقدمة في إدارة الموارد البشرية',
      en: 'Advanced strategies in human resource management'
    },
    duration: {
      ar: '6 أسابيع',
      en: '6 weeks'
    },
    level: {
      ar: 'متقدم',
      en: 'Advanced'
    },
    learners: 2200,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    gradient: 'from-purple-500 to-pink-600',
    iconColor: 'text-green-400',
    price: {
      original: 349,
      discounted: 229,
      currency: {
        ar: 'ر.س',
        en: '$'
      }
    },
    features: {
      ar: [
        'محتوى فيديو لمدة 15 ساعة',
        'استراتيجيات التوظيف الحديثة',
        'أدوات تقييم الأداء',
        'ورش عمل تفاعلية',
        'استشارة شخصية'
      ],
      en: [
        '15 hours of video content',
        'Modern recruitment strategies',
        'Performance evaluation tools',
        'Interactive workshops',
        'Personal consultation'
      ]
    }
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
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
            </button>
            
            <button
              onClick={isArabic ? prevSlide : nextSlide}
              className={`absolute ${isArabic ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-4 hover:bg-gray-50 transition-all duration-300 hover:scale-110 group`}
              disabled={totalPages <= 1}
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-teal-600 transition-colors" />
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