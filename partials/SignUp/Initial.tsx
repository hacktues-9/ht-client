import { Dispatch, SetStateAction } from "react";
import { IInput } from "../../constants/form/IInput";
import Input from "../../components/form/Input";

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

const InitialTab = ({ form, setForm }: ITab) => {
    const initial: IInput[] = [
        {
            label: "имейл",
            classes: ["text_input"],
            id: "email",
            name: "email",
            type: "email",
            placeholder: "boris.elsys@gmail.com",
            required: true,
            value: form.email,
            onChange: (e) => setForm({ ...form, email: e.target.value }),
        },
        {
            label: "парола",
            classes: ["text_input"],
            id: "password",
            name: "password",
            type: "password",
            placeholder: "********",
            required: true,
            value: form.password,
            onChange: (e) => setForm({ ...form, password: e.target.value }),
        },
        {
            label: "потвърди парола",
            classes: ["text_input"],
            id: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            placeholder: "********",
            required: true,
            value: form.confirmPassword,
            onChange: (e) => setForm({ ...form, confirmPassword: e.target.value }),
        }
    ];

    return (
        <div>
            <h2>регистрация</h2>
            {initial.map((input) => (
                <Input key={input.id} {...input} />
            ))}
        </div>
    );
};

export default InitialTab;
