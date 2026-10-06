import { PrimeMinister } from '../types';
import { pmCareerTrees } from '../data/pmCareerTrees';
import { POLITICAL_ERAS } from '../constants';

export interface GroundingSource {
  title: string;
  uri: string;
  publisher?: string;
  category?: string;
}

export interface DetailedPMContent {
  title: string;
  imageUrl?: string;
  party: string;
  termStart: number;
  termEnd: number | null;
  eraName: string;
  text: string;
  education?: {
    school?: string;
    higherEducation?: string;
    qualifications?: string;
  };
  milestones?: {
    firstElectedYear?: number | string;
    firstCabinetYear?: number | string;
    yearsToNo10?: string;
    highestPriorOffice?: string;
  };
  careerHighlights: { role: string; years: string; description: string }[];
  sources: GroundingSource[];
}

export function getSourcesForPM(pm: PrimeMinister): GroundingSource[] {
  const encodedName = encodeURIComponent(pm.name.replace(/ /g, '_'));

  const govSlugMap: Record<number, string> = {
    1: 'robert-walpole',
    2: 'william-pitt-1st-earl-of-chatham',
    3: 'frederick-north',
    4: 'william-pitt-the-younger',
    5: 'spencer-perceval',
    6: 'robert-banks-jenkinson-2nd-earl-of-liverpool',
    7: 'arthur-wellesley-1st-duke-of-wellington',
    8: 'charles-grey-2nd-earl-grey',
    9: 'robert-peel',
    10: 'william-lamb-2nd-viscount-melbourne',
    11: 'henry-john-temple-3rd-viscount-palmerston',
    12: 'benjamin-disraeli-earl-of-beaconsfield',
    13: 'william-ewart-gladstone',
    14: 'robert-gascoyne-cecil-3rd-marquess-of-salisbury',
    15: 'herbert-henry-asquith',
    16: 'david-lloyd-george',
    17: 'neville-chamberlain',
    18: 'winston-churchill',
    19: 'clement-attlee',
    20: 'harold-macmillan',
    21: 'harold-wilson',
    22: 'edward-heath',
    23: 'james-callaghan',
    24: 'margaret-thatcher',
    25: 'john-major',
    26: 'tony-blair',
    27: 'gordon-brown',
    28: 'david-cameron',
    29: 'theresa-may',
    30: 'boris-johnson',
    31: 'liz-truss',
    32: 'rishi-sunak',
    33: 'keir-starmer',
  };

  const govSlug = govSlugMap[pm.id];
  const govUrl = govSlug
    ? `https://www.gov.uk/government/history/past-prime-ministers/${govSlug}`
    : 'https://www.gov.uk/government/history/past-prime-ministers';

  const sources: GroundingSource[] = [
    {
      title: `GOV.UK Past Prime Ministers: ${pm.name}`,
      uri: govUrl,
      publisher: 'gov.uk',
      category: 'Official Government Archive',
    },
    {
      title: `UK Parliament Official Records: ${pm.name}`,
      uri: pm.id === 34 
        ? 'https://members.parliament.uk/member/1435/career'
        : 'https://www.parliament.uk/about/living-heritage/building/palace/parliament-commons/prime-ministers/',
      publisher: 'parliament.uk',
      category: 'Parliamentary & Legislative Records',
    },
    {
      title: `Encyclopaedia Britannica: ${pm.name}`,
      uri: `https://www.britannica.com/search?query=${encodeURIComponent(pm.name)}`,
      publisher: 'britannica.com',
      category: 'Historical Reference Encyclopedia',
    },
    {
      title: `The National Archives (UK): State Papers & Records for ${pm.name}`,
      uri: `https://discovery.nationalarchives.gov.uk/results/r?_q=${encodeURIComponent(pm.name)}`,
      publisher: 'nationalarchives.gov.uk',
      category: 'National Historical Repository',
    },
    {
      title: `Wikipedia: ${pm.name}`,
      uri: `https://en.wikipedia.org/wiki/${encodedName}`,
      publisher: 'wikipedia.org',
      category: 'Biographical & Career Record',
    },
    {
      title: `National Portrait Gallery: Portraits of ${pm.name}`,
      uri: `https://www.npg.org.uk/collections/search/person?firstRun=true&sText=${encodeURIComponent(pm.name)}`,
      publisher: 'npg.org.uk',
      category: 'National Portrait Collection',
    },
  ];

  return sources;
}

