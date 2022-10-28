import Image from "next/image";
import card from "../styles/Arc.Card.module.scss";
import { ICard } from "../types/IArchive";

const Card = ({
  name,
  shortDescription,
  date,
  location,
  backgroundImg,
  classNames,
  url,
}: ICard) => {
  return (
    <div className={card[classNames]}>
      {/* <Image src={logo} alt={name} width={16} height={5} layout="responsive"/> */}
      <div className={card.title} dangerouslySetInnerHTML={{ __html: name }} />
      <div className="card-description">{shortDescription}</div>
      <div className="card-date">{date}</div>
      <div className="card-location">{location}</div>
      <div className="card-background">
        <Image
          src={backgroundImg}
          alt={name}
          width={16}
          height={5}
          layout="responsive"
        />
      
    </div>
    
    </div>
  );
};

export default Card;
