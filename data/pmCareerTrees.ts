export interface CareerNode {
  id: string;
  category: 'education' | 'early_career' | 'parliament' | 'junior_minister' | 'cabinet' | 'great_office' | 'prime_minister' | 'post_premiership';
  role: string;
  institutionOrDept?: string;
  years: string;
  description: string;
  isMilestone?: boolean;
}

export interface PMCareerData {
  pmId: number;
  name: string;
  educationSummary: {
    school: string;
    higherEducation: string;
    qualifications?: string;
  };
  milestones: {
    firstElectedYear?: number | string;
    firstCabinetYear?: number | string;
    yearsToNo10?: string;
    highestPriorOffice?: string;
  };
  nodes: CareerNode[];
}

export const pmCareerTrees: Record<number, PMCareerData> = {
  1: {
    pmId: 1,
    name: "Robert Walpole",
    educationSummary: {
      school: "Eton College (King's Scholar)",
      higherEducation: "King's College, Cambridge",
      qualifications: "Classical Scholar"
    },
    milestones: {
      firstElectedYear: 1701,
      firstCabinetYear: 1715,
      yearsToNo10: "20 years",
      highestPriorOffice: "Chancellor of the Exchequer & First Lord of the Treasury"
    },
    nodes: [
      { id: "1-1", category: "education", role: "Etonian Education", institutionOrDept: "Eton College", years: "1690–1696", description: "King's Scholar, mastered Latin and classical rhetoric." },
      { id: "1-2", category: "education", role: "University Studies", institutionOrDept: "King's College, Cambridge", years: "1696–1698", description: "Studies cut short by the death of his elder brother to manage the family estate." },
      { id: "1-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Castle Rising & King's Lynn", years: "1701–1742", description: "Elected as Whig MP, quickly recognized for financial acumen." },
      { id: "1-4", category: "junior_minister", role: "Council of the Lord High Admiral", institutionOrDept: "Admiralty", years: "1705–1708", description: "Advised Prince George of Denmark on naval affairs." },
      { id: "1-5", category: "cabinet", role: "Secretary at War", institutionOrDept: "War Office", years: "1708–1710", description: "Managed army finances during the War of the Spanish Succession." },
      { id: "1-6", category: "great_office", role: "First Lord of the Treasury & Chancellor of the Exchequer", institutionOrDept: "Treasury", years: "1715–1717", description: "First major Cabinet term, created the original Sinking Fund." },
      { id: "1-7", category: "junior_minister", role: "Paymaster of the Forces", institutionOrDept: "Treasury", years: "1720–1721", description: "Skillfully managed the fallout of the South Sea Bubble." },
      { id: "1-8", category: "prime_minister", role: "Prime Minister & First Lord of the Treasury", institutionOrDept: "10 Downing Street", years: "1721–1742", description: "Britain's first and longest-serving Prime Minister (20 years, 314 days), established Cabinet government.", isMilestone: true },
      { id: "1-9", category: "post_premiership", role: "1st Earl of Orford", institutionOrDept: "House of Lords", years: "1742–1745", description: "Elevated to the peerage; served as trusted elder adviser to King George II." }
    ]
  },
  2: {
    pmId: 2,
    name: "William Pitt the Elder",
    educationSummary: {
      school: "Eton College",
      higherEducation: "Trinity College, Oxford & University of Utrecht",
      qualifications: "Scholar in classics & international law"
    },
    milestones: {
      firstElectedYear: 1735,
      firstCabinetYear: 1756,
      yearsToNo10: "31 years",
      highestPriorOffice: "Secretary of State for the Southern Department"
    },
    nodes: [
      { id: "2-1", category: "education", role: "Classical Schooling", institutionOrDept: "Eton College", years: "1719–1726", description: "Excelled in oratory despite recurring bouts of gout." },
      { id: "2-2", category: "education", role: "University & Utrecht", institutionOrDept: "Trinity College, Oxford & Utrecht", years: "1727–1729", description: "Studied international law and European diplomacy." },
      { id: "2-3", category: "early_career", role: "Cavalry Cornet", institutionOrDept: "King's Own Regiment of Horse", years: "1731–1736", description: "Commissioned army officer, entered the service of Cobham's Cubs." },
      { id: "2-4", category: "parliament", role: "Member of Parliament", institutionOrDept: "Old Sarum, Seaford, Bath", years: "1735–1766", description: "Orator known as 'The Great Commoner', opposed Walpole's peace policy." },
      { id: "2-5", category: "junior_minister", role: "Paymaster of the Forces", institutionOrDept: "Pay Office", years: "1746–1755", description: "Renowned for refusing to take personal kickbacks from public funds." },
      { id: "2-6", category: "great_office", role: "Secretary of State for the Southern Department", institutionOrDept: "Southern Department", years: "1756–1761", description: "Led Britain to global victory during the Seven Years' War." },
      { id: "2-7", category: "prime_minister", role: "Prime Minister & Lord Privy Seal", institutionOrDept: "Chatham Ministry", years: "1766–1768", description: "Led government as 1st Earl of Chatham, sought conciliation with American colonies.", isMilestone: true },
      { id: "2-8", category: "post_premiership", role: "Elder Statesman", institutionOrDept: "House of Lords", years: "1768–1778", description: "Spearheaded opposition against harsh colonial policies towards America." }
    ]
  },
  3: {
    pmId: 3,
    name: "Lord North",
    educationSummary: {
      school: "Eton College",
      higherEducation: "Trinity College, Oxford (MA 1750)",
      qualifications: "Grand Tour of Europe (Leipzig & legal studies)"
    },
    milestones: {
      firstElectedYear: 1754,
      firstCabinetYear: 1767,
      yearsToNo10: "16 years",
      highestPriorOffice: "Chancellor of the Exchequer & Leader of the Commons"
    },
    nodes: [
      { id: "3-1", category: "education", role: "Classical Education", institutionOrDept: "Eton College", years: "1742–1748", description: "Attended Eton alongside future political peers." },
      { id: "3-2", category: "education", role: "Oxford & European Tour", institutionOrDept: "Trinity College, Oxford & Leipzig", years: "1748–1753", description: "Earned MA in 1750, studied German law and continental administration." },
      { id: "3-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Banbury", years: "1754–1790", description: "Represented the family seat continuously for 36 years." },
      { id: "3-4", category: "junior_minister", role: "Lord of the Treasury", institutionOrDept: "HM Treasury", years: "1759–1765", description: "Appointed junior minister under Newcastle and Bute." },
      { id: "3-5", category: "junior_minister", role: "Joint Paymaster of the Forces", institutionOrDept: "Pay Office", years: "1766–1767", description: "Served in Chatham's coalition administration." },
      { id: "3-6", category: "great_office", role: "Chancellor of the Exchequer & Leader of the Commons", institutionOrDept: "Treasury", years: "1767–1782", description: "Guided taxation policy and Townshend Acts revenue debates." },
      { id: "3-7", category: "prime_minister", role: "Prime Minister & First Lord of the Treasury", institutionOrDept: "10 Downing Street", years: "1770–1782", description: "Premier during the American Revolutionary War; resigned after Yorktown.", isMilestone: true },
      { id: "3-8", category: "cabinet", role: "Home Secretary (Fox–North Coalition)", institutionOrDept: "Home Office", years: "1783", description: "Joined Charles James Fox in historic coalition under Duke of Portland." },
      { id: "3-9", category: "post_premiership", role: "2nd Earl of Guilford", institutionOrDept: "House of Lords", years: "1790–1792", description: "Succeeded to earldom, active in House of Lords until death." }
    ]
  },
  4: {
    pmId: 4,
    name: "William Pitt the Younger",
    educationSummary: {
      school: "Home tutored by Rev. Edward Wilson",
      higherEducation: "Pembroke College, Cambridge (MA 1776)",
      qualifications: "Lincoln's Inn, Barrister-at-Law (1780)"
    },
    milestones: {
      firstElectedYear: 1781,
      firstCabinetYear: 1782,
      yearsToNo10: "2 years",
      highestPriorOffice: "Chancellor of the Exchequer (at age 23)"
    },
    nodes: [
      { id: "4-1", category: "education", role: "Early Tutelage & Cambridge", institutionOrDept: "Pembroke College, Cambridge", years: "1773–1776", description: "Entered Cambridge at age 14; excelled in mathematics, Latin, and Greek." },
      { id: "4-2", category: "early_career", role: "Barrister", institutionOrDept: "Lincoln's Inn & Western Circuit", years: "1780–1781", description: "Called to the bar, practiced on the Western Circuit." },
      { id: "4-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Appleby & Cambridge University", years: "1781–1806", description: "Elected at age 21; acclaimed by Burke as 'not merely a chip off the old block, but the old block itself'." },
      { id: "4-4", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1782–1783", description: "Became Chancellor at just 23 years old under Lord Shelburne." },
      { id: "4-5", category: "prime_minister", role: "Prime Minister (First Premiership)", institutionOrDept: "10 Downing Street", years: "1783–1801", description: "Youngest PM in British history (age 24); oversaw French Revolutionary Wars and Acts of Union 1800.", isMilestone: true },
      { id: "4-6", category: "prime_minister", role: "Prime Minister (Second Premiership)", institutionOrDept: "10 Downing Street", years: "1804–1806", description: "Led Third Coalition against Napoleon; celebrated victory at Trafalgar shortly before passing.", isMilestone: true }
    ]
  },
  5: {
    pmId: 5,
    name: "Spencer Perceval",
    educationSummary: {
      school: "Harrow School",
      higherEducation: "Trinity College, Cambridge (MA 1782)",
      qualifications: "Lincoln's Inn, King's Counsel (KC)"
    },
    milestones: {
      firstElectedYear: 1796,
      firstCabinetYear: 1807,
      yearsToNo10: "13 years",
      highestPriorOffice: "Chancellor of the Exchequer & Leader of the Commons"
    },
    nodes: [
      { id: "5-1", category: "education", role: "Harrow & Cambridge", institutionOrDept: "Harrow School & Trinity, Cambridge", years: "1774–1782", description: "Read classics and law, graduated with distinction." },
      { id: "5-2", category: "early_career", role: "Barrister & King's Counsel", institutionOrDept: "Lincoln's Inn & Midland Circuit", years: "1786–1796", description: "Built top legal practice, acted in high-profile Crown prosecutions." },
      { id: "5-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Northampton", years: "1796–1812", description: "Elected MP as a staunch supporter of William Pitt the Younger." },
      { id: "5-4", category: "junior_minister", role: "Solicitor General", institutionOrDept: "Law Officers of the Crown", years: "1801–1802", description: "Appointed second Law Officer under Addington." },
      { id: "5-5", category: "junior_minister", role: "Attorney General for England and Wales", institutionOrDept: "Law Officers of the Crown", years: "1802–1806", description: "Chief legal adviser to Crown during the Napoleonic threat." },
      { id: "5-6", category: "great_office", role: "Chancellor of the Exchequer & Leader of the Commons", institutionOrDept: "HM Treasury", years: "1807–1809", description: "Introduced the Orders in Council blockading Napoleonic ports." },
      { id: "5-7", category: "prime_minister", role: "Prime Minister & Chancellor of the Exchequer", institutionOrDept: "10 Downing Street", years: "1809–1812", description: "Maintained British finances and Wellington's Peninsular campaign; tragically assassinated in House of Commons lobby in 1812.", isMilestone: true }
    ]
  },
  6: {
    pmId: 6,
    name: "Robert Jenkinson, 2nd Earl of Liverpool",
    educationSummary: {
      school: "Charterhouse School",
      higherEducation: "Christ Church, Oxford",
      qualifications: "Witnessed the storming of the Bastille on continental tour"
    },
    milestones: {
      firstElectedYear: 1790,
      firstCabinetYear: 1801,
      yearsToNo10: "22 years",
      highestPriorOffice: "Foreign Secretary, Home Secretary & War Secretary"
    },
    nodes: [
      { id: "6-1", category: "education", role: "Charterhouse & Oxford", institutionOrDept: "Christ Church, Oxford", years: "1783–1789", description: "Studied politics and trade under dean Cyril Jackson." },
      { id: "6-2", category: "parliament", role: "Member of Parliament", institutionOrDept: "Rye", years: "1790–1803", description: "Elected before turning 21; prominent Pittite speaker." },
      { id: "6-3", category: "junior_minister", role: "Master of the Mint", institutionOrDept: "Royal Mint", years: "1799–1801", description: "Oversaw coinage reform and monetary stability." },
      { id: "6-4", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1801–1804", description: "Negotiated the Treaty of Amiens with France." },
      { id: "6-5", category: "great_office", role: "Home Secretary & Leader of the Lords", institutionOrDept: "Home Office", years: "1804–1806, 1807–1809", description: "Responsible for domestic security and police administration." },
      { id: "6-6", category: "cabinet", role: "Secretary of State for War and the Colonies", institutionOrDept: "War Office", years: "1809–1812", description: "Coordinated logistical support for Wellington in Spain and Portugal." },
      { id: "6-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1812–1827", description: "Held office for nearly 15 years; led Britain to victory at Waterloo and through the Congress of Vienna.", isMilestone: true }
    ]
  },
  7: {
    pmId: 7,
    name: "Arthur Wellesley, 1st Duke of Wellington",
    educationSummary: {
      school: "Eton College (1781–1784)",
      higherEducation: "French Royal Academy of Equitation, Angers",
      qualifications: "Field Marshal of the British Army"
    },
    milestones: {
      firstElectedYear: 1790,
      firstCabinetYear: 1819,
      yearsToNo10: "38 years (via legendary military command)",
      highestPriorOffice: "Master-General of the Ordnance & Commander-in-Chief"
    },
    nodes: [
      { id: "7-1", category: "education", role: "Eton & Angers Military Academy", institutionOrDept: "Eton College & Royal Academy of Equitation", years: "1781–1786", description: "Learned French fluently and mastered horsemanship." },
      { id: "7-2", category: "early_career", role: "Army Commission & Indian Campaigns", institutionOrDept: "British Army", years: "1787–1805", description: "Won decisive victories in India, culminating at the Battle of Assaye." },
      { id: "7-3", category: "parliament", role: "Chief Secretary for Ireland & MP", institutionOrDept: "Irish & British Parliament (Rye)", years: "1790–1798, 1806–1809", description: "Served as MP and Chief Secretary before taking field command in Iberia." },
      { id: "7-4", category: "early_career", role: "Peninsular War & Waterloo Victory", institutionOrDept: "Allied Coalition Armies", years: "1808–1815", description: "Defeated Napoleon's marshals in Spain and Napoleon himself at Waterloo; made Duke of Wellington." },
      { id: "7-5", category: "cabinet", role: "Master-General of the Ordnance", institutionOrDept: "Board of Ordnance", years: "1819–1827", description: "Oversaw artillery, fortifications, and military engineering." },
      { id: "7-6", category: "cabinet", role: "Commander-in-Chief of the Forces", institutionOrDept: "Horse Guards", years: "1827–1828", description: "Supreme professional head of the British Army." },
      { id: "7-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1828–1830, 1834 (caretaker)", description: "Passed the Catholic Emancipation Act 1829, avoiding civil war in Ireland.", isMilestone: true },
      { id: "7-8", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1834–1835", description: "Served in Peel's first cabinet managing European diplomacy." },
      { id: "7-9", category: "post_premiership", role: "Leader of the House of Lords & Elder Statesman", institutionOrDept: "House of Lords", years: "1841–1846", description: "Helped Peel push through repeal of the Corn Laws." }
    ]
  },
  8: {
    pmId: 8,
    name: "Charles Grey, 2nd Earl Grey",
    educationSummary: {
      school: "Eton College (1778–1781)",
      higherEducation: "Trinity College, Cambridge (1781–1784)",
      qualifications: "Grand Tour of France, Italy, and Switzerland"
    },
    milestones: {
      firstElectedYear: 1786,
      firstCabinetYear: 1806,
      yearsToNo10: "44 years",
      highestPriorOffice: "Foreign Secretary & First Lord of the Admiralty"
    },
    nodes: [
      { id: "8-1", category: "education", role: "Eton & Trinity College", institutionOrDept: "Trinity College, Cambridge", years: "1778–1784", description: "Imbibed classical and Enlightenment political thought." },
      { id: "8-2", category: "parliament", role: "Member of Parliament", institutionOrDept: "Northumberland", years: "1786–1807", description: "Elected at age 22; became leading Whig orator alongside Fox." },
      { id: "8-3", category: "parliament", role: "Founder of Friends of the People", institutionOrDept: "Parliamentary Reform Movement", years: "1792–1800", description: "Campaigned tirelessly for parliamentary voting franchise reform." },
      { id: "8-4", category: "cabinet", role: "First Lord of the Admiralty", institutionOrDept: "Admiralty", years: "1806", description: "Served in Ministry of All the Talents." },
      { id: "8-5", category: "great_office", role: "Foreign Secretary & Leader of the Commons", institutionOrDept: "Foreign Office", years: "1806–1807", description: "Championed passage of the 1807 Abolition of the Slave Trade Act." },
      { id: "8-6", category: "parliament", role: "Leader of the Opposition", institutionOrDept: "House of Lords", years: "1807–1830", description: "Led Whig opposition for 23 years from the House of Lords." },
      { id: "8-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1830–1834", description: "Passed the landmark Great Reform Act 1832 and the Slavery Abolition Act 1833.", isMilestone: true }
    ]
  },
  9: {
    pmId: 9,
    name: "Robert Peel",
    educationSummary: {
      school: "Harrow School (Head Boy)",
      higherEducation: "Christ Church, Oxford (Double First in Classics & Math, 1808)",
      qualifications: "Lincoln's Inn, Barrister studies"
    },
    milestones: {
      firstElectedYear: 1809,
      firstCabinetYear: 1822,
      yearsToNo10: "25 years",
      highestPriorOffice: "Home Secretary (founder of Metropolitan Police)"
    },
    nodes: [
      { id: "9-1", category: "education", role: "Harrow & Double First at Oxford", institutionOrDept: "Christ Church, Oxford", years: "1800–1808", description: "Achieved the first recorded Double First Class degree at Oxford." },
      { id: "9-2", category: "parliament", role: "Member of Parliament", institutionOrDept: "Cashel, Chippenham, Tamworth", years: "1809–1850", description: "Entered Commons at age 21, funded by his wealthy industrialist father." },
      { id: "9-3", category: "junior_minister", role: "Under-Secretary for War and Colonies", institutionOrDept: "Colonial Office", years: "1810–1812", description: "Early administrative training under Lord Liverpool." },
      { id: "9-4", category: "cabinet", role: "Chief Secretary for Ireland", institutionOrDept: "Irish Office", years: "1812–1818", description: "Created the Peace Preservation Force (the precursor to modern policing)." },
      { id: "9-5", category: "great_office", role: "Home Secretary", institutionOrDept: "Home Office", years: "1822–1827, 1828–1830", description: "Founded the Metropolitan Police in 1829 ('Bobbies') and reformed the criminal code." },
      { id: "9-6", category: "parliament", role: "Tamworth Manifesto & Leader", institutionOrDept: "Conservative Party", years: "1834–1841", description: "Authored Tamworth Manifesto 1834, founding modern Conservatism." },
      { id: "9-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1834–1835, 1841–1846", description: "Repealed the Corn Laws in 1846 to combat the Irish Famine, introducing free trade.", isMilestone: true }
    ]
  },
  10: {
    pmId: 10,
    name: "Lord Melbourne",
    educationSummary: {
      school: "Eton College (1790–1796)",
      higherEducation: "Trinity College, Cambridge & University of Glasgow",
      qualifications: "Lincoln's Inn, Barrister (1804)"
    },
    milestones: {
      firstElectedYear: 1806,
      firstCabinetYear: 1830,
      yearsToNo10: "28 years",
      highestPriorOffice: "Home Secretary"
    },
    nodes: [
      { id: "10-1", category: "education", role: "Eton & Glasgow Enlightenment", institutionOrDept: "Trinity, Cambridge & Univ. of Glasgow", years: "1790–1799", description: "Studied political economy under John Millar in Glasgow." },
      { id: "10-2", category: "early_career", role: "Barrister", institutionOrDept: "Lincoln's Inn", years: "1804–1806", description: "Called to the bar before turning full-time to politics." },
      { id: "10-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Leominster, Peterborough, Hertfordshire", years: "1806–1826", description: "Moderate Whig MP; admired for wit and literary flair." },
      { id: "10-4", category: "cabinet", role: "Chief Secretary for Ireland", institutionOrDept: "Irish Office", years: "1827–1828", description: "Promoted administrative calm in Dublin." },
      { id: "10-5", category: "great_office", role: "Home Secretary", institutionOrDept: "Home Office", years: "1830–1834", description: "Managed domestic order during the Swing Riots and Reform Bill unrest." },
      { id: "10-6", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1834, 1835–1841", description: "Trusted political mentor and father-figure to young Queen Victoria upon her 1837 accession.", isMilestone: true }
    ]
  },
  11: {
    pmId: 11,
    name: "Lord Palmerston",
    educationSummary: {
      school: "Harrow School (1795–1800)",
      higherEducation: "University of Edinburgh & St John's College, Cambridge (MA 1806)",
      qualifications: "Studied moral philosophy under Dugald Stewart"
    },
    milestones: {
      firstElectedYear: 1807,
      firstCabinetYear: 1830,
      yearsToNo10: "48 years",
      highestPriorOffice: "Foreign Secretary & Home Secretary"
    },
    nodes: [
      { id: "11-1", category: "education", role: "Harrow, Edinburgh & Cambridge", institutionOrDept: "St John's College, Cambridge", years: "1795–1806", description: "Rigorous education in Scottish Enlightenment and Cambridge mathematics." },
      { id: "11-2", category: "parliament", role: "Member of Parliament", institutionOrDept: "Newport, Cambridge Univ., Tiverton", years: "1807–1865", description: "Served nearly six decades continuously in the House of Commons." },
      { id: "11-3", category: "junior_minister", role: "Secretary at War", institutionOrDept: "War Office", years: "1809–1828", description: "Served an astounding 19 years in this post under five consecutive PMs." },
      { id: "11-4", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1830–1834, 1835–1841, 1846–1851", description: "Legendary proponent of 'gunboat diplomacy' and British naval supremacy." },
      { id: "11-5", category: "great_office", role: "Home Secretary", institutionOrDept: "Home Office", years: "1852–1855", description: "Reformed penal discipline, factory safety, and public health." },
      { id: "11-6", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1855–1858, 1859–1865", description: "Resolved Crimean War; preserved British neutrality during US Civil War; last PM to die in office.", isMilestone: true }
    ]
  },
  12: {
    pmId: 12,
    name: "Benjamin Disraeli",
    educationSummary: {
      school: "Higham Hall Academy",
      higherEducation: "Articled clerk in London solicitor's office",
      qualifications: "Lincoln's Inn; Famous novelist and essayist"
    },
    milestones: {
      firstElectedYear: 1837,
      firstCabinetYear: 1852,
      yearsToNo10: "31 years",
      highestPriorOffice: "Chancellor of the Exchequer (3 times)"
    },
    nodes: [
      { id: "12-1", category: "education", role: "Self-Directed Classical Studies", institutionOrDept: "Higham Hall & Lincoln's Inn", years: "1817–1824", description: "Extensive reading in his father Isaac D'Israeli's vast library." },
      { id: "12-2", category: "early_career", role: "Novelist & Publicist", institutionOrDept: "Literary Career", years: "1826–1845", description: "Authored Vivian Grey, Coningsby, and Sybil ('Two Nations' philosophy)." },
      { id: "12-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Maidstone, Shrewsbury, Bucks", years: "1837–1876", description: "Leader of the 'Young England' movement; fierce opponent of Peel on Corn Laws." },
      { id: "12-4", category: "great_office", role: "Chancellor of the Exchequer & Leader of Commons", institutionOrDept: "HM Treasury", years: "1852, 1858–1859, 1866–1868", description: "Masterminded passage of the landmark Second Reform Act 1867." },
      { id: "12-5", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1868, 1874–1880", description: "Pioneered 'One Nation Conservatism', acquired Suez Canal shares, made Victoria Empress of India.", isMilestone: true },
      { id: "12-6", category: "post_premiership", role: "1st Earl of Beaconsfield", institutionOrDept: "House of Lords", years: "1876–1881", description: "Triumphed at Congress of Berlin 1878 ('Peace with Honour')." }
    ]
  },
  13: {
    pmId: 13,
    name: "William Gladstone",
    educationSummary: {
      school: "Eton College (Editor of Eton Miscellany)",
      higherEducation: "Christ Church, Oxford (Double First in Classics & Math, 1831)",
      qualifications: "President of the Oxford Union; Lincoln's Inn"
    },
    milestones: {
      firstElectedYear: 1832,
      firstCabinetYear: 1843,
      yearsToNo10: "36 years",
      highestPriorOffice: "Chancellor of the Exchequer (4 times)"
    },
    nodes: [
      { id: "13-1", category: "education", role: "Eton & Oxford Union President", institutionOrDept: "Christ Church, Oxford", years: "1821–1831", description: "Achieved Double First honours; renowned as the premier debater of his generation." },
      { id: "13-2", category: "parliament", role: "Member of Parliament", institutionOrDept: "Newark, Oxford Univ., Midlothian", years: "1832–1895", description: "Served over 60 years in Commons; famed for Midlothian campaign rallies." },
      { id: "13-3", category: "junior_minister", role: "Junior Lord of Treasury & Under-Secretary", institutionOrDept: "Colonial Office", years: "1834–1835", description: "Early posts in Peel's short first government." },
      { id: "13-4", category: "cabinet", role: "President of the Board of Trade", institutionOrDept: "Board of Trade", years: "1843–1845", description: "Passed the Railway Regulation Act 1844 ('Parliamentary trains')." },
      { id: "13-5", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1852–1855, 1859–1866, 1873, 1880–1882", description: "Transformed British fiscal policy, slashing tariffs and simplifying income tax." },
      { id: "13-6", category: "prime_minister", role: "Prime Minister (4 Historic Ministries)", institutionOrDept: "10 Downing Street", years: "1868–1874, 1880–1885, 1886, 1892–1894", description: "Known as 'The Grand Old Man'; passed Secret Ballot Act, Education Act 1870, and championed Irish Home Rule.", isMilestone: true }
    ]
  },
  14: {
    pmId: 14,
    name: "Lord Salisbury",
    educationSummary: {
      school: "Eton College (1840–1845)",
      higherEducation: "Christ Church, Oxford (Mathematics, 1849)",
      qualifications: "President of the Oxford Union; Chancellor of Oxford University (1869–1903)"
    },
    milestones: {
      firstElectedYear: 1853,
      firstCabinetYear: 1866,
      yearsToNo10: "32 years",
      highestPriorOffice: "Foreign Secretary & Secretary of State for India"
    },
    nodes: [
      { id: "14-1", category: "education", role: "Eton & Oxford", institutionOrDept: "Christ Church, Oxford", years: "1840–1849", description: "Studied mathematics, elected President of the Oxford Union." },
      { id: "14-2", category: "early_career", role: "Colonial Travels & Journalism", institutionOrDept: "Australia, New Zealand & Quarterly Review", years: "1851–1865", description: "Worked in Australian goldfields; prolific conservative political essayist." },
      { id: "14-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Stamford", years: "1853–1868", description: "Independent-minded Tory MP defending traditional institutions." },
      { id: "14-4", category: "cabinet", role: "Secretary of State for India", institutionOrDept: "India Office", years: "1866–1867, 1874–1878", description: "Reformed Indian civil administration and famine relief." },
      { id: "14-5", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1878–1880, 1885–1886, 1887–1892, 1895–1900", description: "Architect of 'Splendid Isolation' and the Berlin Africa Conference." },
      { id: "14-6", category: "prime_minister", role: "Prime Minister (3 Ministries)", institutionOrDept: "10 Downing Street / House of Lords", years: "1885–1886, 1886–1892, 1895–1902", description: "Presided over the peak of the British Empire; last Prime Minister to govern from the House of Lords.", isMilestone: true }
    ]
  },
  15: {
    pmId: 15,
    name: "H. H. Asquith",
    educationSummary: {
      school: "City of London School",
      higherEducation: "Balliol College, Oxford (Craven Scholar, 1st Class Lit Hum)",
      qualifications: "President of the Oxford Union; Lincoln's Inn, King's Counsel"
    },
    milestones: {
      firstElectedYear: 1886,
      firstCabinetYear: 1892,
      yearsToNo10: "22 years",
      highestPriorOffice: "Chancellor of the Exchequer & Home Secretary"
    },
    nodes: [
      { id: "15-1", category: "education", role: "Balliol Scholar & Union President", institutionOrDept: "Balliol College, Oxford", years: "1870–1874", description: "Trained under Benjamin Jowett, brilliant classical intellect." },
      { id: "15-2", category: "early_career", role: "Barrister & KC", institutionOrDept: "Lincoln's Inn", years: "1876–1890", description: "Rose to national fame representing Charles Stewart Parnell." },
      { id: "15-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "East Fife & Paisley", years: "1886–1918, 1920–1924", description: "Intellectual leader of the Liberal Imperialist wing." },
      { id: "15-4", category: "great_office", role: "Home Secretary", institutionOrDept: "Home Office", years: "1892–1895", description: "Passed progressive factory inspection and safety regulations." },
      { id: "15-5", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1905–1908", description: "Introduced state Old Age Pensions and differentiation between earned and unearned income." },
      { id: "15-6", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1908–1916", description: "Broke the House of Lords veto with the Parliament Act 1911; introduced National Insurance; led UK into WWI.", isMilestone: true },
      { id: "15-7", category: "post_premiership", role: "1st Earl of Oxford and Asquith", institutionOrDept: "House of Lords", years: "1925–1928", description: "Knight of the Garter; leader of the Liberal Party until 1926." }
    ]
  },
  16: {
    pmId: 16,
    name: "David Lloyd George",
    educationSummary: {
      school: "Llanystumdwy Church of England School, Wales",
      higherEducation: "Law Society examinations (self-taught law pupil)",
      qualifications: "Qualified Solicitor (1884)"
    },
    milestones: {
      firstElectedYear: 1890,
      firstCabinetYear: 1905,
      yearsToNo10: "26 years",
      highestPriorOffice: "Chancellor of the Exchequer & Minister of Munitions"
    },
    nodes: [
      { id: "16-1", category: "education", role: "Welsh Village Schooling", institutionOrDept: "Llanystumdwy C of E School", years: "1869–1878", description: "Raised by his cobbler uncle Richard Lloyd, who taught him French and Latin." },
      { id: "16-2", category: "early_career", role: "Radical Welsh Solicitor", institutionOrDept: "Criccieth & Portmadoc Legal Practice", years: "1884–1890", description: "Championed quarrymen, nonconformists, and Welsh tenant farmers." },
      { id: "16-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Caernarvon Boroughs", years: "1890–1945", description: "Served 55 continuous years in Commons ('The Welsh Wizard')." },
      { id: "16-4", category: "cabinet", role: "President of the Board of Trade", institutionOrDept: "Board of Trade", years: "1905–1908", description: "Settled railway strikes, established the Port of London Authority." },
      { id: "16-5", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1908–1915", description: "Delivered the historic 'People's Budget' 1909 and National Insurance Act 1911." },
      { id: "16-6", category: "cabinet", role: "Minister of Munitions & War Secretary", institutionOrDept: "Ministry of Munitions", years: "1915–1916", description: "Overcame shell shortage by vastly scaling wartime industrial production." },
      { id: "16-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1916–1922", description: "Allied victory in WWI, co-authored the Treaty of Versailles, and negotiated the 1921 Anglo-Irish Treaty.", isMilestone: true },
      { id: "16-8", category: "post_premiership", role: "Father of the House & 1st Earl Lloyd-George", institutionOrDept: "House of Commons / Lords", years: "1944–1945", description: "Longest continuous sitting MP of his era." }
    ]
  },
  17: {
    pmId: 17,
    name: "Neville Chamberlain",
    educationSummary: {
      school: "Rugby School",
      higherEducation: "Mason Science College (University of Birmingham)",
      qualifications: "Metallurgy and Business Management"
    },
    milestones: {
      firstElectedYear: 1918,
      firstCabinetYear: 1923,
      yearsToNo10: "19 years",
      highestPriorOffice: "Chancellor of the Exchequer & Minister of Health"
    },
    nodes: [
      { id: "17-1", category: "education", role: "Rugby & Mason Science College", institutionOrDept: "Mason Science College", years: "1882–1889", description: "Studied metallurgy and applied chemistry." },
      { id: "17-2", category: "early_career", role: "Plantation Manager & Industrialist", institutionOrDept: "Andros Island (Bahamas) & Hoskins & Co.", years: "1890–1914", description: "Managed 20,000-acre sisal estate; led metal manufacturing company in Birmingham." },
      { id: "17-3", category: "early_career", role: "Lord Mayor of Birmingham", institutionOrDept: "Birmingham City Council", years: "1915–1916", description: "Founded the Birmingham Municipal Bank, the only civic bank in the UK." },
      { id: "17-4", category: "parliament", role: "Member of Parliament", institutionOrDept: "Birmingham Ladywood & Edgbaston", years: "1918–1940", description: "Elected at age 49; established himself as premier domestic reformer." },
      { id: "17-5", category: "cabinet", role: "Minister of Health", institutionOrDept: "Ministry of Health", years: "1923, 1924–1929, 1931", description: "Passed 21 major social reform bills, slum clearance, and Local Government Act 1929." },
      { id: "17-6", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1923–1924, 1931–1937", description: "Oversaw recovery from the Great Depression, introduced Imperial Preference tariffs." },
      { id: "17-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1937–1940", description: "Signed Munich Agreement 1938; declared war on Nazi Germany in September 1939.", isMilestone: true },
      { id: "17-8", category: "post_premiership", role: "Lord President of the Council", institutionOrDept: "Churchill War Cabinet", years: "1940", description: "Key domestic coordinator in Churchill's coalition until ill health." }
    ]
  },
  18: {
    pmId: 18,
    name: "Winston Churchill",
    educationSummary: {
      school: "Harrow School (1888–1892)",
      higherEducation: "Royal Military College, Sandhurst",
      qualifications: "Cavalry Officer; Nobel Prize in Literature (1953)"
    },
    milestones: {
      firstElectedYear: 1900,
      firstCabinetYear: 1908,
      yearsToNo10: "40 years",
      highestPriorOffice: "Chancellor of the Exchequer, First Lord of Admiralty, Home Secretary"
    },
    nodes: [
      { id: "18-1", category: "education", role: "Harrow & Sandhurst Cadet", institutionOrDept: "Royal Military College, Sandhurst", years: "1893–1894", description: "Graduated 8th in his class of 150; commissioned into 4th Queen's Own Hussars." },
      { id: "18-2", category: "early_career", role: "Army Officer & War Correspondent", institutionOrDept: "Sudan, Cuba, South Africa", years: "1895–1900", description: "Rode in cavalry charge at Omdurman; daring escape from Boer prisoner camp made him famous." },
      { id: "18-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Oldham, Manchester, Dundee, Epping, Woodford", years: "1900–1964", description: "Served over 60 years in Commons; crossed the floor between Tories and Liberals." },
      { id: "18-4", category: "cabinet", role: "President of Board of Trade & Home Secretary", institutionOrDept: "Board of Trade & Home Office", years: "1908–1911", description: "Created national labour exchanges, minimum wage boards, and prison reforms." },
      { id: "18-5", category: "cabinet", role: "First Lord of the Admiralty", institutionOrDept: "Admiralty", years: "1911–1915, 1939–1940", description: "Modernized Royal Navy (oil conversion); resigned over Gallipoli; served in WWI trenches." },
      { id: "18-6", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1924–1929", description: "Returned Britain to the Gold Standard in 1925." },
      { id: "18-7", category: "prime_minister", role: "Prime Minister & Minister of Defence (WWI)", institutionOrDept: "10 Downing Street", years: "1940–1945", description: "Rallied the nation through the Blitz, orchestrated the Grand Alliance, and secured victory over Nazi Germany.", isMilestone: true },
      { id: "18-8", category: "prime_minister", role: "Prime Minister (Peacetime)", institutionOrDept: "10 Downing Street", years: "1951–1955", description: "Built 300,000 houses per year, supported European integration, awarded Nobel Prize in Literature.", isMilestone: true },
      { id: "18-9", category: "post_premiership", role: "Father of the House & Knight of the Garter", institutionOrDept: "House of Commons", years: "1955–1964", description: "Elder statesman; granted state funeral by Queen Elizabeth II in 1965." }
    ]
  },
  19: {
    pmId: 19,
    name: "Clement Attlee",
    educationSummary: {
      school: "Haileybury College (1896–1901)",
      higherEducation: "University College, Oxford (Modern History, 1904)",
      qualifications: "Inner Temple, Barrister; Major, British Army"
    },
    milestones: {
      firstElectedYear: 1922,
      firstCabinetYear: 1940,
      yearsToNo10: "23 years",
      highestPriorOffice: "Deputy Prime Minister & Secretary of State for Dominion Affairs"
    },
    nodes: [
      { id: "19-1", category: "education", role: "Haileybury & Oxford", institutionOrDept: "University College, Oxford", years: "1896–1904", description: "Earned honours in Modern History; joined Inner Temple." },
      { id: "19-2", category: "early_career", role: "Social Worker & LSE Lecturer", institutionOrDept: "East End Settlements & London School of Economics", years: "1907–1914", description: "Deeply transformed by poverty in Stepney; lectured in social science at LSE." },
      { id: "19-3", category: "early_career", role: "Major in South Lancashire Regiment", institutionOrDept: "British Army (WWI)", years: "1914–1919", description: "Served at Gallipoli, Mesopotamia, and France; wounded in action." },
      { id: "19-4", category: "parliament", role: "Mayor of Stepney & MP", institutionOrDept: "Limehouse & Walthamstow West", years: "1919–1955", description: "Championed housing and maternal care in East London; elected MP in 1922." },
      { id: "19-5", category: "cabinet", role: "Leader of the Labour Party", institutionOrDept: "Labour Party", years: "1935–1955", description: "Led Labour for two decades through transformation into government." },
      { id: "19-6", category: "great_office", role: "Deputy Prime Minister", institutionOrDept: "Churchill War Coalition", years: "1940–1945", description: "Ran domestic and economic war cabinet while Churchill focused on military strategy." },
      { id: "19-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1945–1951", description: "Founded the National Health Service (NHS), welfare state, nationalized key utilities, granted Indian independence, and co-founded NATO.", isMilestone: true },
      { id: "19-8", category: "post_premiership", role: "1st Earl Attlee & Knight of the Garter", institutionOrDept: "House of Lords", years: "1955–1967", description: "Active in the Lords; celebrated as one of Britain's most consequential Prime Ministers." }
    ]
  },
  20: {
    pmId: 20,
    name: "Harold Macmillan",
    educationSummary: {
      school: "Eton College (King's Scholar 1906–1910)",
      higherEducation: "Balliol College, Oxford (Exhibitioner in Classics)",
      qualifications: "Grenadier Guards Captain (WWI); Chancellor of Oxford University"
    },
    milestones: {
      firstElectedYear: 1924,
      firstCabinetYear: 1951,
      yearsToNo10: "33 years",
      highestPriorOffice: "Chancellor of the Exchequer & Foreign Secretary"
    },
    nodes: [
      { id: "20-1", category: "education", role: "Eton & Balliol Classicist", institutionOrDept: "Balliol College, Oxford", years: "1906–1914", description: "Studied classics, interrupted by outbreak of the Great War." },
      { id: "20-2", category: "early_career", role: "WWI Officer & Publisher", institutionOrDept: "Grenadier Guards & Macmillan Publishers", years: "1914–1924", description: "Wounded three times on Somme; returned to direct the family publishing house." },
      { id: "20-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Stockton-on-Tees & Bromley", years: "1924–1964", description: "Authored 'The Middle Way' (1938), advocating mixed-economy capitalism." },
      { id: "20-4", category: "cabinet", role: "Minister Resident in Northwest Africa", institutionOrDept: "Allied HQ, Algiers", years: "1942–1945", description: "Forged close alliance with General Dwight D. Eisenhower." },
      { id: "20-5", category: "cabinet", role: "Minister of Housing & Local Government", institutionOrDept: "Ministry of Housing", years: "1951–1954", description: "Delivered on pledge to build 300,000 homes a year." },
      { id: "20-6", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1955", description: "Represented UK at the Geneva Summit." },
      { id: "20-7", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1955–1957", description: "Introduced Premium Bonds in 1956; managed finances during Suez." },
      { id: "20-8", category: "prime_minister", role: "Prime Minister ('Supermac')", institutionOrDept: "10 Downing Street", years: "1957–1963", description: "Rebuilt US Special Relationship, 'Never had it so good' boom, delivered 'Wind of Change' decolonization speech, signed 1963 Nuclear Test Ban Treaty.", isMilestone: true },
      { id: "20-9", category: "post_premiership", role: "1st Earl of Stockton", institutionOrDept: "House of Lords & Oxford", years: "1960–1986", description: "Chancellor of Oxford University; delivered celebrated maiden speech in Lords at age 90." }
    ]
  },
  21: {
    pmId: 21,
    name: "Harold Wilson",
    educationSummary: {
      school: "Royds Hall Grammar & Wirral Grammar School",
      higherEducation: "Jesus College, Oxford (Starred 1st Class PPE, 1937)",
      qualifications: "Fellow & Economics Lecturer at University College, Oxford"
    },
    milestones: {
      firstElectedYear: 1945,
      firstCabinetYear: 1947,
      yearsToNo10: "19 years",
      highestPriorOffice: "President of the Board of Trade & Shadow Chancellor"
    },
    nodes: [
      { id: "21-1", category: "education", role: "Starred First at Oxford", institutionOrDept: "Jesus College, Oxford", years: "1934–1937", description: "One of Oxford's most brilliant economists; student of William Beveridge." },
      { id: "21-2", category: "early_career", role: "Oxford Don & War Statistician", institutionOrDept: "Univ. College Oxford & Ministry of Fuel", years: "1937–1944", description: "Lectured in economics and advised the War Cabinet on coal supply." },
      { id: "21-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Ormskirk & Huyton", years: "1945–1983", description: "Elected in Labour's 1945 landslide; master debater." },
      { id: "21-4", category: "cabinet", role: "President of the Board of Trade", institutionOrDept: "Board of Trade", years: "1947–1951", description: "Youngest Cabinet minister of the 20th century at age 31 ('bonfire of controls')." },
      { id: "21-5", category: "cabinet", role: "Leader of the Labour Party", institutionOrDept: "Labour Party", years: "1963–1976", description: "Campaigned on the 'white heat of the technological revolution'." },
      { id: "21-6", category: "prime_minister", role: "Prime Minister (First Era)", institutionOrDept: "10 Downing Street", years: "1964–1970", description: "Founded the Open University, ended capital punishment, modernized divorce and abortion laws, kept UK troops out of Vietnam.", isMilestone: true },
      { id: "21-7", category: "prime_minister", role: "Prime Minister (Second Era)", institutionOrDept: "10 Downing Street", years: "1974–1976", description: "Resolved industrial disputes and confirmed British EEC membership in the 1975 referendum before surprise resignation.", isMilestone: true }
    ]
  },
  22: {
    pmId: 22,
    name: "Edward Heath",
    educationSummary: {
      school: "Chatham House Grammar School, Ramsgate",
      higherEducation: "Balliol College, Oxford (PPE & Organ Scholar, 1939)",
      qualifications: "President of the Oxford Union; Gray's Inn; MBE (Mil)"
    },
    milestones: {
      firstElectedYear: 1950,
      firstCabinetYear: 1959,
      yearsToNo10: "20 years",
      highestPriorOffice: "President of the Board of Trade & Lord Privy Seal"
    },
    nodes: [
      { id: "22-1", category: "education", role: "Balliol Scholar & Oxford Union President", institutionOrDept: "Balliol College, Oxford", years: "1935–1939", description: "Organ scholar and debater, staunch opponent of appeasement." },
      { id: "22-2", category: "early_career", role: "Artillery Officer & Merchant Banker", institutionOrDept: "Royal Artillery & Brown Shipley", years: "1940–1950", description: "Served in NW Europe (MBE); later civil servant and merchant banker." },
      { id: "22-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Bexley / Old Bexley and Sidcup", years: "1950–2001", description: "Served 51 continuous years; Father of the House (1992–2001)." },
      { id: "22-4", category: "junior_minister", role: "Government Chief Whip", institutionOrDept: "HM Treasury", years: "1955–1959", description: "Maintained party discipline through the Suez crisis with iron resolve." },
      { id: "22-5", category: "cabinet", role: "Lord Privy Seal (Europe Negotiator)", institutionOrDept: "Foreign Office", years: "1960–1963", description: "Led the UK's first round of EEC entry talks, awarded Charlemagne Prize." },
      { id: "22-6", category: "cabinet", role: "Secretary for Industry & Board of Trade", institutionOrDept: "Board of Trade", years: "1963–1964", description: "Abolished Resale Price Maintenance to promote retail competition." },
      { id: "22-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1970–1974", description: "Took the United Kingdom into the European Economic Community (EEC) in 1973; introduced decimal currency.", isMilestone: true }
    ]
  },
  23: {
    pmId: 23,
    name: "James Callaghan",
    educationSummary: {
      school: "Portsmouth Northern Secondary School (left at 16)",
      higherEducation: "Civil service & self-taught trade union economics",
      qualifications: "Royal Navy Lieutenant (WWII)"
    },
    milestones: {
      firstElectedYear: 1945,
      firstCabinetYear: 1964,
      yearsToNo10: "31 years",
      highestPriorOffice: "Chancellor, Home Secretary & Foreign Secretary (all 3 Great Offices)"
    },
    nodes: [
      { id: "23-1", category: "education", role: "Portsmouth Schooling", institutionOrDept: "Portsmouth Northern Secondary", years: "1924–1928", description: "Passed senior civil service clerical exam at 16." },
      { id: "23-2", category: "early_career", role: "Tax Officer & Union Leader", institutionOrDept: "Inland Revenue & Taxes Union", years: "1929–1942", description: "Tax inspector; assistant secretary of Association of Officers of Taxes." },
      { id: "23-3", category: "early_career", role: "Royal Navy Lieutenant", institutionOrDept: "Royal Navy Volunteer Reserve", years: "1942–1945", description: "Saw wartime service on battleships in the East Indies Fleet." },
      { id: "23-4", category: "parliament", role: "Member of Parliament", institutionOrDept: "Cardiff South / South East", years: "1945–1987", description: "Served 42 continuous years for Cardiff; Father of the House (1983–1987)." },
      { id: "23-5", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1964–1967", description: "Introduced Capital Gains Tax and Corporation Tax; devalued the pound in 1967." },
      { id: "23-6", category: "great_office", role: "Home Secretary", institutionOrDept: "Home Office", years: "1967–1970", description: "Deployed British Army to Northern Ireland in 1969; passed Race Relations Act 1968." },
      { id: "23-7", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1974–1976", description: "Renegotiated EEC terms before the 1975 referendum (only person to hold all four Great Offices)." },
      { id: "23-8", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1976–1979", description: "Navigated minority government with Lib-Lab pact; premiership overshadowed by the 1978–79 'Winter of Discontent'.", isMilestone: true }
    ]
  },
  24: {
    pmId: 24,
    name: "Margaret Thatcher",
    educationSummary: {
      school: "Kesteven and Grantham Girls' School (Head Girl)",
      higherEducation: "Somerville College, Oxford (BSc Chemistry, 1947)",
      qualifications: "Lincoln's Inn, Barrister (Tax Law, 1954)"
    },
    milestones: {
      firstElectedYear: 1959,
      firstCabinetYear: 1970,
      yearsToNo10: "20 years",
      highestPriorOffice: "Secretary of State for Education and Science"
    },
    nodes: [
      { id: "24-1", category: "education", role: "Grammar School & Oxford Chemistry", institutionOrDept: "Somerville College, Oxford", years: "1943–1947", description: "Researched X-ray crystallography; President of Oxford University Conservative Association." },
      { id: "24-2", category: "early_career", role: "Research Chemist & Tax Barrister", institutionOrDept: "BX Plastics, J. Lyons & Lincoln's Inn", years: "1947–1959", description: "Food emulsifier chemist; called to the bar specializing in tax law." },
      { id: "24-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Finchley", years: "1959–1992", description: "Elected to Commons, made maiden speech promoting public council meetings." },
      { id: "24-4", category: "junior_minister", role: "Parliamentary Secretary for Pensions", institutionOrDept: "Ministry of Pensions", years: "1961–1964", description: "Early frontbench administrative post under Macmillan." },
      { id: "24-5", category: "cabinet", role: "Secretary of State for Education and Science", institutionOrDept: "Department of Education", years: "1970–1974", description: "Expanded comprehensive schools and Open University budget." },
      { id: "24-6", category: "cabinet", role: "Leader of the Opposition", institutionOrDept: "Conservative Party", years: "1975–1979", description: "First female leader of a major Western political party ('The Iron Lady')." },
      { id: "24-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1979–1990", description: "Britain's first female Prime Minister, won 3 general elections: Falklands War victory, widespread privatization, deregulation ('Big Bang'), and Cold War leadership.", isMilestone: true },
      { id: "24-8", category: "post_premiership", role: "Baroness Thatcher of Kesteven", institutionOrDept: "House of Lords", years: "1992–2013", description: "Lady of the Garter; published global memoirs and founded the Thatcher Foundation." }
    ]
  },
  25: {
    pmId: 25,
    name: "John Major",
    educationSummary: {
      school: "Rutlish School, Merton (left at 16)",
      higherEducation: "Correspondence courses in banking",
      qualifications: "Associate of the Chartered Institute of Bankers (ACIB)"
    },
    milestones: {
      firstElectedYear: 1979,
      firstCabinetYear: 1987,
      yearsToNo10: "11 years",
      highestPriorOffice: "Chancellor of the Exchequer & Foreign Secretary"
    },
    nodes: [
      { id: "25-1", category: "education", role: "Grammar Schooling", institutionOrDept: "Rutlish School, Merton", years: "1954–1959", description: "Left school at 16 with three O-levels to support his family." },
      { id: "25-2", category: "early_career", role: "Banker & Local Councillor", institutionOrDept: "Standard Chartered Bank & Lambeth Council", years: "1965–1979", description: "Became senior bank PR executive; served as Lambeth Housing Committee Chairman." },
      { id: "25-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Huntingdonshire / Huntingdon", years: "1979–2001", description: "Elected alongside Thatcher's first majority." },
      { id: "25-4", category: "junior_minister", role: "Government Whip & Social Security Minister", institutionOrDept: "Treasury & DHSS", years: "1983–1987", description: "Praised for quiet competence and interpersonal mastery." },
      { id: "25-5", category: "cabinet", role: "Chief Secretary to the Treasury", institutionOrDept: "HM Treasury", years: "1987–1989", description: "Entered Cabinet managing tough public spending negotiations." },
      { id: "25-6", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign Office", years: "1989", description: "Brief summer term negotiating with European allies." },
      { id: "25-7", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1989–1990", description: "Presented the first televised Budget; joined the European ERM." },
      { id: "25-8", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1990–1997", description: "Gulf War leadership, won surprise 1992 general election, replaced poll tax with Council Tax, created National Lottery, and established the Downing Street Declaration for peace in Northern Ireland.", isMilestone: true }
    ]
  },
  26: {
    pmId: 26,
    name: "Tony Blair",
    educationSummary: {
      school: "Fettes College, Edinburgh (1966–1971)",
      higherEducation: "St John's College, Oxford (BA Law, 1975)",
      qualifications: "Lincoln's Inn, Barrister-at-Law (1976)"
    },
    milestones: {
      firstElectedYear: 1983,
      firstCabinetYear: 1994,
      yearsToNo10: "14 years",
      highestPriorOffice: "Shadow Home Secretary & Leader of the Opposition"
    },
    nodes: [
      { id: "26-1", category: "education", role: "Fettes & Oxford Law", institutionOrDept: "St John's College, Oxford", years: "1966–1975", description: "Studied jurisprudence at Oxford; played in rock band 'Ugly Rumours'." },
      { id: "26-2", category: "early_career", role: "Employment Law Barrister", institutionOrDept: "11 King's Bench Walk", years: "1976–1983", description: "Trained under Derry Irvine; specialized in trade union and commercial law." },
      { id: "26-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Sedgefield", years: "1983–2007", description: "Elected at age 30; quickly became leading modernizer in Labour." },
      { id: "26-4", category: "cabinet", role: "Shadow Home Secretary", institutionOrDept: "Shadow Cabinet", years: "1992–1994", description: "Coined slogan: 'Tough on crime, tough on the causes of crime'." },
      { id: "26-5", category: "cabinet", role: "Leader of the Labour Party", institutionOrDept: "Labour Party", years: "1994–1997", description: "Modernized Clause IV; created 'New Labour'." },
      { id: "26-6", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "1997–2007", description: "Won three consecutive general election landslides: Good Friday Agreement 1998, Scottish and Welsh devolution, National Minimum Wage, Bank of England independence, intervention in Sierra Leone and Kosovo, and military involvement in Iraq/Afghanistan.", isMilestone: true },
      { id: "26-7", category: "post_premiership", role: "Middle East Envoy & Founder", institutionOrDept: "Quartet on Middle East & TBI", years: "2007–present", description: "Knight of the Garter; founder of the Tony Blair Institute for Global Change." }
    ]
  },
  27: {
    pmId: 27,
    name: "Gordon Brown",
    educationSummary: {
      school: "Kirkcaldy High School (Accelerated Stream)",
      higherEducation: "University of Edinburgh (MA 1st Class, 1972; PhD in History, 1982)",
      qualifications: "Elected Rector of University of Edinburgh (1972–1975)"
    },
    milestones: {
      firstElectedYear: 1983,
      firstCabinetYear: 1997,
      yearsToNo10: "24 years",
      highestPriorOffice: "Chancellor of the Exchequer (10 continuous years)"
    },
    nodes: [
      { id: "27-1", category: "education", role: "Edinburgh University & Doctorate", institutionOrDept: "University of Edinburgh", years: "1967–1982", description: "Entered university at age 16; earned PhD on Scottish Labour history." },
      { id: "27-2", category: "early_career", role: "University Lecturer & TV Producer", institutionOrDept: "Glasgow College & Scottish Television", years: "1976–1983", description: "Taught politics and produced investigative current affairs documentaries." },
      { id: "27-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Dunfermline East & Kirkcaldy", years: "1983–2015", description: "Entered Commons in 1983 sharing an office with Tony Blair." },
      { id: "27-4", category: "cabinet", role: "Shadow Chancellor of the Exchequer", institutionOrDept: "Shadow Cabinet", years: "1992–1997", description: "Established iron reputation for fiscal discipline and economic prudence." },
      { id: "27-5", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "1997–2007", description: "Longest continuous Chancellor in modern history (10 years); granted independence to Bank of England, introduced Working Families Tax Credit." },
      { id: "27-6", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2007–2010", description: "Led international response to the 2008 global financial crisis with bank recapitalization; hosted landmark 2009 London G20 Summit; enacted Climate Change Act 2008 and Equality Act 2010.", isMilestone: true },
      { id: "27-7", category: "post_premiership", role: "UN Special Envoy for Global Education", institutionOrDept: "United Nations & WHO", years: "2012–present", description: "Global advocate for youth education and international public health financing." }
    ]
  },
  28: {
    pmId: 28,
    name: "David Cameron",
    educationSummary: {
      school: "Eton College (1979–1984)",
      higherEducation: "Brasenose College, Oxford (1st Class PPE, 1988)",
      qualifications: "Oxford University, Bullingdon Club member"
    },
    milestones: {
      firstElectedYear: 2001,
      firstCabinetYear: 2005,
      yearsToNo10: "9 years",
      highestPriorOffice: "Leader of the Opposition & Shadow Education Secretary"
    },
    nodes: [
      { id: "28-1", category: "education", role: "Eton & First in PPE at Oxford", institutionOrDept: "Brasenose College, Oxford", years: "1979–1988", description: "Studied under Vernon Bogdanor, achieving First Class honours in PPE." },
      { id: "28-2", category: "early_career", role: "Special Adviser & Media Director", institutionOrDept: "HM Treasury, Home Office & Carlton TV", years: "1988–2001", description: "Adviser to Norman Lamont and Michael Howard; Director of Corporate Affairs at Carlton." },
      { id: "28-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Witney", years: "2001–2016", description: "Rapid rise on Conservative backbenches; co-authored 2005 manifesto." },
      { id: "28-4", category: "cabinet", role: "Leader of the Conservative Party", institutionOrDept: "Opposition", years: "2005–2010", description: "Modernized party image ('Compassionate Conservatism')." },
      { id: "28-5", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2010–2016", description: "Formed first post-war coalition government with Lib Dems (2010–2015), won 2015 Tory majority, legalized Same-Sex Marriage (2013), Scottish independence referendum (2014), resigned after Brexit referendum (2016).", isMilestone: true },
      { id: "28-6", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign, Commonwealth & Development Office", years: "2023–2024", description: "Returned to high Cabinet office as Lord Cameron of Chipping Norton under Rishi Sunak." }
    ]
  },
  29: {
    pmId: 29,
    name: "Theresa May",
    educationSummary: {
      school: "Wheatley Park Comprehensive School",
      higherEducation: "St Hugh's College, Oxford (BA Geography, 1977)",
      qualifications: "Oxford Union debater"
    },
    milestones: {
      firstElectedYear: 1997,
      firstCabinetYear: 2010,
      yearsToNo10: "19 years",
      highestPriorOffice: "Home Secretary (longest-serving in over 60 years)"
    },
    nodes: [
      { id: "29-1", category: "education", role: "Comprehensive School & Oxford", institutionOrDept: "St Hugh's College, Oxford", years: "1971–1977", description: "Read geography; met husband Philip at an Oxford student disco." },
      { id: "29-2", category: "early_career", role: "Bank of England & Payment Services", institutionOrDept: "Bank of England & APACS", years: "1977–1997", description: "Senior financial consultant and clearing service policy adviser." },
      { id: "29-3", category: "early_career", role: "London Borough Councillor", institutionOrDept: "Merton Council", years: "1986–1994", description: "Chaired Education Committee and served as Deputy Group Leader." },
      { id: "29-4", category: "parliament", role: "Member of Parliament", institutionOrDept: "Maidenhead", years: "1997–2024", description: "Elected MP in 1997; served continuous 27 years." },
      { id: "29-5", category: "cabinet", role: "Conservative Party Chairman", institutionOrDept: "Conservative Party", years: "2002–2003", description: "Delivered famous 'nasty party' wake-up speech urging modernization." },
      { id: "29-6", category: "great_office", role: "Home Secretary", institutionOrDept: "Home Office", years: "2010–2016", description: "Served 6 years as Home Secretary; overhauled police misconduct rules and passed Modern Slavery Act 2015." },
      { id: "29-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2016–2019", description: "Triggered Article 50 Brexit process; negotiated EU Withdrawal Agreement; legislated UK commitment to Net Zero carbon emissions by 2050.", isMilestone: true },
      { id: "29-8", category: "post_premiership", role: "Baroness May of Maidenhead", institutionOrDept: "House of Lords", years: "2024–present", description: "Elevated to House of Lords after standing down from the Commons in 2024." }
    ]
  },
  30: {
    pmId: 30,
    name: "Boris Johnson",
    educationSummary: {
      school: "Eton College (King's Scholar 1977–1982)",
      higherEducation: "Balliol College, Oxford (Literae Humaniores, 1987)",
      qualifications: "President of the Oxford Union (1986)"
    },
    milestones: {
      firstElectedYear: 2001,
      firstCabinetYear: 2016,
      yearsToNo10: "18 years",
      highestPriorOffice: "Foreign Secretary & Mayor of London (two terms)"
    },
    nodes: [
      { id: "30-1", category: "education", role: "Eton Scholar & Balliol Classicist", institutionOrDept: "Balliol College, Oxford", years: "1977–1987", description: "Studied ancient Greek and Latin literature; elected Oxford Union President." },
      { id: "30-2", category: "early_career", role: "Journalist & Editor", institutionOrDept: "The Daily Telegraph & The Spectator", years: "1987–2005", description: "Brussels correspondent for the Telegraph; celebrated editor of The Spectator magazine." },
      { id: "30-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Henley & Uxbridge and South Ruislip", years: "2001–2008, 2015–2023", description: "High-profile parliamentary backbencher and media personality." },
      { id: "30-4", category: "cabinet", role: "Mayor of London (Two Terms)", institutionOrDept: "Greater London Authority", years: "2008–2016", description: "Oversaw 2012 London Olympic Games, introduced 'Boris Bikes', New Bus for London, and Crossrail progress." },
      { id: "30-5", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign & Commonwealth Office", years: "2016–2018", description: "Coordinated diplomatic expulsion of Russian diplomats following Salisbury novichok attack." },
      { id: "30-6", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2019–2022", description: "Won 80-seat Conservative majority in 2019 on 'Get Brexit Done'; executed UK exit from EU single market; spearheaded UK pandemic vaccine rollout and decisive early military aid to Ukraine.", isMilestone: true }
    ]
  },
  31: {
    pmId: 31,
    name: "Liz Truss",
    educationSummary: {
      school: "Roundhay School, Leeds",
      higherEducation: "Merton College, Oxford (PPE, 1996)",
      qualifications: "President of Oxford University Liberal Democrats; ACMA Accountant"
    },
    milestones: {
      firstElectedYear: 2010,
      firstCabinetYear: 2014,
      yearsToNo10: "12 years",
      highestPriorOffice: "Foreign Secretary & International Trade Secretary"
    },
    nodes: [
      { id: "31-1", category: "education", role: "State Comprehensive & Oxford", institutionOrDept: "Merton College, Oxford", years: "1987–1996", description: "Read Philosophy, Politics and Economics; campaigned on student politics." },
      { id: "31-2", category: "early_career", role: "Chartered Management Accountant & Think Tank", institutionOrDept: "Shell, Cable & Wireless, Reform Think Tank", years: "1996–2010", description: "Qualified ACMA accountant; deputy director of the Reform think tank." },
      { id: "31-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "South West Norfolk", years: "2010–2024", description: "Elected in 2010 general election; co-authored 'Britannia Unchained'." },
      { id: "31-4", category: "junior_minister", role: "Parliamentary Under-Secretary for Education", institutionOrDept: "Department for Education", years: "2012–2014", description: "Reformed mathematics curriculum and child care qualifications." },
      { id: "31-5", category: "cabinet", role: "Environment Secretary & Justice Secretary", institutionOrDept: "Defra & Ministry of Justice", years: "2014–2017", description: "First female Lord Chancellor in history." },
      { id: "31-6", category: "cabinet", role: "Chief Secretary to Treasury & Trade Secretary", institutionOrDept: "Treasury & Department for International Trade", years: "2017–2021", description: "Negotiated post-Brexit free trade deals with Australia, New Zealand, and Japan." },
      { id: "31-7", category: "great_office", role: "Foreign Secretary", institutionOrDept: "Foreign, Commonwealth & Development Office", years: "2021–2022", description: "Led UK sanctions against Russia following the 2022 invasion of Ukraine." },
      { id: "31-8", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2022", description: "Shortest premiership in British history (49 days); introduced domestic Energy Price Guarantee and Growth Plan mini-budget.", isMilestone: true }
    ]
  },
  32: {
    pmId: 32,
    name: "Rishi Sunak",
    educationSummary: {
      school: "Winchester College (Head Boy)",
      higherEducation: "Lincoln College, Oxford (1st Class PPE, 2001) & Stanford University (MBA, 2006)",
      qualifications: "Fulbright Scholar at Stanford Business School"
    },
    milestones: {
      firstElectedYear: 2015,
      firstCabinetYear: 2019,
      yearsToNo10: "7 years",
      highestPriorOffice: "Chancellor of the Exchequer"
    },
    nodes: [
      { id: "32-1", category: "education", role: "Winchester, Oxford & Stanford", institutionOrDept: "Winchester, Oxford & Stanford University", years: "1993–2006", description: "First Class PPE at Oxford; Fulbright Scholar at Stanford Business School." },
      { id: "32-2", category: "early_career", role: "Investment Banker & Hedge Fund Partner", institutionOrDept: "Goldman Sachs, TCI & Theleme Partners", years: "2001–2015", description: "Analyst at Goldman Sachs; partner in prominent investment funds." },
      { id: "32-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Richmond (Yorks)", years: "2015–present", description: "Elected to succeed William Hague in Yorkshire seat." },
      { id: "32-4", category: "junior_minister", role: "Parliamentary Under-Secretary for Local Govt", institutionOrDept: "Ministry of Housing, Communities & Local Govt", years: "2018–2019", description: "Managed local government funding and council partnerships." },
      { id: "32-5", category: "cabinet", role: "Chief Secretary to the Treasury", institutionOrDept: "HM Treasury", years: "2019–2020", description: "Promoted by Boris Johnson to lead government spending review." },
      { id: "32-6", category: "great_office", role: "Chancellor of the Exchequer", institutionOrDept: "HM Treasury", years: "2020–2022", description: "Created the Coronavirus Job Retention Scheme (furlough), Eat Out to Help Out, and super-deduction capital scheme during COVID-19." },
      { id: "32-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2022–2024", description: "First British Asian and Hindu Prime Minister; restored economic stability, signed the Windsor Framework with the EU, and hosted the world's first AI Safety Summit at Bletchley Park.", isMilestone: true }
    ]
  },
  33: {
    pmId: 33,
    name: "Keir Starmer",
    educationSummary: {
      school: "Reigate Grammar School (1974–1981)",
      higherEducation: "University of Leeds (LLB 1st Class, 1985) & St Edmund Hall, Oxford (BCL, 1986)",
      qualifications: "Middle Temple; Queen's Counsel (QC); Knight Commander of the Bath (KCB)"
    },
    milestones: {
      firstElectedYear: 2015,
      firstCabinetYear: 2020,
      yearsToNo10: "9 years",
      highestPriorOffice: "Director of Public Prosecutions (DPP) & Shadow Brexit Secretary"
    },
    nodes: [
      { id: "33-1", category: "education", role: "Leeds Law & Oxford BCL", institutionOrDept: "Univ. of Leeds & St Edmund Hall, Oxford", years: "1981–1986", description: "First in his family to attend university, graduated with First Class honours in Law." },
      { id: "33-2", category: "early_career", role: "Human Rights Barrister & QC", institutionOrDept: "Doughty Street Chambers", years: "1990–2008", description: "Co-founded prominent human rights set; advised Northern Ireland Policing Board on Good Friday compliance." },
      { id: "33-3", category: "early_career", role: "Director of Public Prosecutions (DPP)", institutionOrDept: "Crown Prosecution Service (CPS)", years: "2008–2013", description: "Head of the CPS, knighted in 2014 for services to law and criminal justice." },
      { id: "33-4", category: "parliament", role: "Member of Parliament", institutionOrDept: "Holborn and St Pancras", years: "2015–present", description: "Elected MP in 2015; appointed Shadow Immigration Minister." },
      { id: "33-5", category: "cabinet", role: "Shadow Brexit Secretary", institutionOrDept: "Shadow Cabinet", years: "2016–2020", description: "Crafted Labour's parliamentary strategy on EU withdrawal negotiations." },
      { id: "33-6", category: "cabinet", role: "Leader of the Labour Party", institutionOrDept: "Labour Party", years: "2020–2024", description: "Transformed party discipline and modernized policy platform." },
      { id: "33-7", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2024–2026", description: "Led Labour to historic landslide victory with 411 seats in the 2024 general election; launched GB Energy, planning liberalization, and national industrial strategy.", isMilestone: true }
    ]
  },
  34: {
    pmId: 34,
    name: "Andy Burnham",
    educationSummary: {
      school: "St Ambrose Barlow RC High School, Swinton",
      higherEducation: "Fitzwilliam College, Cambridge (MA English Literature, 1991)",
      qualifications: "Cambridge graduate; First directly elected Mayor of Greater Manchester"
    },
    milestones: {
      firstElectedYear: 2001,
      firstCabinetYear: 2007,
      yearsToNo10: "25 years",
      highestPriorOffice: "Mayor of Greater Manchester, Health Secretary & Culture Secretary"
    },
    nodes: [
      { id: "34-1", category: "education", role: "Swinton Comprehensive & Cambridge", institutionOrDept: "Fitzwilliam College, Cambridge", years: "1981–1991", description: "Read English Literature at Cambridge; passionate football enthusiast." },
      { id: "34-2", category: "early_career", role: "Parliamentary Researcher & Special Adviser", institutionOrDept: "Tessa Jowell MP, UNISON & DCMS", years: "1994–2001", description: "Adviser to Culture Secretary Chris Smith on sports and national lottery funding." },
      { id: "34-3", category: "parliament", role: "Member of Parliament", institutionOrDept: "Leigh", years: "2001–2017", description: "Elected MP for Leigh in Greater Manchester, held seat for 16 years." },
      { id: "34-4", category: "junior_minister", role: "Parliamentary Under-Secretary & Health Minister", institutionOrDept: "Home Office & Department of Health", years: "2005–2007", description: "Appointed junior minister under Tony Blair." },
      { id: "34-5", category: "cabinet", role: "Chief Secretary to the Treasury", institutionOrDept: "HM Treasury", years: "2007–2008", description: "Entered Cabinet under Gordon Brown managing public spending." },
      { id: "34-6", category: "cabinet", role: "Secretary of State for Culture & Health", institutionOrDept: "DCMS & Department of Health", years: "2008–2010", description: "Championed disclosure of Hillsborough disaster official files; passed Cancer Reform Strategy." },
      { id: "34-7", category: "cabinet", role: "Shadow Education & Shadow Home Secretary", institutionOrDept: "Shadow Cabinet", years: "2010–2016", description: "Key frontbencher; advocated integration of health and social care." },
      { id: "34-8", category: "early_career", role: "Mayor of Greater Manchester ('King of the North')", institutionOrDept: "Greater Manchester Combined Authority", years: "2017–2026", description: "Elected metro mayor; unified buses and trams into the municipal 'Bee Network'; championed regional devolution." },
      { id: "34-9", category: "prime_minister", role: "Prime Minister", institutionOrDept: "10 Downing Street", years: "2026–present", description: "Entered Downing Street championing nationwide regional devolution, integrated public transit, and comprehensive social care reform.", isMilestone: true }
    ]
  }
};
