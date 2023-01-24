import { CARDS } from "../../constants/arc";
import styles from "../../styles/Arc.module.scss";
import Card from "../../components/Card";
import GlitchyComponent from "../../wrappers/GlitchyComponent";

const CardContainer = () => {
  return (
    <div id="arc" className={styles.card_container}>
      <h1 className={styles.title}>
        <span style={{fontSize: '2rem'}}>HackTUES</span> през годините
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
