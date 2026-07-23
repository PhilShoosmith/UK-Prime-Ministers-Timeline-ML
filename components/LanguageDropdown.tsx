import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clipPath="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
    </g>
  </svg>
);

const FranceFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <rect width="3" height="2" fill="#ED2939"/>
    <rect width="2" height="2" fill="#fff"/>
    <rect width="1" height="2" fill="#002395"/>
  </svg>
);

const JapanFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <rect width="900" height="600" fill="#fff"/>
    <circle cx="450" cy="300" r="180" fill="#bc002d"/>
  </svg>
);

const SpainFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <rect width="750" height="500" fill="#c60b1e"/>
    <rect width="750" height="250" y="125" fill="#ffc400"/>
  </svg>
);

const ChinaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <rect width="900" height="600" fill="#ee1c25"/>
    <path d="M150,150 l29,-89 l29,89 l-76,-55 h94 z" fill="#ff0"/>
    <path d="M300,60 l13,-24 l13,24 l-34,-15 h42 z" fill="#ff0" transform="rotate(23 300 60)"/>
    <path d="M360,120 l13,-24 l13,24 l-34,-15 h42 z" fill="#ff0" transform="rotate(46 360 120)"/>
    <path d="M360,210 l13,-24 l13,24 l-34,-15 h42 z" fill="#ff0" transform="rotate(70 360 210)"/>
    <path d="M300,270 l13,-24 l13,24 l-34,-15 h42 z" fill="#ff0" transform="rotate(93 300 270)"/>
  </svg>
);

const UAEFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <rect width="1200" height="600" fill="#00732f"/>
    <rect width="1200" height="200" y="200" fill="#fff"/>
    <rect width="1200" height="200" y="400" fill="#000"/>
    <rect width="300" height="600" fill="#ff0000"/>
  </svg>
);

const IndiaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="inline-block mr-2 rounded-sm object-cover h-4 w-6 shrink-0">
    <rect width="900" height="200" fill="#f93"/>
    <rect width="900" height="200" y="200" fill="#fff"/>
    <rect width="900" height="200" y="400" fill="#128807"/>
    <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="10"/>
    <circle cx="450" cy="300" r="16" fill="#000080"/>
    <g transform="translate(450,300)">
      {[...Array(24)].map((_, i) => (
        <path key={i} d="M0,0 L-4,-75 L4,-75 Z" fill="#000080" transform={`rotate(${i * 15})`}/>
      ))}
    </g>
  </svg>
);

const LanguageDropdown: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-36 bg-slate-800/80 backdrop-blur-md text-white rounded-lg px-3 py-2 text-sm font-medium border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg cursor-pointer hover:bg-slate-700 transition-colors"
      >
        <span className="flex items-center">
          {language === 'en' ? <><UKFlag /> English</> : language === 'fr' ? <><FranceFlag /> Français</> : language === 'ja' ? <><JapanFlag /> 日本語</> : language === 'es' ? <><SpainFlag /> Español</> : language === 'zh' ? <><ChinaFlag /> 中文</> : language === 'ar' ? <><UAEFlag /> العربية</> : <><IndiaFlag /> हिन्दी</>}
        </span>
        <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-36 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-hidden z-50">
          <button
            onClick={() => { setLanguage('en'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'en' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <UKFlag /> English
          </button>
          <button
            onClick={() => { setLanguage('zh'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'zh' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <ChinaFlag /> 中文
          </button>
          <button
            onClick={() => { setLanguage('hi'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'hi' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <IndiaFlag /> हिन्दी
          </button>
          <button
            onClick={() => { setLanguage('es'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'es' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <SpainFlag /> Español
          </button>
          <button
            onClick={() => { setLanguage('ar'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'ar' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <UAEFlag /> العربية
          </button>
          <button
            onClick={() => { setLanguage('fr'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'fr' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <FranceFlag /> Français
          </button>
          <button
            onClick={() => { setLanguage('ja'); setIsOpen(false); }}
            className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-slate-700 transition-colors ${language === 'ja' ? 'bg-slate-700/50 text-blue-400' : 'text-white'}`}
          >
            <JapanFlag /> 日本語
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
