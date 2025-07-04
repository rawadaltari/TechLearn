import  { useState } from 'react';
import { 
  Plus, 
  BookOpen, 
  Users, 
  Video, 
  FileText, 
  BarChart3, 
  TrendingUp,
  User,
  Play
} from 'lucide-react';

import { useAuth } from '.././contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import translations from "../data/translations";
import AddStudent from './Teacher component/AddStudent';
import AddCourse from './Teacher component/AddCourseForm';
export const TeacherDashboard: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      label: t.TeacherDashboard.total, 
      value: '12', 
      icon: BookOpen, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100' 
    },
    { 
      label: t.TeacherDashboard.totalStudents, 
      value: '248', 
      icon: Users, 
      color: 'text-green-600',
      bgColor: 'bg-green-100' 
    },
    { 
      label: t.TeacherDashboard.totalVideos, 
      value: '67', 
      icon: Video, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100' 
    },
    { 
      label: t.TeacherDashboard.analytics, 
      value: '94%', 
      icon: TrendingUp, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-100' 
    },
  ];

  const quickActions = [
    { 
      label: t.TeacherDashboard.addCourse, 
      icon: Plus, 
      action: () => setActiveTab('Add-CourseForm'),
      color: 'bg-teal-500 hover:bg-teal-600' 
    },
    { 
      label: t.TeacherDashboard.addStudent, 
      icon: User, 
      action: () => setActiveTab('add-student'),
      color: 'bg-blue-500 hover:bg-blue-600' 
    },
    { 
      label: t.TeacherDashboard.uploadVideo, 
      icon: Video, 
      action: () => setActiveTab('upload-video'),
      color: 'bg-purple-500 hover:bg-purple-600' 
    },
    { 
      label: t.TeacherDashboard.createQuiz, 
      icon: FileText, 
      action: () => setActiveTab('create-quiz'),
      color: 'bg-orange-500 hover:bg-orange-600' 
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'مقدمة في البرمجة',
      titleEn: 'Introduction to Programming',
      students: 45,
      lessons: 12,
      progress: 75,
      thumbnail: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: 'تطوير المواقع الإلكترونية',
      titleEn: 'Web Development',
      students: 32,
      lessons: 18,
      progress: 60,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: 'قواعد البيانات',
      titleEn: 'Database Management',
      students: 28,
      lessons: 10,
      progress: 90,
      thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {t.TeacherDashboard.commonwelcome}, {user?.firstName}!
        </h1>
        <p className="text-teal-100 text-lg">
          {t.TeacherDashboard.teacherwelcome}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4"> {t.TeacherDashboard.Quickmeasures}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 hover:scale-105 shadow-md`}
            >
              <action.icon className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t.TeacherDashboard.mycourse}</h2>
          <button className="text-teal-600 hover:text-teal-700 font-medium">
            عرض الكل
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 ml-1" />
                  <span>{course.students} طالب</span>
                  <Play className="h-4 w-4 mr-4 ml-1" />
                  <span>{course.lessons} درس</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-500 h-2 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{course.progress}% مكتمل</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


  const renderUploadVideo = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{'teacher.uploadVideo'}</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اختر الكورس
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
            <option>اختر الكورس</option>
            {recentCourses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الدرس (العربية)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="أدخل عنوان الدرس"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الدرس (English)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter lesson title"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ملف الفيديو
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">اسحب وأفلت ملف الفيديو هنا</p>
            <p className="text-sm text-gray-500 mb-4">أو</p>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              id="video-upload"
            />
            <label
              htmlFor="video-upload"
              className="bg-teal-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-teal-600 transition-colors"
            >
              اختر ملف فيديو
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف الدرس (العربية)
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="أدخل وصف الدرس"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              وصف الدرس (English)
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter lesson description"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {'common.cancel'}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            رفع الفيديو
          </button>
        </div>
      </form>
    </div>
  );

  const renderCreateQuiz = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{'teacher.createQuiz'}</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اختر الكورس
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
            <option>اختر الكورس</option>
            {recentCourses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الاختبار (العربية)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="أدخل عنوان الاختبار"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان الاختبار (English)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter quiz title"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              مدة الاختبار (دقيقة)
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              درجة النجاح (%)
            </label>
            <input
              type="number"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="70"
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">الأسئلة</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السؤال (العربية)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="أدخل السؤال"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    السؤال (English)
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter question"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">الخيارات</label>
                {[1, 2, 3, 4].map((option) => (
                  <div key={option} className="flex items-center space-x-3 space-x-reverse">
                    <input
                      type="radio"
                      name="correct-answer"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder={`الخيار ${option}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
          >
            + إضافة سؤال جديد
          </button>
        </div>

        <div className="flex justify-end space-x-4 space-x-reverse">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {'common.cancel'}
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            {'teacher.createQuiz'}
          </button>
        </div>
      </form>
    </div>
  );

  const tabs = [
    { id: 'overview', label: t.TeacherDashboard.Overview, icon: BarChart3 },
    { id: 'Add-CourseForm', label: t.TeacherDashboard.addCourse, icon: Plus },
    { id: 'add-student', label: t.TeacherDashboard.addStudent, icon: User },
    { id: 'upload-video', label: t.TeacherDashboard.uploadVideo, icon: Video },
    { id: 'create-quiz', label: t.TeacherDashboard.createQuiz, icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 space-x-reverse px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 space-x-reverse py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'Add-CourseForm' && <AddCourse setActiveTab={setActiveTab} />}
        {activeTab === 'add-student' && <AddStudent setActiveTab={setActiveTab} />}
        {activeTab === 'upload-video' && renderUploadVideo()}
        {activeTab === 'create-quiz' && renderCreateQuiz()}
      </div>
    </div>
  );
  };
