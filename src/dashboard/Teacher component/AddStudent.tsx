import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dateOfBirth: string;
  address: string;
  specialtyIds: number[];
}

interface Errors {
  [key: string]: string[] | undefined;
}

const AddStudent: React.FC<{ setActiveTab: (tab: string) => void }> = ({ setActiveTab }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    dateOfBirth: '',
    address: '',
    specialtyIds: [],
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fieldMap: { [key: string]: keyof FormData } = {
    username: 'username',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
    firstName: 'firstName',
    lastName: 'lastName',
    mobileNumber: 'mobileNumber',
    dateOfBirth: 'dateOfBirth',
    address: 'address',
    specialtyIds: 'specialtyIds',

    Username: 'username',
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirmPassword',
    FirstName: 'firstName',
    LastName: 'lastName',
    MobileNumber: 'mobileNumber',
    DateOfBirth: 'dateOfBirth',
    Address: 'address',
    SpecialtyIds: 'specialtyIds',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setLoading(true);

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        specialtyIds: formData.specialtyIds,
      };

      await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/students', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      setSuccessMessage('تم إضافة الطالب بنجاح');
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        dateOfBirth: '',
        address: '',
        specialtyIds: [],
      });
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const data = error.response.data;
        if (data.errors) {
          const apiErrors = data.errors;
          const normalizedErrors: Errors = {};
          const generalErrors: string[] = [];

          for (const apiField in apiErrors) {
            const formField = fieldMap[apiField] || apiField.toLowerCase();
            if (formField in formData) {
              normalizedErrors[formField] = apiErrors[apiField];
            } else {
              generalErrors.push(...apiErrors[apiField]);
            }
          }

          setErrors(normalizedErrors);
          if (generalErrors.length > 0) {
            setErrors(prev => ({
              ...prev,
              general: generalErrors,
            }));
          }
        } else {
          setErrors({ general: [data.title || 'خطأ في الطلب'] });
        }
      } else {
        alert('حدث خطأ غير متوقع، يرجى المحاولة لاحقًا.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">إضافة طالب جديد</h2>

      {successMessage && (
        <p className="bg-green-100 text-green-700 p-2 rounded mb-4">{successMessage}</p>
      )}

      {errors.general && errors.general.length > 0 && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {errors.general.map((errMsg, idx) => (
            <p key={idx}>{errMsg}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            اسم المستخدم
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أدخل اسم المستخدم"
          />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username[0]}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="example@example.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أدخل كلمة المرور"
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password[0]}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أعد إدخال كلمة المرور"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword[0]}</p>
          )}
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block font-medium mb-1">
            الاسم الأول
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أدخل الاسم الأول"
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName[0]}</p>}
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block font-medium mb-1">
            اسم العائلة
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أدخل اسم العائلة"
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName[0]}</p>}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block font-medium mb-1">
            رقم الجوال
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.mobileNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أدخل رقم الجوال"
          />
          {errors.mobileNumber && <p className="text-red-600 text-sm mt-1">{errors.mobileNumber[0]}</p>}
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block font-medium mb-1">
            تاريخ الميلاد
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth[0]}</p>}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-1">
            العنوان
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="أدخل العنوان"
          />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address[0]}</p>}
        </div>

        {/* Specialty Ids */}
        <div className="mb-4">
          <label htmlFor="specialtyIds" className="block font-medium mb-1">
            التخصصات (أدخل أرقام التخصصات مفصولة بفواصل)
          </label>
          <input
            type="text"
            id="specialtyIds"
            name="specialtyIds"
            value={formData.specialtyIds.join(',')}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                specialtyIds: e.target.value.split(',').map(id => Number(id.trim())).filter(id => !isNaN(id)),
              }))
            }
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.specialtyIds ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-teal-500'
            }`}
            placeholder="مثال: 1,2,3"
          />
          {errors.specialtyIds && <p className="text-red-600 text-sm mt-1">{errors.specialtyIds[0]}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 text-white font-semibold px-4 py-2 rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'جاري الإرسال...' : 'إضافة الطالب'}
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
