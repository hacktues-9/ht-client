import Head from "next/head";
import { TbChevronDown } from "react-icons/tb";

import CardContainer from "../partials/Arc/CardsContainer";
import Countdown from "../partials/home/Countdown";

import styles from "../styles/Home.module.scss";

import { METADATA, RICH, TITLE } from "../constants/arc";
import Medias from "../partials/home/Medias";
import Sponsors from "../partials/home/Sponsors";

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

        <script
          key="ld:json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(RICH),
          }}
        />
      </Head>
      <main className={styles.main}>
        <div className={styles.front}>
          <div className={styles.stack}>
            <span id={styles.stack0}>{TITLE}</span>
            <span id={styles.stack1}>{TITLE}</span>
            <span id={styles.stack2}>{TITLE}</span>
          </div>
          <Countdown />
          <a className={styles.button} href="#sponsors_media">
            <TbChevronDown />
          </a>
        </div>
        <section id="sponsors_media" className={styles.sponsors_media}>
          <Sponsors />
          <Medias />
        </section>
      </main>
    </div>
  );
};

export default Home;
