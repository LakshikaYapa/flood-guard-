import { createContext, useState } from 'react';

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'en');

  const setLang = (value) => {
    localStorage.setItem('lang', value);
    setLangState(value);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};