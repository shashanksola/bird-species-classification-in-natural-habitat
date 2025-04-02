import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get current language label
  const getCurrentLanguageLabel = () => {
    switch (i18n.language) {
      case 'en': return 'English';
      case 'hn': return 'Hindi';
      case 'tg': return 'Telugu';
      default: return 'English';
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-transparent text-sm font-medium text-white-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getCurrentLanguageLabel()}
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => changeLanguage('en')}
              role="menuitem"
            >
              English
            </button>
            <button
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => changeLanguage('hn')}
              role="menuitem"
            >
              Hindi
            </button>
            <button
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => changeLanguage('tg')}
              role="menuitem"
            >
              Telugu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;