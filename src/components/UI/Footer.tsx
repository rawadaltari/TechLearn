import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import translations from '../../data/translations';
import logo from '../../assets/logo/22.png'
const Footer: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img className="h-10" src={logo} alt="TechLearn" />
            <p className="mt-4 text-sm text-gray-400">
              {t.footer.description}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t.footer.programs}
            </h3>
            <ul className="mt-4 space-y-2">
              {t.footer.programLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-base text-gray-400 hover:text-teal-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t.footer.about}
            </h3>
            <ul className="mt-4 space-y-2">
              {t.footer.aboutLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-base text-gray-400 hover:text-teal-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
              {t.footer.contact}
            </h3>
            <div className="mt-4 space-y-2">
              <p className="text-base text-gray-400">
                <a href="mailto:info@TeachLearn.org" className="flex items-center hover:text-teal-500 transition-colors">
                  <Mail size={16} className="mr-2" />
                  info@teachlearn.org
                </a>
              </p>
              <p className="text-base text-gray-400">
                {t.footer.address}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} TechLearn. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;