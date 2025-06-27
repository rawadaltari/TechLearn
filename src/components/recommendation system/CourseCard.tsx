import React, { useState } from 'react';
import { Course } from '../../types/Course';
import { 
  Star, 
  Users, 
  Clock, 
  Globe, 
  BookOpen, 
  Heart,
  Play,
  Calendar,
  Award,
  Code,
  Shield,
  CheckCircle
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  reasons?: string[];
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, reasons = [] }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number) => {
    return price === 0 ? 'مجاني' : `$${price}`;
  };

  const formatStudentsCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return level;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'web development':
      case 'mobile development':
        return <Code className="w-4 h-4" />;
      case 'cybersecurity':
        return <Shield className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyStars = (difficulty?: number) => {
    if (!difficulty) return null;
    const stars = Math.ceil(difficulty / 2); // تحويل من 1-10 إلى 1-5
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-xs text-gray-600 mr-1">صعوبة</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <div className={`w-full h-48 bg-gray-200 ${!imageLoaded ? 'animate-pulse' : ''}`}>
          <img
            src={course.image}
            alt={course.titleAr}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 shadow-lg"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            course.price === 0 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {formatPrice(course.price)}
          </span>
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
            {getLevelText(course.level)}
          </span>
        </div>

        {/* Certificate Badge */}
        {course.certificateType && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-purple-500 text-white px-2 py-1 rounded-lg text-xs flex items-center">
              <Award className="w-3 h-3 mr-1" />
              شهادة
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.titleAr}
        </h3>
        
        {/* Course Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.descriptionAr}
        </p>

        {/* Instructor and University */}
        <div className="flex items-center mb-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700">{course.instructorAr}</p>
            <p className="text-xs text-gray-500">{course.universityAr}</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
            <span className="font-semibold">{course.rating}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            <span>{formatStudentsCount(course.studentsCount)} طالب</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Globe className="w-4 h-4 mr-1" />
            <span>
              {course.language === 'ar' ? 'العربية' : 
               course.language === 'en' ? 'الإنجليزية' : 'ثنائي اللغة'}
            </span>
          </div>
        </div>

        {/* Difficulty Level */}
        {course.difficulty && (
          <div className="mb-4">
            {getDifficultyStars(course.difficulty)}
          </div>
        )}

        {/* Course Dates */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>يبدأ: {new Date(course.startDate).toLocaleDateString('ar')}</span>
        </div>

        {/* Category and Tags */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            {getCategoryIcon(course.category)}
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full mr-2">
              {course.categoryAr}
            </span>
          </div>
          
          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                +{course.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-600 mb-1">المتطلبات:</p>
            <div className="flex flex-wrap gap-1">
              {course.prerequisites.slice(0, 2).map((prereq, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  <span>{prereq}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation Reasons */}
        {reasons.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-green-600 mb-2">لماذا نوصي بهذا الكورس:</p>
            <div className="space-y-1">
              {reasons.slice(0, 2).map((reason, index) => (
                <div key={index} className="flex items-center text-xs text-green-600">
                  <Award className="w-3 h-3 mr-1" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center">
            <Play className="w-4 h-4 mr-2" />
            ابدأ التعلم
          </button>
          
          <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
            <BookOpen className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};