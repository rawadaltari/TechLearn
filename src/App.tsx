import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Hero from "./components/UI/Hero";
import LearningJourney from "./components/ExtractCourses/LearningJourney";
import Footer from "./components/UI/Footer.tsx";
import { LanguageProvider } from "./contexts/LanguageContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import { TeacherDashboard } from "./dashboard/TeacherDashboard";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Loader from "./compon/Loader/Loader.tsx";
import { useEffect, useState } from "react";
import CourseShowcase from "./components/ExtractCourses/CourseShowcase.tsx";
import LanguageToggle from "./components/ExtractCourses/LanguageToggle.tsx";
import CourseCatalog from "./pages/CourseCatalog.tsx";
import ChatBot from "./components/ChatBot/ChatBot.tsx";
import UI from "./components/recommendation system/UI.tsx";
import Admin from "./dashboard/Admin.tsx";


function App() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 ثواني

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // عرض الـ Loader إذا كانت حالة التحميل true
  }
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />

            <Routes>
              <Route
                path="/"
                element={
                  <main>
                    <Hero />
                    <UI/>
                    <LearningJourney />
                  </main>
                }
              />

              <Route
                path="/courses"
                element={
                  <div className="min-h-screen bg-red-600">
                    <LanguageToggle
                      language={language}
                      onLanguageChange={setLanguage}
                    />
                    <CourseShowcase language={language} />
                  </div>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/About" element={<About />} />
              <Route path="/Tech" element={<TeacherDashboard />} />
              <Route path="/programs" element={<CourseCatalog />} />
              <Route path="/AiChatBot" element={<ChatBot />} />
              <Route path="/Admin" element={<Admin/>} />
              
            </Routes>

            <Footer />
            
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
