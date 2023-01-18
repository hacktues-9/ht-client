import { CARDS } from "../../constants/arc";
import Card from "../../components/Card";
import CardContainer from "../../partials/Arc/CardsContainer";

import styles from "../../styles/Arc.module.scss";

const Archive = () => {
  return (
      <div id="arc" className="">
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

export default Archive;
