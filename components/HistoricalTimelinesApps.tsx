import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ukMonarchsImg from '../src/assets/images/uk_monarchs_emblem_1791304873815.jpg';
import ukPmsImg from '../src/assets/images/uk_pms_emblem_1791304887438.jpg';
import frenchRulersImg from '../src/assets/images/french_rulers_emblem_1791304901311.jpg';
import usPresidentsImg from '../src/assets/images/us_presidents_emblem_1791304921371.jpg';

export const AppStoreIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="22" fill="#0D84FD" />
    <g fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 20 L24 76" />
      <path d="M50 20 L76 76" />
      <path d="M30 62 L70 62" />
    </g>
  </svg>
);

export const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#00C3FF" d="M38.8 4.6c-4.4 4.7-7.1 11.8-7.1 20.7v461.4c0 8.9 2.7 16 7.1 20.7l2.5 2.4 257.6-257.6v-6L41.3 2.2l-2.5 2.4z" />
    <path fill="#00E676" d="M384.4 340.5l-85.5-85.5v-6l85.5-85.5 1.9 1.1 101.4 57.6c28.9 16.4 28.9 43.3 0 59.8l-101.4 57.6-1.9 0.9z" />
    <path fill="#EA4335" d="M298.9 249l-260.1 260.1c8.4 8.9 22.4 10 37.9 1.2l222.2-126.3-85.5-85.5 85.5-49.5z" />
    <path fill="#FBBC04" d="M298.9 255l85.5-49.5-222.2-126.3c-15.5-8.8-29.5-7.7-37.9 1.2L298.9 255z" />
  </svg>
);

interface TimelineApp {
  id: string;
  nameKey: 'inst.ukMonarchs' | 'inst.ukPms' | 'inst.frenchRulers' | 'inst.usPresidents';
  defaultName: string;
  image: string;
  appleSlug: string;
  appleId: string;
  playStoreUrl: string;
}

const TIMELINE_APPS: TimelineApp[] = [
  {
    id: 'uk-monarchs',
    nameKey: 'inst.ukMonarchs',
    defaultName: 'UK Monarchs',
    image: ukMonarchsImg,
    appleSlug: 'uk-monarchs-timeline',
    appleId: '6760196085',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=app.ukmonarchtimeline',
  },
  {
    id: 'uk-pms',
    nameKey: 'inst.ukPms',
    defaultName: 'UK PMs',
    image: ukPmsImg,
    appleSlug: 'uk-prime-ministers-timeline',
    appleId: '6761317024',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=app.ukpms',
  },
  {
    id: 'french-rulers',
    nameKey: 'inst.frenchRulers',
    defaultName: 'French Rulers',
    image: frenchRulersImg,
    appleSlug: 'french-rulers-timeline',
    appleId: '6761076227',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=app.frrulers',
  },
  {
    id: 'us-presidents',
    nameKey: 'inst.usPresidents',
    defaultName: 'US Presidents',
    image: usPresidentsImg,
    appleSlug: 'us-presidents-timeline',
    appleId: '6761148914',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=app.uspresidents',
  },
];

