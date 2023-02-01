import { IInput } from "../../constants/form/IInput";
import { ERRORS_TEXT } from "../../constants/signup/errors";
import style from "../../styles/Input.module.scss";

const Input = ({ label, id, error, ...props }: IInput) => {
  if (props.type === "select") {
    return (
      <div className={`${props.classes.map((item) => style[item]).join(" ")}`}>
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          {...props}
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "5px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "0 10px",
            fontSize: "16px",
            outline: "none",
            // override the default style
            appearance: "none",
          }}
        >
          {props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{
                backgroundColor: "#000",
                borderRadius: "5px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "0 10px",
                fontSize: "16px",
                outline: "none",
                appearance: "none",
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (props.type === "profilepic") {
    return (
      <div className={`${props.classes.map((item) => style[item]).join(" ")}`}>
        <label htmlFor={id}>{label}</label>
        <input {...props} />
        {error && (
          <p style={{ color: "red" }}>{ERRORS_TEXT[props.name][error]} </p>
        )}
      </div>
    );
  }

  if (props.type === "textarea") {
    return (
      <div className={`${props.classes.map((item) => style[item]).join(" ")}`}>
        <label htmlFor={id}>{label}</label>
        <textarea {...props} />

        {error && (
          <p style={{ color: "red" }}>{ERRORS_TEXT[props.name][error]} </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${props.classes.map((item) => style[item]).join(" ")}`}>
      <label htmlFor={id}>{label}</label>
      <input {...props} />
      {error && (
        <p style={{ color: "red" }}>{ERRORS_TEXT[props.name][error]} </p>
      )}
    </div>
  );
};

export default Input;
