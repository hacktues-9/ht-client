import { useState } from "react";
import { SelectableTshirt } from "./Card";
import style from "../../../../styles/0/login/Selectable.module.scss";
import {
  EATING_PREFERENCES,
  ALERGIES,
  TSHIRT_SIZE,
} from "../../../../constants/preferences";

import { TbEgg, TbMilk } from "react-icons/tb";

interface SelectableContainerProps {
  children: React.ReactNode;
  title: string;
}

const SelectableContainer = ({
  children,
  title,
  ...props
}: SelectableContainerProps) => {
  return (
    <div className={style.containerd}>
      <h2>{title}</h2>
      <div className={style.container} {...props}>
        {children}
      </div>
    </div>
  );
};

export default SelectableContainer;

const SELECTED_EATING_PREFERENCES = {
  VEGETARIAN: false,
  VEGAN: false,
  NONE: false,
};

export const ContainerEatingPreferences = () => {
  const [isSelected, setIsSelected] = useState(SELECTED_EATING_PREFERENCES);

  return (
    <SelectableContainer title="ядене">
      {Object.keys(SELECTED_EATING_PREFERENCES).map((preference) => (
        <SelectableTshirt
          key={preference}
          size={EATING_PREFERENCES[preference]}
          selected={isSelected[preference]}
          onClick={() =>
            setIsSelected({
              ...SELECTED_EATING_PREFERENCES,
              [preference]: !isSelected[preference],
            })
          }
        />
      ))}
    </SelectableContainer>
  );
};

const SELECTED_ALERGIES = {
  EGGS: false,
  NUTS: false,
  MILK: false,
  GLUTEN: false,
};

const ICONS_ALERGIES = {
  EGGS: <TbEgg />,
  NUTS: <TbEgg />,
  MILK: <TbMilk />,
  GLUTEN: <TbEgg />,
};

export const ContainerAlergies = () => {
  const [isSelected, setIsSelected] = useState(SELECTED_ALERGIES);

  return (
    <SelectableContainer title="алергии">
      {Object.keys(SELECTED_ALERGIES).map((alergy) => (
        <SelectableTshirt
          key={alergy}
          size={ALERGIES[alergy]}
          /* icon={ICONS_ALERGIES[alergy]} */
          selected={isSelected[alergy]}
          onClick={() =>
            setIsSelected({
              ...isSelected,
              [alergy]: !isSelected[alergy],
            })
          }
        />
      ))}
    </SelectableContainer>
  );
};

const SELECTED_TSHIRT = {
  S: false,
  M: false,
  L: false,
  XL: false,
  XXL: false,
  XXXL: false,
};

export const ContainerTshirt = () => {
  const [isSelected, setIsSelected] = useState(SELECTED_TSHIRT);

  return (
    <SelectableContainer title="тениска">
      {TSHIRT_SIZE.map((tshirt) => (
        <SelectableTshirt
          key={tshirt.size}
          size={tshirt.size}
          icon={tshirt.icon}
          selected={isSelected[tshirt.size]}
          onClick={() =>
            setIsSelected({
              ...SELECTED_TSHIRT,
              [tshirt.size]: !isSelected[tshirt.size],
            })
          }
        />
      ))}
    </SelectableContainer>
  );
};
