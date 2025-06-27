import React, { useState, useEffect } from 'react';
import { UserPreferences } from '../../types/Course';
import {  BookOpen, Globe, Clock, DollarSign, Sparkles, Code, Cpu } from 'lucide-react';
import { apiService } from '../../services/apiService';
import img1 from '../../assets/logo/22.png'
interface UserPreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  loading?: boolean;
}

const itSpecializations = [
  { value: 'web-development', label: 'تطوير المواقع', labelEn: 'Web Development' },
  { value: 'mobile-development', label: 'تطوير التطبيقات', labelEn: 'Mobile Development' },
  { value: 'data-science', label: 'علم البيانات', labelEn: 'Data Science' },
  { value: 'ai', label: 'الذكاء الاصطناعي', labelEn: 'Artificial Intelligence' },
  { value: 'machine-learning', label: 'التعلم الآلي', labelEn: 'Machine Learning' },
  { value: 'cybersecurity', label: 'الأمن السيبراني', labelEn: 'Cybersecurity' },
  { value: 'cloud-computing', label: 'الحوسبة السحابية', labelEn: 'Cloud Computing' },
  { value: 'devops', label: 'DevOps', labelEn: 'DevOps' },
  { value: 'blockchain', label: 'البلوك تشين', labelEn: 'Blockchain' },
  { value: 'full-stack', label: 'التطوير الشامل', labelEn: 'Full Stack' },
  { value: 'backend-development', label: 'تطوير الخادم', labelEn: 'Backend Development' },
  { value: 'frontend-development', label: 'تطوير الواجهات', labelEn: 'Frontend Development' },
  { value: 'database-administration', label: 'إدارة قواعد البيانات', labelEn: 'Database Administration' },
  { value: 'network-administration', label: 'إدارة الشبكات', labelEn: 'Network Administration' },
  { value: 'software-engineering', label: 'هندسة البرمجيات', labelEn: 'Software Engineering' }
];

const itInterests = [
  'البرمجة', 'تطوير المواقع', 'تطوير التطبيقات', 'الذكاء الاصطناعي', 'التعلم الآلي',
  'علم البيانات', 'الأمن السيبراني', 'الحوسبة السحابية', 'DevOps', 'البلوك تشين',
  'قواعد البيانات', 'الشبكات', 'اختبار البرمجيات', 'إدارة المشاريع التقنية', 'UI/UX'
];

const technologies = [
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
  'PHP', 'C#', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'MongoDB', 'PostgreSQL',
  'MySQL', 'Redis', 'Elasticsearch', 'TensorFlow', 'PyTorch', 'Solidity'
];

