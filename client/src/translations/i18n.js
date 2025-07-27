import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './translations/en.json';
import hi from './translations/hi.json';
import te from './translations/te.json';
import mr from './translations/mr.json';
import ta from './translations/ta.json';
import gu from './translations/gu.json';
import bn from './translations/bn.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      te: { translation: te },
      mr: { translation: mr },
      ta: { translation: ta },
      gu: { translation: gu },
      bn: { translation: bn }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;