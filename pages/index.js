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
        <div className={styles.stack}>
          <span id={styles.stack0}>HackTUES 9</span>
          <span id={styles.stack1}>HackTUES 9</span>
          <span id={styles.stack2}>HackTUES 9</span>
        </div>
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
