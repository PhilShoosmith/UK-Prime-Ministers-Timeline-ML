import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown, GraduationCap, Milestone, Calendar } from 'lucide-react';
import { DetailedPMContent } from '../services/detailedInfoService';

interface RAGModalProps {
  isOpen: boolean;
  isLoading: boolean;
  content: DetailedPMContent | { title: string; text: string; imageUrl?: string } | null;
  sources?: { uri: string; title: string }[];
  onClose: () => void;
  onOpenCareerTree?: () => void;
}

const getPartyBadgeStyle = (party?: string): string => {
  if (!party) return 'bg-slate-700 text-slate-300 border-slate-600';
  const lower = party.toLowerCase();
  if (lower.includes('conservative')) return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  if (lower.includes('labour')) return 'bg-red-500/20 text-red-300 border-red-500/40';
  if (lower.includes('liberal') || lower.includes('whig')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
  if (lower.includes('tory')) return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
  return 'bg-slate-700 text-slate-300 border-slate-600';
};

const RAGModal: React.FC<RAGModalProps> = ({ isOpen, isLoading, content, sources = [], onClose, onOpenCareerTree }) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const isDetailed = content && 'eraName' in content;
  const detailed = isDetailed ? (content as DetailedPMContent) : null;

  return (
    <div 
      className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[100] flex items-center justify-center p-3 sm:p-4 animate-fade-in" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rag-modal-title"
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-scale-in overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 sm:p-5 border-b border-slate-700 flex justify-between items-center flex-shrink-0 bg-slate-800/90">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {content?.imageUrl && (
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-14 h-18 sm:w-16 sm:h-20 object-cover rounded-lg shadow-md border border-slate-600 flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <h2 id="rag-modal-title" className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 truncate">
                {content?.title ? t('rag.about').replace('{title}', content.title) : t('rag.loadingTitle')}
              </h2>
              {detailed && (
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getPartyBadgeStyle(detailed.party)}`}>
                    {t(`party.${detailed.party.toLowerCase()}`) || detailed.party}
                  </span>
                  <span className="text-xs text-amber-300 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {detailed.termStart} – {detailed.termEnd ?? 'Present'}
                  </span>
                  <span className="text-xs text-slate-400 border border-slate-700 px-2 py-0.5 rounded-md">
                    {detailed.eraName}
                  </span>
                </div>
              )}
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors text-3xl leading-none font-bold p-1 ml-2"
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-48 text-center p-4">
              <p className="text-lg text-slate-300">{t('rag.findingInfo')}</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 my-2">{content?.title}</p>
              <p className="text-slate-400 animate-pulse">{t('rag.pleaseWait')}</p>
            </div>
          ) : (
            <>
              {/* Quick Metrics Grid */}
              {detailed?.milestones && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 bg-slate-900/60 border border-slate-700/60 rounded-xl text-xs">
                  {detailed.milestones.firstElectedYear && (
                    <div>
                      <span className="text-slate-400 block font-medium">First Elected</span>
                      <span className="text-white font-semibold font-mono text-sm">{detailed.milestones.firstElectedYear}</span>
                    </div>
                  )}
                  {detailed.milestones.firstCabinetYear && (
                    <div>
                      <span className="text-slate-400 block font-medium">Cabinet Debut</span>
                      <span className="text-white font-semibold font-mono text-sm">{detailed.milestones.firstCabinetYear}</span>
                    </div>
                  )}
                  {detailed.milestones.yearsToNo10 && (
                    <div>
                      <span className="text-slate-400 block font-medium">Road to No. 10</span>
                      <span className="text-white font-semibold font-mono text-sm">{detailed.milestones.yearsToNo10}</span>
                    </div>
                  )}
                  {detailed.milestones.highestPriorOffice && (
                    <div>
                      <span className="text-slate-400 block font-medium">Prior Office</span>
                      <span className="text-white font-semibold truncate block" title={detailed.milestones.highestPriorOffice}>
                        {detailed.milestones.highestPriorOffice}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Education Box */}
              {detailed?.education && (detailed.education.school || detailed.education.higherEducation) && (
                <div className="flex items-start gap-2.5 p-3 bg-slate-900/40 border border-slate-800 rounded-xl text-xs text-slate-300">
                  <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-purple-300">Education & Background:</span>
                    <p>
                      {[detailed.education.school, detailed.education.higherEducation, detailed.education.qualifications]
                        .filter(Boolean)
                        .filter(s => s !== 'None')
                        .join(' • ')}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Detailed Narrative */}
              <div className="text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
                {content?.text?.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index} className="bg-slate-900/30 p-3.5 rounded-xl border border-slate-800/80">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Career Highlights Section */}
              {detailed?.careerHighlights && detailed.careerHighlights.length > 0 && (
                <div className="p-4 bg-slate-900/50 border border-slate-700/60 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                      <Milestone className="w-4 h-4" />
                      Key Career Milestones
                    </h3>
                    {onOpenCareerTree && (
                      <button
                        type="button"
                        onClick={onOpenCareerTree}
                        className="px-2.5 py-1 bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/50 hover:to-yellow-600/50 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <Crown className="w-3 h-3 text-amber-400" />
                        Full Career Tree &rarr;
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {detailed.careerHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="text-amber-300/80 font-mono whitespace-nowrap font-medium min-w-[70px]">
                          {highlight.years}
                        </span>
                        <div>
                          <strong className="text-white font-semibold">{highlight.role}:</strong>{' '}
                          <span className="text-slate-300">{highlight.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {sources.length > 0 && (
                <div className="pt-3 border-t border-slate-700">
                  <h3 className="text-xs font-semibold text-slate-400 mb-1.5">{t('rag.sources')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    {sources.map((source, index) => (
                      <li key={index} className="truncate">
                        <a 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-400 hover:underline"
                          title={source.title}
                        >
                          {source.title || new URL(source.uri).hostname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <footer className="p-3 sm:p-4 border-t border-slate-700 flex justify-between items-center bg-slate-800/80 flex-shrink-0">
          {onOpenCareerTree ? (
            <button
              type="button"
              onClick={onOpenCareerTree}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
            >
              <Crown className="w-4 h-4" />
              View Complete Career Tree
            </button>
          ) : <div />}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors text-xs sm:text-sm"
          >
            {t('rag.close')}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default RAGModal;