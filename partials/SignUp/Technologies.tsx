import { useState } from "react";

import { SelectableTshirt } from "../../components/form/signup/multipleChoice/Card";
import { TECHNOLOGIES } from "../../constants/technologies";

import style from "../../styles/0/signup/Technologies.module.scss";

const TechnologiesTab = () => {
  const [isSelected, setIsSelected] = useState({ });

  return (
    <div className="technologies">
      <h2>технологии</h2>
      <div className={style.container}>
        {TECHNOLOGIES.map((technology) => (
          <SelectableTshirt
            key={technology.name}
            size={technology.name}
            selected={isSelected[technology.name]}
            style={{ backgroundColor: technology.color }}
            onClick={() =>
              setIsSelected({
                ...isSelected,
                [technology.name]: !isSelected[technology.name],
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default TechnologiesTab;
