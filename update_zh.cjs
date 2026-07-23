const fs = require('fs');

const esContexts = [
  "A menudo considerado como el primer Primer Ministro de facto, estableció la estabilidad política y siguió una política de paz.",
  "Conocido como 'El Gran Plebeyo', llevó a Gran Bretaña a la victoria en la Guerra de los Siete Años, expandiendo su imperio global.",
  "Su mandato estuvo dominado por la Guerra de Independencia de los Estados Unidos, que terminó en derrota para Gran Bretaña.",
  "Se convirtió en Primer Ministro a los 24 años. Guió al país a través de las Guerras Revolucionarias Francesas y Napoleónicas.",
  "Es el único Primer Ministro británico que ha sido asesinado, recibiendo un disparo en el vestíbulo de la Cámara de los Comunes.",
  "Su largo mandato vio la victoria en la Batalla de Waterloo y las controvertidas Leyes de los Cereales.",
  "El 'Duque de Hierro', famoso por derrotar a Napoleón en Waterloo, aprobó el Acta de Emancipación Católica.",
  "Supervisó la aprobación de la Gran Ley de Reforma de 1832 y la abolición de la esclavitud en el Imperio Británico.",
  "Creó la Policía Metropolitana (de ahí los 'Bobbies'). Su Manifiesto de Tamworth sentó las bases del Partido Conservador moderno.",
  "Fue mentor político de la joven reina Victoria tras su ascenso al trono en 1837.",
  "Una figura dominante en la política exterior durante muchos años, su enfoque se conoció como 'diplomacia de cañoneras'.",
  "Novelista y político que compró acciones del Canal de Suez y tuvo una notable rivalidad con Gladstone.",
  "Se desempeñó como Primer Ministro en cuatro ocasiones distintas, defendiendo la reforma electoral e intentando resolver la 'Cuestión Irlandesa'.",
  "El último Primer Ministro en liderar desde la Cámara de los Lores, presidió el apogeo del Imperio Británico.",
  "Su gobierno introdujo importantes reformas de bienestar social, pero llevó a Gran Bretaña a la Primera Guerra Mundial.",
  "El 'Mago Galés' que llevó a Gran Bretaña a la victoria en la Primera Guerra Mundial y fue una figura clave en la Conferencia de Paz de París.",
  "Mejor conocido por su política de apaciguamiento hacia la Alemania nazi, que terminó con la invasión de Polonia.",
  "Inspiró a Gran Bretaña a la victoria en la Segunda Guerra Mundial con sus poderosos discursos y su negativa a rendirse.",
  "Su gobierno estableció el Servicio Nacional de Salud (NHS) y el estado de bienestar moderno después de la Segunda Guerra Mundial.",
  "Conocido como 'Supermac', dijo a los británicos que 'nunca lo habían tenido tan bien' durante un período de afluencia.",
  "Lideró durante los 'Swinging Sixties', una época de liberalización social, y creó la Open University.",
  "Llevó al Reino Unido a la Comunidad Económica Europea (CEE) en 1973.",
  "Su mandato terminó con el 'Invierno del Descontento', un período de huelgas generalizadas en el sector público.",
  "La 'Dama de Hierro' fue la primera mujer Primer Ministro de Gran Bretaña, conocida por la privatización y el enfrentamiento con los sindicatos.",
  "Supervisó la participación británica en la Guerra del Golfo e inició el proceso de paz de Irlanda del Norte.",
  "Llevó al 'Nuevo Laborismo' a una victoria aplastante, supervisó el Acuerdo del Viernes Santo y apoyó la invasión de Irak en 2003.",
  "Su mandato estuvo dominado por la crisis financiera mundial de 2008.",
  "Formó el primer gobierno de coalición desde la Segunda Guerra Mundial y celebró los referéndums de independencia de Escocia y del Brexit.",
  "Se convirtió en Primera Ministra después de la votación del Brexit y pasó su mandato negociando un acuerdo de retirada.",
  "Ganó una amplia mayoría con la promesa de 'Get Brexit Done' y lideró el país durante la pandemia de COVID-19.",
  "Sirvió el mandato más corto de cualquier Primer Ministro del Reino Unido, renunciando después de 49 días tras la agitación económica.",
  "Se convirtió en Primer Ministro durante un período de inestabilidad económica, centrándose en restaurar la credibilidad fiscal.",
  "Llevó al Partido Laborista a una victoria aplastante en las elecciones generales de 2024, poniendo fin a 14 años de gobierno conservador."
];

