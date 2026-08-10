// data/mages.js — magi lineage Daniel → Felipe II (endpoint: "era of kings"). Compiled from tradition + history.
// `bio` and `works` are filled by mages-content.js (Wikipedia-grounded); merged by name at render.
const MAGES = [
  {name:"Hermes Trismegistus",years:"legendary",y0:-1500,y1:-1450,region:"Egypt (legendary)",role:"Legendary thrice-greatest sage; fountainhead of the Hermetic stellar-sapiential tradition.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Solomon",years:"-990–-931",y0:-990,y1:-931,region:"Israel/Judah",role:"Legendary wise-king; archetype of the royal sapiential and magical-solomonic tradition.",isIberian:false,isRoyal:true,endpoint:false},
  {name:"Zoroaster",years:"c.-628–-551",y0:-628,y1:-551,region:"Persia (legendary)",role:"Legendary prophet-magus; eponymous founder of the magi as a priestly-sapiential order.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Daniel",years:"-620–-535",y0:-620,y1:-535,region:"Babylon/Persia",role:"Jewish court-magus and dream-interpreter in the Babylonian and Persian royal courts.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Shadrach (Hananiah)",years:"-620–-560",y0:-620,y1:-560,region:"Babylon",role:"Daniel's companion; trained in Chaldean lore at Nebuchadnezzar's court.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Meshach (Mishael)",years:"-620–-560",y0:-620,y1:-560,region:"Babylon",role:"Daniel's companion; initiated in Babylonian court wisdom alongside his fellows.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Abednego (Azariah)",years:"-620–-560",y0:-620,y1:-560,region:"Babylon",role:"Daniel's companion; recipient of Chaldean court-sapiential training with the magi.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"The Magi of Matthew 2",years:"c.-7–-4",y0:-7,y1:-4,region:"Persia/East",role:"Star-following eastern magi; Christian archetype of royal-sage astrologers bearing gifts.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Abraham ibn Ezra",years:"1089–1167",y0:1089,y1:1167,region:"Iberia (Tudela)",role:"Andalusi-Jewish biblical exegete; integrated astrology, stellar order and Hebrew letters.",isIberian:true,isRoyal:false,endpoint:false},
  {name:"Michael Scot",years:"c.1175–1234",y0:1175,y1:1234,region:"Scotland/Toledo",role:"Court astrologer-magus to Frederick II and Alfonso X; translator of Arabic stellar lore.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Alfonso X of Castile",years:"1221–1284",y0:1221,y1:1284,region:"Iberia (Castile)",role:"Royal-sage king; patron of the Alfonsine astronomical-magical corpus and magic books.",isIberian:true,isRoyal:true,endpoint:false},
  {name:"Ramon Llull",years:"1232–1316",y0:1232,y1:1316,region:"Iberia (Majorca)",role:"Catalan mystic; Ars Magna as a combinatory stellar-letter art of divine names.",isIberian:true,isRoyal:false,endpoint:false},
  {name:"Arnaldus de Villanova",years:"c.1240–1311",y0:1240,y1:1311,region:"Iberia (Valencia)",role:"Catalan physician-alchemist and royal counselor; apocalyptic-sapiential astrologer.",isIberian:true,isRoyal:false,endpoint:false},
  {name:"Moses de León",years:"c.1240–1305",y0:1240,y1:1305,region:"Iberia (Castile)",role:"Castilian Kabbalist; redactor of the Zohar, core text of Hebrew stellar-mystical symbolism.",isIberian:true,isRoyal:false,endpoint:false},
  {name:"Roger Bacon",years:"c.1220–1292",y0:1220,y1:1292,region:"England",role:"Franciscan philosopher of scientia experimentalis and astral-astrological sapientia.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Cecco d'Ascoli",years:"1257–1327",y0:1257,y1:1327,region:"Italy",role:"Court astrologer-magus; burned for astrological determinism, inheritor of Scot's tradition.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Marsilio Ficino",years:"1433–1499",y0:1433,y1:1499,region:"Florence",role:"Platonic-astrological theologian; translated the Hermetic Corpus, reviving stellar-magic.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Giovanni Pico della Mirandola",years:"1463–1494",y0:1463,y1:1494,region:"Italy",role:"Pioneer of Christian Kabbalah; yoked Hebrew letter-mysticism to Christian theology.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Johannes Trithemius",years:"1462–1516",y0:1462,y1:1516,region:"Germany",role:"Abbot-cryptographer and magus; teacher of Agrippa in the Renaissance-magic lineage.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Heinrich Cornelius Agrippa",years:"1486–1535",y0:1486,y1:1535,region:"Germany",role:"Author of De occulta philosophia; systematizer of Renaissance stellar-kabbalistic magic.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Paracelsus",years:"1493–1541",y0:1493,y1:1541,region:"Switzerland",role:"Physician-magus; astral-magic cosmology of signatures linking stars, metals and letters.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Nostradamus",years:"1503–1566",y0:1503,y1:1566,region:"France",role:"Court astrologer-prophet; consulted by Catherine de Médicis in the royal-magus mode.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"John Dee",years:"1527–1609",y0:1527,y1:1609,region:"England",role:"Royal astrologer to Elizabeth I; philosopher of Enochian stellar-angelic letters.",isIberian:false,isRoyal:false,endpoint:false},
  {name:"Felipe II of Spain",years:"1527–1598",y0:1527,y1:1598,region:"Iberia (Spain)",role:"Habsburg royal-sage king; patron of astrologers and esoterica — closes the era of kings.",isIberian:true,isRoyal:true,endpoint:true}
];
export { MAGES };
