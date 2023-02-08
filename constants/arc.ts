import { ICard } from "../types/IArchive";

export const TITLE: string = "HackTUES 9";

export const METADATA = {
  title: TITLE,
  description:
    "Hack TUES е единственият хакатон в България, организиран от ученици за ученици.🙌 ",
  image: "https://hacktues.bg/favicon.png",
  url: "https://hacktues.bg",
  twitter: "@hacktues",
  themeColor: "#000000",
  favicon: "/favicon.png",
  keywords: [
    "hackathon",
    "hacktues",
    "hacktues9",
    "hacktues8",
    "hacktues 9",
    "hacktues 8",
    "хакатон",
    "българия",
    "софия",
    "туес",
    "TUES",
    "ELSYS",
    "ТУЕС",
    "ЕЛСИС",
    "програмиране",
    "coding",
    "programming",
    "hack",
    "ученици",
    "студенти",
    "училище",
  ],
};

export const RICH = 
              {
              "@context": "https://schema.org",
              "@type": "Event",
              url: METADATA.url,
              logo: METADATA.image,
              name: TITLE,
              description: METADATA.description,
              startDate: "2023-03-08T17:00",
              endDate: "2023-03-11T21:00",
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: [
                "https://schema.org/OfflineEventAttendanceMode",
                "https://schema.org/OnlineEventAttendanceMode"
              ],
              "organizer": [
                {
                  "@type": "Organization",
                  name: "ТУЕС",
                  url: "https://tues.bg"
                },
                {
                  "@type": "Organization",
                  name: "АЗТУЕС",
                  url: "https://aztues.bg"
                },
                {
                  "@type": "Individual",
                  name: "Надежда Георгиева",
                  url: "https://www.linkedin.com/in/nadezhda-georgieva-b8a41724b/"
                },
                {
                  "@type": "Individual",
                  name: "Георги Събев",
                  url: "https://www.linkedin.com/in/georgi-sabev-5878a220a/"
                },
                {
                  "@type": "Individual",
                  name: "Виктор Димитров",
                  url: "https://www.linkedin.com/in/viktor-dimitrov-645aa624b/"
                },
                {
                  "@type": "Individual",
                  name: "Емилия Чукалева",
                  url: "https://www.linkedin.com/in/emilia-chukaleva-94442724b/"
                },
                {
                  "@type": "Individual",
                  name: "Ивайло Каньов",
                  url: "https://www.linkedin.com/in/ivailo-kanyov-6bb466176/"
                },
                {
                  "@type": "Individual",
                  name: "Ивайла Барух",
                  url: "https://www.linkedin.com/in/ivayla-p-baruh-80b83624b/"
                },
                {
                  "@type": "Individual",
                  name: "Росица Йовчева"
                },
                {
                  "@type": "Individual",
                  name: "Калоян Дойчинов",
                  url: "https://www.linkedin.com/in/kaloyand/"
                },
                {
                  "@type": "Individual",
                  name: "Мартин Божилов",
                  url: "https://www.linkedin.com/in/martin-bozhilov-796a6b225/"
                },
                {
                  "@type": "Individual",
                  name: "Ангел Николов",
                  url: "https://www.linkedin.com/in/angel-nikolov-abb42824b/"
                },
                {
                  "@type": "Individual",
                  name: "Пламена Георгиева",
                  url: "https://www.linkedin.com/in/plamena-georgieva-4304b6244/"
                },
                {
                  "@type": "Individual",
                  name: "Ивайла Панайотова",
                  url: "https://www.linkedin.com/in/ivayla-panayotova-22637124b/"
                },
                {
                  "@type": "Individual",
                  name: "Сара Тамбурковска"
                },
                {
                  "@type": "Individual",
                  name: "Мартина Бикова",
                  url: "https://www.linkedin.com/in/martina-bikova-11184224b/"
                },
                {
                  "@type": "Individual",
                  name: "Кирилка Ангелова",
                  url: "https://www.linkedin.com/in/kirilkaangelova/"
                }
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "hacktuespartners@elsys-bg.org",
                contactType: "customer support and partnership"
              },
              "location": {
                "@type": "Place",
                name: "TUES"
              }, 
              "offers": {
                "@type": "Offer",
                url: METADATA.url,
                price: 0,
                priceCurrency: "BGN",
                availability: "https://schema.org/InStock",
                validFrom: "2023-03-08T17:00"
              },
              "performer": {
                "@type": "PerformingGroup",
                name: "HackTUES 9"
              },
              image: METADATA.image,
              sameAs: ["https://www.facebook.com/HackTUES/", "https://www.linkedin.com/company/hack-tues-%C2%A7-tues-fest/"]
            }


