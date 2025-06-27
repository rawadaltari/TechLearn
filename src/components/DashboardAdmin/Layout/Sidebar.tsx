import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings, 
  BarChart3, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  FileText,
  Award
} from 'lucide-react';
import img1 from '../../../assets/logo/22.png'
interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
    { id: 'students', label: 'الطلاب', icon: Users },
    { id: 'teachers', label: 'المدرسين', icon: GraduationCap },
    { id: 'courses', label: 'الدورات', icon: BookOpen },
    { id: 'certificates', label: 'الشهادات', icon: Award },
    { id: 'calendar', label: 'التقويم', icon: Calendar },
    { id: 'reports', label: 'التقارير', icon: FileText },
    { id: 'analytics', label: 'الإحصائيات', icon: BarChart3 },
    { id: 'messages', label: 'الرسائل', icon: MessageSquare },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } h-screen flex flex-col shadow-lg`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="  rounded-lg flex items-center justify-center">
              
              <img  className=" text-white" src={img1}/>
            </div>
            <span className="text-xl font-bold text-gray-800">TechLearn </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-600' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium text-right flex-1">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 text-right">
              <p className="text-sm font-medium text-gray-900">أحمد محمد</p>
              <p className="text-xs text-gray-500">مدير النظام</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;