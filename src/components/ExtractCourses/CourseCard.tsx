
import { CourseCategory } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CourseCardProps {
  category: CourseCategory;
}

const CourseCard: React.FC<CourseCardProps> = ({ category }) => {
  const { language, direction, t } = useLanguage();

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      home: '🏠',
      arts: '🎨',
      family: '👨‍👩‍👧‍👦',
      child: '👶',
      health: '💊',
      development: '⚙️',
      business: '💼'
    };
    return iconMap[iconName] || '📚';
  };

  return (
    <div className="group cursor-pointer" dir={direction}>
      <div className={`
        bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
        p-6 border-2 border-transparent hover:border-gray-100
        transform hover:-translate-y-1
      `}>
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center text-2xl
            ${category.bgColor} ${category.color}
            group-hover:scale-110 transition-transform duration-300
          `}>
            {getIcon(category.icon)}
          </div>
          
          {/* Title */}
          <h3 className={`
            font-semibold text-gray-800 leading-relaxed
            ${direction === 'rtl' ? 'font-arabic' : ''}
            ${language === 'ar' ? 'text-lg' : 'text-base'}
          `}>
            {language === 'ar' ? category.titleAr : category.titleEn}
          </h3>
          
          {/* Course Count */}
          <div className="text-gray-500 text-sm">
            <span className="font-medium">{category.count}</span>
            <span className={`${direction === 'rtl' ? 'mr-1' : 'ml-1'}`}>
              {t('courses')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;