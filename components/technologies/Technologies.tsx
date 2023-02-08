import styles from "./Technologies.module.scss";

import { TECHNOLOGIES } from "../../constants/technologies";

const Technologies = ({ technology }: { technology: string }) => {
  const getBackgroundColor = (technology: string) => {
    const tech = TECHNOLOGIES.find((tech) => tech.name === technology);
    return tech?.backgroundColor || "#000000";
  };

  const getColor = (technology: string) => {
    const tech = TECHNOLOGIES.find((tech) => tech.name === technology);
    return tech?.color || "#FFFFFF";
  };

  const getIcon = (technology: string) => {
    const tech = TECHNOLOGIES.find((tech) => tech.name === technology);
    return tech?.icon || null;
  };

  return (
    <div
      className={styles.technology}
      style={{ backgroundColor: getBackgroundColor(technology), color: getColor(technology) }}
    >
      <div className={styles.technology_icon}>
        {/*         {getIcon(technology) && (
          <img src={`/icons/${getIcon(technology)}.svg`} alt={technology} />
        )} */}
        {technology}
      </div>
    </div>
  );
};

export default Technologies;
