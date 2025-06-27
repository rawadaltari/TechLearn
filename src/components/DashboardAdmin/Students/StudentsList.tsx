import { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Eye, Plus } from 'lucide-react';
import StudentModal from '../Modals/StudentModal';
import ConfirmModal from '../Modals/ConfirmModal';
import axios from 'axios';

type StudentFromAPI = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dateOfBirth: string;
  isActive: boolean;
  createdAt: string;
  specialties: {
    id: number;
    specialtyId: number;
    specialtyName: string;
    isActive: boolean;
    enrollmentDate: string;
  }[];
};

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<StudentFromAPI[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentFromAPI | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [studentToDelete, setStudentToDelete] = useState<StudentFromAPI | undefined>();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://raghadsvu-001-site1.jtempurl.com/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = () => {
    setSelectedStudent(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleViewStudent = (student: StudentFromAPI) => {
    setSelectedStudent(student);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: StudentFromAPI) => {
    setSelectedStudent(student);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (student: StudentFromAPI) => {
    setStudentToDelete(student);
    setIsConfirmOpen(true);
  };

  const handleSaveStudent = async (student: any) => {
    console.log("Editing student with ID:", student.id);
    try {
      const payload = {
        username: student.username,
        email: student.email,
        password: student.password,
        confirmPassword: student.confirmPassword,
        firstName: student.firstName,
        lastName: student.lastName,
        mobileNumber: student.mobileNumber,
        dateOfBirth: student.dateOfBirth,
        address: student.address,
        specialtyIds: student.specialtyIds,
      };
  
      if (modalMode === 'add') {
        await axios.post('https://raghadsvu-001-site1.jtempurl.com/api/students', payload);
      } else {
        await axios.put(`https://raghadsvu-001-site1.jtempurl.com/api/students/${student.id}`, payload);
        
      }
  
      setIsModalOpen(false);
      fetchStudents();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;
        let errorMessage = 'حدث خطأ أثناء حفظ الطالب.';
  
        // إذا كانت الرسالة موجودة ضمن الاستجابة
        if (typeof apiError === 'string') {
          errorMessage = apiError;
        } else if (apiError?.message) {
          errorMessage = apiError.message;
        } else if (apiError?.errors) {
          // استخراج الأخطاء المفصلة إذا كانت موجودة
          const errors = Object.values(apiError.errors).flat().join('\n');
          errorMessage = `أخطاء في الحقول:\n${errors}`;
        }
  
        alert(errorMessage);
      } else {
        alert('حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.');
      }
  
      console.error('تفاصيل الخطأ:', error);
    }
  };
  

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        await axios.delete(`https://raghadsvu-001-site1.jtempurl.com/api/students/${studentToDelete.id}`);
        setStudentToDelete(undefined);
        setIsConfirmOpen(false);
        fetchStudents();
      } catch (error) {
        console.error('Failed to delete student:', error);
      }
    }
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) || student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || (filterStatus === 'active' ? student.isActive : !student.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button onClick={handleAddStudent} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 rtl:space-x-reverse">
            <Plus className="w-4 h-4" />
            <span>إضافة طالب جديد</span>
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="w-4 h-4" />
            <span>تصفية</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">قائمة الطلاب ({filteredStudents.length})</h2>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="البحث عن طالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-right"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none text-right"
          >
            <option value="all">جميع الطلاب</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الطالب</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">رقم الهاتف</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الدورات</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">تاريخ الانضمام</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {(student.firstName || '').charAt(0)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">{student.mobileNumber}</td>
                  <td className="px-6 py-4 text-right">{student.specialties.length} دورات</td>
                  <td className="px-6 py-4 text-right">
                    {new Date(student.createdAt).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${student.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {student.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button onClick={() => handleViewStudent(student)} className="text-blue-600 hover:text-blue-900 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditStudent(student)} className="text-green-600 hover:text-green-900 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteStudent(student)} className="text-red-600 hover:text-red-900 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
              {/* Pagination */}
      {filteredStudents.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700">
            عرض 1-{filteredStudents.length} من إجمالي {students.length} طالب
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
              السابق
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
              التالي
            </button>
          </div>
        </div>
      )}
      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border">
          <div className="text-gray-500 mb-4">
            {searchTerm || filterStatus !== 'all'
              ? 'لا توجد نتائج مطابقة للبحث'
              : 'لا يوجد طلاب مسجلين'}
          </div>
          {!searchTerm && filterStatus === 'all' && (
            <button onClick={handleAddStudent} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              إضافة أول طالب
            </button>
          )}
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من حذف الطالب "${studentToDelete?.firstName} ${studentToDelete?.lastName}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        cancelText="إلغاء"
        type="danger"
      />

      {/* Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStudent}
        student={selectedStudent}
        mode={modalMode}
      />
    </div>
  );
};

export default StudentsList;
