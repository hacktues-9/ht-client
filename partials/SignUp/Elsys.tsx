import { ChangeEvent, Dispatch, SetStateAction } from "react";

import Input from "../../components/form/Input";

import { IInput } from "../../constants/form/IInput";
import { SignUpErrors, SignUpForm } from "../../types/ISignUp";

import style from "../../styles/0/signup/Signup.module.scss";

interface ITab {
  form: SignUpForm;
  setForm: Dispatch<SetStateAction<SignUpForm>>;
  errors: SignUpErrors;
}

const ElsysTab = ({ form, setForm, errors }: ITab) => {
  const elsys: IInput[] = [
    {
      label: "име",
      classes: ["email"],
      id: "firstName",
      name: "firstName",
      type: "text",
      placeholder: "Георги",
      required: true,
      value: form.firstName,
      error: errors.firstName,
      onChange: (e) => setForm({ ...form, firstName: e.target.value }),
    },
    {
      label: "фамилия",
      classes: ["email"],
      id: "lastName",
      name: "lastName",
      type: "text",
      placeholder: "Събев",
      required: true,
      value: form.lastName,
      error: errors.lastName,
      onChange: (e) => setForm({ ...form, lastName: e.target.value }),
    },
    {
      label: "телефон",
      classes: ["email"],
      id: "phone",
      name: "phone",
      type: "text",
      placeholder: "089 123 4567",
      required: true,
      value: form.phone,
      error: errors.phone,
      onChange: (e) => setForm({ ...form, phone: e.target.value }),
    },
    {
      label: "elsys имейл",
      classes: ["email"],
      id: "elsysEmail",
      name: "elsysEmail",
      type: "email",
      placeholder: "georgi.r.sabev.2019@elsys-bg.org",
      required: true,
      value: form.elsysEmail,
      error: errors.elsysEmail,
      onChange: (e) => setForm({ ...form, elsysEmail: e.target.value }),
    },
    {
      label: "клас",
      classes: ["email"],
      id: "classNumber",
      name: "classNumber",
      type: "select",
      placeholder: "Class Number",
      required: true,
      value: form.classNumber,
      error: errors.classNumber,
      options: [
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
      ],
      onChange: (e: ChangeEvent<HTMLSelectElement>) =>
        setForm({ ...form, classNumber: e.target.value }),
    },
    {
      label: "паралелка",
      classes: ["email"],
      id: "classLetter",
      name: "classLetter",
      type: "select",
      placeholder: "Class Letter",
      required: true,
      value: form.classLetter,
      error: errors.classLetter,
      options: [
        { value: "А", label: "А" },
        { value: "Б", label: "Б" },
        { value: "В", label: "В" },
        { value: "Г", label: "Г" },
      ],
      onChange: (e) => setForm({ ...form, classLetter: e.target.value }),
    },
  ] as IInput[];

  return (
    <div className={style.tab}>
      <h2>{`//elsys`}</h2>
      <div className={style.grid}>
        {elsys.map((input) => (
          <Input key={input.id} {...input} />
        ))}
      </div>
    </div>
  );
};

export default ElsysTab;