export const CARDS: ICard[] = [
  {
    id: 1,
    name: '<span>Hack</span><span style="color: rgb(68, 101, 118);">TUES</span>',
    shortDescription: "Автоматизиране и подобряване на учебния процес в ТУЕС",
    description: "Hackathon",
    date: "2015",
    location: "ТУЕС",
    backgroundImg: "/assets/arc/hacktues_5/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 2,
    name: '<span>Hack</span><span style="color: rgb(68, 101, 118);">TUES</span>&nbsp;<span>2</span>',
    shortDescription:
      "Подпомагaне опазването на околната среда и социални каузи",
    description: "Hackathon",
    date: "2015",
    location: "ТУЕС",
    backgroundImg: "/assets/arc/hacktues_5/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 3,
    name: '<span style="color: rgb(255, 255, 255);">Hack</span><span style="color: rgb(9, 192, 222);">TUES</span>&nbsp;<span style="color: rgb(178, 0, 110);">3</span>',
    shortDescription: "Art&&Creativity",
    description: "Hackathon",
    date: "2017",
    location: "ТУЕС",
    backgroundImg: "/assets/arc/hacktues_3/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 4,
    name: '<span style="color: cyan;">Hack<sup>30x</sup>TUES</span>',
    shortDescription: "Бизнес, училище, университет",
    description: "Hackathon",
    date: "2018",
    location: "ТУЕС",
    backgroundImg: "/assets/arc/hacktues_4/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 5,
    name: '<span style="color: white;">Hack</span><span style="color: rgb(153, 208, 43);">TUES</span><span style="color: rgb(153, 208, 43);"><sup>^365</sup></span>',
    shortDescription:
      "Полза на ежедневната работа на бизнеса и живота на хората",
    description: "Hackathon",
    date: "2019",
    location: "ТУЕС",
    backgroundImg: "/assets/arc/hacktues_5/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 6,
    name: '<span style="color: white;">Hack</span><span style="color: rgb(253, 173, 32);">TUES</span>&nbsp;<span style="color: white;">6</span>',
    shortDescription: "Smart City",
    description: "Hackathon",
    date: "2020",
    location: "хибриден",
    backgroundImg: "/assets/arc/hacktues_6/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 7,
    name: '<span style="color:#009d60">HackTUES</span>&nbsp;<span style="color:#105231">GG</span>',
    shortDescription: "Develop for the environment",
    description: "Hackathon",
    date: "2021",
    location: "онлайн",
    backgroundImg: "/assets/arc/hacktues_7/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 8,
    name: '<div style="display: flex; justify-content: end; align-items: end;"><span style="color:#EBCDDD">HackTUES</span>&nbsp;<span style="transform: rotate(90deg); color: #EBCDDD; self-align: end;">8</span></div>',
    shortDescription: "Space and beyond",
    description: "Hackathon",
    date: "2022",
    location: "онлайн",
    backgroundImg: "/assets/arc/hacktues_8/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
  {
    id: 9,
    name: "Coming soon",
    shortDescription: "Coming soon",
    description: "Hackathon",
    date: "2023",
    location: "някъде",
    backgroundImg: "/assets/arc/hacktues_5/cover.png",
    classNames: "hacktues-1",
    url: "https://hacktues.com/",
    sponsors: [],
  },
];
