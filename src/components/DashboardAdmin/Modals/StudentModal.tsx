import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: any) => void;
  student?: any;
  mode: 'add' | 'edit' | 'view';
};

const StudentModal: React.FC<Props> = ({ isOpen, onClose, onSave, student, mode }) => {
  const [form, setForm] = useState({
    id: undefined as string | undefined,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    dateOfBirth: '',
    address: '',
    specialtyIds: [] as number[],
  });

  useEffect(() => {
    if (student && mode !== 'add') {
      setForm({
        id: student.id,
        username: student.username || '',
        email: student.email || '',
        password: '',
        confirmPassword: '',
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        mobileNumber: student.mobileNumber || '',
        dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : '',
        address: student.address || '',
        specialtyIds: student.specialties?.map((s: any) => s.specialtyId) || [],
      });
    } else {
      setForm({
        id: undefined,
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
    }
  }, [student, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'specialtyIds' ? value.split(',').map(Number) : value,
    }));
  };

  const handleSubmit = () => {
    if (mode !== 'view') {
      onSave(form);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/50">
        <Dialog.Panel className="bg-white p-6 rounded-xl w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold">
              {mode === 'add' ? 'إضافة طالب' : mode === 'edit' ? 'تعديل طالب' : 'عرض الطالب'}
            </Dialog.Title>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-right">
            <input
              name="username"
              placeholder="اسم المستخدم"
              value={form.username}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="password"
              type="password"
              placeholder="كلمة المرور"
              value={form.password}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="تأكيد كلمة المرور"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="firstName"
              placeholder="الاسم الأول"
              value={form.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="lastName"
              placeholder="الاسم الأخير"
              value={form.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="mobileNumber"
              placeholder="رقم الجوال"
              value={form.mobileNumber}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="dateOfBirth"
              type="date"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="border p-2 rounded"
              disabled={mode === 'view'}
            />
            <input
              name="address"
              placeholder="العنوان"
              value={form.address}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
              disabled={mode === 'view'}
            />
            <input
              name="specialtyIds"
              placeholder="أرقام التخصصات مفصولة بفاصلة"
              value={form.specialtyIds.join(',')}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
              disabled={mode === 'view'}
            />
          </div>

          {mode !== 'view' && (
            <div className="mt-6 text-left">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                حفظ
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StudentModal;