const zhContexts = [
  "通常被认为是第一位事实上的首相，他建立了政治稳定并奉行和平政策。",
  "被称为“伟大的平民”，他带领英国在七年战争中取得胜利，扩大了其全球帝国。",
  "他的任期被美国独立战争所主导，该战争以英国的失败告终。",
  "24岁成为首相。他带领国家度过了法国大革命和拿破仑战争。",
  "他是唯一一位被暗杀的英国首相，在下议院大厅被枪杀。",
  "他漫长的任期见证了滑铁卢战役的胜利和备受争议的《谷物法》。",
  "“铁公爵”，以在滑铁卢击败拿破仑而闻名，他通过了《天主教解放法案》。",
  "监督通过了1832年《大改革法案》以及在大英帝国废除奴隶制。",
  "创建了伦敦警察厅（因此被称为“Bobbies”）。他的《塔姆沃思宣言》奠定了现代保守党的基础。",
  "在年轻的维多利亚女王1837年登基时，他是她的政治导师。",
  "多年来在外交政策中占据主导地位，他的方法被称为“炮舰外交”。",
  "一位小说家和政治家，购买了苏伊士运河的股份，并与格莱斯顿有着著名的竞争关系。",
  "曾四次担任首相，倡导选举改革并试图解决“爱尔兰问题”。",
  "最后一位在上议院领导政府的首相，他主持了大英帝国的鼎盛时期。",
  "他的政府引入了重大的社会福利改革，但带领英国卷入了第一次世界大战。",
  "带领英国在第一次世界大战中取得胜利的“威尔士巫师”，也是巴黎和会的关键人物。",
  "以对纳粹德国的绥靖政策而闻名，该政策以德国入侵波兰而告终。",
  "凭借强有力的演讲和拒绝投降的决心，激励英国在第二次世界大战中取得胜利。",
  "他的政府在二战后建立了国民保健署（NHS）和现代福利国家。",
  "被称为“超级麦克”，他在富裕时期告诉英国人他们“从未有过如此美好的日子”。",
  "在“摇摆的六十年代”（社会自由化时期）领导国家，并创建了开放大学。",
  "在1973年带领英国加入欧洲经济共同体（EEC）。",
  "他的任期以“不满的冬天”结束，这是一个公共部门广泛罢工的时期。",
  "“铁娘子”是英国第一位女首相，以私有化和对抗工会而闻名。",
  "监督英国参与海湾战争，并启动了北爱尔兰和平进程。",
  "带领“新工党”取得压倒性胜利，监督了《耶稣受难日协议》，并支持2003年入侵伊拉克。",
  "他的任期被2008年全球金融危机所主导。",
  "组建了自二战以来的首个联合政府，并举行了苏格兰独立和英国脱欧公投。",
  "在脱欧公投后成为首相，并在其任期内致力于谈判脱欧协议。",
  "以“完成脱欧”的承诺赢得绝对多数，并带领国家度过了COVID-19大流行。",
  "是英国历史上任期最短的首相，在经济动荡后仅49天便辞职。",
  "在经济不稳定时期成为首相，致力于恢复财政信誉。",
  "带领工党在2024年大选中取得压倒性胜利，结束了保守党长达14年的执政。"
];

const fileContent = fs.readFileSync('services/gameService.ts', 'utf8');

let updatedContent = fileContent;
let matchCount = 0;

updatedContent = updatedContent.replace(/\{ "id": (\d+),.*?"contextJa": "(.*?)",/g, (match, idStr, contextJa) => {
  const id = parseInt(idStr, 10);
  const esContext = esContexts[id - 1];
  const zhContext = zhContexts[id - 1];
  matchCount++;
  return `${match} "contextEs": "${esContext}", "contextZh": "${zhContext}",`;
});

fs.writeFileSync('services/gameService.ts', updatedContent);
console.log(`Updated ${matchCount} Prime Ministers.`);
