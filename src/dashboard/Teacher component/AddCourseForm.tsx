import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCourseForm() {
  const [name, setName] = useState('');
  const [subjectId, setSubjectId] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sessionCount, setSessionCount] = useState(0);
  const [cost, setCost] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setError('🚫 لا يوجد توكن أو UserID. تأكد من تسجيل الدخول.');
      return;
    }

    const payload = {
      name,
      subjectId,
      teacherId: userId,
      startDate,
      endDate,
      sessionCount,
      cost,
    };

    try {
      const response = await axios.post(
        'https://raghadsvu-001-site1.jtempurl.com/api/Courses/add',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess('✅ تم بنجاح إضافة دورة جديدة');
      setError('');

      setTimeout(() => {
        navigate('/my-courses'); // غيّر المسار لو لزم الأمر
      }, 2000);
    } catch (err: any) {
      setError(JSON.stringify(err.response?.data || err));
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            إضافة دورة جديدة
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            الرجاء تعبئة بيانات الدورة بدقة
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم الدورة
            </label>
            <input
              type="text"
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم المادة
            </label>
            <input
              type="number"
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={subjectId}
              onChange={(e) => setSubjectId(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ بداية الدورة
            </label>
            <input
              type="datetime-local"
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ نهاية الدورة
            </label>
            <input
              type="datetime-local"
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عدد الجلسات
            </label>
            <input
              type="number"
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={sessionCount}
              onChange={(e) => setSessionCount(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              التكلفة
            </label>
            <input
              type="number"
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            إضافة الدورة
          </button>
        </form>
      </div>
    </div>
  );
}