export function getDetailedPMInfo(pm: PrimeMinister, language: string): DetailedPMContent {
  const careerData = pmCareerTrees[pm.id];
  const era = POLITICAL_ERAS.find(p => pm.termStart >= p.start && pm.termStart <= p.end);
  const eraName = era?.name || 'British Political History';

  // Primary context in selected language
  let primaryContext = pm.context;
  if (language === 'fr' && pm.contextFr) primaryContext = pm.contextFr;
  else if (language === 'ja' && pm.contextJa) primaryContext = pm.contextJa;
  else if (language === 'es' && pm.contextEs) primaryContext = pm.contextEs;
  else if (language === 'zh' && pm.contextZh) primaryContext = pm.contextZh;
  else if (language === 'ar' && pm.contextAr) primaryContext = pm.contextAr;
  else if (language === 'hi' && pm.contextHi) primaryContext = pm.contextHi;

  const termEndStr = pm.termEnd ? `${pm.termEnd}` : 'Present';
  const termDuration = pm.termEnd ? `${pm.termEnd - pm.termStart} year${(pm.termEnd - pm.termStart) === 1 ? '' : 's'}` : 'Incumbent';

  // Extract top career milestone highlights
  const keyNodes = (careerData?.nodes || []).filter(
    n => n.category === 'cabinet' || n.category === 'great_office' || n.category === 'prime_minister' || n.isMilestone
  ).slice(0, 5);

  const careerHighlights = keyNodes.map(node => ({
    role: node.role,
    years: node.years,
    description: node.description,
  }));

  // Build comprehensive multi-paragraph narrative
  const paragraphs: string[] = [];

  // Paragraph 1: Overview & Tenure
  paragraphs.push(primaryContext);

  // Paragraph 2: Career Pathway & Ascent
  if (careerData) {
    const eduParts: string[] = [];
    if (careerData.educationSummary?.school && careerData.educationSummary.school !== 'Private Tutoring' && careerData.educationSummary.school !== 'Self-taught' && careerData.educationSummary.school !== 'None') {
      eduParts.push(careerData.educationSummary.school);
    }
    if (careerData.educationSummary?.higherEducation && careerData.educationSummary.higherEducation !== 'None') {
      eduParts.push(careerData.educationSummary.higherEducation);
    }
    const eduText = eduParts.length > 0 ? ` Educated at ${eduParts.join(' and ')}.` : '';
    const electedText = careerData.milestones.firstElectedYear ? ` First entered Parliament in ${careerData.milestones.firstElectedYear}.` : '';
    const cabinetText = careerData.milestones.firstCabinetYear ? ` Reached Cabinet rank in ${careerData.milestones.firstCabinetYear}.` : '';
    const priorOfficeText = careerData.milestones.highestPriorOffice && careerData.milestones.highestPriorOffice !== 'None'
      ? ` Before ascending to 10 Downing Street, their highest prior office was ${careerData.milestones.highestPriorOffice}.`
      : '';
    const timeToNo10Text = careerData.milestones.yearsToNo10 ? ` It took approximately ${careerData.milestones.yearsToNo10} from entering Parliament to becoming Prime Minister.` : '';

    paragraphs.push(
      `Pathway to 10 Downing Street: During the ${eraName} era, ${pm.name} represented the ${pm.party} party.${eduText}${electedText}${cabinetText}${priorOfficeText}${timeToNo10Text}`
    );
  }

  // Paragraph 3: Premiership & Legacy Summary
  const postPremiershipNodes = (careerData?.nodes || []).filter(n => n.category === 'post_premiership' || n.category === 'prime_minister');
  if (postPremiershipNodes.length > 0) {
    const notableActions = postPremiershipNodes.map(n => `${n.role} (${n.years}): ${n.description}`).join(' ');
    paragraphs.push(`Key Milestones & Legacy: ${notableActions}`);
  } else {
    paragraphs.push(
      `Historical Significance: Serving from ${pm.termStart} to ${termEndStr} (${termDuration}), ${pm.name} played a defining role in shaping the political landscape, parliamentary governance, and policies of modern Great Britain.`
    );
  }

  const sources = getSourcesForPM(pm);

  return {
    title: pm.name,
    imageUrl: pm.imageUrl,
    party: pm.party,
    termStart: pm.termStart,
    termEnd: pm.termEnd,
    eraName,
    text: paragraphs.join('\n\n'),
    education: careerData?.educationSummary,
    milestones: careerData?.milestones,
    careerHighlights: careerHighlights.length > 0 ? careerHighlights : (careerData?.nodes.slice(0, 4).map(n => ({
      role: n.role,
      years: n.years,
      description: n.description
    })) || []),
    sources,
  };
}
