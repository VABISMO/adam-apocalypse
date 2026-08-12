// data/prophets.js — prophet lineage Adam → Jacob Frank (endpoint). Compiled from tradition + history.
// Hebrew is stored unpointed (consonants only) to match the app's Hebrew display.
const POINTED = /[֑-ֽֿׁ-ׇׅ]/g;
const RAW = [
  {name:"Adam",he:"אָדָם",era:"BCE",y0:-4000,y1:-4000,region:"Eden (legendary)",role:"First human in Genesis; paradigmatic figure of creation and fall.",thread:"biblical"},
  {name:"Seth",he:"שֵׁת",era:"BCE",y0:-3870,y1:-2960,region:"Antediluvian (legendary)",role:"Adam's appointed son; per Josephus, his descendants invented the astronomical science and inscribed it on two pillars — one of brick, one of stone — to survive flood and fire.",thread:"biblical"},
  {name:"Enoch",he:"חֲנוֹךְ",era:"BCE",y0:-3400,y1:-3350,region:"Antediluvian (legendary)",role:"Patriarch who 'walked with God'; eponym of the Enochic apocalyptic literature (1 Enoch).",thread:"biblical"},
  {name:"Noah",he:"נֹחַ",era:"BCE",y0:-3000,y1:-2400,region:"Antediluvian (legendary)",role:"Righteous survivor of the Flood; bridge between antediluvian and postdiluvian eras.",thread:"biblical"},
  {name:"Hud",he:"",era:"BCE",y0:-2500,y1:-2400,region:"Arabia (people of 'Ad, legendary)",role:"Quranic prophet sent to the ancient people of 'Ad; preached monotheism amid their pride.",thread:"islamic"},
  {name:"Saleh",he:"",era:"BCE",y0:-2050,y1:-1950,region:"Hijaz (people of Thamud, legendary)",role:"Quranic prophet to Thamud; the she-camel of God a sign they hamstrung.",thread:"islamic"},
  {name:"Abraham",he:"אַבְרָהָם",era:"BCE",y0:-2000,y1:-1820,region:"Mesopotamia/Canaan",role:"Patriarch of the covenant; counted as a proto-prophet in biblical and Quranic texts.",thread:"biblical"},
  {name:"Lot",he:"לוֹט",era:"BCE",y0:-1900,y1:-1820,region:"Sodom / Jordan valley",role:"Abraham's nephew; Quranic prophet to the cities of the plain.",thread:"islamic"},
  {name:"Ishmael",he:"יִשְׁמָעֵאל",era:"BCE",y0:-1900,y1:-1820,region:"Arabia / Paran",role:"Abraham's first son; Quranic prophet and, with Abraham, raiser of the Ka'ba's foundations.",thread:"islamic"},
  {name:"Isaac",he:"יִצְחָק",era:"BCE",y0:-1850,y1:-1760,region:"Canaan",role:"Son of Abraham and Sarah; Quranic prophet of the covenant line.",thread:"islamic"},
  {name:"Jacob",he:"יַעֲקֹב",era:"BCE",y0:-1800,y1:-1650,region:"Canaan / Egypt",role:"Isaac's son; Quranic prophet, father of the twelve tribes.",thread:"islamic"},
  {name:"Joseph",he:"יוֹסֵף",era:"BCE",y0:-1740,y1:-1640,region:"Canaan / Egypt",role:"Jacob's son; Quranic prophet whose sura recounts his rise from well to vizier.",thread:"islamic"},
  {name:"Shu'ayb",he:"",era:"BCE",y0:-1600,y1:-1500,region:"Midian / Madyan",role:"Quranic prophet to Midian; preacher of honest measure and strict monotheism.",thread:"islamic"},
  {name:"Job",he:"אִיּוֹב",era:"BCE",y0:-1520,y1:-1400,region:"Uz (legendary)",role:"Quranic prophet of patient endurance (Ayyub); tried in body, family and goods, restored by God.",thread:"islamic"},
  {name:"Dhul-Kifl",he:"",era:"BCE",y0:-1500,y1:-1450,region:"Mesopotamia (uncertain)",role:"Quranic prophet named twice among the patient; traditions variously identify him with Ezekiel or a sage.",thread:"islamic"},
  {name:"Khidr",he:"",era:"BCE",y0:-1450,y1:-1300,region:"Quranic (legendary)",role:"Mysterious immortal guide who instructs Moses in the inward meanings of events (Quran 18).",thread:"islamic"},
  {name:"Moses",he:"מֹשֶׁה",era:"BCE",y0:-1391,y1:-1271,region:"Egypt/Sinai",role:"Lawgiver and paradigmatic prophet of Sinai; mediator of the Torah.",thread:"biblical"},
  {name:"Aaron",he:"אַהֲרֹן",era:"BCE",y0:-1394,y1:-1271,region:"Egypt/Sinai",role:"Moses' brother; Quranic prophet and spokesman, partner in the mission to Pharaoh.",thread:"islamic"},
  {name:"David",he:"דָּוִד",era:"BCE",y0:-1040,y1:-970,region:"Israel/Judah",role:"King and Quranic prophet; the Psalms (Zabur) revealed to him.",thread:"islamic"},
  {name:"Elijah",he:"אֵלִיָּהוּ",era:"BCE",y0:-860,y1:-850,region:"Northern Kingdom",role:"Northern-kingdom prophet; archetypal wonder-worker and eschatological forerunner.",thread:"biblical"},
  {name:"Elisha",he:"אֱלִישָׁע",era:"BCE",y0:-850,y1:-800,region:"Northern Kingdom",role:"Successor to Elijah; wonder-working prophet of the Northern Kingdom cycles.",thread:"biblical"},
  {name:"Joel",he:"יוֹאֵל",era:"BCE",y0:-800,y1:-750,region:"Judah",role:"Prophet (dating disputed); locust-plague oracles and outpouring-of-Spirit eschatology.",thread:"biblical"},
  {name:"Jonah",he:"יוֹנָה",era:"BCE",y0:-786,y1:-746,region:"Northern Kingdom",role:"8th-c. BCE prophet; the Book of Jonah and its mission-to-Nineveh motif.",thread:"biblical"},
  {name:"Amos",he:"עָמוֹס",era:"BCE",y0:-765,y1:-750,region:"Tekoa/Judah",role:"Shepherd-prophet of Tekoa; among the earliest literary prophets, social-justice oracles.",thread:"biblical"},
  {name:"Hosea",he:"הוֹשֵׁעַ",era:"BCE",y0:-755,y1:-715,region:"Northern Kingdom",role:"Northern-kingdom prophet; symbolic marriage and oracles of judgment and restoration.",thread:"biblical"},
  {name:"Isaiah",he:"יְשַׁעְיָהוּ",era:"BCE",y0:-740,y1:-700,region:"Jerusalem",role:"Jerusalem prophet spanning Uzziah–Hezekiah; messianic and imperial-oracle traditions.",thread:"biblical"},
  {name:"Micah",he:"מִיכָה",era:"BCE",y0:-737,y1:-690,region:"Judah",role:"Judean prophet; oracles against injustice and the Bethlehem messianic-hope tradition.",thread:"biblical"},
  {name:"Nahum",he:"נַחוּם",era:"BCE",y0:-660,y1:-612,region:"Judah",role:"Poet celebrating the fall of Nineveh (612 BCE); anti-Assyrian oracles.",thread:"biblical"},
  {name:"Zephaniah",he:"צְפַנְיָה",era:"BCE",y0:-640,y1:-609,region:"Jerusalem",role:"Josianic prophet; oracles of the Day of YHWH against Jerusalem and the nations.",thread:"biblical"},
  {name:"Jeremiah",he:"יִרְמְיָהוּ",era:"BCE",y0:-627,y1:-580,region:"Jerusalem/Egypt",role:"Late pre-exilic prophet; Temple and covenant oracles, witness to Jerusalem's fall (587 BCE).",thread:"biblical"},
  {name:"Baruch",he:"בָּרוּךְ",era:"BCE",y0:-625,y1:-560,region:"Jerusalem/Babylon",role:"Scribe of Jeremiah; attributed the Book of Baruch and the 2 Baruch tradition.",thread:"second-temple"},
  {name:"Habakkuk",he:"חֲבַקּוּק",era:"BCE",y0:-620,y1:-600,region:"Judah",role:"Prophet of dialogue with God; Hab 2:4 'the righteous shall live by faith'.",thread:"biblical"},
  {name:"Daniel",he:"דָּנִיֵּאל",era:"BCE",y0:-605,y1:-530,region:"Babylon/Persia",role:"Exilic court figure; apocalyptic visions in the Book of Daniel.",thread:"apocalyptic"},
  {name:"Obadiah",he:"עֹבַדְיָה",era:"BCE",y0:-600,y1:-550,region:"Judah/Edom",role:"Shortest prophetic book; oracles against Edom, dating disputed.",thread:"biblical"},
  {name:"Ezekiel",he:"יְחֶזְקֵאל",era:"BCE",y0:-593,y1:-560,region:"Babylon",role:"Exilic priest-prophet; merkabah visions and the valley-of-dry-bones restoration.",thread:"biblical"},
  {name:"Haggai",he:"חַגַּי",era:"BCE",y0:-520,y1:-515,region:"Jerusalem",role:"Post-exilic prophet urging temple rebuilding under Zerubbabel (520 BCE).",thread:"biblical"},
  {name:"Zechariah",he:"זְכַרְיָה",era:"BCE",y0:-520,y1:-480,region:"Jerusalem",role:"Post-exilic prophet of apocalyptic visions; temple restoration and two-messiah traditions.",thread:"biblical"},
  {name:"Ezra",he:"עֶזְרָא",era:"BCE",y0:-480,y1:-440,region:"Babylon/Jerusalem",role:"Priest-scribe of the Persian-period return; Torah restoration and canon.",thread:"second-temple"},
  {name:"Malachi",he:"מַלְאָכִי",era:"BCE",y0:-460,y1:-420,region:"Jerusalem",role:"Last of the Twelve Minor Prophets; post-exilic covenant and purity oracles.",thread:"biblical"},
  {name:"Dhul-Qarnayn",he:"",era:"BCE",y0:-336,y1:-323,region:"Quranic (legendary)",role:"Quranic figure 'the two-horned one' who journeys to the ends of the earth; often identified with Alexander.",thread:"islamic"},
  {name:"Zakariyya",he:"זְכַרְיָה",era:"BCE",y0:-50,y1:-6,region:"Judea (temple)",role:"Quranic priest-prophet; father of Yahya (John the Baptist) by a late-life miracle.",thread:"islamic"},
  {name:"John the Baptist",he:"",era:"CE",y0:27,y1:30,region:"Judea",role:"Apocalyptic wilderness preacher and forerunner figure in early 1st-c. CE Judea.",thread:"apocalyptic"},
  {name:"Jesus of Nazareth",he:"",era:"CE",y0:28,y1:30,region:"Galilee/Judea",role:"Galilean prophet-teacher; central figure of early Christianity, crucified c. 30 CE.",thread:"apocalyptic"},
  {name:"John of Patmos",he:"",era:"CE",y0:95,y1:100,region:"Anatolia (exile)",role:"Visionary author of the Book of Revelation, the early Christian apocalyptic text.",thread:"apocalyptic"},
  {name:"Shimon bar Yochai",he:"",era:"CE",y0:132,y1:160,region:"Roman Judea",role:"Tannaitic sage; legendary attribution of the Zohar, key merkabah-mysticism figure.",thread:"mystical"},
  {name:"Muhammad",he:"",era:"CE",y0:570,y1:632,region:"Mecca/Medina",role:"Seal of the prophets in Islamic tradition; recipient of the Quran (610-632 CE).",thread:"islamic"},
  {name:"Rabi'a al-Adawiyya",he:"",era:"CE",y0:716,y1:801,region:"Basra",role:"Early female Sufi saint; teacher of disinterested love of God apart from fear or hope of reward.",thread:"sufi"},
  {name:"Bayazid Bastami",he:"",era:"CE",y0:804,y1:874,region:"Persia (Bastam)",role:"Early ecstatic Sufi; sayings of self-annihilation (fana') and union.",thread:"sufi"},
  {name:"Junayd al-Baghdadi",he:"",era:"CE",y0:830,y1:910,region:"Baghdad",role:"Sober Sufi theologian; codified fana' and baqa' in a systematic Sufi ethics.",thread:"sufi"},
  {name:"Mansur al-Hallaj",he:"",era:"CE",y0:858,y1:922,region:"Persia/Baghdad",role:"Sufi martyr; his cry 'Ana al-Haqq' (I am the Truth) led to his execution in Baghdad, 922 CE.",thread:"sufi"},
  {name:"Al-Ghazali",he:"",era:"CE",y0:1058,y1:1111,region:"Persia (Tus)",role:"Sunni theologian and Sufi; revived the religious sciences and wedded mysticism to orthodoxy.",thread:"sufi"},
  {name:"Farid al-Din Attar",he:"",era:"CE",y0:1145,y1:1221,region:"Nishapur",role:"Persian Sufi poet; the Conference of the Birds — thirty birds through seven valleys to the Simorgh.",thread:"sufi"},
  {name:"Suhrawardi",he:"",era:"CE",y0:1154,y1:1191,region:"Persia (Aleppo)",role:"Persian philosopher-mystic; founder of Illuminationism (hikmat al-ishraq) — the metaphysics of light in which the cosmos is a hierarchy of governing lights.",thread:"sufi"},
  {name:"Ibn Arabi",he:"",era:"CE",y0:1165,y1:1240,region:"Andalusia/Mecca/Damascus",role:"Sufi metaphysician 'the Greatest Master'; unity of being (wahdat al-wujud), the Bezels of Wisdom.",thread:"sufi"},
  {name:"Ibn al-Farid",he:"",era:"CE",y0:1181,y1:1235,region:"Cairo",role:"Arabic Sufi poet; the Wine Ode and the Great T-poem on divine love and the stations of realization.",thread:"sufi"},
  {name:"Jalaluddin Rumi",he:"",era:"CE",y0:1207,y1:1273,region:"Balkh/Konya",role:"Persian Sufi poet; the Masnavi and the turn toward the Beloved; eponym of the Mevlevi order.",thread:"sufi"},
  {name:"Abraham Abulafia",he:"",era:"CE",y0:1240,y1:1291,region:"Spain/Italy",role:"Medieval prophetic Kabbalist; ecstatic practices and messianic self-claims (13th c.).",thread:"mystical"},
  {name:"Shah Nimatullah Wali",he:"",era:"CE",y0:1330,y1:1431,region:"Persia (Kerman/Mahan)",role:"Sufi poet and eponym of the Nimatullahi order; astrological and cosmological mystical works.",thread:"sufi"},
  {name:"Sabbatai Tsevi",he:"",era:"CE",y0:1626,y1:1676,region:"Smyrna/Ottoman lands",role:"Smyrna-born messianic claimant; center of the 1665–66 Sabbatean movement.",thread:"sabbatean-frankist"},
  {name:"Nathan of Gaza",he:"",era:"CE",y0:1644,y1:1680,region:"Ottoman Gaza",role:"Sabbatai Tsevi's prophet; theological architect of Sabbatean messianism.",thread:"sabbatean-frankist"},
  {name:"Jacob Frank",he:"",era:"CE",y0:1726,y1:1791,region:"Poland/Ottoman",role:"Polish Sabbatean successor; founder of the Frankist movement, who cast himself as the antinomian messianic counterpart abolishing the old law.",thread:"sabbatean-frankist",endpoint:true}
];
// PROPHECIES — key prophetic utterances / visions attributed to each figure, with
// sources (Hebrew Bible refs for the biblical prophets; pseudepigrapha, rabbinic, or
// historical sources for the rest). Curated, concise; one row per distinct prophecy.
// `t` = the prophecy in essence, `r` = source reference.
const PROPHECIES = {
  "Adam": [
    { t:"The seed of the woman shall bruise the serpent's head", r:"Gen 3:15" },
    { t:"Eve named 'mother of all living'", r:"Gen 3:20" },
  ],
  "Seth": [
    { t:"Adam's son in his own likeness, after his image; the godly line through Seth", r:"Gen 4:25; 5:3" },
    { t:"His descendants discovered the astronomical science and inscribed it on two pillars — brick and stone — lest it be lost to flood or fire", r:"Josephus, Antiquities 1.2.3" },
  ],
  "Enoch": [
    { t:"Enoch walked with God; and he was not, for God took him", r:"Gen 5:24" },
    { t:"Judgment of the fallen watchers; Azazel bound and cast into darkness", r:"1 Enoch 10" },
    { t:"The Son of Man seated on the throne of glory judges the kings of the earth", r:"1 Enoch 62" },
  ],
  "Noah": [
    { t:"The earth is filled with violence; a flood destroys all flesh", r:"Gen 6:13" },
    { t:"Cursed be Canaan; blessed be YHWH the God of Shem", r:"Gen 9:25-26" },
  ],
  "Abraham": [
    { t:"A great nation from you; in you all families of the earth blessed", r:"Gen 12:2-3" },
    { t:"Seed as the stars; your offspring sojourns 400 years, then returns", r:"Gen 15:5-13" },
    { t:"Circumcision a sign; Sarah bears a son within the year", r:"Gen 17:10-21" },
    { t:"In your seed all nations of the earth blessed", r:"Gen 22:18" },
  ],
  "Moses": [
    { t:"A prophet like you I will raise; to him you shall listen", r:"Deut 18:15" },
    { t:"YHWH our God, YHWH is one", r:"Deut 6:4" },
    { t:"Blessings for obedience; curses, exile and dispersion for idolatry", r:"Deut 28" },
    { t:"Song of witness against Israel's future apostasy", r:"Deut 32" },
  ],
  "Elijah": [
    { t:"No dew nor rain these years except by my word", r:"1 Kgs 17:1" },
    { t:"Fire falls on the Carmel offering; YHWH, He is God", r:"1 Kgs 18:38" },
    { t:"Before the great and terrible day of YHWH, Elijah is sent", r:"Mal 4:5" },
  ],
  "Elisha": [
    { t:"A double share of your spirit upon me", r:"2 Kgs 2:9" },
    { t:"The valley filled with water without wind or rain; victory over Moab", r:"2 Kgs 3:17" },
    { t:"Hazael shall be king of Aram; the man wept for Israel", r:"2 Kgs 8:12" },
  ],
  "Joel": [
    { t:"The locust plague — the day of YHWH is at hand, a destruction from the Almighty", r:"Joel 1:15" },
    { t:"I will pour my Spirit on all flesh; sons and daughters prophesy", r:"Joel 2:28" },
    { t:"Sun turned to darkness, moon to blood before the great day of YHWH", r:"Joel 2:31" },
  ],
  "Jonah": [
    { t:"Yet forty days and Nineveh is overthrown", r:"Jonah 3:4" },
    { t:"Three days and three nights in the belly of the fish", r:"Jonah 1:17" },
    { t:"God relents from disaster; should I not pity Nineveh?", r:"Jonah 4:11" },
  ],
  "Amos": [
    { t:"Let justice roll down like waters, and righteousness like a stream", r:"Amos 5:24" },
    { t:"The day of YHWH is darkness and not light", r:"Amos 5:18-20" },
    { t:"I will raise the fallen booth of David", r:"Amos 9:11" },
  ],
  "Hosea": [
    { t:"Jezreel — I will soon punish the house of Jehu", r:"Hos 1:4" },
    { t:"Not pitied, not my people → I will have pity and say 'my people'", r:"Hos 1:6-9; 2:23" },
    { t:"After two days he revives us; on the third he raises us up", r:"Hos 6:2" },
  ],
  "Isaiah": [
    { t:"A virgin conceives and bears a son, Immanuel", r:"Isa 7:14" },
    { t:"A child is born; the Prince of Peace on David's throne forever", r:"Isa 9:6-7" },
    { t:"A shoot from the stump of Jesse; the Spirit of YHWH rests on him", r:"Isa 11:1-2" },
    { t:"The Servant bears the sins of many and makes intercession", r:"Isa 53:11-12" },
    { t:"New heavens and a new earth; the former not remembered", r:"Isa 65:17" },
  ],
  "Micah": [
    { t:"They shall beat their swords into plowshares; none shall make afraid", r:"Mic 4:3-4" },
    { t:"A ruler from Bethlehem Ephrathah, whose coming forth is from ancient days", r:"Mic 5:2" },
    { t:"What does YHWH require? Do justice, love kindness, walk humbly", r:"Mic 6:8" },
  ],
  "Nahum": [
    { t:"An overflowing flood and pursuers of darkness pursue Nineveh", r:"Nah 1:8; 2:8" },
    { t:"There is no healing for your bruise; all who hear clap hands over you", r:"Nah 3:19" },
  ],
  "Zephaniah": [
    { t:"The great day of YHWH: a day of wrath, distress and darkness", r:"Zeph 1:15" },
    { t:"From beyond the rivers of Cush my worshippers bring offering", r:"Zeph 3:10" },
    { t:"The remnant of Israel seeks refuge in YHWH's name; none makes afraid", r:"Zeph 3:12-13" },
  ],
  "Jeremiah": [
    { t:"Out of the north evil breaks forth upon Jerusalem", r:"Jer 1:14; 4:6" },
    { t:"Seventy years' desolation for the nations, then Babylon judged", r:"Jer 25:11-12" },
    { t:"A voice heard in Ramah: Rachel weeping for her children", r:"Jer 31:15" },
    { t:"A new covenant written on the heart; their sin remembered no more", r:"Jer 31:31-34" },
  ],
  "Baruch": [
    { t:"Writes Jeremiah's scroll, read in the temple, then burned by the king", r:"Jer 36" },
    { t:"Seek no great things — I bring disaster on all flesh", r:"Jer 45:5" },
    { t:"Vision of Zion taken up by angels; the nations judged and Zion restored", r:"2 Baruch" },
  ],
  "Habakkuk": [
    { t:"The vision awaits its appointed time; it will not lie", r:"Hab 2:3" },
    { t:"The righteous shall live by his faith", r:"Hab 2:4" },
    { t:"The earth filled with the knowledge of YHWH as the waters cover the sea", r:"Hab 2:14" },
  ],
  "Daniel": [
    { t:"A statue of kingdoms; a stone cut without hands fills the whole earth", r:"Dan 2" },
    { t:"One like a Son of Man comes with clouds to an everlasting kingdom", r:"Dan 7:13-14" },
    { t:"Seventy weeks decreed; an Anointed One cut off; the city and sanctuary destroyed", r:"Dan 9:24-26" },
    { t:"The abomination of desolation; many who sleep awake to everlasting life or shame", r:"Dan 11:31; 12:2" },
  ],
  "Obadiah": [
    { t:"Edom brought down; the day of YHWH is near upon all the nations", r:"Obad 1:8,15" },
    { t:"Deliverers on Mount Zion judge the hills; the kingdom is YHWH's", r:"Obad 1:21" },
  ],
  "Ezekiel": [
    { t:"Vision of the chariot; the likeness of the glory of YHWH", r:"Ezek 1" },
    { t:"Dry bones live again; the whole house of Israel brought up from the graves", r:"Ezek 37:5-12" },
    { t:"Gog of Magog gathered against the mountains of Israel; consumed by fire", r:"Ezek 38-39" },
    { t:"A new temple and a river flowing from the sanctuary to heal the sea", r:"Ezek 40-47" },
  ],
  "Haggai": [
    { t:"I shake the heavens and earth; the Desired One comes; fill this house with glory", r:"Hag 2:6-7" },
    { t:"The latter glory of this house greater than the former", r:"Hag 2:9" },
  ],
  "Zechariah": [
    { t:"The Branch; he builds the temple and bears royal majesty", r:"Zech 3:8; 6:12" },
    { t:"Two olive trees — the two Anointed Ones who stand by the Lord", r:"Zech 4:14" },
    { t:"Your king comes to you, lowly and riding on a donkey", r:"Zech 9:9" },
    { t:"They look on me, the one they pierced; mourn as for an only son", r:"Zech 12:10" },
    { t:"Day of YHWH: his feet stand on the Mount of Olives; living waters flow from Jerusalem", r:"Zech 14:4,8" },
  ],
  "Ezra": [
    { t:"Return to Jerusalem and rebuild the house of God", r:"Ezra 1:3" },
    { t:"Separate from the peoples of the land; keep the Torah and do it", r:"Ezra 10:11" },
  ],
  "Malachi": [
    { t:"From the rising to the setting of the sun, my name great among the nations", r:"Mal 1:11" },
    { t:"I send my messenger to prepare the way before me", r:"Mal 3:1" },
    { t:"Elijah the prophet before the great and terrible day of YHWH", r:"Mal 4:5" },
  ],
  "John the Baptist": [
    { t:"Repent, the kingdom of the heavens is at hand", r:"Matt 3:2" },
    { t:"Every tree not bearing good fruit cut down and thrown into the fire", r:"Matt 3:10" },
    { t:"One mightier comes after me; he baptizes with Holy Spirit and fire", r:"Matt 3:11" },
  ],
  "Jesus of Nazareth": [
    { t:"The time is fulfilled; the kingdom of God is at hand; repent and believe", r:"Mark 1:15" },
    { t:"Not one stone left on another; the temple thrown down", r:"Matt 24:2" },
    { t:"The Son of Man comes on the clouds of heaven with power and great glory", r:"Matt 24:30" },
    { t:"This generation shall not pass until all these things are fulfilled", r:"Matt 24:34" },
  ],
  "John of Patmos": [
    { t:"Letters to seven churches; the one who conquers inherits all things", r:"Rev 2-3" },
    { t:"The number of the beast: 666; the mark on hand and forehead", r:"Rev 13:16-18" },
    { t:"Fallen, fallen is Babylon the great; the kings of the earth mourn", r:"Rev 18:2,9" },
    { t:"A new heaven and new earth; New Jerusalem descends from God", r:"Rev 21:1-2" },
  ],
  "Shimon bar Yochai": [
    { t:"13 years hidden in a cave; the secrets of the Torah revealed", r:"Shabbat 33b" },
    { t:"The inner light of the chariot; the hidden world of Atzilut disclosed", r:"Zohar" },
  ],
  "Abraham Abulafia": [
    { t:"Prophetic ecstasy by permuting and combining the letters of the Name", r:"Sefer ha-Melamed" },
    { t:"Unsealing the Name; the spirit united with the letter", r:"Sefer ha-Ot" },
    { t:"Declares himself Messiah in 1295 — the prophecy fails", r:"Vital / Sabbatean chronicles" },
  ],
  "Sabbatai Tsevi": [
    { t:"Declares himself Messiah, 12 December 1665; the nations are told to submit", r:"Nathan of Gaza, 1665" },
    { t:"Prophecy of his universal kingship — overturned by his apostasy", r:"Sabbatean sources" },
  ],
  "Nathan of Gaza": [
    { t:"Vision of Sabbatai Tsevi seated on a royal throne in Gaza; confirmed as Messiah", r:"Nathan's testimony, 1665" },
    { t:"The Messiah must descend into the demonic shells (kelippot) to liberate them", r:"Perush ha-Torah" },
    { t:"The faith of the Messiah — belief beyond the apostasy", r:"Ma'amar" },
  ],
  "Jacob Frank": [
    { t:"Declares himself the reincarnation of Sabbatai Tsevi and the Antichrist", r:"Frankist sources" },
    { t:"Abolition of the old law; 'the holy religion of Edom'", r:"Book of the Words of the Lord" },
  ],
  "Hud": [
    { t:"O my people, serve God; you have no god but Him — 'Ad denied their Lord", r:"Quran 11:50-60" },
    { t:"The blasting wind destroyed a people who would not believe", r:"Quran 69:6-7" },
  ],
  "Saleh": [
    { t:"The she-camel of God is a trial for you; harm her not", r:"Quran 7:73" },
    { t:"The thunderbolt took them as they lay face down", r:"Quran 11:67" },
  ],
  "Lot": [
    { t:"The cities overturned; a rain of stones as the dawn broke", r:"Quran 11:82" },
    { t:"His wife remained behind, among those destroyed", r:"Quran 15:60" },
  ],
  "Ishmael": [
    { t:"Abraham and Ishmael raise the foundations of the House at Mecca", r:"Quran 2:127" },
    { t:"A nation from Ishmael; a messenger from among them reciting God's signs", r:"Quran 62:2-3" },
  ],
  "Isaac": [
    { t:"The angels announce a wise son, Isaac; Sarah marvels", r:"Quran 11:71" },
    { t:"We blessed him and Isaac; among his progeny the good-doer and the wrongdoer", r:"Quran 37:112-113" },
  ],
  "Jacob": [
    { t:"You shall worship none but God; the creed of your fathers Abraham and Ishmael and Isaac", r:"Quran 2:133" },
    { t:"We revealed to the prophets of the tribes: establish worship and give charity", r:"Quran 19:58" },
  ],
  "Joseph": [
    { t:"The sun, the moon and eleven stars bow to you — the dream of rulership", r:"Quran 12:4" },
    { t:"God shall make you judge over the land; the dream fulfilled at the throne", r:"Quran 12:100" },
  ],
  "Shu'ayb": [
    { t:"Give full measure; diminish not the people's goods", r:"Quran 11:85" },
    { t:"The shock seized those who wronged; they lay prostrate in their dwellings", r:"Quran 11:94" },
  ],
  "Job": [
    { t:"The Lord gave, the Lord has taken away; blessed be the name of the Lord", r:"Job 1:21" },
    { t:"Though he slay me, yet will I trust in him", r:"Job 13:15" },
    { t:"I know that my Redeemer lives, and at last he shall stand upon the earth", r:"Job 19:25" },
    { t:"Excellent in heart is the servant of God (Ayyub); most patient — Quran 38:44", r:"Quran 38:41-44" },
  ],
  "Dhul-Kifl": [
    { t:"Remember Our servant Dhul-Kifl — he was of the patient", r:"Quran 38:48" },
    { t:"And Ishmael, Dhul-Kifl and Elisha — each among the good", r:"Quran 38:48" },
  ],
  "Khidr": [
    { t:"How can you bear with what you cannot comprehend? — Moses and the servant of God", r:"Quran 18:67-72" },
    { t:"I did it not of my own will: the boat, the wall, the orphan — the outward and the inward", r:"Quran 18:79-82" },
  ],
  "Aaron": [
    { t:"Send Aaron with me as a minister of my people; he is more eloquent", r:"Quran 25:35 / 26:13" },
    { t:"My people, you are only being tested by it — Aaron warns against the calf", r:"Quran 20:90" },
  ],
  "David": [
    { t:"The Psalms (Zabur) given to David; the hills and birds echo God's praise with him", r:"Quran 34:10 / 38:18" },
    { t:"Judgment between disputing parties; David falls down in repentance", r:"Quran 38:21-24" },
  ],
  "Dhul-Qarnayn": [
    { t:"He reaches the setting of the sun in a muddy spring, and its rising", r:"Quran 18:86,90" },
    { t:"Gog and Magog spread corruption; a rampart of iron and brass built against them", r:"Quran 18:94-98" },
  ],
  "Zakariyya": [
    { t:"A son, Yahya, granted in old age; the name none bore before", r:"Quran 19:7" },
    { t:"Three nights of silence; he gestures: glorify God morning and evening", r:"Quran 19:10-11" },
  ],
  "Muhammad": [
    { t:"Recite! in the name of your Lord who created — the Night of Power at Hira", r:"Quran 96:1 / 97" },
    { t:"We have not sent you except as a mercy to the worlds", r:"Quran 21:107" },
    { t:"The Hour and its signs: when the sun is folded up and the stars darkened", r:"Quran 81:1-2 / 82:17-19" },
  ],
  "Rabi'a al-Adawiyya": [
    { t:"I love God for Himself alone — not from fear of Hell nor desire for Paradise", r:"Rabi'a, hikam" },
    { t:"I would set the fire of Paradise and quench the flame of Hell", r:"Rabi'a, hikam" },
  ],
  "Bayazid Bastami": [
    { t:"I am You, undoubtedly You — the self stripped away in fana'", r:"Bayazid, ecstatic sayings" },
    { t:"Glory be to me! how great is my majesty — the intoxicated speech of annihilation", r:"Bayazid, shatahat" },
  ],
  "Junayd al-Baghdadi": [
    { t:"Sufism is that God makes you die to your self and live in Him", r:"Junayd, Rasail" },
    { t:"The true return (baqa') is to abide after annihilation, witnessing the One", r:"Junayd, Rasail" },
  ],
  "Mansur al-Hallaj": [
    { t:"Ana al-Haqq — I am the Truth; the self dissolved in the Real", r:"Hallaj, Kitab al-Tawasin" },
    { t:"Crucified for the unity-claim at Baghdad, 922 CE — 'the Beloved slays and quickens'", r:"Hallaj, akhbar" },
  ],
  "Al-Ghazali": [
    { t:"The Revival of the Religious Sciences — outward law wedded to inward light", r:"Ihya Ulum al-Din" },
    { t:"The Alchemy of Happiness: the heart polished to reflect the divine", r:"Kimiya-yi Sa'adat" },
  ],
  "Farid al-Din Attar": [
    { t:"Thirty birds (si-morgh) reach the Simorgh — themselves reflected as the king", r:"Mantiq al-Tayr" },
    { t:"Seven valleys of the quest: quest, love, knowledge, detachment, unity, bewilderment, annihilation", r:"Mantiq al-Tayr" },
  ],
  "Suhrawardi": [
    { t:"The Philosophy of Illumination — being is light upon light; darkness is mere privation, not a thing", r:"Hikmat al-Ishraq" },
    { t:"The cosmos is a hierarchy of lights; the planets and stars are governing lights that image the supreme Light of Lights", r:"Hikmat al-Ishraq" },
  ],
  "Ibn Arabi": [
    { t:"The Real is the creation and the creation is the Real — wahdat al-wujud, the oneness of being", r:"Fusus al-Hikam" },
    { t:"Each prophet a bezel of divine wisdom; Muhammad the synthesis of all", r:"Fusus al-Hikam" },
    { t:"The Meccan Revelations: the cosmos as the self-disclosure of the divine names", r:"al-Futuhat al-Makkiyya" },
  ],
  "Ibn al-Farid": [
    { t:"In remembrance of the Beloved we drank a wine — drunk before the vine was created", r:"Qasidat al-Khamriyya" },
    { t:"The Great T-poem: the mystic's ascent through the stations to union", r:"al-Ta'iyya al-Kubra" },
  ],
  "Jalaluddin Rumi": [
    { t:"Listen to the reed, how it tells of separation — longing for its origin", r:"Masnavi, opening" },
    { t:"Beyond ideas of right-doing and wrongdoing there is a field; I will meet you there", r:"Masnavi" },
  ],
  "Shah Nimatullah Wali": [
    { t:"The diwan of the spheres; the mystic reads the stars as letters of the Beloved", r:"Diwan-i Nimatullah" },
    { t:"I was a drop; in the ocean of unity I became the sea", r:"Diwan-i Nimatullah" },
  ],
};

const PROPHETS = RAW.map(p=>({ ...p, he: (p.he||'').replace(POINTED,''), prophecies: PROPHECIES[p.name] || null }));
export { PROPHETS };
