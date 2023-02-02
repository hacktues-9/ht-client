import { useState } from "react";

import { SelectableTshirt } from "../../components/form/signup/multipleChoice/Card";
import { TECHNOLOGIES } from "../../constants/technologies";

import style from "../../styles/0/signup/Technologies.module.scss";

const TechnologiesTab = ({ form, setForm, errors }) => {
  const [isSelected, setIsSelected] = useState({});

  const handleOnChange = (value) => {
    setForm({
      ...form,
      technologies: [...form.technologies, value],
    });
    setIsSelected({
      ...isSelected,
      [value]: !isSelected[value],
    });
  };

  return (
    <div className="technologies">
      <h2>технологии</h2>
      <div className={style.container}>
        {TECHNOLOGIES.map((technology) => (
          <SelectableTshirt
            key={technology.name}
            size={technology.name}
            selected={isSelected[technology.name]}
            style={{
              backgroundColor: technology.backgroundColor,
              color: technology.color,
              opacity: isSelected[technology.name] ? 1 : 0.7,
              outline: !isSelected[technology.name]
                ? "none"
                : `2px solid white`,
              cursor: "pointer",
            }}
            onClick={() => handleOnChange(technology.name)}
          />
        ))}
      </div>
      <p className="error">{errors.technologies}</p>
    </div>
  );
};

export default TechnologiesTab;
