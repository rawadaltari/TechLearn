import React, { useState } from 'react';
import axios from 'axios';

const AddTeacherForm: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/Teachers', form);
      setSuccess('✅ تم إضافة المعلم بنجاح');
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        mobileNumber: ''
      });
    } catch (err: any) {
      setError('❌ حدث خطأ أثناء إرسال البيانات. تحقق من الحقول.');
      console.error('Add Teacher Error:', err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">إضافة معلم جديد</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="الاسم الأول"
            className="input"
            required
          />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="الاسم الأخير"
            className="input"
            required
          />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="اسم المستخدم"
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            className="input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="تأكيد كلمة المرور"
            className="input"
            required
          />
          <input
            type="text"
            name="mobileNumber"
            value={form.mobileNumber}
            onChange={handleChange}
            placeholder="رقم الجوال"
            className="input"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          إضافة المعلم
        </button>

        {success && <p className="text-green-600 font-semibold text-center mt-2">{success}</p>}
        {error && <p className="text-red-600 font-semibold text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default AddTeacherForm;
