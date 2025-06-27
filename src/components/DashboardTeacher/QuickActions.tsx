import React, { useState } from 'react';
import { UserPlus, BookPlus, FileText, Mail } from 'lucide-react';
import AddStudentForm from './AddStudentForm';
import AddTeacherForm from './AddTeacherForm';

const QuickActions: React.FC = () => {
  const [openForm, setOpenForm] = useState<'student' | 'teacher' | null>(null);

  const handleActionClick = (id: number) => {
    if (id === 1) setOpenForm('student');
    else if (id === 2) setOpenForm('teacher');
    // يمكن لاحقًا تفعيل التقرير أو الرسالة
  };

  const actions = [
    { id: 1, label: 'إضافة طالب', icon: UserPlus, color: 'bg-blue-600 hover:bg-blue-700' },
    { id: 2, label: 'إضافة معلم', icon: BookPlus, color: 'bg-green-600 hover:bg-green-700' },
    { id: 3, label: 'إنشاء تقرير', icon: FileText, color: 'bg-purple-600 hover:bg-purple-700' },
    { id: 4, label: 'إرسال رسالة', icon: Mail, color: 'bg-orange-600 hover:bg-orange-700' }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">إجراءات سريعة</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className={`${action.color} text-white p-4 rounded-lg transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          );
        })}
      </div>

      {openForm === 'student' && <AddStudentForm onClose={() => setOpenForm(null)} />}
      {openForm === 'teacher' && <AddTeacherForm onClose={() => setOpenForm(null)} />}
    </div>
  );
};

export default QuickActions;
