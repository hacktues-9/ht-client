import { CARDS } from "../../constants/arc";
import styles from "../../styles/Arc.module.scss";
import Card from "../../components/Card";

const CardContainer = () => {
  return (
    <div id="arc" className={styles.card_container}>
      {CARDS.map((hackathon) => {
        return <Card key={hackathon.id} {...hackathon} />;
      })}
    </div>
  );
};


export default CardContainer;
