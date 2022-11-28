import Image from "next/image";
import card from "../styles/Arc.Card.module.scss";
import { ICard } from "../types/IArchive";

import { TbClock, TbLocation } from "react-icons/tb";

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
      <div className={card.desc}>{shortDescription}</div>
      <div className={card.info}>
        <div className={card.card_date}>
          <TbClock />
          {date}
        </div>
        <div className={card.card_location}>
          <TbLocation />
          {location}
        </div>
      </div>
      <div className={card.bg}>
        <Image
          src={backgroundImg}
          alt={shortDescription}
          fill={true}
        />
        <div className={card.overlay} />
      </div>
    </div>
  );
};

export default Card;
