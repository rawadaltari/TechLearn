import React from 'react';
import { Lightbulb, GraduationCap, Search, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations';

const LearningJourney: React.FC = () => {
  const { language,  } = useLanguage();
  const t = translations[language];
  
  const steps = [
    {
      icon: <Search className="w-12 h-12 text-teal-500" />,
      title: t.journey.step1.title,
      description: t.journey.step1.description,
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-teal-500" />,
      title: t.journey.step2.title,
      description: t.journey.step2.description,
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-teal-500" />,
      title: t.journey.step3.title,
      description: t.journey.step3.description,
    },
    {
      icon: <Award className="w-12 h-12 text-teal-500" />,
      title: t.journey.step4.title,
      description: t.journey.step4.description,
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">{t.journey.subtitle}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t.journey.title}
          </p>
        </div>

        <div className="mt-10">
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-teal-100 z-0" />
            
            <div className="relative z-10">
              {steps.map((step, index) => (
                <div key={index} className={`md:flex ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} mb-8 md:mb-0`}>
                  <div className="md:w-1/2" />
                  <div className="flex items-center justify-center md:justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <div className="flex items-center justify-center w-20 h-20 bg-teal-50 rounded-full border-4 border-teal-200">
                      {step.icon}
                    </div>
                  </div>
                  <div className="md:w-1/2 pt-4 md:pt-0 md:px-8">
                    <div className={`p-4 bg-white rounded-lg shadow transition-all duration-300 transform hover:scale-105 ${
                      index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                    }`}>
                      <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningJourney;