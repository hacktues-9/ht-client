import Sponsor from "./Sponsor";

import style from "../../../styles/Sponsors.module.scss";

const SponaoersScrollable = ({ type, sponsors }) => {
  return (
    <div className={style.sponsors_scrollable}>
      <div className={style.sponsors_scrollable_title}>
        <h2>{type}</h2>
      </div>
      <ul className={style.sponsors_scrollable_content}>
        {sponsors.map((sponsor) => (
          <Sponsor key={sponsor.url} {...sponsor} />
        ))}
      </ul>
    </div>
  );
};

export default SponaoersScrollable;
