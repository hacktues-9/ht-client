import SponaoersScrollable from "./Sponsors/SponsorsScrollable";

import style from "../../styles/Sponsors.module.scss";

const SPONSORS = [
  {
    type: "alpha",
    sponsors: [
      {
        name: "Appolica",
        logo: "/assets/sponsors/alpha/appolica.png",
        url: "https://www.appolica.com/",
      },
      {
        name: "Bosch Digital",
        logo: "/assets/sponsors/alpha/bosch.png",
        url: "https://www.bosch-digital.com/",
      },
      {
        name: "DXC",
        logo: "/assets/sponsors/alpha/dxc.png",
        url: "https://dxc.com/",
      },
      {
        name: "Excitel Technology",
        logo: "/assets/sponsors/alpha/excitel.png",
        url: "https://excitel.tech/",
      },
      {
        name: "Experian",
        logo: "/assets/sponsors/alpha/experian.png",
        url: "https://www.experian.com/",
      },
      {
        name: "M2M Services",
        logo: "/assets/sponsors/alpha/m2m.png",
        url: "https://m2mservices.com/",
      },
      {
        name: "SAP",
        logo: "/assets/sponsors/alpha/sap.png",
        url: "https://www.sap.com/",
      },
      {
        name: "StamSoft",
        logo: "/assets/sponsors/alpha/stamsoft.png",
        url: "https://www.stamsoft.com/",
      },
      {
        name: "TBS",
        logo: "/assets/sponsors/alpha/tbs.png",
        url: "https://www.tbs.tech/",
      },
      {
        name: "Telebid Pro",
        logo: "/assets/sponsors/alpha/telebid.png",
        url: "https://telebid-pro.com/careers/",
      },
      {
        name: "Trading 212",
        logo: "/assets/sponsors/alpha/trading212.png",
        url: "https://www.trading212.com/",
      },
    ],
  },
  {
    type: "beta",
    sponsors: [
      {
        name: "accedia",
        logo: "/assets/sponsors/beta/accedia.svg",
        url: "https://accedia.com/",
      },
      {
        name: "Amusnet",
        logo: "/assets/sponsors/beta/amusnet.png",
        url: "https://www.amusnet.com/",
      },
      {
        name: "Chaos",
        logo: "/assets/sponsors/beta/chaos.jpg",
        url: "https://www.chaos.com/",
      },
      {
        name: "Dreamix",
        logo: "/assets/sponsors/beta/dreamix.png",
        url: "https://dreamix.bg/",
      },
      {
        name: "Limechain",
        logo: "/assets/sponsors/beta/limechain.png",
        url: "https://limechain.tech/",
      },
      {
        name: "MentorMate",
        logo: "/assets/sponsors/beta/mentormate.svg",
        url: "https://www.mentormate.com/",
      },
      {
        name: "mm",
        logo: "/assets/sponsors/beta/mm.png",
        url: "https://www.mm-sol.com/",
      },
      {
        name: "Neterra",
        logo: "/assets/sponsors/beta/neterra.png",
        url: "https://neterra.net/bg",
      },
      {
        name: "PaySafe",
        logo: "/assets/sponsors/beta/paysafe.png",
        url: "https://www.paysafe.com/",
      },
      {
        name: "Progress",
        logo: "/assets/sponsors/beta/progress.png",
        url: "https://www.progress.com/",
      },
      {
        name: "Sirma",
        logo: "/assets/sponsors/beta/sirma.png",
        url: "https://sirma.bg/",
      },
      {
        name: "Strypes",
        logo: "/assets/sponsors/beta/strypes.png",
        url: "https://www.strypes.eu/",
      },
      {
        name: "Yettel",
        logo: "/assets/sponsors/beta/yettel.png",
        url: "https://yettel.bg/",
      },
    ],
  },
  {
    type: "gamma",
    sponsors: [
      {
        name: "Astea",
        logo: "/assets/sponsors/gamma/astea.png",
        url: "https://asteasolutions.com",
      },
      {
        name: "Devrix",
        logo: "/assets/sponsors/gamma/devrix.png",
        url: "https://devrix.com/",
      },
      {
        name: "IBM",
        logo: "/assets/sponsors/gamma/ibm.svg",
        url: "https://www.ibm.com/",
      },
      {
        name: "itgix",
        logo: "/assets/sponsors/gamma/itgix.png",
        url: "https://itgix.com/",
      },
      {
        name: "Nemetcheck",
        logo: "/assets/sponsors/gamma/nemetcheck.png",
        url: " https://www.nemetschek.bg/",
      },
      {
        name: "Takeaway",
        logo: "/assets/sponsors/gamma/takeaway.png",
        url: "https://www.takeaway.com/",
      },
    ],
  },
  {
    type: "partners",
    sponsors: [
      {
        name: "A1",
        logo: "/assets/sponsors/alpha/a1.png",
        url: "https://www.a1.bg/",
      },
      {
        name: "AZTUES",
        logo: "/assets/sponsors/partners/aztues.png",
        url: "https://aztues.bg/",
      },
      {
        name: "Comet Electronics",
        logo: "/assets/sponsors/partners/comet.png",
        url: "https://comet.bg/",
      },
      {
        name: "Corporate Gifts",
        logo: "/assets/sponsors/partners/corporate.png",
        url: "https://corporategifts.bg",
      },
      {
        name: "DevStyler",
        logo: "/assets/sponsors/partners/devstyler.png",
        url: "https://devstyler.bg/",
      },
      {
        name: "Dominos",
        logo: "/assets/sponsors/partners/dominos.png",
        url: "https://dominos.bg",
      },
      {
        name: "Green Cherry Cafe",
        logo: "/assets/sponsors/partners/green_cherry.png",
        url: "https://bg-bg.facebook.com/greencherrycafe/",
      },
      {
        name: "Harmonica",
        logo: "/assets/sponsors/partners/harmonica.png",
        url: "https://harmonica.bg"
      },
      {
        name: "Multivisia",
        logo: "/assets/sponsors/partners/multivisia.png",
        url: "https://www.multivisia.com",
      },
      {
        name: "Pure Water",
        logo: "/assets/sponsors/partners/pure_water.png",
        url: "https://purewater.bg/",
      },
      {
        name: "Smartcom",
        logo: "/assets/sponsors/partners/smartcom.png",
        url: "https://smartcom.bg/",
      },
      {
        name: "Sofia Tech Park",
        logo: "/assets/sponsors/partners/sofia-tech-park.png",
        url: "https://sofiatech.bg/",
      },
    ],
  },
];

const Sponsors = () => {
  return (
    <div className={style.sponsors}>
      <div className={style.sponsors_container}>
        {SPONSORS.map((sponsor, index) => (
          <SponaoersScrollable key={sponsor.type} {...sponsor} />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
