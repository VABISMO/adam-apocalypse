// data/prophets.js — prophet lineage Adam → Jacob Frank (endpoint). Compiled from tradition + history.
// Hebrew is stored unpointed (consonants only) to match the app's Hebrew display.
const POINTED = /[֑-ֽֿׁ-ׇׅ]/g;
const RAW = [
  {name:"Adam",he:"אָדָם",era:"BCE",y0:-4000,y1:-4000,region:"Eden (legendary)",role:"First human in Genesis; paradigmatic figure of creation and fall.",thread:"biblical"},
  {name:"Enoch",he:"חֲנוֹךְ",era:"BCE",y0:-3400,y1:-3350,region:"Antediluvian (legendary)",role:"Patriarch who 'walked with God'; eponym of the Enochic apocalyptic literature (1 Enoch).",thread:"biblical"},
  {name:"Noah",he:"נֹחַ",era:"BCE",y0:-3000,y1:-2400,region:"Antediluvian (legendary)",role:"Righteous survivor of the Flood; bridge between antediluvian and postdiluvian eras.",thread:"biblical"},
  {name:"Abraham",he:"אַבְרָהָם",era:"BCE",y0:-2000,y1:-1820,region:"Mesopotamia/Canaan",role:"Patriarch of the covenant; counted as a proto-prophet in biblical and Quranic texts.",thread:"biblical"},
  {name:"Moses",he:"מֹשֶׁה",era:"BCE",y0:-1391,y1:-1271,region:"Egypt/Sinai",role:"Lawgiver and paradigmatic prophet of Sinai; mediator of the Torah.",thread:"biblical"},
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
  {name:"John the Baptist",he:"",era:"CE",y0:27,y1:30,region:"Judea",role:"Apocalyptic wilderness preacher and forerunner figure in early 1st-c. CE Judea.",thread:"apocalyptic"},
  {name:"Jesus of Nazareth",he:"",era:"CE",y0:28,y1:30,region:"Galilee/Judea",role:"Galilean prophet-teacher; central figure of early Christianity, crucified c. 30 CE.",thread:"apocalyptic"},
  {name:"John of Patmos",he:"",era:"CE",y0:95,y1:100,region:"Anatolia (exile)",role:"Visionary author of the Book of Revelation, the early Christian apocalyptic text.",thread:"apocalyptic"},
  {name:"Shimon bar Yochai",he:"",era:"CE",y0:132,y1:160,region:"Roman Judea",role:"Tannaitic sage; legendary attribution of the Zohar, key merkabah-mysticism figure.",thread:"mystical"},
  {name:"Abraham Abulafia",he:"",era:"CE",y0:1240,y1:1291,region:"Spain/Italy",role:"Medieval prophetic Kabbalist; ecstatic practices and messianic self-claims (13th c.).",thread:"mystical"},
  {name:"Sabbatai Tsevi",he:"",era:"CE",y0:1626,y1:1676,region:"Smyrna/Ottoman lands",role:"Smyrna-born messianic claimant; center of the 1665–66 Sabbatean movement.",thread:"sabbatean-frankist"},
  {name:"Nathan of Gaza",he:"",era:"CE",y0:1644,y1:1680,region:"Ottoman Gaza",role:"Sabbatai Tsevi's prophet; theological architect of Sabbatean messianism.",thread:"sabbatean-frankist"},
  {name:"Jacob Frank",he:"",era:"CE",y0:1726,y1:1791,region:"Poland/Ottoman",role:"Polish Sabbatean successor; founder of the Frankist movement, cast by his own doctrine as the Antichrist — the antinomian messianic counterpart who abolishes the old law.",thread:"sabbatean-frankist",endpoint:true,designation:"Antichrist"}
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
};

const PROPHETS = RAW.map(p=>({ ...p, he: (p.he||'').replace(POINTED,''), prophecies: PROPHECIES[p.name] || null }));
export { PROPHETS };
