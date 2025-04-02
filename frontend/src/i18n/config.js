import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './translations/en';
import hnTranslation from "./translations/hn"
import tgTranslation from './translations/tg'

const resources = {
  en: {
    translation: enTranslations
  },
  hn: {
    translation: hnTranslation
  },
  tg: {
    translation: tgTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;