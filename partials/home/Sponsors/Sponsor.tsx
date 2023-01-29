import style from "../../../styles/Sponsors.module.scss";

const Sponsor = ({ name, logo, url }) => {
  if (!logo || !url) return null;

  return (
    <li className={style.sponsor}>
      <a href={url}>
        <img src={logo} alt={name}></img>
      </a>
    </li>
  );
};

export default Sponsor;
