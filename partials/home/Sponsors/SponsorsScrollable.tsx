import Sponsor from "./Sponsor";

const SponaoersScrollable = ({ type, sponsors }) => {
  return (
    <div className="sponsors-scrollable">
      <div className="sponsors-scrollable__title">
        <h2>{type}</h2>
      </div>
      <div className="sponsors-scrollable__content">
        <ul className="sponsors-scrollable__content__inner">
          {sponsors.map((sponsor, index) => (
            <Sponsor key={sponsor.url} {...sponsor} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SponaoersScrollable;
