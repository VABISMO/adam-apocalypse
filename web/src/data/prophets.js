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
const PROPHETS = RAW.map(p=>({ ...p, he: (p.he||'').replace(POINTED,'') }));
export { PROPHETS };
