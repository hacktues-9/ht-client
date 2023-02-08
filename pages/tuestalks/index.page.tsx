import style from "./style.module.scss";

const TuesTalks = () => {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <iframe
          id="embedPlayer"
          src="https://embed.podcasts.apple.com/us/podcast/tues-talks/id1589981184?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=dark"
          height="450px"
          frameBorder="0"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
          allow="autoplay *; encrypted-media *; clipboard-write"
          style={{
            width: "100%",
            maxWidth: "660px",
            overflow: "hidden",
            borderRadius: "10px",
            transform: "translateZ(0px)",
            animation: "2s ease 0s 6 normal none running loading-indicator",
            backgroundColor: "rgb(228, 228, 228)",
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default TuesTalks;
