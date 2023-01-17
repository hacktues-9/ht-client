import { Dispatch, SetStateAction, useEffect } from "react";
import { IInput } from "../../constants/form/IInput";
import Input from "../../components/form/Input";

import style from "../../styles/0/signup/Signup.module.scss";
import { SignUpErrors } from "../../types/ISignUp";

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

    isDiscord: string;
}

interface ITab {
    form: SignUpForm;
    setForm: Dispatch<SetStateAction<SignUpForm>>;
    errors: SignUpErrors;
}

const InitialTab = ({ form, setForm, errors }: ITab) => {
    const initial: IInput[] = [
        {
            label: "имейл",
            classes: ["email"],
            id: "email",
            name: "email",
            type: "email",
            placeholder: "boris.elsys@gmail.com",
            required: true,
            value: form.email,
            error: errors.email,
            onChange: (e) => setForm({ ...form, email: e.target.value }),
        },
        {
            label: "парола",
            classes: ["email"],
            id: "password",
            name: "password",
            type: "password",
            placeholder: "********",
            required: true,
            value: form.password,
            error: errors.password,
            onChange: (e) => setForm({ ...form, password: e.target.value }),
        },
        {
            label: "потвърди парола",
            classes: ["email"],
            id: "confirmPassword",
            name: "confirmPassword",
            type: "password",
            placeholder: "********",
            required: true,
            value: form.confirmPassword,
            error: errors.confirmPassword,
            onChange: (e) => setForm({ ...form, confirmPassword: e.target.value }),
        }
    ];

    useEffect(() => {
        console.log("TEST -> ", errors)
    }, [errors])

    return (
        <div>
            <h2>регистрация</h2>
            <div className={style.grid}>
                {initial.map((input) => (
                    <Input key={input.id} error={input.error} {...input} />
                ))}
            </div>
        </div>
    );
};

export default InitialTab;
