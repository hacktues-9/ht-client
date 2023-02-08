import { useState } from "react";
import { FAQ } from "../../constants/faq";

import style from "./faq.module.scss";

const FAQPage = () => {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className={style.page}>
      <h1>Често задавани въпроси</h1>
      <ul className={style.qa}>
        {FAQ.map((faq, index) => (
          <li key={faq.Q} style={{}}>
            <h2 className={style.q} onClick={() => toggle(index)}>{faq.Q}</h2>
            <p
              className={style.a}
              dangerouslySetInnerHTML={{ __html: faq.A }}
              style={{
                display: active === index ? "block" : "none",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQPage;
