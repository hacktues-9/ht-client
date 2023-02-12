import Sponsor from "./Sponsor";

import style from "../../../styles/Sponsors.module.scss";
import { useEffect, useState } from "react";

const TYPE = {
  alpha: "Алфа спонсори",
  beta: "Бета спонсори",
  gamma: "Гама спонсори",
  partners: "Партньори",
}

const SponaoersScrollable = ({ type, sponsors }) => {
/*   const [firstSponsor, setFirstSponsor] = useState(0);

  // TODO -> Do with Refs
  useEffect(() => {
    const interval = setInterval(() => {
      // if on hover, don't scroll
      if (document.querySelector(`.${style.sponsor}:hover`)) {
        return;
      }

      setFirstSponsor(firstSponsor + 1);
      if (firstSponsor > sponsors.length + 1) {
        setFirstSponsor(0);
      }

      const scrollable = document.querySelector(`.${type || ""}`);
      const sponsor = document.querySelector(`.${style.sponsor}`);

      console.log(
        scrollable.clientWidth,
        scrollable.clientWidth / sponsor.clientWidth + firstSponsor,
        sponsors.length,
        sponsor.clientWidth
      );

      if (scrollable.clientWidth / sponsor.clientWidth + firstSponsor - 1 > sponsors.length) {
        setFirstSponsor(0);
      }

      scrollable.scrollTo({
        left: 200 * firstSponsor,
        behavior: "smooth",
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [firstSponsor]); */

  return (
    <div className={style.sponsors_scrollable}>
      <div className={style.sponsors_scrollable_title}>
        <h2>{TYPE[type]}</h2>
      </div>
      <ul className={style.sponsors_scrollable_content + " " + type} style={{
        flexWrap: 'wrap'
      }}>
        {sponsors.map((sponsor) => (
          <Sponsor key={sponsor.name} {...sponsor} />
        ))}
      </ul>
    </div>
  );
};

export default SponaoersScrollable;
