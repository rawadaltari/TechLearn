import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Teacher } from '../../../types'; 

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: any) => void;  
  course?: any;                   
  mode: 'add' | 'edit' | 'view';
  teachers: Teacher[];
}

const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, onSave, course, mode, teachers }) => {
  const [formData, setFormData] = useState({
    name: '',
    subjectId: 0,
    teacherId: '',
    startDate: new Date().toISOString().slice(0,10),
    endDate: new Date().toISOString().slice(0,10),
    sessionCount: 0,
    cost: 0,
    status: 'Pending',
    isActive: true
  });

  useEffect(() => {
    if (course && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: course.name,
        subjectId: course.subjectId,
        teacherId: course.teacherId,
        startDate: course.startDate.slice(0,10),
        endDate: course.endDate.slice(0,10),
        sessionCount: course.sessionCount,
        cost: course.cost,
        status: course.status || 'Pending',
        isActive: course.isActive ?? true
      });
    } else if (mode === 'add') {
      setFormData({
        name: '',
        subjectId: 0,
        teacherId: '',
        startDate: new Date().toISOString().slice(0,10),
        endDate: new Date().toISOString().slice(0,10),
        sessionCount: 0,
        cost: 0,
        status: 'Pending',
        isActive: true
      });
    }
  }, [course, mode, isOpen]);

  if (!isOpen) return null;
  const isReadOnly = mode === 'view';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['subjectId', 'sessionCount', 'cost'].includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;

    // بناء جسم الطلب حسب mode
    const payload = {
      name: formData.name,
      subjectId: formData.subjectId,
      teacherId: formData.teacherId,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      sessionCount: formData.sessionCount,
      cost: formData.cost,
      ...(mode === 'edit' ? { id: course.id, status: formData.status, isActive: formData.isActive } : {})
    };

    try {
      if (mode === 'add') {
        const res = await fetch('https://raghadsvu-001-site1.jtempurl.com/api/Courses/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to add course');
      } else if (mode === 'edit') {
        const res = await fetch('https://raghadsvu-001-site1.jtempurl.com/api/Courses/update', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to update course');
      }
      onSave(payload);
      onClose();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{mode === 'add' ? 'إضافة دورة' : mode === 'edit' ? 'تعديل دورة' : 'عرض دورة'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-right">اسم الدورة *</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className="w-full p-2 border rounded text-right"
              placeholder="اسم الدورة"
            />
          </div>

          <div>
            <label className="block mb-1 text-right">المادة *</label>
            <input
              name="subjectId"
              type="number"
              value={formData.subjectId}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className="w-full p-2 border rounded text-right"
              placeholder="رقم المادة"
            />
          </div>

          <div>
            <label className="block mb-1 text-right">المدرس (معرف) *</label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              required
              disabled={isReadOnly}
              className="w-full p-2 border rounded text-right"
            >
              <option value="">اختر مدرس</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-right">تاريخ البداية *</label>
              <input
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
                className="w-full p-2 border rounded text-right"
              />
            </div>
            <div>
              <label className="block mb-1 text-right">تاريخ النهاية *</label>
              <input
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
                className="w-full p-2 border rounded text-right"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-right">عدد الجلسات *</label>
            <input
              name="sessionCount"
              type="number"
              min={0}
              value={formData.sessionCount}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className="w-full p-2 border rounded text-right"
            />
          </div>

          <div>
            <label className="block mb-1 text-right">التكلفة *</label>
            <input
              name="cost"
              type="number"
              min={0}
              value={formData.cost}
              onChange={handleChange}
              required
              readOnly={isReadOnly}
              className="w-full p-2 border rounded text-right"
            />
          </div>

          {mode === 'edit' && (
            <>
              <div>
                <label className="block mb-1 text-right">الحالة</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-right"
                  disabled={isReadOnly}
                >
                  <option value="Pending">قيد الانتظار</option>
                  <option value="Active">نشط</option>
                  <option value="Completed">مكتمل</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={e => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  disabled={isReadOnly}
                  id="isActive"
                />
                <label htmlFor="isActive" className="text-right">نشط</label>
              </div>
            </>
          )}

          {!isReadOnly && (
            <div className="flex justify-start space-x-4 rtl:space-x-reverse mt-4">
              <button type="button" onClick={onClose} className="px-6 py-2 border rounded hover:bg-gray-100">إلغاء</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {mode === 'add' ? 'إضافة' : 'حفظ'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CourseModal;
