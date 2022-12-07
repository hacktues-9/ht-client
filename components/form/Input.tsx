import { IInput } from "../../constants/form/IInput";

const Input = ({ label, id, ...props }: IInput) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input {...props} />
    </div>
  );
};

export default Input;
