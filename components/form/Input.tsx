import { IInput } from "../../constants/form/IInput";
import { ERRORS_TEXT } from "../../constants/signup/errors";
import style from "../../styles/Input.module.scss";

const Input = ({ label, id, error, ...props }: IInput) => {
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
      {error && <p style={{ color: 'red' }}>{ERRORS_TEXT[props.name][error]} </p>}
    </div>
  );
};

export default Input;
