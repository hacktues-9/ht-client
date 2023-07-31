import style from "../../styles/about/FuturisticCard.module.scss";

interface FuturisticCardProps {
  name: string;
  link: string;
  role: string;
  image: string;
}

const FuturisticCard = ({
  name,
  link,
  role,
  image,
}: FuturisticCardProps): JSX.Element => {
  return (
    <div className={style.screen}>
      <div
        className={style.screen_image}
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div className={style.screen_overlay}></div>
      <div className={style.screen_content}>
        <div className={style.screen_user}>
          <span className={style.name}>{name}</span>
          <a
            className={style.link}
            href={`https://instagram.com/${
              link.startsWith("@") ? link.slice(1) : link
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link}
          </a>
          <span className={style.role}>{role}</span>
        </div>
      </div>
    </div>
  );
};

export default FuturisticCard;
