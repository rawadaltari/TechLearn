import  { useState } from 'react';
import { UserPreferences, Course } from '../../types/Course';
import { RecommendationEngine } from '../../services/recommendationEngine';
import { UserPreferencesForm } from '../recommendation system/UserPreferencesForm';
import { RecommendationResults } from '../recommendation system/RecommendationResults';
import img1 from '../../assets/logo/22.png'
import {  Code, Database, Shield, Cloud,  Brain } from 'lucide-react';

type AppState = 'form' | 'results' | 'loading';

function UI() {
  const [state, setState] = useState<AppState>('form');
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [engine] = useState(() => new RecommendationEngine());
  const [error, setError] = useState<string | null>(null);

  const handlePreferencesSubmit = async (preferences: UserPreferences) => {
    setState('loading');
    setError(null);
    
    try {
      // محاكاة تأخير معالجة الذكاء الاصطناعي
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const recommendedCourses = await engine.recommendCourses(preferences);
      
      if (recommendedCourses.length === 0) {
        setError('لم نجد كورسات مناسبة لتفضيلاتك. جرب تعديل الخيارات.');
        setState('form');
      } else {
        setRecommendations(recommendedCourses);
        setState('results');
      }
    } catch (err) {
      console.error('Error getting recommendations:', err);
      setError('حدث خطأ في جلب التوصيات. يرجى المحاولة مرة أخرى.');
      setState('form');
    }
  };

  const handleBack = () => {
    setState('form');
    setError(null);
  };

  const handleRefresh = async () => {
    setState('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setState('results');
    } catch (err) {
      setError('حدث خطأ في تحديث النتائج.');
      setState('results');
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 animate-pulse">
                <Brain className="w-10 h-10 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                جاري تحليل تفضيلاتك التقنية...
              </h2>
              <p className="text-gray-600 mb-8">
                نستخدم الذكاء الاصطناعي للبحث عن أفضل كورسات تكنولوجيا المعلومات المناسبة لك
              </p>
              
              {/* Loading Animation */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>

              {/* Processing Steps */}
              <div className="text-sm text-gray-500 space-y-2">
                <div className="flex items-center justify-center">
                  <Code className="w-4 h-4 mr-2 text-blue-500" />
                  <span>تحليل التخصص التقني...</span>
                </div>
                <div className="flex items-center justify-center">
                  <Database className="w-4 h-4 mr-2 text-green-500" />
                  <span>البحث في قاعدة بيانات الكورسات...</span>
                </div>
                <div className="flex items-center justify-center">
                  <Brain className="w-4 h-4 mr-2 text-purple-500" />
                  <span>حساب درجات التوافق...</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
            
            <main className="py-12 px-4 sm:px-6 lg:px-8">
              <RecommendationResults
                courses={recommendations}
                onBack={handleBack}
                onRefresh={handleRefresh}
              />
            </main>
           
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
           
            
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-20 h-20  rounded-full mb-8">
                  <img src={img1}/>
                </div>
                
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  اكتشف مسارك في
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                    تكنولوجيا المعلومات
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  نظام توصية ذكي متخصص في مجال تكنولوجيا المعلومات يحلل تخصصك واهتماماتك التقنية 
                  ليقترح عليك أفضل الكورسات في البرمجة، الذكاء الاصطناعي، الأمن السيبراني، والمزيد
                </p>

                {/* Tech Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">البرمجة والتطوير</h3>
                    <p className="text-gray-600 text-sm">كورسات شاملة في جميع لغات البرمجة</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">الذكاء الاصطناعي</h3>
                    <p className="text-gray-600 text-sm">تعلم أحدث تقنيات الذكاء الاصطناعي</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">الأمن السيبراني</h3>
                    <p className="text-gray-600 text-sm">حماية الأنظمة والشبكات</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                      <Cloud className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">الحوسبة السحابية</h3>
                    <p className="text-gray-600 text-sm">AWS، Azure، وGoogle Cloud</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-gray-600">كورس تقني متخصص</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50,000+</div>
                    <div className="text-gray-600">مطور ومتخصص</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-gray-600">معدل رضا الطلاب</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Error Message */}
            {error && (
              <div className="max-w-2xl mx-auto px-4 mb-8">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Form Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
              <UserPreferencesForm 
                onSubmit={handlePreferencesSubmit}
                loading={state === 'loading'}
              />
            </section>

          
          </div>
        );
    }
  };

  return renderContent();
}

export default UI;