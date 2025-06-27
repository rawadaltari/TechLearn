import React from 'react';
import { Users, BookOpen, Award, MessageSquare } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'student',
      message: 'انضم طالب جديد: سارة أحمد',
      time: 'منذ 5 دقائق',
      icon: Users,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      type: 'course',
      message: 'تم إنشاء دورة جديدة: أساسيات البرمجة',
      time: 'منذ 15 دقيقة',
      icon: BookOpen,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 3,
      type: 'certificate',
      message: 'تم إصدار شهادة لـ محمد علي',
      time: 'منذ 30 دقيقة',
      icon: Award,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 4,
      type: 'message',
      message: 'رسالة جديدة من المدرس أحمد محمود',
      time: 'منذ ساعة',
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">النشاط الأخير</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <div key={activity.id} className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
        عرض جميع الأنشطة
      </button>
    </div>
  );
};

export default RecentActivity;