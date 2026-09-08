import React, { useState, useMemo } from 'react';
import { PrimeMinister } from '../types';
import { pmCareerTrees, CareerNode } from '../data/pmCareerTrees';
import { 
  GraduationCap, 
  Briefcase, 
  Landmark, 
  Layers, 
  Scale, 
  Crown, 
  Globe, 
  X, 
  Calendar, 
  Building2, 
  Award,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CareerTreeModalProps {
  primeMinister: PrimeMinister | null;
  isOpen: boolean;
  onClose: () => void;
}

type FilterCategory = 'all' | 'education' | 'cabinet' | 'pm';

const categoryConfig: Record<CareerNode['category'], {
  label: string;
  badgeClass: string;
  borderClass: string;
  iconBg: string;
  icon: React.ReactNode;
}> = {
  education: {
    label: 'Education',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    borderClass: 'border-emerald-500/40 hover:border-emerald-400',
    iconBg: 'bg-emerald-600',
    icon: <GraduationCap className="w-4 h-4 text-white" />
  },
  early_career: {
    label: 'Early Career',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    borderClass: 'border-cyan-500/40 hover:border-cyan-400',
    iconBg: 'bg-cyan-600',
    icon: <Briefcase className="w-4 h-4 text-white" />
  },
  parliament: {
    label: 'Parliament',
    badgeClass: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    borderClass: 'border-blue-500/40 hover:border-blue-400',
    iconBg: 'bg-blue-600',
    icon: <Landmark className="w-4 h-4 text-white" />
  },
  junior_minister: {
    label: 'Junior Ministry',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    borderClass: 'border-amber-500/40 hover:border-amber-400',
    iconBg: 'bg-amber-600',
    icon: <Layers className="w-4 h-4 text-white" />
  },
  cabinet: {
    label: 'Cabinet',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    borderClass: 'border-purple-500/40 hover:border-purple-400',
    iconBg: 'bg-purple-600',
    icon: <Scale className="w-4 h-4 text-white" />
  },
  great_office: {
    label: 'Great Office of State',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-semibold',
    borderClass: 'border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:border-rose-400',
    iconBg: 'bg-rose-600 ring-2 ring-rose-300/40',
    icon: <Award className="w-4 h-4 text-white" />
  },
  prime_minister: {
    label: 'Prime Minister',
    badgeClass: 'bg-amber-400/25 text-yellow-300 border-yellow-400/50 font-bold',
    borderClass: 'border-yellow-400/70 shadow-[0_0_20px_rgba(250,204,21,0.2)] bg-gradient-to-r from-yellow-950/30 via-slate-800 to-amber-950/20 hover:border-yellow-300',
    iconBg: 'bg-gradient-to-tr from-amber-600 to-yellow-400 ring-4 ring-yellow-400/30',
    icon: <Crown className="w-5 h-5 text-slate-950" />
  },
  post_premiership: {
    label: 'Post-Premiership',
    badgeClass: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    borderClass: 'border-slate-600 hover:border-slate-500',
    iconBg: 'bg-slate-600',
    icon: <Globe className="w-4 h-4 text-white" />
  }
};

const getPartyStyles = (party: string) => {
  const lower = party.toLowerCase();
  if (lower.includes('conservative')) return { badge: 'bg-blue-600/20 text-blue-300 border-blue-500/40', dot: 'bg-blue-400' };
  if (lower.includes('labour')) return { badge: 'bg-red-600/20 text-red-300 border-red-500/40', dot: 'bg-red-400' };
  if (lower.includes('liberal') || lower.includes('whig')) return { badge: 'bg-amber-600/20 text-amber-300 border-amber-500/40', dot: 'bg-amber-400' };
  if (lower.includes('tory')) return { badge: 'bg-sky-600/20 text-sky-300 border-sky-500/40', dot: 'bg-sky-400' };
  return { badge: 'bg-slate-700 text-slate-300 border-slate-600', dot: 'bg-slate-400' };
};

export const CareerTreeModal: React.FC<CareerTreeModalProps> = ({
  primeMinister,
  isOpen,
  onClose
}) => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const { t } = useLanguage();

  const careerData = useMemo(() => {
    if (!primeMinister) return null;
    return pmCareerTrees[primeMinister.id] || {
      pmId: primeMinister.id,
      name: primeMinister.name,
      educationSummary: {
        school: 'Historical records',
        higherEducation: 'University studies',
        qualifications: 'Statesman'
      },
      milestones: {
        firstElectedYear: primeMinister.termStart,
        yearsToNo10: 'Years of public service',
        highestPriorOffice: 'Cabinet Minister'
      },
      nodes: [
        {
          id: 'fallback-pm',
          category: 'prime_minister',
          role: 'Prime Minister of the United Kingdom',
          institutionOrDept: '10 Downing Street',
          years: `${primeMinister.termStart}–${primeMinister.termEnd ?? 'Present'}`,
          description: primeMinister.context,
          isMilestone: true
        }
      ]
    };
  }, [primeMinister]);

  const filteredNodes = useMemo(() => {
    if (!careerData) return [];
    if (filter === 'all') return careerData.nodes;
    if (filter === 'education') return careerData.nodes.filter(n => n.category === 'education');
    if (filter === 'cabinet') return careerData.nodes.filter(n => ['cabinet', 'great_office', 'junior_minister'].includes(n.category));
    if (filter === 'pm') return careerData.nodes.filter(n => n.category === 'prime_minister');
    return careerData.nodes;
  }, [careerData, filter]);

  if (!isOpen || !primeMinister || !careerData) return null;

  const partyStyle = getPartyStyles(primeMinister.party);

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-3 sm:p-5 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-tree-title"
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with portrait and metadata */}
        <header className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/80 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pr-10">
            {primeMinister.imageUrl ? (
              <img 
                src={primeMinister.imageUrl} 
                alt={primeMinister.name}
                className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl shadow-lg border-2 border-slate-600 flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="w-20 h-24 sm:w-24 sm:h-28 bg-slate-800 border-2 border-slate-700 rounded-xl flex items-center justify-center text-slate-400 text-xs text-center p-2">
                No portrait
              </div>
            )}

            <div className="flex-grow min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${partyStyle.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${partyStyle.dot}`} />
                  {t(`party.${primeMinister.party.toLowerCase()}`) || primeMinister.party}
                </span>
                <span className="text-xs font-mono text-amber-300/90 bg-amber-950/40 border border-amber-600/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {primeMinister.termStart} – {primeMinister.termEnd ?? t('pmCard.present')}
                </span>
              </div>

              <h2 id="career-tree-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {primeMinister.name}
              </h2>
              <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400 inline" />
                <span className="text-amber-200/90 font-medium">Career Tree & Key Roles</span>
              </p>
            </div>
          </div>

          {/* Quick Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-700/60">
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/50">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> School
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 truncate" title={careerData.educationSummary.school}>
                {careerData.educationSummary.school}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/50">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> Higher Education
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 truncate" title={careerData.educationSummary.higherEducation}>
                {careerData.educationSummary.higherEducation}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/50">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-blue-400" /> First Elected
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                {careerData.milestones.firstElectedYear ? `Year ${careerData.milestones.firstElectedYear}` : 'N/A'}
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-700/50">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-rose-400" /> Prior Office
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5 truncate" title={careerData.milestones.highestPriorOffice}>
                {careerData.milestones.highestPriorOffice || 'Backbencher'}
              </p>
            </div>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              All Stages ({careerData.nodes.length})
            </button>
            <button
              onClick={() => setFilter('education')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                filter === 'education' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> Education
            </button>
            <button
              onClick={() => setFilter('cabinet')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                filter === 'cabinet' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5" /> Cabinet & Offices
            </button>
            <button
              onClick={() => setFilter('pm')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                filter === 'pm' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              <Crown className="w-3.5 h-3.5" /> Prime Minister
            </button>
          </div>

          <span className="text-xs text-slate-500 italic hidden sm:block">
            Chronological progression to No. 10
          </span>
        </div>

        {/* Career Tree Flow */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow bg-slate-900/60 custom-scrollbar">
          <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8">
            {/* Vertical connecting trunk line */}
            <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-yellow-500 opacity-60" />

            {filteredNodes.map((node, index) => {
              const config = categoryConfig[node.category] || categoryConfig.parliament;
              const isPM = node.category === 'prime_minister';

              return (
                <div key={node.id} className="relative group">
                  {/* Tree branch connector dot/icon */}
                  <div className={`absolute -left-[23px] sm:-left-[31px] top-3.5 w-8 h-8 rounded-full ${config.iconBg} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 z-10`}>
                    {config.icon}
                  </div>

                  {/* Career Node Card */}
                  <div className={`bg-slate-800/90 rounded-xl p-4 sm:p-5 border transition-all duration-300 ml-4 sm:ml-6 ${config.borderClass}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.badgeClass}`}>
                          {config.label}
                        </span>
                        {node.institutionOrDept && (
                          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                            <Building2 className="w-3 h-3 text-slate-500" />
                            {node.institutionOrDept}
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono text-amber-300/80 bg-slate-900/60 px-2.5 py-0.5 rounded-md border border-slate-700/60 w-fit">
                        {node.years}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold ${isPM ? 'text-yellow-300 flex items-center gap-2' : 'text-white'}`}>
                      {node.role}
                      {isPM && <Sparkles className="w-4 h-4 text-yellow-400 inline" />}
                    </h3>

                    <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="p-3 sm:p-4 bg-slate-950/80 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Career Tree of</span>
            <span className="font-semibold text-slate-200">{primeMinister.name}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            Done
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CareerTreeModal;
