import { useEffect, useState } from "react";
import style from "../../../../styles/0/login/Selectable.module.scss";

const SelectableCard = ({ children, selected, styles, onClick, ...props }) => {
  const handleClick = () => {
    onClick();
  };

  const [className, setClassName] = useState(style.card);

  useEffect(() => {
    if (selected) {
      setClassName(style.cardSelected);
    } else {
      setClassName(style.card);
    }
  }, [selected]);

  return (
    <div className={className} style={styles} {...props} onClick={handleClick}>
      {children}
    </div>
  );
};

export default SelectableCard;

interface SelectableTshirtProps {
  size: string;
  icon?: string;
  selected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

export const SelectableTshirt = ({
  size,
  icon,
  selected,
  onClick,
  style,
  ...props
}: SelectableTshirtProps) => {
  return (
    <SelectableCard selected={selected} styles={style} onClick={onClick} {...props}>
      <div>{size}</div>
      {icon && <div>{icon}</div>}
    </SelectableCard>
  );
};
