import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';  // استدعاء أيقونة الحذف
import TeacherModal from '../Modals/TeacherModal'; 
import { Teacher } from '../../../types'; 

const TeachersList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>(undefined);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('view');
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://raghadsvu-001-site1.jtempurl.com/api/Teachers');
      const data = response.data.map((t: any) => ({
        ...t,
        name: `${t.firstName} ${t.lastName}`,
        phone: t.mobileNumber,
        status: 'active',
        rating: 4.5,
        experience: 3,
        students: 100,
        courses: 5,
        specialization: 'علوم الحاسوب'
      }));
      setTeachers(data);
    } catch (error) {
      console.error('خطأ في جلب المدرسين:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleOpenModal = (mode: 'add' | 'edit' | 'view', teacher?: Teacher) => {
    setSelectedTeacher(teacher);
    setModalMode(mode);
    setModalOpen(true);
  };

  // دالة الحذف
  const handleDelete = async (teacherId: number) => {
    const confirmed = window.confirm('هل أنت متأكد من حذف هذا المدرس؟');
    if (!confirmed) return;

    try {
      await axios.delete(`https://raghadsvu-001-site1.jtempurl.com/api/Teachers/${teacherId}`, {
        headers: { accept: 'application/json' }
      });
      alert('تم حذف المدرس بنجاح');
      fetchTeachers(); // إعادة تحميل قائمة المعلمين
    } catch (error) {
      console.error('خطأ أثناء الحذف:', error);
      alert('حدث خطأ أثناء حذف المدرس');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 text-right">قائمة المدرسين ({teachers.length})</h2>
        <button
          onClick={() => handleOpenModal('add')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة مدرس
        </button>
      </div>

      {isLoading ? (
        <p className="text-center py-10">جاري التحميل...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-white">
                    {teacher.lastName?.charAt(0) || teacher.firstName?.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 text-right">
                  <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                  <p className="text-sm text-gray-500">{teacher.specialization}</p>
                  <p className="text-xs text-gray-400">{teacher.email}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>الدورات: {teacher.courses}</p>
                <p>الطلاب: {teacher.students}</p>
                <p>الخبرة: {teacher.experience} سنوات</p>
                <p>التقييم: {teacher.rating} / 5</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleOpenModal('view', teacher)}
                    className="p-2 rounded hover:bg-gray-100"
                    title="عرض"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleOpenModal('edit', teacher)}
                    className="p-2 rounded hover:bg-gray-100"
                    title="تعديل"
                  >
                    <Pencil className="w-4 h-4 text-green-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="p-2 rounded hover:bg-gray-100"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                  {teacher.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <TeacherModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={fetchTeachers}
        teacher={selectedTeacher}
        mode={modalMode}
      />
    </div>
  );
};

export default TeachersList;
