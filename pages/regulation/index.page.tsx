import Head from "next/head";
import { REGULATION } from "../../constants/regulation";

import style from "./regulaation.module.scss";

const Regulation = () => {
  return (
    <>
      <Head>
        <title>Регламент | HackTUES 9</title>
      </Head>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ maxWidth: "1024px" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              textAlign: "center",
              marginTop: "4rem",
            }}
          >
            Регламент
          </h1>
          <div
            className={style.reg}
            style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
          >
            {REGULATION.map((item, index) => {
              if (item.type === "title") {
                return (
                  <h2 key={index} id={item.id || ""}>
                    {item.data}
                  </h2>
                );
              }
              if (item.type === "text") {
                return (
                  <p key={index} id={item.id || ""}>
                    {item.data}
                  </p>
                );
              }

              if (item.type === "html") {
                return (
                  <div
                    key={index}
                    id={item.id || ""}
                    dangerouslySetInnerHTML={{ __html: item.data }}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Regulation;
