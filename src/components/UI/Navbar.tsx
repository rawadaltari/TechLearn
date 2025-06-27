import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo/22.png";
import translations from "../../data/translations";

const Navbar: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const t = translations[language];
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const handleLogout = () => {
    logout(); // يحذف المستخدم وlocalStorage
    navigate('/login'); // يعيد التوجيه لصفحة تسجيل الدخول
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Main Links */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-10" src={logo} alt="Techlearn" />
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/courses" className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.discover}</Link>
                <Link to="/programs" className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.programs}</Link>
                <Link to="/about" className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.about}</Link>
                <Link to="/Tech" className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.Tech}</Link>
                <Link to="/AiChatBot" className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.AiChatBot}</Link>
                <Link to="/Admin" className="text-gray-700 hover:text-teal-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t.Admin}</Link>
              </div>
            </div>
          </div>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="relative mx-4">
              <input
                type="text"
                placeholder={t.search}
                className={`py-2 px-8 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"}`}
              />
              <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? "right-3" : "left-3"}`}>
                <Search size={18} className="text-gray-400" />
              </div>
            </div>

            <button onClick={toggleLanguage} className="whitespace-nowrap text-gray-500 hover:text-gray-900 mx-4">
              {language === "ar" ? "En" : "العربية"}
            </button>

            {user ? (
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span>👤 {user.firstName}</span>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                  🚪 {t.logout || "تسجيل الخروج"}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="whitespace-nowrap text-gray-700 hover:text-gray-900 mx-2">
                  {t.login}
                </Link>
                <Link to="/register" className="whitespace-nowrap bg-teal-500 hover:bg-teal-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                  {t.register}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="space-y-1">
            <Link to="/courses" className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t.discover}</Link>
            <Link to="/programs" className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t.programs}</Link>
            <Link to="/about" className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t.about}</Link>
            <Link to="/Tech" className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t.Tech}</Link>
            <Link to="/AiChatBot" className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">{t.AiChatBot}</Link>
          </div>

          <div className="border-t border-gray-200 mt-3 pt-3 space-y-2">
            <button onClick={toggleLanguage} className="block w-full text-left text-gray-500 hover:text-gray-900">
              {language === "ar" ? "English" : "العربية"}
            </button>

            {user ? (
              <div className="flex flex-col space-y-2 text-sm text-gray-700">
                <span>👤 {user.firstName}</span>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                  🚪 {t.logout || "تسجيل الخروج"}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-gray-900">{t.login}</Link>
                <Link to="/register" className="block text-gray-700 hover:text-gray-900">{t.register}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
