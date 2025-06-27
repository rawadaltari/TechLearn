import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../data/translations';
import { Users, BookOpen, GraduationCap, Award, Globe2, Medal, Clock, Headphones } from 'lucide-react';

const About: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language].aboutPage;

  const stats = [
    { icon: Users, label: t.stats.students, value: t.stats.studentsCount },
    { icon: BookOpen, label: t.stats.courses, value: t.stats.coursesCount },
    { icon: GraduationCap, label: t.stats.instructors, value: t.stats.instructorsCount },
    { icon: Award, label: t.stats.certificates, value: t.stats.certificatesCount },
  ];

  const features = [
    { icon: Globe2, ...t.features.list[0] },
    { icon: Medal, ...t.features.list[1] },
    { icon: Clock, ...t.features.list[2] },
    { icon: Headphones, ...t.features.list[3] },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <motion.div 
        className="relative bg-teal-700 text-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-20"
            src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg"
            alt="Education background"
          />
          <div className="absolute inset-0 bg-teal-700 mix-blend-multiply" />
        </div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-4xl font-bold mb-4"
            variants={fadeInUp}
          >
            {t.title}
          </motion.h1>
          <motion.p 
            className="text-xl font-semibold text-teal-200"
            variants={fadeInUp}
          >
            {t.subtitle}
          </motion.p>
          <motion.p 
            className="mt-6 max-w-3xl mx-auto text-lg text-teal-100"
            variants={fadeInUp}
          >
            {t.description}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Vision & Mission */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div 
            className={`bg-gradient-to-br from-teal-50 to-white p-8 rounded-lg shadow-lg ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-teal-700 mb-4">{t.vision.title}</h2>
            <p className="text-gray-600">{t.vision.description}</p>
          </motion.div>
          
          <motion.div 
            className={`bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg shadow-lg ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-purple-700 mb-4">{t.mission.title}</h2>
            <p className="text-gray-600">{t.mission.description}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={fadeInUp}
              >
                <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
                  <stat.icon className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.features.title}
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                isRTL ? 'text-right' : 'text-left'
              }`}
              variants={fadeInUp}
            >
              <div className="inline-block p-3 bg-teal-50 rounded-full mb-4">
                <feature.icon className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;