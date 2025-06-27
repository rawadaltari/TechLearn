import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations'
import HeroImg from '../../assets/img/21.jpg'
const Hero: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-y-0 w-full h-full">
        <div className="absolute h-full w-full bg-gradient-to-br from-teal-50 to-white opacity-90"></div>
        {/* Geometric shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className={`relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32 ${
          isRTL ? 'lg:mr-auto lg:ml-0' : 'lg:ml-auto lg:mr-0'
        }`}>
          <main className={`mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28`}>
            <div className={`sm:text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">{t.hero.title1}</span>
                <span className="block text-teal-600">{t.hero.title2}</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {t.hero.description}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10 transition-colors ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {t.hero.cta}
                    <Arrow className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5`} />
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className={`lg:absolute lg:inset-y-0 ${isRTL ? 'lg:left-0' : 'lg:right-0'} lg:w-1/2`}>
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={HeroImg}
          alt="Students learning"
        />
      </div>
    </div>
  );
};

export default Hero;