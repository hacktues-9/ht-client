import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import Input from "../../components/form/Input";
import {
  ContainerEatingPreferences,
  ContainerAlergies,
  ContainerTshirt,
} from "../../components/form/signup/multipleChoice/Container";
import { IInput } from "../../constants/form/IInput";

interface SignUpForm {
  // initial

  email: string;
  password: string;
  confirmPassword: string;

  // elsys

  firstName: string;
  lastName: string;
  phone: string;
  elsysEmail: string;
  classNumber: string;
  classLetter: string;

  // preferences

  eatingPreferences: string;
  alergies: string[];
  shirtSize: string;

  // technologies

  technologies: string[];

  // discord

  isDiscord: boolean;
}

interface ITab {
  form: SignUpForm;
  setForm: Dispatch<SetStateAction<SignUpForm>>;
}

const ElsysTab = ({ form, setForm }: ITab) => {
  const elsys: IInput[] = [
    {
      label: "име",
      classes: ["text_input"],
      id: "firstName",
      name: "firstName",
      type: "text",
      placeholder: "Георги",
      required: true,
      value: form.firstName,
      onChange: (e) => setForm({ ...form, firstName: e.target.value }),
    },
    {
      label: "фамилия",
      classes: ["text_input"],
      id: "lastName",
      name: "lastName",
      type: "text",
      placeholder: "Събев",
      required: true,
      value: form.lastName,
      onChange: (e) => setForm({ ...form, lastName: e.target.value }),
    },
    {
      label: "телефон",
      classes: ["text_input"],
      id: "phone",
      name: "phone",
      type: "text",
      placeholder: "089 123 4567",
      required: true,
      value: form.phone,
      onChange: (e) => setForm({ ...form, phone: e.target.value }),
    },
    {
      label: "elsys имейл",
      classes: ["text_input"],
      id: "elsysEmail",
      name: "elsysEmail",
      type: "email",
      placeholder: "georgi.r.sabev.2019@elsys-bg.org",
      required: true,
      value: form.elsysEmail,
      onChange: (e) => setForm({ ...form, elsysEmail: e.target.value }),
    },
    {
      label: "клас",
      classes: ["form-control"],
      id: "classNumber",
      name: "classNumber",
      type: "select",
      placeholder: "Class Number",
      required: true,
      value: form.classNumber,
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
      classes: ["form-control"],
      id: "classLetter",
      name: "classLetter",
      type: "select",
      placeholder: "Class Letter",
      required: true,
      value: form.classLetter,
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
    <div>
      <h2>{`//elsys`}</h2>
      {elsys.map((input) => (
        <Input key={input.id} {...input} />
      ))}
    </div>
  );
};

export default ElsysTab;
