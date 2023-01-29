import SponaoersScrollable from "./Sponsors/SponsorsScrollable";

const SPONSORS = [
  {
    type: "алфа спонсори",
    sponsors: [
      {
        name: "A1",
        logo: "/assets/sponsors/alpha/a1.png",
        url: "https://www.a1.bg/",
      },
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
        name: "M2M Solutions",
        logo: "/assets/sponsors/alpha/m2m.png",
        url: "https://www.m2msolutions.com/",
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
        url: "https://telebid-pro.com/",
      },
      {
        name: "Trading 212",
        logo: "/assets/sponsors/alpha/trading212.png",
        url: "https://www.trading212.com/",
      },
    ],
  },
  /* {
        type: "бета спонсори",
        sponsors: [
            {
                name: "Алфа Банк",
                logo: "https://www.alfa-bank.com/images/alfa-logo.svg",
                url: "https://www.alfa-bank.com/",
            },
            {
                name: "Алфа Банк",
                logo: "https://www.alfa-bank.com/images/alfa-logo.svg",
                url: "https://www.alfa-bank.com/",
            }
        ]
    },
    {
        type: "гама спонсори",
        sponsors: [
            {
                name: "Алфа Банк",
                logo: "https://www.alfa-bank.com/images/alfa-logo.svg",
                url: "https://www.alfa-bank.com/",
            },
            {
                name: "Алфа Банк",
                logo: "https://www.alfa-bank.com/images/alfa-logo.svg",
                url: "https://www.alfa-bank.com/",
            }
        ]
    },
    {
        type: "партньори",
        sponsors: [
            {
                name: "Алфа Банк",
                logo: "https://www.alfa-bank.com/images/alfa-logo.svg",
                url: "https://www.alfa-bank.com/",
            },
            {
                name: "Алфа Банк",
                logo: "https://www.alfa-bank.com/images/alfa-logo.svg",
                url: "https://www.alfa-bank.com/",
            }
        ]
    } */
];

const Sponsors = () => {
  return (
    <div className="sponsors">
      <div className="container">
        {SPONSORS.map((sponsor, index) => (
          <SponaoersScrollable key={sponsor.type} {...sponsor} />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