const HistoricalTimelinesApps: React.FC = () => {
  const { t, language } = useLanguage();

  // Smart storefront resolution to prevent "App Not Available in your country or region"
  // Default to 'gb' for UK Prime Ministers app; syncs with user override or language
  const [userRegionOverride, setUserRegionOverride] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('ukpm_appstore_country');
      } catch {
        // ignore
      }
    }
    return null;
  });

  const storeRegion = useMemo(() => {
    if (userRegionOverride) return userRegionOverride;
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      try {
        const locales = navigator.languages || [navigator.language];
        for (const loc of locales) {
          if (loc && loc.includes('-')) {
            const country = loc.split('-')[1]?.toLowerCase();
            if (country && country.length === 2) return country;
          }
        }
      } catch {
        // ignore
      }
    }
    if (language === 'fr') return 'fr';
    if (language === 'ja') return 'jp';
    if (language === 'es') return 'es';
    return 'gb';
  }, [userRegionOverride, language]);

  const handleSelectRegion = (region: string) => {
    setUserRegionOverride(region);
    try {
      localStorage.setItem('ukpm_appstore_country', region);
    } catch {
      // ignore
    }
  };

  const getAppleUrl = (app: TimelineApp) => {
    return `https://apps.apple.com/${storeRegion}/app/${app.appleSlug}/id${app.appleId}`;
  };

  const getDeveloperAppleUrl = () => {
    return `https://apps.apple.com/${storeRegion}/developer/philippe-shoosmith/id1850530456`;
  };

  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

  return (
    <section className="pt-4 border-t border-slate-700/80">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 tracking-tight">
            {t('inst.timelinesTitle') || 'Historical Timelines Apps'}
          </h3>
          <p className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-sky-200/90 font-medium mt-1.5 flex-wrap">
            <span>{t('inst.timelinesSubtitle') || 'Download from Apple Store or Google Store'}</span>
            <a
              href={getDeveloperAppleUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 hover:border-sky-400 hover:bg-slate-750 transition-all text-slate-300 hover:text-white"
              title={`View all apps on Apple App Store (${storeRegion.toUpperCase()})`}
            >
              <AppStoreIcon className="w-3.5 h-3.5 inline-block" />
              <span className="text-[11px]">Apple</span>
            </a>
            <span className="text-slate-500">or</span>
            <a
              href="https://play.google.com/store/apps/developer?id=Philippe+Shoosmith"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 hover:border-emerald-400 hover:bg-slate-750 transition-all text-slate-300 hover:text-white"
              title="View all apps on Google Play Store"
            >
              <GooglePlayIcon className="w-3.5 h-3.5 inline-block" />
              <span className="text-[11px]">Google</span>
            </a>
          </p>

          {/* Storefront Region Switcher to guarantee direct store match without region errors */}
          <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <span>Store:</span>
            <button
              type="button"
              onClick={() => handleSelectRegion('gb')}
              className={`px-1.5 py-0.5 rounded transition-all ${storeRegion === 'gb' ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/50' : 'hover:text-slate-200 text-slate-400'}`}
              title="United Kingdom App Store"
            >
              🇬🇧 UK
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleSelectRegion('us')}
              className={`px-1.5 py-0.5 rounded transition-all ${storeRegion === 'us' ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/50' : 'hover:text-slate-200 text-slate-400'}`}
              title="United States App Store"
            >
              🇺🇸 US
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleSelectRegion('fr')}
              className={`px-1.5 py-0.5 rounded transition-all ${storeRegion === 'fr' ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/50' : 'hover:text-slate-200 text-slate-400'}`}
              title="France App Store"
            >
              🇫🇷 FR
            </button>
          </div>
        </div>

        {/* 2x2 Grid of Apps matching Timelines Links.pdf */}
        <div className="grid grid-cols-2 gap-y-7 gap-x-4 sm:gap-x-8 max-w-md sm:max-w-lg mx-auto">
          {TIMELINE_APPS.map((app) => {
            const appleLink = getAppleUrl(app);
            return (
              <div key={app.id} className="flex flex-col items-center text-center group">
                {/* Circular Emblem Medallion - Clickable */}
                <a
                  href={isAndroid ? app.playStoreUrl : appleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex flex-col items-center cursor-pointer group/card focus:outline-none"
                  title={`Download ${app.defaultName} (${isAndroid ? 'Google Play' : `Apple App Store ${storeRegion.toUpperCase()}`})`}
                >
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-amber-400/90 shadow-[0_4px_20px_rgba(245,158,11,0.3)] bg-amber-950/20 transform group-hover/card:scale-105 transition-all duration-300">
                    <img
                      src={app.image}
                      alt={t(app.nameKey) || app.defaultName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Green Ribbon Banner */}
                  <div className="-mt-3.5 z-10">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-emerald-600 to-green-600 border border-emerald-300/80 text-white font-extrabold text-[11px] sm:text-xs rounded-full shadow-lg uppercase tracking-wider whitespace-nowrap group-hover/card:brightness-110 transition-all">
                      {t(app.nameKey) || app.defaultName}
                    </span>
                  </div>
                </a>

                {/* Action Buttons: App Store <- Click -> Google Play */}
                <div className="flex items-center justify-center gap-2 mt-2.5">
                  <a
                    href={appleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-400 text-slate-200 transition-all hover:scale-115 active:scale-95 shadow-md flex items-center justify-center"
                    title={`Download ${app.defaultName} on Apple App Store (${storeRegion.toUpperCase()})`}
                    aria-label={`Download ${app.defaultName} on Apple App Store`}
                  >
                    <AppStoreIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>

                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 select-none tracking-tight whitespace-nowrap px-0.5">
                    &larr; {t('inst.click') || 'Click'} &rarr;
                  </span>

                  <a
                    href={app.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 sm:p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600/30 border border-slate-700 hover:border-emerald-400 text-slate-200 transition-all hover:scale-115 active:scale-95 shadow-md flex items-center justify-center"
                    title={`Download ${app.defaultName} on Google Play Store`}
                    aria-label={`Download ${app.defaultName} on Google Play Store`}
                  >
                    <GooglePlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistoricalTimelinesApps;
