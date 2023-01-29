const Sponsor = ({ name, logo, url }) => {
  if (!logo || !url) return null;

  return (
    <li>
      <a href={url}>
        <img src={logo} alt={name}></img>
      </a>
    </li>
  );
};

export default Sponsor;