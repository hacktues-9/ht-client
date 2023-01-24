import { Children } from "react";

import styles from "../styles/0/Glitchy.module.scss";

const GlitchyComponent = ({ children }) => {
  const GLITCH_LINES = 3;

  return (
    <div className={styles.stack}>
      {Array.from({ length: GLITCH_LINES }, (_, i) => (
        <div key={i} id={styles["stack" + i]}>
          {Children.map(children, (child) => child)}
        </div>
      ))}
    </div>
  );
};

export default GlitchyComponent;
