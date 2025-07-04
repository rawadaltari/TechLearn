import React, { useState } from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import { courses } from '../data/courses';

const CourseCatalog: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null); // لحفظ الكورس المحدد للدفع

  const categories = [
    { id: 'all', name: t.catalog.allCategories },
    { id: 'web development', name: t.catalog.categories.webdevelopment },
    { id: 'technology', name: t.catalog.categories.technology },
    { id: 'programming', name: t.catalog.categories.programming }, 
    { id: 'cybersecurity', name: t.catalog.categories.cybersecurity }, 
  ];

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // ضع هنا منطق الدفع أو ربط API الدفع
    alert(`تم إرسال طلب الدفع لكورس: ${selectedCourse.title[language]}`);
    setSelectedCourse(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t.catalog.title}</h1>

      <div className="flex flex-col md:flex-row justify-between mb-8">
        {/* الفلاتر */}
        <div className="mb-4 md:mb-0 relative">
          <div className="flex items-center">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              <Filter size={16} className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.catalog.filter}
              <ChevronDown size={16} className={`${isRTL ? 'mr-2' : 'ml-2'}`} />
            </button>
          </div>

          {isFilterOpen && (
            <div className="absolute mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsFilterOpen(false);
                    }}
                    className={`${
                      selectedCategory === category.id
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-gray-700'
                    } block px-4 py-2 text-sm w-full text-left hover:bg-gray-50`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* حقل البحث */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder={t.search}
            className={`w-full py-2 px-8 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
            }`}
          />
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 ${
              isRTL ? 'right-3' : 'left-3'
            }`}
          >
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* قائمة الكورسات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105"
          >
            <div className="relative pb-1/2">
              <img
                src={course.image}
                className="absolute h-full w-full object-cover"
                alt="Course"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                  {
                    t.catalog.categories[
                      course.category as keyof typeof t.catalog.categories
                    ]
                  }
                </span>
                <span className="text-sm text-gray-500">{course.duration}</span>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {course.title[language]}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
              <div className="mt-3 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(course.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  ({course.reviewCount})
                </span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  {t.catalog.enroll}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* نموذج الدفع */}
      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {t.catalog.enroll} - {selectedCourse.title[language]}
            </h2>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.payment.name}
                </label>
                <input
                  type="text"
                  placeholder={t.payment.namePlaceholder}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.payment.email}
                </label>
                <input
                  type="email"
                  placeholder={t.payment.emailPlaceholder}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  {t.payment.card}
                </label>
                <input
                  type="text"
                  placeholder={t.payment.cardPlaceholder}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                {t.payment.payNow}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
