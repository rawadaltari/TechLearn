import React from 'react';
import { Bell, Search, Settings, User, Globe } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  const getPageTitle = (page: string) => {
    const titles: { [key: string]: string } = {
      dashboard: 'لوحة التحكم',
      students: 'إدارة الطلاب',
      teachers: 'إدارة المدرسين',
      courses: 'إدارة الدورات',
      certificates: 'الشهادات',
      calendar: 'التقويم',
      reports: 'التقارير',
      analytics: 'الإحصائيات',
      messages: 'الرسائل',
      settings: 'الإعدادات',
    };
    return titles[page] || 'لوحة التحكم';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 text-right">
            {getPageTitle(currentPage)}
          </h1>
          <p className="text-sm text-gray-500 text-right mt-1">
            مرحباً بك في نظام إدارة المنصة التعليمية
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="البحث..."
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          {/* Language Toggle */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Globe className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">أحمد محمد</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;