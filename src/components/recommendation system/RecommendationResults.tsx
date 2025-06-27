import React from 'react';
import { Course } from '../../types/Course';
import { CourseCard } from './CourseCard';
import { Sparkles, RefreshCw, Filter } from 'lucide-react';

interface RecommendationResultsProps {
  courses: Course[];
  onBack: () => void;
  onRefresh: () => void;
}

export const RecommendationResults: React.FC<RecommendationResultsProps> = ({
  courses,
  onBack,
  onRefresh
}) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          لم نجد كورسات مناسبة
        </h3>
        <p className="text-gray-500 mb-6">
          جرب تعديل تفضيلاتك للحصول على نتائج أفضل
        </p>
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          تعديل التفضيلات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          الكورسات المقترحة لك
        </h2>
        <p className="text-gray-600 mb-6">
          وجدنا {courses.length} كورس مناسب لتفضيلاتك واهتماماتك
        </p>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all"
          >
            <Filter className="w-5 h-5 mr-2" />
            تعديل التفضيلات
          </button>
          
          <button
            onClick={onRefresh}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            تحديث النتائج
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            reasons={[
              'يتماشى مع تخصصك',
              'مناسب لمستواك',
              'تقييم عالي من الطلاب'
            ]}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all font-semibold">
          عرض المزيد من الكورسات
        </button>
      </div>
    </div>
  );
};