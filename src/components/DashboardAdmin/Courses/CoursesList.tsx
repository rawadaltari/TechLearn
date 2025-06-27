import React, { useState } from 'react';
import { Search, Filter, Play, Users, Clock, Star, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { useData } from '../../../contexts/DataContext';
import CourseModal from '../Modals/CourseModal';
import ConfirmModal from '../Modals/ConfirmModal';
import { Course } from '../../../types';

const CoursesList: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [courseToDelete, setCourseToDelete] = useState<Course | undefined>();

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddCourse = () => {
    setSelectedCourse(undefined);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setCourseToDelete(course);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete.id);
      setCourseToDelete(undefined);
    }
  };

  const handleSaveCourse = (courseData: Omit<Course, 'id'> | Course) => {
    if (modalMode === 'add') {
      addCourse(courseData as Omit<Course, 'id'>);
    } else if (modalMode === 'edit' && 'id' in courseData) {
      updateCourse(courseData.id, courseData);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'منشور';
      case 'draft':
        return 'مسودة';
      case 'archived':
        return 'مؤرشف';
      default:
        return status;
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'مبتدئ';
      case 'intermediate':
        return 'متوسط';
      case 'advanced':
        return 'متقدم';
      default:
        return level;
    }
  };

  const categories = [...new Set(courses.map(course => course.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button 
            onClick={handleAddCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 rtl:space-x-reverse"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة دورة جديدة</span>
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 rtl:space-x-reverse">
            <Filter className="w-4 h-4" />
            <span>تصفية</span>
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">إدارة الدورات ({filteredCourses.length})</h2>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="البحث عن دورة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          >
            <option value="all">جميع الفئات</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          >
            <option value="all">جميع الحالات</option>
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
            <option value="archived">مؤرشف</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden">
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                  {getStatusText(course.status)}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                  {getLevelText(course.level)}
                </span>
              </div>
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={() => handleViewCourse(course)}
                  className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-100 transition-all"
                >
                  <Play className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600">{course.rating}</span>
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 text-right line-clamp-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3 text-right line-clamp-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <Users className="w-4 h-4" />
                  <span>{course.students} طالب</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">المدرب</p>
                  <p className="text-sm font-medium text-gray-900">{course.instructor}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500">السعر</p>
                  <p className="text-lg font-bold text-blue-600">{course.price} ج.م</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button 
                      onClick={() => handleViewCourse(course)}
                      className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      title="عرض التفاصيل"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditCourse(course)}
                      className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      title="تعديل"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course)}
                      className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(course.createdDate).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="text-gray-500 mb-4">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
              ? 'لا توجد نتائج مطابقة للبحث' 
              : 'لا توجد دورات متاحة'}
          </div>
          {!searchTerm && filterCategory === 'all' && filterStatus === 'all' && (
            <button 
              onClick={handleAddCourse}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إضافة أول دورة
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredCourses.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <div className="text-sm text-gray-700">
            عرض 1-{filteredCourses.length} من إجمالي {courses.length} دورة
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

      {/* Modals */}
      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
        course={selectedCourse}
        mode={modalMode}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="تأكيد الحذف"
        message={`هل أنت متأكد من حذف الدورة "${courseToDelete?.title}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        cancelText="إلغاء"
        type="danger"
      />
    </div>
  );
};

export default CoursesList;