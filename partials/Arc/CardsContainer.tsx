import Card from "../../components/Card";

import { CARDS } from "../../constants/arc";

import styles from "../../styles/Arc.module.scss";

const CardContainer = () => {
  return (
    <div id="arc" className={styles.card_container}>
      <h1 className={styles.title}>
        <span style={{ fontSize: "2rem" }}>HackTUES</span> през годините
      </h1>
      <div className={styles.card_container_grid}>
        {CARDS.map((hackathon) => {
          return <Card key={hackathon.id} {...hackathon} />;
        })}
      </div>
    </div>
  );
};

export default CardContainer;
