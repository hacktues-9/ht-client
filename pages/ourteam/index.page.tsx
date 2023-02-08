import style from "./style.module.scss";

const HTTeam = () => {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <iframe
          width="1920"
          height="1080"
          src="https://www.youtube-nocookie.com/embed/Ph79htwZlkw"
          title="нашият екип"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default HTTeam;
