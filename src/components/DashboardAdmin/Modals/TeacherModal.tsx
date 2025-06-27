import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Teacher } from '../../../types';

interface TeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  teacher?: Teacher;
  mode: 'add' | 'edit' | 'view';
}

const TeacherModal: React.FC<TeacherModalProps> = ({ isOpen, onClose, onSave, teacher, mode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: ''
  });

  useEffect(() => {
    if (teacher && (mode === 'edit' || mode === 'view')) {
      const [firstName, ...lastNameArr] = teacher.name.split(' ');
      setFormData({
        username: teacher.email.split('@')[0] || '',
        email: teacher.email || '',
        password: '',
        confirmPassword: '',
        firstName: firstName || '',
        lastName: lastNameArr.join(' ') || '',
        mobileNumber: teacher.phone || ''
      });
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        mobileNumber: ''
      });
    }
  }, [teacher, mode, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;

    if (formData.password !== formData.confirmPassword) {
      alert('كلمة المرور وتأكيدها غير متطابقين');
      return;
    }

    const payload = {
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      mobileNumber: formData.mobileNumber.trim()
    };

    console.log('🚀 إرسال البيانات إلى API:', payload);

    try {
      if (mode === 'add') {
        const res = await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/Teachers', payload, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ تم إنشاء المدرس:', res.data);
      } else if (mode === 'edit' && teacher) {
        const res = await axios.put(`https://raghadsvu-001-site1.jtempurl.com/api/Teachers/${teacher.id}`, payload, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log('✅ تم تعديل المدرس:', res.data);
      }
      onSave();
      onClose();
    } catch (error: any) {
      console.error('❌ API Error:', error.response?.data || error);
      alert(error.response?.data?.message || 'حدث خطأ أثناء حفظ البيانات');
    }
  };

  if (!isOpen) return null;

  const isReadOnly = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'add' ? 'إضافة مدرس جديد' : mode === 'edit' ? 'تعديل بيانات المدرس' : 'عرض بيانات المدرس'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'username', label: 'اسم المستخدم' },
              { name: 'email', label: 'البريد الإلكتروني', type: 'email' },
              { name: 'password', label: 'كلمة المرور', type: 'password', condition: mode !== 'view' },
              { name: 'confirmPassword', label: 'تأكيد كلمة المرور', type: 'password', condition: mode !== 'view' },
              { name: 'firstName', label: 'الاسم الأول' },
              { name: 'lastName', label: 'اسم العائلة' },
              { name: 'mobileNumber', label: 'رقم الهاتف', type: 'tel' }
            ]
              .filter(field => field.condition !== false)
              .map(field => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">{field.label} *</label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    required={
                      (field.name === 'password' || field.name === 'confirmPassword')
                        ? mode === 'add' // مطلوب في الإضافة فقط
                        : true
                    }
                    readOnly={isReadOnly}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                    placeholder={field.label}
                  />
                </div>
              ))}
          </div>

          {!isReadOnly && (
            <div className="flex items-center justify-start space-x-4 rtl:space-x-reverse pt-4 border-t border-gray-200">
              <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                إلغاء
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                حفظ
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default TeacherModal;