export const UserPreferencesForm: React.FC<UserPreferencesFormProps> = ({ 
  onSubmit, 
  loading = false 
}) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    specialization: '',
    level: 'beginner',
    interests: [],
    language: 'both',
    duration: 'medium',
    priceRange: 'any',
    preferredTechnologies: []
  });

  const [availableSpecializations, setAvailableSpecializations] = useState(itSpecializations);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    loadSpecializations();
  }, []);

  const loadSpecializations = async () => {
    setLoadingData(true);
    try {
      const response = await apiService.getSpecializations();
      if (response.success && response.data.length > 0) {
        // دمج البيانات من API مع البيانات المحلية
        const apiSpecs = response.data.map(spec => {
          const existing = itSpecializations.find(s => s.value === spec);
          return existing || { value: spec, label: spec, labelEn: spec };
        });
        setAvailableSpecializations(apiSpecs);
      }
    } catch (error) {
      console.error('Error loading specializations:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preferences.specialization && preferences.interests.length > 0) {
      onSubmit(preferences);
    }
  };

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleTechnology = (tech: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredTechnologies: prev.preferredTechnologies?.includes(tech)
        ? prev.preferredTechnologies.filter(t => t !== tech)
        : [...(prev.preferredTechnologies || []), tech]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16  rounded-full mb-4">
        <img src={img1}/>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">اكتشف كورسات تكنولوجيا المعلومات المناسبة لك</h2>
        <p className="text-gray-600">أخبرنا عن تخصصك التقني واهتماماتك وسنقترح عليك أفضل الكورسات</p>
      </div>

      {loadingData && (
        <div className="text-center py-4 mb-6">
          <div className="inline-flex items-center text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            جاري تحميل البيانات...
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* التخصص التقني */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <Cpu className="w-5 h-5 mr-2 text-blue-600" />
            ما هو تخصصك في تكنولوجيا المعلومات؟
          </label>
          <select
            value={preferences.specialization}
            onChange={(e) => setPreferences(prev => ({ ...prev, specialization: e.target.value }))}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            required
            disabled={loadingData}
          >
            <option value="">اختر تخصصك التقني</option>
            {availableSpecializations.map(spec => (
              <option key={spec.value} value={spec.value}>
                {spec.label} - {spec.labelEn}
              </option>
            ))}
          </select>
        </div>

        {/* المستوى التقني */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <BookOpen className="w-5 h-5 mr-2 text-green-600" />
            ما هو مستواك التقني؟
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'beginner', label: 'مبتدئ', desc: 'أساسيات البرمجة والتقنية' },
              { value: 'intermediate', label: 'متوسط', desc: 'خبرة في مشاريع متوسطة' },
              { value: 'advanced', label: 'متقدم', desc: 'خبرة واسعة ومشاريع معقدة' }
            ].map(level => (
              <button
                key={level.value}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, level: level.value as any }))}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  preferences.level === level.value
                    ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="font-semibold">{level.label}</div>
                <div className="text-sm text-gray-600 mt-1">{level.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* الاهتمامات التقنية */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
            ما هي اهتماماتك التقنية؟ (اختر على الأقل واحد)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {itInterests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`p-3 rounded-xl border-2 transition-all text-center text-sm ${
                  preferences.interests.includes(interest)
                    ? 'border-purple-500 bg-purple-50 text-purple-700 font-semibold'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* التقنيات المفضلة */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <Code className="w-5 h-5 mr-2 text-indigo-600" />
            التقنيات والأدوات المفضلة (اختياري)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {technologies.map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTechnology(tech)}
                className={`p-2 rounded-lg border-2 transition-all text-center text-xs ${
                  preferences.preferredTechnologies?.includes(tech)
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* لغة التعلم */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <Globe className="w-5 h-5 mr-2 text-blue-600" />
            لغة التعلم المفضلة
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'ar', label: 'العربية', desc: 'كورسات باللغة العربية' },
              { value: 'en', label: 'الإنجليزية', desc: 'كورسات باللغة الإنجليزية' },
              { value: 'both', label: 'كلاهما', desc: 'أي لغة مناسبة' }
            ].map(lang => (
              <button
                key={lang.value}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, language: lang.value as any }))}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  preferences.language === lang.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="font-semibold">{lang.label}</div>
                <div className="text-sm text-gray-600 mt-1">{lang.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* المدة المفضلة */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            المدة المفضلة للكورس
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'short', label: 'قصيرة', desc: 'أقل من 6 أسابيع' },
              { value: 'medium', label: 'متوسطة', desc: '6-12 أسبوع' },
              { value: 'long', label: 'طويلة', desc: 'أكثر من 12 أسبوع' }
            ].map(duration => (
              <button
                key={duration.value}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, duration: duration.value as any }))}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  preferences.duration === duration.value
                    ? 'border-orange-500 bg-orange-50 text-orange-700 font-semibold'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
              >
                <div className="font-semibold">{duration.label}</div>
                <div className="text-sm text-gray-600 mt-1">{duration.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* نوع الكورس */}
        <div>
          <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            نوع الكورس المفضل
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: 'free', label: 'مجاني فقط', desc: 'كورسات مجانية بالكامل' },
              { value: 'paid', label: 'مدفوع فقط', desc: 'كورسات مدفوعة عالية الجودة' },
              { value: 'any', label: 'أي منهما', desc: 'مجاني أو مدفوع' }
            ].map(price => (
              <button
                key={price.value}
                type="button"
                onClick={() => setPreferences(prev => ({ ...prev, priceRange: price.value as any }))}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  preferences.priceRange === price.value
                    ? 'border-green-500 bg-green-50 text-green-700 font-semibold'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="font-semibold">{price.label}</div>
                <div className="text-sm text-gray-600 mt-1">{price.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !preferences.specialization || preferences.interests.length === 0 || loadingData}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
              جاري البحث عن الكورسات التقنية المناسبة...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-5 h-5 mr-2" />
              اعرض التوصيات التقنية المخصصة لي
            </div>
          )}
        </button>
      </form>
    </div>
  );
};