import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import arc from "../constants/arc";

import Card from "../components/card";

export default function Home() {
  return (
    <div
      className={styles.container}
      style={{ height: "100vh", width: "100vw" }}
    >
      <Head>
        <title>HackTUES 9</title>
        <meta name="description" content="HackTUES 9" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>HackTUES 9</h1>
        {/* {Object.keys(arc).map((hackathon) => {
          return (
            <Card
              key={hackathon}
              title={hackathon}
              description={arc[hackathon].shortDescription}
              image={arc[hackathon].logo}
            />
          );
        })} */}
      </main>
    </div>
  );
}
