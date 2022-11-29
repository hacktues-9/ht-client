import Head from "next/head";
import styles from "../styles/Home.module.scss";
import CardContainer from "../partials/Arc/CardsContainer";
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
      </Head>
      <main className={styles.main}>
        <div className={styles.front}>
          <div className={styles.stack}>
            <span id={styles.stack0}>{TITLE}</span>
            <span id={styles.stack1}>{TITLE}</span>
            <span id={styles.stack2}>{TITLE}</span>
          </div>
        </div>
        <a className={styles.button} href="#arc">
          Get Started
        </a>
        <CardContainer />
      </main>
    </div>
  );
};

export default Home;
