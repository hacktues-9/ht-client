import { useEffect, useState } from "react";
import style from "../../../../styles/0/login/Selectable.module.scss";

const SelectableCard = ({ children, selected, onClick, ...props }) => {
  const handleClick = () => {
    console.log("clicked");
    onClick();
  };

  const [className, setClassName] = useState(style.card);

  useEffect(() => {
    console.log("selected: ", selected);
    if (selected) {
      setClassName(style.cardSelected);
    } else {
      setClassName(style.card);
    }
  }, [selected]);

  return (
    <div className={className} {...props} onClick={handleClick}>
      {children}
    </div>
  );
};

export default SelectableCard;

interface SelectableTshirtProps {
  size: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export const SelectableTshirt = ({
  size,
  icon,
  selected,
  onClick,
  ...props
}: SelectableTshirtProps) => {
  return (
    <SelectableCard selected={selected} onClick={onClick} {...props}>
      <div>{size}</div>
      {icon && <div>{icon}</div>}
    </SelectableCard>
  );
};
