import  { useState } from 'react';
import { DataProvider } from '../contexts/DataContext';
import Layout from '../components/DashboardAdmin/Layout/Layout';
import Dashboard from '../components/DashboardTeacher/Dashboard';
import StudentsList from '../components/DashboardAdmin/Students/StudentsList';
import TeachersList from '../components/DashboardAdmin/Teachers/TeachersList';
import CoursesList from '../components/DashboardAdmin/Courses/CoursesList';

function Admin() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentsList />;
      case 'teachers':
        return <TeachersList />;
      case 'courses':
        return <CoursesList />;
      case 'certificates':
        return <div className="text-center py-12 text-gray-500">صفحة الشهادات قيد التطوير</div>;
      case 'calendar':
        return <div className="text-center py-12 text-gray-500">صفحة التقويم قيد التطوير</div>;
      case 'reports':
        return <div className="text-center py-12 text-gray-500">صفحة التقارير قيد التطوير</div>;
      case 'analytics':
        return <div className="text-center py-12 text-gray-500">صفحة الإحصائيات قيد التطوير</div>;
      case 'messages':
        return <div className="text-center py-12 text-gray-500">صفحة الرسائل قيد التطوير</div>;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">صفحة الإعدادات قيد التطوير</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        {renderPage()}
      </Layout>
    </DataProvider>
  );
}

export default Admin;