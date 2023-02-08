import { useEffect } from "react";

import { REGULATION } from "../../constants/regulation";

const Regulation = () => {
  useEffect(() => {
    window.location.replace("https://www.youtube.com/shorts/m-RwCuzG-Y8");
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1024px" }}>
        <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>
          често задавани въпроси и регламент
        </h1>
        <p style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}>
          {REGULATION}
        </p>
      </div>
    </div>
  );
};

export default Regulation;
