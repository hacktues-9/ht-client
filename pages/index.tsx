import Head from "next/head";
import { TbChevronDown } from "react-icons/tb";

import CardContainer from "../partials/Arc/CardsContainer";
import Countdown from "../partials/home/Countdown";

import styles from "../styles/Home.module.scss";

import { METADATA, TITLE } from "../constants/arc";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{METADATA.title}</title>

        <meta name="charset" content="utf-8" />

        <meta name="title" content={METADATA.title} />
        <meta name="description" content={METADATA.description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content={METADATA.themeColor} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:type" content="website" />
        <meta name="twitter:site" content={METADATA.twitter} />
        <meta name="twitter:creator" content={METADATA.twitter} />
        <meta name="twitter:title" content={METADATA.title} />
        <meta name="twitter:description" content={METADATA.description} />
        <meta name="twitter:image" content={METADATA.image} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={METADATA.url} />
        <meta property="og:image" content={METADATA.image} />
        <meta property="og:description" content={TITLE} />
        <meta property="og:site_name" content={TITLE} />

        <meta name="keywords" content={METADATA.keywords.join(", ")}></meta>

        <link rel="icon" href={METADATA.favicon} />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Event",
              "url": "${METADATA.url}",
              "logo": "${METADATA.image}",
              "name": "${TITLE}",
              "description": "${METADATA.description}",
              "startDate": "2023-03-08T17:00",
              "endDate": "2023-03-11T21:00",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
              "organizer": [
                {
                  "@type": "Organization",
                  "name": "ТУЕС",
                  "url": "https://tues.bg"
                },
                {
                  "@type": "Organization",
                  "name": "АЗТУЕС",
                  "url": "https://aztues.bg"
                },
                {
                  "@type": "Individual",
                  "name": "Надежда Георгиева",
                  "url": "https://www.linkedin.com/in/nadezhda-georgieva-b8a41724b/"
                },
                {
                  "@type": "Individual",
                  "name": "Георги Събев",
                  "url": "https://www.linkedin.com/in/georgi-sabev-5878a220a/"
                },
                {
                  "@type": "Individual",
                  "name": "Виктор Димитров",
                  "url": "https://www.linkedin.com/in/viktor-dimitrov-645aa624b/"
                },
                {
                  "@type": "Individual",
                  "name": "Емилия Чукалева",
                  "url": "https://www.linkedin.com/in/emilia-chukaleva-94442724b/"
                },
                {
                  "@type": "Individual",
                  "name": "Ивайло Каньов",
                  "url": "https://www.linkedin.com/in/ivailo-kanyov-6bb466176/"
                },
                {
                  "@type": "Individual",
                  "name": "Ивайла Барух",
                  "url": "https://www.linkedin.com/in/ivayla-p-baruh-80b83624b/"
                },
                {
                  "@type": "Individual",
                  "name": "Росица Йовчева"
                },
                {
                  "@type": "Individual",
                  "name": "Калоян Дойчинов",
                  "url": "https://www.linkedin.com/in/kaloyand/"
                },
                {
                  "@type": "Individual",
                  "name": "Мартин Божилов",
                  "url": "https://www.linkedin.com/in/martin-bozhilov-796a6b225/"
                },
                {
                  "@type": "Individual",
                  "name": "Ангел Николов",
                  "url": "https://www.linkedin.com/in/angel-nikolov-abb42824b/"
                },
                {
                  "@type": "Individual",
                  "name": "Пламена Георгиева",
                  "url": "https://www.linkedin.com/in/plamena-georgieva-4304b6244/"
                },
                {
                  "@type": "Individual",
                  "name": "Ивайла Панайотова",
                  "url": "https://www.linkedin.com/in/ivayla-panayotova-22637124b/"
                },
                {
                  "@type": "Individual",
                  "name": "Сара Тамбурковска"
                },
                {
                  "@type": "Individual",
                  "name": "Мартина Бикова",
                  "url": "https://www.linkedin.com/in/martina-bikova-11184224b/"
                },
                {
                  "@type": "Individual",
                  "name": "Кирилка Ангелова",
                  "url": "https://www.linkedin.com/in/kirilkaangelova/"
                }
              ]
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hacktuespartners@elsys-bg.org",
                "contactType": "customer support and partnership"
              },
              "location": {
                "@type": "Place",
                "name": "TUES"
              }, 
              "offers": {
                "@type": "Offer",
                "url": "${METADATA.url}",
                "price": "0",
                "priceCurrency": "BGN",
                "availability": "https://schema.org/InStock",
                "validFrom": "2023-03-08T17:00"
              },
              "performer": {
                "@type": "PerformingGroup",
                "name": "HackTUES 9"
              },
              "image": "${METADATA.image}",
              "sameAs": ["https://www.facebook.com/HackTUES/", "https://www.linkedin.com/company/hack-tues-%C2%A7-tues-fest/"]
            }
          `}
        </script>
      </Head>
      <main className={styles.main}>
        <div className={styles.front}>
          <div className={styles.stack}>
            <span id={styles.stack0}>{TITLE}</span>
            <span id={styles.stack1}>{TITLE}</span>
            <span id={styles.stack2}>{TITLE}</span>
          </div>
          <Countdown />
          <a className={styles.button} href="#arc">
            <TbChevronDown />
          </a>
        </div>
        <CardContainer />
      </main>
    </div>
  );
};

export default Home;
