import arc from "../../constants/arc";
import styles from "../../styles/Arc.module.css";
import Card from "../../components/card";

const CardContainer = () => {
  return (
    <div className={styles.card_container}>
      {Object.keys(arc).map((hackathon) => {
        return <Card key={hackathon} {...arc[hackathon]} />;
      })}
    </div>
  );
};

export default CardContainer;
