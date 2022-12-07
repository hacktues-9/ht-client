import { useState } from "react";

import { SelectableTshirt } from "../../components/form/signup/multipleChoice/Card";
import { TECHNOLOGIES } from "../../constants/technologies";

const TechnologiesTab = () => {
  const [isSelected, setIsSelected] = useState({ });

  return (
    <div className="technologies">
      <h2>Technologies</h2>
      <div className="technologies__container">
        {TECHNOLOGIES.map((technology) => (
          <SelectableTshirt
            key={technology.name}
            size={technology.name}
            selected={isSelected[technology.name]}
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
