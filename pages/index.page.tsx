import Head from "next/head";

import { TbChevronDown } from "react-icons/tb";
import { METADATA, TITLE } from "../constants/arc";

import Countdown from "../partials/home/Countdown";
import CardContainer from "../partials/Arc/CardsContainer";

import styles from "../styles/Home.module.scss";

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
              "startDate": "2023-03-08T17:00",
              "endDate": "2023-03-11T21:00",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "hacktuespartners@elsys-bg.org",
                "contactType": "customer support and partnership"
              },
              "location": {
                "@type": "Place",
                "name": "TUES",
              }, 
              "description": "${METADATA.description}",
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
