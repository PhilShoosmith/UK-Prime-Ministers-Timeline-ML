export interface ContemporaryRuler {
  name: string;
  reignOrTerm: string;
  roleTitle?: string;
  badge?: string;
}

export interface PMTenureHighlights {
  pmId: number;
  pmName: string;
  highlights: {
    title: string;
    description: string;
    yearOrSpan?: string;
  }[];
  contemporaries: {
    ukMonarchs: ContemporaryRuler[];
    usPresidents: ContemporaryRuler[];
    frenchRulers: ContemporaryRuler[];
  };
}

export const tenureHighlightsData: Record<number, PMTenureHighlights> = {
  1: {
    pmId: 1,
    pmName: "Robert Walpole",
    highlights: [
      {
        title: "Establishment of 10 Downing Street",
        description: "Accepted 10 Downing Street from King George II in 1735 as the official residence of the First Lord of the Treasury, creating the enduring seat of British government.",
        yearOrSpan: "1735"
      },
      {
        title: "South Sea Bubble Resolution",
        description: "Skillfully stabilized national finances and restored public credit in the wake of the catastrophic South Sea Company stock collapse.",
        yearOrSpan: "1721–1723"
      },
      {
        title: "Pioneering Cabinet Government",
        description: "Forged the role of Prime Minister, establishing collective Cabinet responsibility and maintaining parliamentary majorities for over two decades.",
        yearOrSpan: "1721–1742"
      },
      {
        title: "Peace Policy & War of Jenkins' Ear",
        description: "Avoided continental entanglements to promote trade and low taxation until forced into naval war with Spain in 1739 ('They now ring the bells; they will soon wring their hands').",
        yearOrSpan: "1739–1742"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George I", reignOrTerm: "1714–1727", roleTitle: "King of Great Britain" },
        { name: "George II", reignOrTerm: "1727–1760", roleTitle: "King of Great Britain" }
      ],
      usPresidents: [
        { name: "British Colonial Era", reignOrTerm: "Pre-Independence", roleTitle: "Thirteen British Colonies", badge: "Colonial" }
      ],
      frenchRulers: [
        { name: "Louis XV", reignOrTerm: "1715–1774", roleTitle: "King of France (Regency of Philippe d'Orléans to 1723)" }
      ]
    }
  },
  2: {
    pmId: 2,
    pmName: "William Pitt the Elder",
    highlights: [
      {
        title: "Creation of the Chatham Administration",
        description: "Formed a non-partisan government seeking national unity, elevated to the House of Lords as 1st Earl of Chatham.",
        yearOrSpan: "1766"
      },
      {
        title: "Colonial Crisis & Townshend Acts",
        description: "Struggled with escalating American colonial defiance following the Townshend duties, despite his earlier defense of colonial rights.",
        yearOrSpan: "1767"
      },
      {
        title: "Ill Health & Executive Paralysis",
        description: "Severely afflicted by gout and depression, leaving effective control of government to Augustus FitzRoy, 3rd Duke of Grafton.",
        yearOrSpan: "1767–1768"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George III", reignOrTerm: "1760–1820", roleTitle: "King of Great Britain" }
      ],
      usPresidents: [
        { name: "British Colonial Era", reignOrTerm: "Pre-Independence", roleTitle: "Townshend Acts Period", badge: "Colonial" }
      ],
      frenchRulers: [
        { name: "Louis XV", reignOrTerm: "1715–1774", roleTitle: "King of France (Ministry of Choiseul)" }
      ]
    }
  },
  3: {
    pmId: 3,
    pmName: "Lord North",
    highlights: [
      {
        title: "Boston Tea Party & Coercive Acts",
        description: "Responded to the Boston Tea Party (1773) by enacting the Coercive ('Intolerable') Acts, precipitating armed conflict in Massachusetts.",
        yearOrSpan: "1773–1774"
      },
      {
        title: "American Revolutionary War",
        description: "Directed British political and military strategy through the Declaration of Independence (1776) and war against the American colonies, France, and Spain.",
        yearOrSpan: "1775–1782"
      },
      {
        title: "Gordon Riots in London",
        description: "Faced violent anti-Catholic rioting that paralyzed London for a week, resulting in hundreds dead and the mobilization of troops.",
        yearOrSpan: "1780"
      },
      {
        title: "Fall of Yorktown & Historic Resignation",
        description: "Received news of Cornwallis's surrender at Yorktown with 'Oh God, it is all over!'; resigned in March 1782 following the first successful parliamentary no-confidence vote.",
        yearOrSpan: "1781–1782"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George III", reignOrTerm: "1760–1820", roleTitle: "King of Great Britain" }
      ],
      usPresidents: [
        { name: "Continental Congress", reignOrTerm: "1774–1782", roleTitle: "Peyton Randolph, John Hancock & Samuel Huntington (Pre-Presidency)", badge: "Revolutionary" }
      ],
      frenchRulers: [
        { name: "Louis XV", reignOrTerm: "1715–1774", roleTitle: "King of France" },
        { name: "Louis XVI", reignOrTerm: "1774–1792", roleTitle: "King of France (Allied with USA)" }
      ]
    }
  },
  4: {
    pmId: 4,
    pmName: "William Pitt the Younger",
    highlights: [
      {
        title: "Youngest Prime Minister in British History",
        description: "Took office in December 1783 at the age of 24, defying critics who called his ministry a 'mince-pie administration' that wouldn't survive Christmas.",
        yearOrSpan: "1783"
      },
      {
        title: "Acts of Union 1800",
        description: "United the Kingdom of Great Britain and the Kingdom of Ireland to create the United Kingdom of Great Britain and Ireland, effective 1 January 1801.",
        yearOrSpan: "1800–1801"
      },
      {
        title: "Introduction of Income Tax",
        description: "Introduced Britain's very first peacetime Income Tax in 1799 at a rate of 10% on incomes over £200 to fund the coalition wars against revolutionary France.",
        yearOrSpan: "1799"
      },
      {
        title: "Coalition Wars Against Napoleon",
        description: "Formed successive European alliances against Revolutionary France and Napoleon Bonaparte, securing British naval supremacy at Trafalgar (1805).",
        yearOrSpan: "1793–1806"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George III", reignOrTerm: "1760–1820", roleTitle: "King of Great Britain / United Kingdom" }
      ],
      usPresidents: [
        { name: "George Washington", reignOrTerm: "1789–1797", roleTitle: "1st US President" },
        { name: "John Adams", reignOrTerm: "1797–1801", roleTitle: "2nd US President" },
        { name: "Thomas Jefferson", reignOrTerm: "1801–1809", roleTitle: "3rd US President" }
      ],
      frenchRulers: [
        { name: "Louis XVI", reignOrTerm: "1774–1792", roleTitle: "King of France" },
        { name: "National Convention & Directory", reignOrTerm: "1792–1799", roleTitle: "First French Republic" },
        { name: "Napoleon Bonaparte", reignOrTerm: "1799–1814", roleTitle: "First Consul (1799) & Emperor Napoleon I (1804)" }
      ]
    }
  },
  5: {
    pmId: 5,
    pmName: "Spencer Perceval",
    highlights: [
      {
        title: "Orders in Council & Economic Warfare",
        description: "Strictly enforced commercial blockades against French-dominated Europe, escalating trade friction with neutral American shipping.",
        yearOrSpan: "1809–1812"
      },
      {
        title: "The Regency Act 1811",
        description: "Guided legislation through Parliament as King George III suffered final incapacity, establishing the Prince of Wales as Prince Regent.",
        yearOrSpan: "1811"
      },
      {
        title: "Financing the Peninsular War",
        description: "Maintained vital financial and logistical backing for the Duke of Wellington's armies campaigning across Portugal and Spain.",
        yearOrSpan: "1810–1812"
      },
      {
        title: "Assassination in Parliament",
        description: "The only British Prime Minister assassinated in office; shot in the House of Commons lobby on 11 May 1812 by aggrieved merchant John Bellingham.",
        yearOrSpan: "1812"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George III", reignOrTerm: "1760–1820", roleTitle: "King (Prince Regent from 1811)" }
      ],
      usPresidents: [
        { name: "James Madison", reignOrTerm: "1809–1817", roleTitle: "4th US President (Lead-up to War of 1812)" }
      ],
      frenchRulers: [
        { name: "Napoleon I", reignOrTerm: "1804–1814", roleTitle: "Emperor of the French" }
      ]
    }
  },
  6: {
    pmId: 6,
    pmName: "Robert Jenkinson, 2nd Earl of Liverpool",
    highlights: [
      {
        title: "Victory at Waterloo & Congress of Vienna",
        description: "Oversaw the defeat of Napoleon at Waterloo (1815) and the redrawing of the European map alongside Foreign Secretary Castlereagh.",
        yearOrSpan: "1815"
      },
      {
        title: "Conclusion of the War of 1812",
        description: "Ended the conflict with the United States via the Treaty of Ghent in December 1814, establishing enduring Anglo-American peace.",
        yearOrSpan: "1814"
      },
      {
        title: "Corn Laws & Peterloo Massacre",
        description: "Enacted protective tariffs on imported grain (1815) and suppressed post-war radical unrest, including the Peterloo Massacre (1819) and the Six Acts.",
        yearOrSpan: "1815–1819"
      },
      {
        title: "Gold Standard & Economic Modernization",
        description: "Restored cash payments and anchored the British pound to the gold standard (1821), fostering the Victorian commercial boom over nearly 15 years in power.",
        yearOrSpan: "1821"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George III", reignOrTerm: "1812–1820", roleTitle: "Prince Regent governing" },
        { name: "George IV", reignOrTerm: "1820–1830", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "James Madison", reignOrTerm: "1809–1817", roleTitle: "4th US President" },
        { name: "James Monroe", reignOrTerm: "1817–1825", roleTitle: "5th US President (Era of Good Feelings)" },
        { name: "John Quincy Adams", reignOrTerm: "1825–1829", roleTitle: "6th US President" }
      ],
      frenchRulers: [
        { name: "Napoleon I", reignOrTerm: "1804–1814, 1815", roleTitle: "First French Empire & Hundred Days" },
        { name: "Louis XVIII", reignOrTerm: "1814–1824", roleTitle: "King of France (Bourbon Restoration)" },
        { name: "Charles X", reignOrTerm: "1824–1830", roleTitle: "King of France" }
      ]
    }
  },
  7: {
    pmId: 7,
    pmName: "Arthur Wellesley, 1st Duke of Wellington",
    highlights: [
      {
        title: "Catholic Emancipation Act 1829",
        description: "Forced through Roman Catholic civil and political rights alongside Robert Peel to avert civil insurrection in Ireland, splitting the Tory party.",
        yearOrSpan: "1829"
      },
      {
        title: "Duel with the Earl of Winchilsea",
        description: "Fought a pistol duel in Battersea Fields in March 1829 over accusations that Catholic emancipation disguised treacherous designs against Church and State.",
        yearOrSpan: "1829"
      },
      {
        title: "Creation of the Metropolitan Police",
        description: "Supported Home Secretary Robert Peel in passing the Metropolitan Police Act 1829, establishing the world's first modern professional civilian police force.",
        yearOrSpan: "1829"
      },
      {
        title: "Fierce Opposition to Parliamentary Reform",
        description: "Defended the unreformed British constitution as perfect, provoking riots and the fall of his ministry amid the European revolutions of 1830.",
        yearOrSpan: "1830"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George IV", reignOrTerm: "1820–1830", roleTitle: "King of the United Kingdom" },
        { name: "William IV", reignOrTerm: "1830–1837", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "John Quincy Adams", reignOrTerm: "1825–1829", roleTitle: "6th US President" },
        { name: "Andrew Jackson", reignOrTerm: "1829–1837", roleTitle: "7th US President" }
      ],
      frenchRulers: [
        { name: "Charles X", reignOrTerm: "1824–1830", roleTitle: "King of France (Deposed in July 1830)" },
        { name: "Louis-Philippe I", reignOrTerm: "1830–1848", roleTitle: "King of the French (July Monarchy)" }
      ]
    }
  },
  8: {
    pmId: 8,
    pmName: "Charles Grey, 2nd Earl Grey",
    highlights: [
      {
        title: "The Great Reform Act 1832",
        description: "Abolished 56 'rotten boroughs', granted parliamentary seats to expanding industrial cities (Manchester, Birmingham, Leeds), and expanded the voting franchise by 50-80%.",
        yearOrSpan: "1832"
      },
      {
        title: "Slavery Abolition Act 1833",
        description: "Outlawed chattel slavery across the vast majority of the British Empire, freeing roughly 800,000 enslaved people in the Caribbean, Mauritius, and South Africa.",
        yearOrSpan: "1833"
      },
      {
        title: "Factory Act 1833",
        description: "Barred children under nine from working in textile mills and established the nation's first government factory inspectors.",
        yearOrSpan: "1833"
      },
      {
        title: "Poor Law Amendment Act 1834",
        description: "Overhauled parish relief and established the centralized union workhouse system across England and Wales.",
        yearOrSpan: "1834"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "William IV", reignOrTerm: "1830–1837", roleTitle: "The 'Sailor King'" }
      ],
      usPresidents: [
        { name: "Andrew Jackson", reignOrTerm: "1829–1837", roleTitle: "7th US President" }
      ],
      frenchRulers: [
        { name: "Louis-Philippe I", reignOrTerm: "1830–1848", roleTitle: "King of the French ('Citizen King')" }
      ]
    }
  },
  9: {
    pmId: 9,
    pmName: "Robert Peel",
    highlights: [
      {
        title: "Tamworth Manifesto & Modern Conservatism",
        description: "Issued the 1834 Tamworth Manifesto, pledging pragmatic reform of proven abuses and establishing the foundational ideology of the modern Conservative Party.",
        yearOrSpan: "1834"
      },
      {
        title: "Repeal of the Corn Laws",
        description: "Abolished protective food tariffs in 1846 to alleviate starvation during the Great Irish Famine, sacrificing his own party unity for national welfare.",
        yearOrSpan: "1846"
      },
      {
        title: "Re-introduction of Income Tax",
        description: "Restored a 7d per pound peacetime Income Tax in 1842 to eliminate fiscal deficits and finance tariff reductions on hundreds of consumer goods.",
        yearOrSpan: "1842"
      },
      {
        title: "Factory Act & Bank Charter Act",
        description: "Capped daily working hours for women and children (1844 Factory Act) and tied Bank of England banknote issuance directly to gold reserves (1844 Bank Charter Act).",
        yearOrSpan: "1844"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "William IV", reignOrTerm: "1830–1837", roleTitle: "King of the United Kingdom (1834–35)" },
        { name: "Queen Victoria", reignOrTerm: "1837–1901", roleTitle: "Queen of the United Kingdom (1841–46)" }
      ],
      usPresidents: [
        { name: "Andrew Jackson", reignOrTerm: "1829–1837", roleTitle: "7th US President (1834–35)" },
        { name: "John Tyler", reignOrTerm: "1841–1845", roleTitle: "10th US President" },
        { name: "James K. Polk", reignOrTerm: "1845–1849", roleTitle: "11th US President" }
      ],
      frenchRulers: [
        { name: "Louis-Philippe I", reignOrTerm: "1830–1848", roleTitle: "King of the French" }
      ]
    }
  },
  10: {
    pmId: 10,
    pmName: "Lord Melbourne",
    highlights: [
      {
        title: "Mentor to the Young Queen Victoria",
        description: "Served as trusted private adviser, political tutor, and father figure to the 18-year-old Queen Victoria upon her accession in June 1837.",
        yearOrSpan: "1837–1841"
      },
      {
        title: "The Bedchamber Crisis",
        description: "Resigned in May 1839 but returned when Queen Victoria refused Robert Peel's demand to replace her Whig Ladies of the Bedchamber.",
        yearOrSpan: "1839"
      },
      {
        title: "Municipal Corporations Act 1835",
        description: "Democratized municipal government in 178 towns across England and Wales with elected town councils.",
        yearOrSpan: "1835"
      },
      {
        title: "Introduction of Uniform Penny Post",
        description: "Adopted Rowland Hill's postal reforms in 1840, establishing the Penny Black adhesive postage stamp and prepaid national mail delivery.",
        yearOrSpan: "1840"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "William IV", reignOrTerm: "1830–1837", roleTitle: "King of the United Kingdom" },
        { name: "Queen Victoria", reignOrTerm: "1837–1901", roleTitle: "Queen of the United Kingdom (Accession 1837)" }
      ],
      usPresidents: [
        { name: "Andrew Jackson", reignOrTerm: "1829–1837", roleTitle: "7th US President" },
        { name: "Martin Van Buren", reignOrTerm: "1837–1841", roleTitle: "8th US President" },
        { name: "William Henry Harrison / John Tyler", reignOrTerm: "1841", roleTitle: "9th & 10th US Presidents" }
      ],
      frenchRulers: [
        { name: "Louis-Philippe I", reignOrTerm: "1830–1848", roleTitle: "King of the French" }
      ]
    }
  },
  11: {
    pmId: 11,
    pmName: "Lord Palmerston",
    highlights: [
      {
        title: "Conclusion of the Crimean War",
        description: "Brought decisive energy to the coalition war effort against Imperial Russia, concluding the conflict via the Treaty of Paris in 1856.",
        yearOrSpan: "1855–1856"
      },
      {
        title: "Government of India Act 1858",
        description: "Dissolved the British East India Company following the Indian Rebellion of 1857, bringing the subcontinent under direct British Crown rule.",
        yearOrSpan: "1858"
      },
      {
        title: "American Civil War Neutrality & Trent Affair",
        description: "Skillfully maintained British neutrality throughout the American Civil War, diffusing naval war tensions during the Trent Affair crisis in late 1861.",
        yearOrSpan: "1861–1865"
      },
      {
        title: "Gunboat Diplomacy & Popular Patriotism",
        description: "Championed British imperial prestige and nationalist freedom abroad ('Civis Romanus sum'), dying in office at age 80 in 1865.",
        yearOrSpan: "1859–1865"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Victoria", reignOrTerm: "1837–1901", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Franklin Pierce", reignOrTerm: "1853–1857", roleTitle: "14th US President" },
        { name: "James Buchanan", reignOrTerm: "1857–1861", roleTitle: "15th US President" },
        { name: "Abraham Lincoln", reignOrTerm: "1861–1865", roleTitle: "16th US President (American Civil War)" },
        { name: "Andrew Johnson", reignOrTerm: "1865–1869", roleTitle: "17th US President" }
      ],
      frenchRulers: [
        { name: "Napoleon III", reignOrTerm: "1852–1870", roleTitle: "Emperor of the French (Second French Empire)" }
      ]
    }
  },
  12: {
    pmId: 12,
    pmName: "Benjamin Disraeli",
    highlights: [
      {
        title: "Purchase of Suez Canal Shares",
        description: "Secured a controlling 44% stake in the Suez Canal for Britain in 1875 by borrowing £4 million from the Rothschilds, safeguarding the vital maritime route to India.",
        yearOrSpan: "1875"
      },
      {
        title: "Empress of India (Royal Titles Act)",
        description: "Conferred the imperial title 'Empress of India' (Kaisar-i-Hind) on Queen Victoria in 1876, delighting the monarch and tightening imperial bonds.",
        yearOrSpan: "1876"
      },
      {
        title: "Triumph at the Congress of Berlin",
        description: "Checkmated Russian expansion in the Balkans and acquired Cyprus for Britain at the 1878 Congress of Berlin, returning home proclaiming 'Peace with honour'.",
        yearOrSpan: "1878"
      },
      {
        title: "Tory Social Reform Legislation",
        description: "Passed landmark reforms including the Public Health Act 1875, Artisans' Dwellings Act (slum clearance), and legal protections for trade union picketing.",
        yearOrSpan: "1875"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Victoria", reignOrTerm: "1837–1901", roleTitle: "Queen (created Empress of India 1876)" }
      ],
      usPresidents: [
        { name: "Andrew Johnson", reignOrTerm: "1865–1869", roleTitle: "17th US President (in 1868)" },
        { name: "Ulysses S. Grant", reignOrTerm: "1869–1877", roleTitle: "18th US President" },
        { name: "Rutherford B. Hayes", reignOrTerm: "1877–1881", roleTitle: "19th US President" }
      ],
      frenchRulers: [
        { name: "Napoleon III", reignOrTerm: "1852–1870", roleTitle: "Emperor of the French (in 1868)" },
        { name: "Patrice de MacMahon", reignOrTerm: "1873–1879", roleTitle: "President of the Third French Republic" },
        { name: "Jules Grévy", reignOrTerm: "1879–1887", roleTitle: "President of the Third French Republic" }
      ]
    }
  },
  13: {
    pmId: 13,
    pmName: "William Gladstone",
    highlights: [
      {
        title: "First Irish Home Rule Bill",
        description: "Split the Liberal Party in 1886 by championing Irish parliamentary Home Rule, arguing 'The Ireland of today will be the Britain of tomorrow.'",
        yearOrSpan: "1886"
      },
      {
        title: "Elementary Education Act 1870",
        description: "Laid the foundation for universal national schooling across England and Wales under William Forster.",
        yearOrSpan: "1870"
      },
      {
        title: "Secret Ballot Act 1872",
        description: "Outlawed open intimidation and bribery at elections by instituting the secret ballot at parliamentary and municipal contests.",
        yearOrSpan: "1872"
      },
      {
        title: "Third Reform Act 1884",
        description: "Extended household voting rights to rural agricultural laborers, adding roughly 1.8 million male voters to the national rolls.",
        yearOrSpan: "1884"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Victoria", reignOrTerm: "1837–1901", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Ulysses S. Grant", reignOrTerm: "1869–1877", roleTitle: "18th US President" },
        { name: "Chester A. Arthur", reignOrTerm: "1881–1885", roleTitle: "21st US President" },
        { name: "Grover Cleveland", reignOrTerm: "1885–1889, 1893–1897", roleTitle: "22nd & 24th US President" },
        { name: "Benjamin Harrison", reignOrTerm: "1889–1893", roleTitle: "23rd US President" }
      ],
      frenchRulers: [
        { name: "Napoleon III", reignOrTerm: "1852–1870", roleTitle: "Emperor of the French (to 1870)" },
        { name: "Adolphe Thiers & MacMahon", reignOrTerm: "1871–1879", roleTitle: "Presidents of the Third Republic" },
        { name: "Jules Grévy & Sadi Carnot", reignOrTerm: "1879–1894", roleTitle: "Presidents of the Third Republic" }
      ]
    }
  },
  14: {
    pmId: 14,
    pmName: "Lord Salisbury",
    highlights: [
      {
        title: "'Splendid Isolation' Foreign Policy",
        description: "Masterminded British foreign policy over nearly two decades, avoiding binding continental treaty alliances while safeguarding maritime supremacy.",
        yearOrSpan: "1886–1902"
      },
      {
        title: "The Scramble for Africa",
        description: "Secured expansive British colonial territories through diplomacy and treaties, asserting authority across Nigeria, Kenya, Uganda, Sudan, and Zimbabwe.",
        yearOrSpan: "1886–1898"
      },
      {
        title: "The Second Boer War",
        description: "Led Britain through the challenging South African conflict against the Boer Republics, ending with the Treaty of Vereeniging in May 1902.",
        yearOrSpan: "1899–1902"
      },
      {
        title: "Last Prime Minister from the Lords",
        description: "The last British head of government to lead the country from the House of Lords; presided over Queen Victoria's Diamond Jubilee in 1897.",
        yearOrSpan: "1895–1902"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Victoria", reignOrTerm: "1837–1901", roleTitle: "Queen of the United Kingdom (Golden & Diamond Jubilees)" },
        { name: "Edward VII", reignOrTerm: "1901–1910", roleTitle: "King of the United Kingdom (Accession 1901)" }
      ],
      usPresidents: [
        { name: "Grover Cleveland", reignOrTerm: "1885–1889, 1893–1897", roleTitle: "22nd & 24th US President" },
        { name: "Benjamin Harrison", reignOrTerm: "1889–1893", roleTitle: "23rd US President" },
        { name: "William McKinley", reignOrTerm: "1897–1901", roleTitle: "25th US President (Assassinated 1901)" },
        { name: "Theodore Roosevelt", reignOrTerm: "1901–1909", roleTitle: "26th US President" }
      ],
      frenchRulers: [
        { name: "Jules Grévy & Sadi Carnot", reignOrTerm: "1885–1894", roleTitle: "Presidents of the Third Republic" },
        { name: "Félix Faure & Émile Loubet", reignOrTerm: "1895–1906", roleTitle: "Presidents of the Third Republic" }
      ]
    }
  },
  15: {
    pmId: 15,
    pmName: "H. H. Asquith",
    highlights: [
      {
        title: "Birth of the British Welfare State",
        description: "Introduced non-contributory Old Age Pensions (1908) and the National Insurance Act 1911 (health and unemployment benefits), laying foundations of modern social security.",
        yearOrSpan: "1908–1911"
      },
      {
        title: "The Parliament Act 1911",
        description: "Broke the permanent legislative veto of the unelected House of Lords following the constitutional clash over Lloyd George's 'People's Budget'.",
        yearOrSpan: "1911"
      },
      {
        title: "Entry into World War I",
        description: "Took Britain into the Great War on 4 August 1914 to defend Belgian neutrality against German invasion.",
        yearOrSpan: "1914"
      },
      {
        title: "Wartime Mobilization & Battle of the Somme",
        description: "Formed a coalition government in 1915, introduced military conscription, and presided over the costly Western Front campaigns until stepping down in Dec 1916.",
        yearOrSpan: "1915–1916"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Edward VII", reignOrTerm: "1901–1910", roleTitle: "King of the United Kingdom" },
        { name: "George V", reignOrTerm: "1910–1936", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Theodore Roosevelt", reignOrTerm: "1901–1909", roleTitle: "26th US President" },
        { name: "William Howard Taft", reignOrTerm: "1909–1913", roleTitle: "27th US President" },
        { name: "Woodrow Wilson", reignOrTerm: "1913–1921", roleTitle: "28th US President" }
      ],
      frenchRulers: [
        { name: "Armand Fallières", reignOrTerm: "1906–1913", roleTitle: "President of the Third Republic" },
        { name: "Raymond Poincaré", reignOrTerm: "1913–1920", roleTitle: "President of the Third Republic (World War I)" }
      ]
    }
  },
  16: {
    pmId: 16,
    pmName: "David Lloyd George",
    highlights: [
      {
        title: "Leading Britain to Victory in World War I",
        description: "Dynamic wartime leader ('The Man Who Won the War') who centralized war manufacturing, established a small War Cabinet, and instituted shipping convoys.",
        yearOrSpan: "1916–1918"
      },
      {
        title: "Paris Peace Conference & Treaty of Versailles",
        description: "Represented the British Empire as one of the 'Big Three' (with Wilson and Clemenceau), shaping the 1919 Versailles Peace settlement.",
        yearOrSpan: "1919"
      },
      {
        title: "Universal Adult Suffrage & Votes for Women",
        description: "Enacted the Representation of the People Act 1918, granting voting rights to all men over 21 and women over 30.",
        yearOrSpan: "1918"
      },
      {
        title: "The Anglo-Irish Treaty 1921",
        description: "Negotiated the treaty with Michael Collins and Arthur Griffith that established the self-governing Irish Free State, ending the Irish War of Independence.",
        yearOrSpan: "1921"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George V", reignOrTerm: "1910–1936", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Woodrow Wilson", reignOrTerm: "1913–1921", roleTitle: "28th US President (Versailles 'Big Three')" },
        { name: "Warren G. Harding", reignOrTerm: "1921–1923", roleTitle: "29th US President" }
      ],
      frenchRulers: [
        { name: "Raymond Poincaré", reignOrTerm: "1913–1920", roleTitle: "President of the Third Republic" },
        { name: "Georges Clemenceau", reignOrTerm: "1917–1920", roleTitle: "Premier of France ('The Tiger')" },
        { name: "Alexandre Millerand", reignOrTerm: "1920–1924", roleTitle: "President of the Third Republic" }
      ]
    }
  },
  17: {
    pmId: 17,
    pmName: "Neville Chamberlain",
    highlights: [
      {
        title: "Munich Agreement ('Peace for our time')",
        description: "Pursued European appeasement to prevent war, signing the Munich Agreement with Hitler, Mussolini, and Daladier in September 1938.",
        yearOrSpan: "1938"
      },
      {
        title: "Accelerated British Rearmament",
        description: "Prioritized funding for the Royal Air Force's Spitfire and Hurricane fighter squadrons and the revolutionary Chain Home coastal radar shield.",
        yearOrSpan: "1937–1939"
      },
      {
        title: "Declaration of War on Germany",
        description: "Announced to the British nation on 3 September 1939 that Britain was at war with Nazi Germany following Hitler's unprovoked invasion of Poland.",
        yearOrSpan: "1939"
      },
      {
        title: "The Norway Debate & Resignation",
        description: "Resigned in May 1940 following the historic parliamentary Norway debate, in which Leo Amery famously cried 'In the name of God, go!'",
        yearOrSpan: "1940"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George VI", reignOrTerm: "1936–1952", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Franklin D. Roosevelt", reignOrTerm: "1933–1945", roleTitle: "32nd US President" }
      ],
      frenchRulers: [
        { name: "Albert Lebrun", reignOrTerm: "1932–1940", roleTitle: "President of the Third Republic" },
        { name: "Édouard Daladier", reignOrTerm: "1938–1940", roleTitle: "Prime Minister of France (Munich co-signatory)" }
      ]
    }
  },
  18: {
    pmId: 18,
    pmName: "Winston Churchill",
    highlights: [
      {
        title: "Leading the Nation in WWII & The Blitz",
        description: "Rallied the British Empire with immortal speeches during 1940 ('We shall fight on the beaches', 'Their finest hour'), standing defiant against Nazi Europe.",
        yearOrSpan: "1940–1941"
      },
      {
        title: "The Grand Alliance & D-Day",
        description: "Formed the victorious tripartite alliance with Roosevelt and Stalin, directing allied strategy at Tehran and Yalta, and launching Operation Overlord (D-Day).",
        yearOrSpan: "1941–1945"
      },
      {
        title: "VE Day Celebrations",
        description: "Announced the unconditional surrender of Nazi Germany on 8 May 1945 from the Cabinet War Rooms and addressed jubilant crowds in Whitehall.",
        yearOrSpan: "1945"
      },
      {
        title: "Second Premiership (1951–1955)",
        description: "Presided over Queen Elizabeth II's Coronation (1953), ended post-war rationing, tested Britain's first atomic bomb, and won the Nobel Prize in Literature.",
        yearOrSpan: "1951–1955"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George VI", reignOrTerm: "1936–1952", roleTitle: "King of the United Kingdom (Wartime partner)" },
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom (Coronation 1953)" }
      ],
      usPresidents: [
        { name: "Franklin D. Roosevelt", reignOrTerm: "1933–1945", roleTitle: "32nd US President (Close allied partner)" },
        { name: "Harry S. Truman", reignOrTerm: "1945–1953", roleTitle: "33rd US President (Potsdam Conference)" },
        { name: "Dwight D. Eisenhower", reignOrTerm: "1953–1961", roleTitle: "34th US President" }
      ],
      frenchRulers: [
        { name: "Charles de Gaulle", reignOrTerm: "1940–1946", roleTitle: "Leader of Free France & Provisional Govt" },
        { name: "Philippe Pétain", reignOrTerm: "1940–1944", roleTitle: "Chief of State of Vichy France" },
        { name: "Vincent Auriol & René Coty", reignOrTerm: "1947–1959", roleTitle: "Presidents of the Fourth Republic" }
      ]
    }
  },
  19: {
    pmId: 19,
    pmName: "Clement Attlee",
    highlights: [
      {
        title: "Creation of the National Health Service",
        description: "Launched the NHS on 5 July 1948 alongside Health Minister Aneurin Bevan, guaranteeing medical care free at the point of delivery for all citizens.",
        yearOrSpan: "1948"
      },
      {
        title: "Building the Post-War Welfare State",
        description: "Implemented the landmark Beveridge Report through comprehensive National Insurance, child allowances, and social safety nets.",
        yearOrSpan: "1945–1948"
      },
      {
        title: "Large-Scale Nationalization",
        description: "Brought roughly 20% of the economy into public ownership, including the Bank of England, coal mining, civil aviation, telecommunications, railways, gas, and electricity.",
        yearOrSpan: "1946–1950"
      },
      {
        title: "Decolonization & Founding of NATO",
        description: "Granted independence to India and Pakistan (1947), Ceylon and Burma, and took Britain into NATO as a founding member with Foreign Secretary Ernest Bevin.",
        yearOrSpan: "1947–1949"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "George VI", reignOrTerm: "1936–1952", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Harry S. Truman", reignOrTerm: "1945–1953", roleTitle: "33rd US President (Marshall Plan & NATO)" }
      ],
      frenchRulers: [
        { name: "Charles de Gaulle", reignOrTerm: "1944–1946", roleTitle: "Chairman of the Provisional Government" },
        { name: "Vincent Auriol", reignOrTerm: "1947–1954", roleTitle: "President of the Fourth Republic" }
      ]
    }
  },
  20: {
    pmId: 20,
    pmName: "Harold Macmillan",
    highlights: [
      {
        title: "'Never Had It So Good'",
        description: "Delivered his iconic 1957 speech celebrating post-war consumer prosperity, leading the Conservatives to an increased 100-seat majority in 1959.",
        yearOrSpan: "1957–1959"
      },
      {
        title: "The 'Wind of Change' Speech",
        description: "Delivered his epochal address to the Parliament of South Africa in 1960, signaling British acceptance of African national independence movements.",
        yearOrSpan: "1960"
      },
      {
        title: "Repairing the Special Relationship",
        description: "Rebuilt the US alliance following the Suez Crisis with close personal friends Dwight D. Eisenhower and John F. Kennedy.",
        yearOrSpan: "1957–1962"
      },
      {
        title: "Polaris & Nuclear Test Ban Treaty",
        description: "Negotiated the Nassau Agreement securing American Polaris nuclear missiles and co-signed the historic Partial Nuclear Test Ban Treaty in Moscow (1963).",
        yearOrSpan: "1962–1963"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Dwight D. Eisenhower", reignOrTerm: "1953–1961", roleTitle: "34th US President" },
        { name: "John F. Kennedy", reignOrTerm: "1961–1963", roleTitle: "35th US President (Nassau Agreement)" }
      ],
      frenchRulers: [
        { name: "René Coty", reignOrTerm: "1954–1959", roleTitle: "President of the Fourth Republic" },
        { name: "Charles de Gaulle", reignOrTerm: "1959–1969", roleTitle: "President of the Fifth Republic (Vetoed UK EEC entry in 1963)" }
      ]
    }
  },
  21: {
    pmId: 21,
    pmName: "Harold Wilson",
    highlights: [
      {
        title: "'White Heat of Technology' & Open University",
        description: "Championed British industrial modernization and created the Open University in 1969, dramatically democratizing higher education.",
        yearOrSpan: "1964–1969"
      },
      {
        title: "Liberal Social Reforms of the 1960s",
        description: "Passed transformative progressive laws: legalizing abortion (1967), decriminalizing homosexuality (1967), abolishing capital punishment (1965), and the Equal Pay Act (1970).",
        yearOrSpan: "1965–1970"
      },
      {
        title: "Resisting Troop Deployment to Vietnam",
        description: "Kept British military combat personnel entirely out of the Vietnam War, resisting intense diplomatic lobbying from US President Lyndon B. Johnson.",
        yearOrSpan: "1965–1970"
      },
      {
        title: "First UK Common Market Referendum 1975",
        description: "Staged the UK's first nationwide public referendum on staying in the European Economic Community (EEC), winning a decisive 67% mandate to remain.",
        yearOrSpan: "1975"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Lyndon B. Johnson", reignOrTerm: "1963–1969", roleTitle: "36th US President" },
        { name: "Richard Nixon", reignOrTerm: "1969–1974", roleTitle: "37th US President" },
        { name: "Gerald Ford", reignOrTerm: "1974–1977", roleTitle: "38th US President" }
      ],
      frenchRulers: [
        { name: "Charles de Gaulle", reignOrTerm: "1959–1969", roleTitle: "President of the Fifth Republic" },
        { name: "Georges Pompidou", reignOrTerm: "1969–1974", roleTitle: "President of the Fifth Republic" },
        { name: "Valéry Giscard d'Estaing", reignOrTerm: "1974–1981", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  22: {
    pmId: 22,
    pmName: "Edward Heath",
    highlights: [
      {
        title: "British Entry into the European Community",
        description: "Achieved the crowning goal of his political career by signing the Treaty of Accession, taking Britain into the EEC (Common Market) on 1 January 1973.",
        yearOrSpan: "1973"
      },
      {
        title: "Decimal Day (15 February 1971)",
        description: "Successfully transitioned the British monetary system from pounds, shillings, and pence to a modern decimal currency based on 100 pence to the pound.",
        yearOrSpan: "1971"
      },
      {
        title: "Direct Rule & Sunningdale Agreement",
        description: "Suspended the Stormont Parliament following Bloody Sunday (1972) and negotiated the power-sharing Sunningdale Agreement for Northern Ireland.",
        yearOrSpan: "1972–1973"
      },
      {
        title: "The Three-Day Week Crisis",
        description: "Faced the 1973 global oil shock and major coal miners' strikes, imposing the Three-Day Week on British industry before losing the February 1974 snap election.",
        yearOrSpan: "1973–1974"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Richard Nixon", reignOrTerm: "1969–1974", roleTitle: "37th US President" }
      ],
      frenchRulers: [
        { name: "Georges Pompidou", reignOrTerm: "1969–1974", roleTitle: "President of the Fifth Republic (Supported UK EEC Entry)" }
      ]
    }
  },
  23: {
    pmId: 23,
    pmName: "James Callaghan",
    highlights: [
      {
        title: "Holding All Four Great Offices of State",
        description: "The only politician in British history to have served as Chancellor, Home Secretary, Foreign Secretary, and Prime Minister.",
        yearOrSpan: "1976"
      },
      {
        title: "IMF Loan & Spending Reductions",
        description: "Negotiated a historic $3.9 billion emergency loan from the International Monetary Fund (IMF) in 1976 to halt a precipitous collapse of sterling.",
        yearOrSpan: "1976"
      },
      {
        title: "The Lib–Lab Pact",
        description: "Maintained minority government stability from March 1977 to July 1978 through a formal parliamentary cooperation agreement with David Steel's Liberals.",
        yearOrSpan: "1977–1978"
      },
      {
        title: "Winter of Discontent & Fall of Government",
        description: "Widespread public sector strikes paralyzed Britain during the bitter winter of 1978–79; lost a historic vote of no confidence by 311 to 310 in March 1979.",
        yearOrSpan: "1978–1979"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom (Silver Jubilee 1977)" }
      ],
      usPresidents: [
        { name: "Gerald Ford", reignOrTerm: "1974–1977", roleTitle: "38th US President" },
        { name: "Jimmy Carter", reignOrTerm: "1977–1981", roleTitle: "39th US President" }
      ],
      frenchRulers: [
        { name: "Valéry Giscard d'Estaing", reignOrTerm: "1974–1981", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  24: {
    pmId: 24,
    pmName: "Margaret Thatcher",
    highlights: [
      {
        title: "The Falklands War Victory",
        description: "Dispatched a naval task force 8,000 miles to the South Atlantic in 1982 to liberate the Falkland Islands from Argentine military invasion.",
        yearOrSpan: "1982"
      },
      {
        title: "Thatcherism & Mass Privatization",
        description: "Transformed the British economy through market deregulation ('Big Bang' 1986), Council house sales ('Right to Buy'), and privatizing BT, British Gas, and BA.",
        yearOrSpan: "1979–1990"
      },
      {
        title: "Miners' Strike & Union Reforms",
        description: "Prevailed in the year-long National Union of Mineworkers strike (1984–85) and enacted legislation requiring secret strike ballots.",
        yearOrSpan: "1984–1985"
      },
      {
        title: "Cold War Partnership with Reagan & Gorbachev",
        description: "Allied closely with Ronald Reagan and famously assessed Soviet leader Mikhail Gorbachev as 'a man I can do business with', helping end the Cold War.",
        yearOrSpan: "1984–1989"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Jimmy Carter", reignOrTerm: "1977–1981", roleTitle: "39th US President" },
        { name: "Ronald Reagan", reignOrTerm: "1981–1989", roleTitle: "40th US President (Allied closely with Thatcher)" },
        { name: "George H. W. Bush", reignOrTerm: "1989–1993", roleTitle: "41st US President" }
      ],
      frenchRulers: [
        { name: "Valéry Giscard d'Estaing", reignOrTerm: "1974–1981", roleTitle: "President of the Fifth Republic" },
        { name: "François Mitterrand", reignOrTerm: "1981–1995", roleTitle: "President of the Fifth Republic (Channel Tunnel co-signatory)" }
      ]
    }
  },
  25: {
    pmId: 25,
    pmName: "John Major",
    highlights: [
      {
        title: "The Gulf War (Operation Desert Storm)",
        description: "Deployed 53,000 British troops as part of the international coalition that liberated Kuwait from Iraqi occupation in 1991.",
        yearOrSpan: "1991"
      },
      {
        title: "Abolition of the Poll Tax",
        description: "Scrapped the divisive Community Charge ('Poll Tax') in favor of the Council Tax (1992), and won an unexpected fourth consecutive Tory general election victory.",
        yearOrSpan: "1991–1992"
      },
      {
        title: "Black Wednesday (16 September 1992)",
        description: "Forced to withdraw sterling from the European Exchange Rate Mechanism (ERM) after speculative currency runs exhausted foreign exchange reserves.",
        yearOrSpan: "1992"
      },
      {
        title: "Downing Street Declaration for Northern Ireland",
        description: "Signed the historic Joint Declaration with Irish Taoiseach Albert Reynolds in December 1993, opening the path to the 1994 IRA and loyalist ceasefires.",
        yearOrSpan: "1993"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom ('Annus Horribilis' 1992)" }
      ],
      usPresidents: [
        { name: "George H. W. Bush", reignOrTerm: "1989–1993", roleTitle: "41st US President (Gulf War alliance)" },
        { name: "Bill Clinton", reignOrTerm: "1993–2001", roleTitle: "42nd US President" }
      ],
      frenchRulers: [
        { name: "François Mitterrand", reignOrTerm: "1981–1995", roleTitle: "President of the Fifth Republic" },
        { name: "Jacques Chirac", reignOrTerm: "1995–2007", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  26: {
    pmId: 26,
    pmName: "Tony Blair",
    highlights: [
      {
        title: "The Good Friday Agreement 1998",
        description: "Brokered the historic peace accord on 10 April 1998 alongside Bertie Ahern and George Mitchell, ending 30 years of violent conflict in Northern Ireland.",
        yearOrSpan: "1998"
      },
      {
        title: "Constitutional Devolution & Bank Independence",
        description: "Transformed Britain's constitution: established the Scottish Parliament and Welsh Assembly, removed hereditary peers from the Lords, and made the Bank of England independent.",
        yearOrSpan: "1997–1999"
      },
      {
        title: "Statutory National Minimum Wage",
        description: "Introduced the UK's first legal National Minimum Wage in April 1999, directly lifting low-income pay across millions of British workers.",
        yearOrSpan: "1999"
      },
      {
        title: "Military Interventions & Iraq War",
        description: "Deployed British forces in Kosovo (1999) and Sierra Leone (2000), and committed UK troops alongside the US in Afghanistan (2001) and the contentious invasion of Iraq (2003).",
        yearOrSpan: "1999–2003"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom (Golden Jubilee 2002)" }
      ],
      usPresidents: [
        { name: "Bill Clinton", reignOrTerm: "1993–2001", roleTitle: "42nd US President ('Third Way' ideological ally)" },
        { name: "George W. Bush", reignOrTerm: "2001–2009", roleTitle: "43rd US President (Post-9/11 War on Terror)" }
      ],
      frenchRulers: [
        { name: "Jacques Chirac", reignOrTerm: "1995–2007", roleTitle: "President of the Fifth Republic" },
        { name: "Nicolas Sarkozy", reignOrTerm: "2007–2012", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  27: {
    pmId: 27,
    pmName: "Gordon Brown",
    highlights: [
      {
        title: "Global Financial Crisis Leadership (2008)",
        description: "Spearheaded a £500 billion bank recapitalization plan that was adopted internationally, and chaired the April 2009 London G20 Summit to coordinate global economic stimulus.",
        yearOrSpan: "2008–2009"
      },
      {
        title: "Climate Change Act 2008",
        description: "Passed pioneering legislation that made the UK the first country in the world to set legally binding long-term greenhouse gas reduction targets.",
        yearOrSpan: "2008"
      },
      {
        title: "The Equality Act 2010",
        description: "Consolidated, simplified, and strengthened UK anti-discrimination laws into a single progressive statutory framework.",
        yearOrSpan: "2010"
      },
      {
        title: "Constitutional Reform and Governance Act",
        description: "Placed the British civil service and parliamentary scrutiny of international treaties on statutory footing for the first time.",
        yearOrSpan: "2010"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "George W. Bush", reignOrTerm: "2001–2009", roleTitle: "43rd US President" },
        { name: "Barack Obama", reignOrTerm: "2009–2017", roleTitle: "44th US President (2009 London G20 Summit)" }
      ],
      frenchRulers: [
        { name: "Nicolas Sarkozy", reignOrTerm: "2007–2012", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  28: {
    pmId: 28,
    pmName: "David Cameron",
    highlights: [
      {
        title: "First Post-War Coalition Government",
        description: "Formed a historic five-year coalition with Nick Clegg's Liberal Democrats in May 2010, the first formal UK coalition since 1945.",
        yearOrSpan: "2010"
      },
      {
        title: "Marriage (Same Sex Couples) Act 2013",
        description: "Championed and legalized same-sex marriage in England and Wales, famously proclaiming 'I support gay marriage not in spite of being a Conservative, but because I am a Conservative.'",
        yearOrSpan: "2013"
      },
      {
        title: "Scottish Independence Referendum 2014",
        description: "Signed the Edinburgh Agreement allowing the 2014 Scottish referendum, in which voters backed remaining in the UK by 55.3% to 44.7%.",
        yearOrSpan: "2014"
      },
      {
        title: "The EU Referendum 2016",
        description: "Staged the UK European Union membership referendum on 23 June 2016; resigned the following morning after the 51.9% vote to leave the EU.",
        yearOrSpan: "2016"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom (Diamond Jubilee 2012)" }
      ],
      usPresidents: [
        { name: "Barack Obama", reignOrTerm: "2009–2017", roleTitle: "44th US President" }
      ],
      frenchRulers: [
        { name: "Nicolas Sarkozy", reignOrTerm: "2007–2012", roleTitle: "President of the Fifth Republic" },
        { name: "François Hollande", reignOrTerm: "2012–2017", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  29: {
    pmId: 29,
    pmName: "Theresa May",
    highlights: [
      {
        title: "Triggering Article 50 (March 2017)",
        description: "Invoked Article 50 of the Treaty on European Union, formally initiating the official two-year countdown for the United Kingdom's exit from the EU.",
        yearOrSpan: "2017"
      },
      {
        title: "Salisbury Poisoning Response (2018)",
        description: "Led a united international response to the Russian military intelligence Novichok attack in Salisbury, coordinating the expulsion of over 150 Russian diplomats across 28 nations.",
        yearOrSpan: "2018"
      },
      {
        title: "Legally Binding Net Zero 2050",
        description: "Committed the UK to reaching net-zero greenhouse gas emissions by 2050, making Britain the first major G7 economy to pass net zero into law.",
        yearOrSpan: "2019"
      },
      {
        title: "Parliamentary Deadlock over Brexit",
        description: "Negotiated the EU Withdrawal Agreement but saw it defeated three times in the House of Commons, surviving a confidence vote before stepping down in July 2019.",
        yearOrSpan: "2018–2019"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Barack Obama", reignOrTerm: "2009–2017", roleTitle: "44th US President (2016)" },
        { name: "Donald Trump", reignOrTerm: "2017–2021", roleTitle: "45th US President (State Visit to UK 2019)" }
      ],
      frenchRulers: [
        { name: "François Hollande", reignOrTerm: "2012–2017", roleTitle: "President of the Fifth Republic" },
        { name: "Emmanuel Macron", reignOrTerm: "2017–present", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  30: {
    pmId: 30,
    pmName: "Boris Johnson",
    highlights: [
      {
        title: "'Get Brexit Done' & Formal EU Exit",
        description: "Won an 80-seat Conservative majority in December 2019 and formally led Britain out of the European Union at 11:00pm on 31 January 2020.",
        yearOrSpan: "2019–2020"
      },
      {
        title: "COVID-19 Pandemic Response",
        description: "Directed the unprecedented national pandemic response, instituted national lockdowns, survived severe personal COVID-19 infection, and established the world-leading Vaccine Taskforce.",
        yearOrSpan: "2020–2021"
      },
      {
        title: "UK–EU Trade and Cooperation Agreement",
        description: "Concluded the comprehensive post-Brexit trade deal on Christmas Eve 2020, avoiding a tariff cliff edge for British commerce.",
        yearOrSpan: "2020"
      },
      {
        title: "Staunch Defense of Ukraine",
        description: "Mounted early and decisive military, financial, and moral support for Ukraine following Russia's February 2022 invasion, building a close partnership with President Volodymyr Zelenskyy.",
        yearOrSpan: "2022"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "1952–2022", roleTitle: "Queen of the United Kingdom (Platinum Jubilee 2022)" }
      ],
      usPresidents: [
        { name: "Donald Trump", reignOrTerm: "2017–2021", roleTitle: "45th US President" },
        { name: "Joe Biden", reignOrTerm: "2021–present", roleTitle: "46th US President (G7 Carbis Bay Summit)" }
      ],
      frenchRulers: [
        { name: "Emmanuel Macron", reignOrTerm: "2017–present", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  31: {
    pmId: 31,
    pmName: "Liz Truss",
    highlights: [
      {
        title: "Last Prime Minister Appointed by Queen Elizabeth II",
        description: "Received Queen Elizabeth II's final royal audience at Balmoral Castle on 6 September 2022, only two days before the Queen's passing.",
        yearOrSpan: "2022"
      },
      {
        title: "National Mourning & Accession of King Charles III",
        description: "Led the United Kingdom through ten days of state mourning, the royal funeral ceremonies, and proclaimed 'God Save the King' on the accession of Charles III.",
        yearOrSpan: "2022"
      },
      {
        title: "The September 2022 'Growth Plan'",
        description: "Announced £45 billion in unfunded tax cuts in the 23 September 'mini-budget', triggering intense bond market volatility, a steep sterling drop, and Bank of England intervention.",
        yearOrSpan: "2022"
      },
      {
        title: "Shortest-Serving Prime Minister in British History",
        description: "Resigned after 49 days in 10 Downing Street amid severe market turbulence and the resignation of Chancellor Kwasi Kwarteng and Home Secretary Suella Braverman.",
        yearOrSpan: "2022"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "Queen Elizabeth II", reignOrTerm: "6–8 Sep 2022", roleTitle: "Queen of the United Kingdom (Final official act)" },
        { name: "King Charles III", reignOrTerm: "8 Sep 2022 – present", roleTitle: "King of the United Kingdom (Accession)" }
      ],
      usPresidents: [
        { name: "Joe Biden", reignOrTerm: "2021–present", roleTitle: "46th US President (Attended State Funeral)" }
      ],
      frenchRulers: [
        { name: "Emmanuel Macron", reignOrTerm: "2017–present", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  32: {
    pmId: 32,
    pmName: "Rishi Sunak",
    highlights: [
      {
        title: "First British-Asian Prime Minister",
        description: "Became the UK's first British-Asian and practicing Hindu Prime Minister on Diwali 2022, and the youngest head of government in modern times at age 42.",
        yearOrSpan: "2022"
      },
      {
        title: "The Windsor Framework (February 2023)",
        description: "Negotiated a breakthrough post-Brexit agreement with the European Union, resolving bitter disputes over the Northern Ireland Protocol and green lane goods checks.",
        yearOrSpan: "2023"
      },
      {
        title: "Halving Inflation & Economic Stabilization",
        description: "Met his core pledge to reduce runaway inflation from over 11% down to below the Bank of England's 2% target, restoring financial equilibrium.",
        yearOrSpan: "2023–2024"
      },
      {
        title: "Global AI Safety Summit at Bletchley Park",
        description: "Convened world leaders and top technology executives in November 2023 to establish the historic multilateral Bletchley Declaration on artificial intelligence safety.",
        yearOrSpan: "2023"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "King Charles III", reignOrTerm: "2022–present", roleTitle: "King of the United Kingdom (Coronation May 2023)" }
      ],
      usPresidents: [
        { name: "Joe Biden", reignOrTerm: "2021–present", roleTitle: "46th US President (Atlantic Declaration 2023)" }
      ],
      frenchRulers: [
        { name: "Emmanuel Macron", reignOrTerm: "2017–present", roleTitle: "President of the Fifth Republic (UK–France Summit 2023)" }
      ]
    }
  },
  33: {
    pmId: 33,
    pmName: "Keir Starmer",
    highlights: [
      {
        title: "Landslide General Election Victory (July 2024)",
        description: "Led the Labour Party back to power with a commanding 174-seat majority, ending 14 years of Conservative government.",
        yearOrSpan: "2024"
      },
      {
        title: "Great British Energy & National Wealth Fund",
        description: "Established GB Energy as a publicly owned clean power developer and instituted the National Wealth Fund to drive infrastructure and green industrial investment.",
        yearOrSpan: "2024–2025"
      },
      {
        title: "Border Security Command & Asylum Reform",
        description: "Abolished the contentious Rwanda deportation program on day one, replacing it with an elite Border Security Command working in partnership with European police agencies.",
        yearOrSpan: "2024"
      },
      {
        title: "European Diplomatic Reset",
        description: "Hosted the European Political Community summit at Blenheim Palace, pursuing a comprehensive new UK–EU defense, security, and trade cooperation pact.",
        yearOrSpan: "2024–2025"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "King Charles III", reignOrTerm: "2022–present", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Joe Biden", reignOrTerm: "2021–2025", roleTitle: "46th US President (NATO Washington Summit)" },
        { name: "Donald Trump", reignOrTerm: "2025–present", roleTitle: "47th US President" }
      ],
      frenchRulers: [
        { name: "Emmanuel Macron", reignOrTerm: "2017–present", roleTitle: "President of the Fifth Republic" }
      ]
    }
  },
  34: {
    pmId: 34,
    pmName: "Andy Burnham",
    highlights: [
      {
        title: "Mayoral to No. 10 Transition",
        description: "Transitioned from his transformative tenure as Mayor of Greater Manchester into Downing Street, championing the deepest devolution of powers in British history.",
        yearOrSpan: "2026"
      },
      {
        title: "Nationalization of the 'Bee Network' Model",
        description: "Scaled the integrated, low-fare public transport model nationwide, enabling municipal bus franchising and suburban rail integration across all English regions.",
        yearOrSpan: "2026"
      },
      {
        title: "Northern Renaissance & Spatial Equality",
        description: "Launched major regional infrastructure and green industrial initiatives aimed at rebalancing capital investment between London and the industrial North.",
        yearOrSpan: "2026–Present"
      },
      {
        title: "National Social Care & Housing Standards",
        description: "Spearheaded universal social care reform alongside statutory decent homes standards and tenant protections across the country.",
        yearOrSpan: "2026–Present"
      }
    ],
    contemporaries: {
      ukMonarchs: [
        { name: "King Charles III", reignOrTerm: "2022–present", roleTitle: "King of the United Kingdom" }
      ],
      usPresidents: [
        { name: "Donald Trump", reignOrTerm: "2025–present", roleTitle: "47th US President" }
      ],
      frenchRulers: [
        { name: "Emmanuel Macron", reignOrTerm: "2017–present", roleTitle: "President of the Fifth Republic" }
      ]
    }
  }
};
