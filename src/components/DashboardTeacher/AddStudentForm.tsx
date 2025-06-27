import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    dateOfBirth: '',
    address: '',
    specialtyIds: []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/students', formData);
      alert('تمت إضافة الطالب بنجاح');
      onClose();
    } catch (err) {
      console.error(err);
      alert('فشل في إضافة الطالب');
    }
  };

  return (
    <div className="modal fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-right mb-4">إضافة طالب جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" placeholder="اسم المستخدم" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          <input className="input" placeholder="البريد الإلكتروني" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <input className="input" type="password" placeholder="كلمة المرور" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          <input className="input" type="password" placeholder="تأكيد كلمة المرور" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
          <input className="input" placeholder="الاسم الأول" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
          <input className="input" placeholder="الاسم الأخير" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
          <input className="input" placeholder="رقم الهاتف" value={formData.mobileNumber} onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })} />
          <input className="input" type="date" placeholder="تاريخ الميلاد" value={formData.dateOfBirth} onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })} />
          <input className="input" placeholder="العنوان" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
          <button type="submit" className="btn bg-blue-600 text-white w-full py-2 rounded">إرسال</button>
          <button type="button" onClick={onClose} className="btn bg-gray-300 text-black w-full py-2 rounded">إغلاق</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
