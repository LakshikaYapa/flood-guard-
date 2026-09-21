import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, setLang } = useContext(LanguageContext);

  return (
    <div className="flex justify-center gap-2 text-xs mb-3">
      <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-blue-400 font-semibold' : 'text-slate-500'}>
        English
      </button>
      <span className="text-slate-700">|</span>
      <button onClick={() => setLang('si')} className={lang === 'si' ? 'text-blue-400 font-semibold' : 'text-slate-500'}>
        සිංහල
      </button>
    </div>
  );
};

export default LanguageSwitcher;