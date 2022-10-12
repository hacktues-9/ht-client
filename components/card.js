import Image from "next/image";
import styles from "../styles/Arc.Card.module.css";

const Card = ({ name, shortDescription, logo, backgroundImg }) => {
  return (
    <div className={styles.card}>
      <Image src={logo} alt={name} width={16} height={5} layout="responsive"/>
      <div className="card-title">{name}</div>
      <div className="card-description">{shortDescription}</div>
    </div>
  );
};

export default Card;
