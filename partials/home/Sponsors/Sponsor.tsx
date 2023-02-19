import style from "../../../styles/Sponsors.module.scss";

const Sponsor = ({ name, logo, url }) => {
  if (!logo || !url) return null;

  {
    /* new tab  - open <a> in new tab */
  }

  return (
    <li className={style.sponsor}>
      <a href={url} target="_blank" rel="noreferrer">
        <img src={logo} alt={name}></img>
      </a>
    </li>
  );
};

export default Sponsor;
