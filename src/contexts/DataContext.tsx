import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Student, Teacher, Course, DashboardStats } from '../types';

interface DataContextType {
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: number, student: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: number, teacher: Partial<Teacher>) => void;
  deleteTeacher: (id: number) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: number, course: Partial<Course>) => void;
  deleteCourse: (id: number) => void;
  getStats: () => DashboardStats;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'سارة أحمد محمد',
    email: 'sara.ahmed@example.com',
    phone: '01234567890',
    courses: 3,
    progress: 85,
    joinDate: '2024-01-15',
    status: 'active',
    address: 'القاهرة، مصر',
    birthDate: '1995-05-20'
  },
  {
    id: 2,
    name: 'محمد علي حسن',
    email: 'mohamed.ali@example.com',
    phone: '01234567891',
    courses: 5,
    progress: 92,
    joinDate: '2024-01-10',
    status: 'active',
    address: 'الإسكندرية، مصر',
    birthDate: '1993-08-15'
  },
  {
    id: 3,
    name: 'فاطمة خالد',
    email: 'fatima.khaled@example.com',
    phone: '01234567892',
    courses: 2,
    progress: 45,
    joinDate: '2024-01-20',
    status: 'inactive',
    address: 'الجيزة، مصر',
    birthDate: '1997-12-10'
  }
];

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: 'د. أحمد محمود',
    email: 'ahmed.mahmoud@example.com',
    phone: '01234567893',
    specialization: 'البرمجة وعلوم الحاسوب',
    courses: 8,
    students: 245,
    rating: 4.8,
    joinDate: '2023-06-15',
    status: 'active',
    bio: 'دكتور في علوم الحاسوب مع خبرة 10 سنوات في التدريس',
    experience: 10
  },
  {
    id: 2,
    name: 'أ. سارة عبدالله',
    email: 'sara.abdullah@example.com',
    phone: '01234567894',
    specialization: 'التصميم الجرافيكي',
    courses: 5,
    students: 189,
    rating: 4.9,
    joinDate: '2023-08-20',
    status: 'active',
    bio: 'مصممة جرافيك محترفة مع خبرة 8 سنوات',
    experience: 8
  }
];

const initialCourses: Course[] = [
  {
    id: 1,
    title: 'أساسيات البرمجة بـ JavaScript',
    instructor: 'د. أحمد محمود',
    instructorId: 1,
    category: 'البرمجة',
    students: 1245,
    duration: '8 ساعات',
    rating: 4.8,
    price: 299,
    status: 'published',
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg',
    description: 'تعلم أساسيات البرمجة باستخدام JavaScript من الصفر',
    createdDate: '2024-01-01',
    level: 'beginner'
  },
  {
    id: 2,
    title: 'تصميم واجهات المستخدم',
    instructor: 'أ. سارة عبدالله',
    instructorId: 2,
    category: 'التصميم',
    students: 856,
    duration: '12 ساعة',
    rating: 4.9,
    price: 399,
    status: 'published',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    description: 'تعلم تصميم واجهات المستخدم الحديثة والمتجاوبة',
    createdDate: '2024-01-05',
    level: 'intermediate'
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useLocalStorage<Student[]>('students', initialStudents);
  const [teachers, setTeachers] = useLocalStorage<Teacher[]>('teachers', initialTeachers);
  const [courses, setCourses] = useLocalStorage<Course[]>('courses', initialCourses);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Math.max(...students.map(s => s.id), 0) + 1,
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (id: number, studentData: Partial<Student>) => {
    setStudents(students.map(student => 
      student.id === id ? { ...student, ...studentData } : student
    ));
  };

  const deleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: Math.max(...teachers.map(t => t.id), 0) + 1,
    };
    setTeachers([...teachers, newTeacher]);
  };

  const updateTeacher = (id: number, teacherData: Partial<Teacher>) => {
    setTeachers(teachers.map(teacher => 
      teacher.id === id ? { ...teacher, ...teacherData } : teacher
    ));
  };

  const deleteTeacher = (id: number) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    // Update courses to remove deleted teacher
    setCourses(courses.map(course => 
      course.instructorId === id 
        ? { ...course, instructor: 'غير محدد', instructorId: 0 }
        : course
    ));
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: Math.max(...courses.map(c => c.id), 0) + 1,
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourse = (id: number, courseData: Partial<Course>) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, ...courseData } : course
    ));
  };

  const deleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const getStats = (): DashboardStats => {
    return {
      totalStudents: students.length,
      activeTeachers: teachers.filter(t => t.status === 'active').length,
      totalCourses: courses.length,
      certificatesIssued: Math.floor(students.reduce((acc, s) => acc + s.progress, 0) / 10)
    };
  };

  return (
    <DataContext.Provider value={{
      students,
      teachers,
      courses,
      addStudent,
      updateStudent,
      deleteStudent,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      addCourse,
      updateCourse,
      deleteCourse,
      getStats
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};