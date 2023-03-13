import { format } from "date-fns";

import style from "../../styles/Medias.module.scss";
import { bg } from "date-fns/locale";

const MEDIAS = [
  {
    title: "Проведе се Деветото Издание на Hack TUES 9",
    icon: "/assets/medias/devstyler.png",
    link: "https://devstyler.bg/blog/2023/03/13/provede-se-devetoto-izdanie-na-hack-tues-9/",
    date: "13 март 2023 г.",
  },
  {
    title: "224 ученици и 25 фирми участват в осмия хакатон на ТУЕС",
    icon: "/assets/medias/bnr.png",
    link: "https://bnr.bg/sofia/post/101613996/tues",
    date: "10 март 2022 г.",
  },
  {
    title: "Започна осмият хакатон на Технологично училище в София",
    icon: "/assets/medias/capital.png",
    link: "https://stolica.bg/sofia/zapochna-osmiyat-hakaton-na-tehnologichno-uchilishte-v-sofiya",
    date: "10 март 2022 г.",
  },
  {
    title:
      "Знания и талант ще демонстрират ученици в осмото издание на хакатона HackTUES",
    icon: "/assets/medias/investor.png",
    link: "https://www.investor.bg/a/261-novini/347522-znaniya-i-talant-shte-demonstrirat-uchenitsi-v-osmoto-izdanie-na-hakatona-hacktues",
    date: "8 март 2022 г.",
  },
  {
    title:
      "Ученици демонстрират знания и талант в осмото издание на хакатона HackTUES",
    icon: "/assets/medias/bloomberg.png",
    link: "https://www.bloombergtv.bg/a/16-biznes-start/104120-uchenitsi-demonstrirat-znaniya-i-talant-osmoto-izdanie-na-hakatona-hacktues",
    date: "8 март 2022 г.",
  },
];

const Media = ({ title, icon, link, date }) => {
  return (
    <a className={style.media} href={link}>
      {icon && (
        <div className={style.media_image}>
          <img src={icon} alt={title} />
        </div>
      )}
      <h4>{title}</h4>
      <p>{date}</p>
    </a>
  );
};

const Medias = () => {
  return (
    <div className={style.medias}>
      <h2>Медиите за нас</h2>
      <div className={style.medias_grid}>
        {MEDIAS &&
          MEDIAS.map((media) => <Media key={media.title} {...media} />)}
      </div>
    </div>
  );
};

export default Medias;
