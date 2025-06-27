import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;