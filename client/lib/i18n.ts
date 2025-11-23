export type Language = "en" | "ha" | "yo" | "ig";

export interface Translations {
  [key: string]: string | Translations;
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      crisis: "The Crisis",
      programs: "Our Programs",
      getInvolved: "Get Involved",
      support: "Support Us",
      impact: "Impact Stories",
      contact: "Contact",
      volunteer: "Volunteer",
      donate: "Donate",
    },
    hero: {
      headline: "Every Life Matters",
      description:
        "LifeLine Shelter stands with the victims of crisis, terrorism, and displacement in Nigeria. Together, we provide immediate relief and long-term hope.",
      donateNow: "Donate Now",
      volunteer: "Volunteer",
    },
    stats: {
      displaced: "Internally Displaced",
      helped: "Families Helped",
      programs: "Active Programs",
    },
    quickLinks: {
      crisisUpdates: "Crisis Updates",
      crisisDesc: "Understand the scale of the crisis with real-time statistics and affected regions",
      impactStories: "Impact Stories",
      storiesDesc: "Read inspiring stories of lives transformed through our humanitarian efforts",
      campaigns: "Current Campaigns",
      campaignsDesc: "Join our active campaigns and make a direct impact in communities today",
    },
    programs: {
      title: "Our Life-Saving Programs",
      description:
        "We address the most urgent needs of displaced families with comprehensive, compassionate care",
      foodRelief: "Food Relief",
      foodDesc: "Ensuring vulnerable families have access to nutritious meals and food security",
      cleanWater: "Clean Water",
      waterDesc: "Installing water treatment systems and boreholes in displaced communities",
      healthcare: "Healthcare Services",
      healthDesc: "Mobile clinics providing vaccinations, maternal care, and emergency medical aid",
      education: "Education Programs",
      eduDesc: "Creating safe learning spaces and providing educational supplies for displaced children",
      mentalHealth: "Mental Health Support",
      mentalDesc: "Trauma counseling and community healing activities for psychological recovery",
      emergency: "Emergency Response",
      emergencyDesc: "Rapid response teams providing immediate assistance during crises and emergencies",
      exploreAll: "Explore All Programs",
      learnMore: "Learn More",
    },
    impact: {
      title: "Recent Impact Stories",
      description: "Real stories of hope, resilience, and transformation from families we've helped",
      readFullStory: "Read Full Story",
    },
    support: {
      title: "Ways to Support Us",
      description:
        "Every contribution, no matter the size, changes lives and brings hope to displaced families",
      sponsorChild: "Sponsor a Child",
      sponsorChildDesc: "Support a child's education and wellbeing for a year",
      sponsorFamily: "Sponsor a Family",
      sponsorFamilyDesc: "Provide food, shelter, and care for an entire family",
      sponsorProject: "Sponsor a Project",
      sponsorProjectDesc: "Build a school, water system, or healthcare facility",
      oneTimeGift: "One-Time Gift",
      oneTimeDesc: "Make an immediate impact with a one-time donation",
      exploreAll: "Explore All Support Options",
    },
    cta: {
      headline: "Your Action Can Save Lives Today",
      description:
        "Thousands of families displaced by conflict await help. With your support, we provide food, shelter, healthcare, and hope.",
      donateNow: "Donate Now",
      joinVolunteer: "Join as Volunteer",
      taxDeductible: "All donations are tax-deductible. We maintain transparency with detailed impact reports.",
    },
    footer: {
      about: "Supporting victims of crisis, terrorism, and displacement in Nigeria",
      quickLinks: "Quick Links",
      getInvolved: "Get Involved",
      stayUpdated: "Stay Updated",
      newsletter: "Subscribe to our newsletter for impact updates and emergency alerts",
      subscribe: "Subscribe",
      copyright: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      accessibility: "Accessibility",
    },
  },
  ha: {
    nav: {
      home: "Gida",
      about: "Game Mun",
      crisis: "Wahalan",
      programs: "Ayyuka",
      getInvolved: "Shiga",
      support: "Tallafin Mu",
      impact: "Sakamakon Aiki",
      contact: "Tuntubo",
      volunteer: "Gwada",
      donate: "Bayarwa",
    },
    hero: {
      headline: "Kowane Rai Yana Bukaci",
      description:
        "LifeLine Shelter tana neman na lokacin wahala, ketare, da jillin mutane a Nijeriya. Tare mun sanar da karfi da niyya.",
      donateNow: "Bayarwa Yanzu",
      volunteer: "Gwada Aiki",
    },
    stats: {
      displaced: "Mutanen Jillinma",
      helped: "Iyaloli da ake Taimakon",
      programs: "Ayyuka Ding",
    },
    quickLinks: {
      crisisUpdates: "Sabuwar Wahala",
      crisisDesc: "Fahimtar girma da ta wahala ta aji da lokace-lokaciyar kasuar",
      impactStories: "Sakamakon Aiki",
      storiesDesc: "Karatu labarin jiya-jiya na canja wasika ta hanyar aiki na alheri",
      campaigns: "Yakin Yanzu",
      campaignsDesc: "Shiga yakin mu kuma karu tasiri a jihoye yanzu",
    },
    programs: {
      title: "Ayyuka Masu Ceza Rai",
      description: "Mun kira mafi mahimmancin bukatarun dangi da kasua mai tausayin hankali",
      foodRelief: "Saida Abinci",
      foodDesc: "Tiyata dake mutuwar ganye ba da abinci masu gidi",
      cleanWater: "Ruwa Mai Tsarki",
      waterDesc: "Shiqa na ruwa da tubare a jihoye",
      healthcare: "Aiki Lafiya",
      healthDesc: "Yajin kasua da magani da aiki sauki",
      education: "Ayyuka Ilimi",
      eduDesc: "Shirye makada nagari da kayan ilimi ga yara jillinma",
      mentalHealth: "Tallafin Hankali",
      mentalDesc: "Shawarar jiya-jiya da ayyuka warkar jama'a",
      emergency: "Amsar Wahala",
      emergencyDesc: "Rukunin gaggawa na sakakon gaggawa a lokacin wahala",
      exploreAll: "Duba Duk Ayyuka",
      learnMore: "Kara Sanin",
    },
    impact: {
      title: "Labarin Sakamakon Aiki Na Jiya",
      description: "Labarin ziya, karfi, da canja wasika daga dangi da muka taimaka",
      readFullStory: "Karanta Labarin Gaida",
    },
    support: {
      title: "Hanyoyin Yin Tallafin Mu",
      description: "Kowane bayarwa, duk da girma, yana sauya rayuwa kuma kasada bada niyya",
      sponsorChild: "Tallafin Yaro",
      sponsorChildDesc: "Gosawa ilimin yaro kuma lafiya tsawon shekara",
      sponsorFamily: "Tallafin Dangi",
      sponsorFamilyDesc: "Saida abinci, gida, da kulawa ga dangi gaida",
      sponsorProject: "Tallafin Aiki",
      sponsorProjectDesc: "Gina makarantaee, ruwa, ko gida lafiya",
      oneTimeGift: "Bayarwa Kawai",
      oneTimeDesc: "Karu tasiri ga bayarwa kawai",
      exploreAll: "Duba Duk Hanyoyin Tallafin",
    },
    cta: {
      headline: "Aikin Ku Zai Ceza Rai A Jiya",
      description:
        "Mutaje da suka jillinma suna jira tallafi. Tare da ku, mun saida abinci, gida, lafiya, da niyya.",
      donateNow: "Bayarwa Yanzu",
      joinVolunteer: "Shiga Aiki Gwada",
      taxDeductible: "Bayarwa duk ba da haraji. Mun nuna kasua ta fili da rajistu.",
    },
    footer: {
      about: "Ina samun masu jillinma ta wahala, ketare, da jillinma a Nijeriya",
      quickLinks: "Hanyoyin Sauri",
      getInvolved: "Shiga",
      stayUpdated: "Ci Sabuwar Labari",
      newsletter: "Jiya ji sabuwan kasua da sakamakon aiki",
      subscribe: "Jiya",
      copyright: "Duk hakin ban karya.",
      privacy: "Sirrin Jiya",
      terms: "Sharutin Aiki",
      accessibility: "Samun Aiki",
    },
  },
  yo: {
    nav: {
      home: "Ile",
      about: "Nipa Wa",
      crisis: "Ibanuje",
      programs: "Ise",
      getInvolved: "Darapomo",
      support: "Owo Wa",
      impact: "Ise Aye",
      contact: "Olusepo",
      volunteer: "Olumulo Ara",
      donate: "Fun Owo",
    },
    hero: {
      headline: "Gbogbo Aye Lokan",
      description:
        "LifeLine Shelter wa pelu awon ti o ba inu sise, ibajida, ati ajagunna ni Nigeria. Papopo a fun akunnu ati ireti ti o peje.",
      donateNow: "Fun Owo Ni Bayi",
      volunteer: "Olumulo Ara",
    },
    stats: {
      displaced: "Awon Alomulo Ara",
      helped: "Ebi Ti Owun Tun Se",
      programs: "Ise Ding Ti O De",
    },
    quickLinks: {
      crisisUpdates: "Ati Ti Ibanuje",
      crisisDesc: "Ye oye nipa ibanuje ti o je ati awon ilu ti o ba",
      impactStories: "Ise Aye",
      storiesDesc: "Ka awon akikọ ti o yipada nipa ise aye wa",
      campaigns: "Ise Igba Bayi",
      campaignsDesc: "Darapomo si ise wa ati se iranlọwọ ni ile bayi",
    },
    programs: {
      title: "Ise Ti O Gba Aye",
      description: "A fi agbara jade fun awon ibajida ni iye ti pẹ niyanju",
      foodRelief: "Owun Onje",
      foodDesc: "Ife ke ebi lo fun onje ti o dun ati itusile onje",
      cleanWater: "Omi Ti O Mo",
      waterDesc: "Isekan omi ti o mo ati iwe omi ni ile to",
      healthcare: "Ise Lai Arun",
      healthDesc: "Oja arun ati oogun pẹlu akunnu lobinrin oniponju",
      education: "Ise Eko",
      eduDesc: "Gba ile eko ti o dun ati ohun eko fun awon omo",
      mentalHealth: "Iranlọwọ Oju Inu",
      mentalDesc: "Iwoye ti ipinnu ati akunnu ara ilu",
      emergency: "Iwoye Iyanu",
      emergencyDesc: "Oku iwoye iyanu ninu akoko ibanuje",
      exploreAll: "Wo Gbogbo Ise",
      learnMore: "Mo Siwaju",
    },
    impact: {
      title: "Akikọ Ise Aye Ti O Kọja",
      description: "Akikọ ti o je aye, agbara, ati yiyipada lati awon ti a tun se",
      readFullStory: "Ka Akikọ Gbogbo",
    },
    support: {
      title: "Awon Ọna Ti E Le Se Owo Wa",
      description: "Gbogbo owo, o kan iyika, yipada aye ati fun ireti",
      sponsorChild: "Tun Se Omo",
      sponsorChildDesc: "Tun se eko omo ati lai arun fun odun kan",
      sponsorFamily: "Tun Se Ebi",
      sponsorFamilyDesc: "Fun onje, ile, ati akunnu ebi gagariga",
      sponsorProject: "Tun Se Ise",
      sponsorProjectDesc: "Gba ile eko, omi, tabi gida lai arun",
      oneTimeGift: "Owo Kan Ni Ise",
      oneTimeDesc: "Se iranlọwọ pẹlẹ yi pẹlẹ pẹlẹ",
      exploreAll: "Wo Gbogbo Awon Ọna Ti O Le Fun",
    },
    cta: {
      headline: "Ise Re Le Gba Aye Ni Bayi",
      description:
        "Awon ebi ti alomulo ara niran akunnu. Pẹlu e, a fun onje, ile, lai arun, ati ireti.",
      donateNow: "Fun Owo Ni Bayi",
      joinVolunteer: "Darapomo Bi Olumulo Ara",
      taxDeductible: "Gbogbo owo ko na owun. A fihun imole yi bayi pelu akiyesi iye.",
    },
    footer: {
      about: "Itepin ni awon ti o ba inu, ibajida, ati alomulo ara ni Nigeria",
      quickLinks: "Awon Ọna Sarani",
      getInvolved: "Darapomo",
      stayUpdated: "Gbe Lase Akikọ",
      newsletter: "Daropekun si akikọ wa fun ise aye ati akikọ iyanu",
      subscribe: "Daropekun",
      copyright: "Gbogbo eto ko le je.",
      privacy: "Ète Gizà",
      terms: "Ằ Ise",
      accessibility: "Iranlọwọ Waiwai",
    },
  },
  ig: {
    nav: {
      home: "Ụlọ",
      about: "Maka Anyị",
      crisis: "Nsogbu",
      programs: "Ọrụ",
      getInvolved: "Sonyere",
      support: "Gụzobere Anyị",
      impact: "Nkazi Ndị Abadum",
      contact: "Kpa Okwu",
      volunteer: "Volontiali",
      donate: "Nye Ego",
    },
    hero: {
      headline: "Onye Ọbụla Dị Mkpa",
      description:
        "LifeLine Shelter na-ezute ndị okwu agha, okwu gba, na nd��� nkụda ala n'ụzọ anu na Nigeria. Anyị na-enye aka ngwa ngwa na obi ụtọ n'ụkwụ.",
      donateNow: "Nye Ego Ugbu a",
      volunteer: "Volontiali",
    },
    stats: {
      displaced: "Ndị Nkụda Ala",
      helped: "Ezinaụlọ Akwadọla",
      programs: "Ọrụ Na-eme",
    },
    quickLinks: {
      crisisUpdates: "Akụkụ Nsogbu",
      crisisDesc: "Ghọta ihe bụ ịchị ala ahụ na mpaghara ndị ọ metụtara",
      impactStories: "Nkazi Ndị Abadum",
      storiesDesc: "Gụ akụkọ nke mmelite nke ndị ezinaụlọ anyị nyere aka",
      campaigns: "Ọnọdu Ugbu a",
      campaignsDesc: "Sonyere ọnọdu anyị ma mee ihe ọjọọ n'obodo taa",
    },
    programs: {
      title: "Ọrụ Nke Ndụ",
      description: "Anyị na-enye aka ndị nkụda ala ma nwee uche mma",
      foodRelief: "Nyefe Nri",
      foodDesc: "Inyere ezinaụlọ nri na nri dị uru",
      cleanWater: "Mmiri Dị Ọcha",
      waterDesc: "Imechi mmiri dị ọcha na ebe mmiri mma n'obodo",
      healthcare: "Ọrụ Ọgwụ",
      healthDesc: "Ụlọ ọgwụ dị nanị na mgbochi ọrịa",
      education: "Ọrụ Agụmakụ",
      eduDesc: "Imezu ụlọ akwụkwọ dịkwa mma na ihe ọmụmụ",
      mentalHealth: "Nkasi Obi",
      mentalDesc: "Ọkachamara na ụzọ azụmahụ nke obodo",
      emergency: "Ngwa Ngwa",
      emergencyDesc: "Ndị ngwa ngwa iji enyere aka na oge mgbagwu",
      exploreAll: "Hụ Ọrụ Niile",
      learnMore: "Mụta Ihe Ọzọ",
    },
    impact: {
      title: "Nkazi Ndị Abadum Di Nso-di",
      description: "Akụkọ nke ọbụbụ, inyerụ, na mmelite nke ndị anyị nyere aka",
      readFullStory: "Gụ Akụkọ Niile",
    },
    support: {
      title: "Ụzọ Inyere Anyị Aka",
      description: "Ego ọbụla, obere maọbụ isi, na-agbanwe ndụ",
      sponsorChild: "Zuocha Nwa",
      sponsorChildDesc: "Zuokwu agụmakụ nwa otu afọ",
      sponsorFamily: "Zuocha Ezinaụlọ",
      sponsorFamilyDesc: "Nye nri, ụlọ, na ụdị inyerụ nye ezinaụlọ",
      sponsorProject: "Zuocha Ọrụ",
      sponsorProjectDesc: "Wuo ụlọ akwụkwọ, mmiri, maọbụ ụlọ ọgwụ",
      oneTimeGift: "Ego Otu Mgbe",
      oneTimeDesc: "Mee ihe ọjọọ site na ego otu mgbe",
      exploreAll: "Hụ Ụzọ Niile Inyere",
    },
    cta: {
      headline: "Ọrụ Gị Nwere Ike Ịzọpụta Ndụ Taa",
      description:
        "Ezinaụlọ dị otu nde na-echere mmeghachị. Nke na g���, anyị na-enye nri, ụlọ, ọgwụ, na obi ụtọ.",
      donateNow: "Nye Ego Ugbu a",
      joinVolunteer: "Sonyere Dị ka Volontiali",
      taxDeductible: "Ego niile aghọtaghị ụtụ. Anyị na-egosi ihe niile n'ụzọ doro anya.",
    },
    footer: {
      about: "Inyere ndị okwu agha, okwu gba, na ndị nkụda ala aka n'ụzọ anu na Nigeria",
      quickLinks: "Njikọ Mwereanya",
      getInvolved: "Sonyere",
      stayUpdated: "Na-amụ Akụkọ Ọhụụ",
      newsletter: "Kpọrọ anyị adị ụnyaahụ maka akụkọ ọrụ na ngwa ngwa",
      subscribe: "Kpọrọ Anyị",
      copyright: "Ihe niile nwere mkpasu ụkwụ.",
      privacy: "Nzuzo Zikọ",
      terms: "Ụkpụrụ Ọrụ",
      accessibility: "Ohere Ị Je",
    },
  },
};

export const getTranslation = (language: Language, path: string): string => {
  const keys = path.split(".");
  let value: any = translations[language];

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const enKey of keys) {
        if (value && typeof value === "object" && enKey in value) {
          value = value[enKey];
        } else {
          return path;
        }
      }
      return value;
    }
  }

  return typeof value === "string" ? value : path;
};
