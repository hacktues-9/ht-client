import { IInput } from "../../constants/form/IInput";
import style from "../../styles/Input.module.scss";

const Input = ({ label, id, ...props }: IInput) => {
  if (props.type === "select") {
    return (
      <div className={`${props.classes.map((item) => style[item]).join(' ')}`}>
        <label htmlFor={id}>{label}</label>
        <select id={id} {...props}>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className={`${props.classes.map((item) => style[item]).join(' ')}`}>
      <label htmlFor={id}>{label}</label>
      <input {...props} />
    </div>
  );
};

export default Input;
