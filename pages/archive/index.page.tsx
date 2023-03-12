import Head from "next/head";
import Card from "../../components/Card";

import { CARDS } from "../../constants/arc";

import styles from "../../styles/Arc.module.scss";

const Archive = () => {
  return (
    <>
      <Head>
        <title>Архив | HackTUES 9</title>
      </Head>
      <div id="arc" className={styles.page}>
        <h1 className={styles.title}>
          <span>HackTUES</span> през годините
        </h1>
        <div className={styles.card_container_grid}>
          {CARDS.map((hackathon) => {
            return <Card key={hackathon.id} {...hackathon} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Archive;
