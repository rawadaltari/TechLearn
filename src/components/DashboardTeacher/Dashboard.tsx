import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, GraduationCap, BookOpen, Award } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeTeachers: 0,
    totalCourses: 5,          // قيمة افتراضية
    certificatesIssued: 10    // قيمة افتراضية
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          axios.get('https://raghadsvu-001-site1.jtempurl.com/api/students'),
          axios.get('https://raghadsvu-001-site1.jtempurl.com/api/Teachers')
        ]);

        setStats({
          totalStudents: studentsRes.data.length,
          activeTeachers: teachersRes.data.length,
          totalCourses: 5,            // مؤقتًا
          certificatesIssued: 10      // مؤقتًا
        });
      } catch (error) {
        console.error('خطأ في جلب الإحصائيات:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* قسم الترحيب */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 text-right">مرحباً أحمد محمد</h2>
        <p className="text-blue-100 text-right">إليك نظرة عامة على منصتك التعليمية اليوم</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الطلاب"
          value={stats.totalStudents.toString()}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="المدرسين النشطين"
          value={stats.activeTeachers.toString()}
          icon={GraduationCap}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="الدورات المتاحة"
          value={stats.totalCourses.toString()}
          icon={BookOpen}
          trend={{ value: 5, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="الشهادات الصادرة"
          value={stats.certificatesIssued.toString()}
          icon={Award}
          trend={{ value: 15, isPositive: true }}
          color="orange"
        />
      </div>

      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      {/* أقسام إضافية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">إحصائيات الدورات</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
              </div>
              <span className="text-sm text-gray-600">البرمجة - 75%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm text-gray-600">التصميم - 60%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-2/3 bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full transition-all duration-500" style={{ width: '40%' }}></div>
              </div>
              <span className="text-sm text-gray-600">التسويق - 40%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">نظرة عامة على الأداء</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-2xl font-bold text-blue-600">95%</span>
              <span className="text-sm text-gray-600">معدل إكمال الدورات</span>
            </div>
            <div className="flex justify-between">
              <span className="text-2xl font-bold text-green-600">4.8</span>
              <span className="text-sm text-gray-600">متوسط التقييمات</span>
            </div>
            <div className="flex justify-between">
              <span className="text-2xl font-bold text-purple-600">2.5h</span>
              <span className="text-sm text-gray-600">متوسط وقت الدراسة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
