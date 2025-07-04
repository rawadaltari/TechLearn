import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    // تحقق إذا كان المستخدم هو المدير
    if (
      formData.username === 'admin@eduplatform.com' &&
      formData.password === 'Admin@123'
    ) {
      // حفظ بيانات المدير في التخزين المحلي إذا أردت
      localStorage.setItem(
        'user',
        JSON.stringify({ role: 'admin', email: formData.username })
      );
      
      navigate('/Admin'); // غير المسار حسب اسم واجهة المدير لديك
      setLoading(false);
      return;
    }
  
    // تسجيل الدخول للمستخدمين العاديين
    const success = await login(formData.username, formData.password);
  
    if (success) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('User role:', user.role);
  
        if (user.role === 'teacher') {
          navigate('/Tech');
        } else if (user.role === 'student') {
          navigate('/');
        } else {
          setError('الدور غير معروف. الرجاء التواصل مع الدعم.');
        }
      } else {
        setError('حدث خطأ أثناء استرجاع بيانات المستخدم.');
      }
    } else {
      setError('فشل تسجيل الدخول. تأكد من صحة اسم المستخدم وكلمة المرور.');
    }
  
    setLoading(false);
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t.login}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t.loginPage.description}
          </p>
        </div>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {t.loginPage.email}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={t.loginPage.emailPlaceholder}
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t.loginPage.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={t.loginPage.passwordPlaceholder}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className={`${isRTL ? 'mr-2' : 'ml-2'} block text-sm text-gray-900`}>
                {t.loginPage.rememberMe}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                {t.loginPage.forgotPassword}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              {loading ? '...جارٍ الدخول' : t.loginPage.signIn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
