import { NextPageContext } from "next";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Input from "../../components/form/Input";
import { IInput } from "../../constants/form/IInput";

interface SignUpForm {
  // initial

  email: string;
  password: string;
  repeatPassword: string;

  // elsys

  firstName: string;
  lastName: string;
  phone: string;
  elsysEmail: string;
  classNumber: string;
  classLetter: string;

  // preferences

  eatingPreferences: string;
  alertPreferences: string[];
  shirtSize: string;

  // technologies

  technologies: string[];

  // discord

  isDiscord: boolean;
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    elsysEmail: "",
    classNumber: "",
    classLetter: "",
    eatingPreferences: "",
    alertPreferences: [],
    shirtSize: "",
    technologies: [],
    isDiscord: false,
  });

  const FIELDS: IInput[] = [
    {
      label: "Email",
      classes: ["form-control"],
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Enter email",
      required: true,
      value: form.email,
      onChange: (e) => setForm({ ...form, email: e.target.value }),
    },
    {
      label: "Password",
      classes: ["form-control"],
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
      value: form.password,
      onChange: (e) => setForm({ ...form, password: e.target.value }),
    },
    {
      label: "Repeat Password",
      classes: ["form-control"],
      id: "repeatPassword",
      name: "repeatPassword",
      type: "password",
      placeholder: "Repeat Password",
      required: true,
      value: form.repeatPassword,
      onChange: (e) => setForm({ ...form, repeatPassword: e.target.value }),
    },
    {
      label: "First Name",
      classes: ["form-control"],
      id: "firstName",
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      required: true,
      value: form.firstName,
      onChange: (e) => setForm({ ...form, firstName: e.target.value }),
    },
    {
      label: "Last Name",
      classes: ["form-control"],
      id: "lastName",
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      required: true,
      value: form.lastName,
      onChange: (e) => setForm({ ...form, lastName: e.target.value }),
    },
    {
      label: "Phone",
      classes: ["form-control"],
      id: "phone",
      name: "phone",
      type: "text",
      placeholder: "Phone",
      required: true,
      value: form.phone,
      onChange: (e) => setForm({ ...form, phone: e.target.value }),
    },
    {
      label: "Elsys Email",
      classes: ["form-control"],
      id: "elsysEmail",
      name: "elsysEmail",
      type: "email",
      placeholder: "Elsys Email",
      required: true,
      value: form.elsysEmail,
      onChange: (e) => setForm({ ...form, elsysEmail: e.target.value }),
    },
    {
      label: "Class Number",
      classes: ["form-control"],
      id: "classNumber",
      name: "classNumber",
      type: "number",
      placeholder: "Class Number",
      required: true,
      value: form.classNumber,
      onChange: (e) => setForm({ ...form, classNumber: e.target.value }),
    },
    {
      label: "Class Letter",
      classes: ["form-control"],
      id: "classLetter",
      name: "classLetter",
      type: "text",
      placeholder: "Class Letter",
      required: true,
      value: form.classLetter,
      onChange: (e) => setForm({ ...form, classLetter: e.target.value }),
    },
    {
      label: "Eating Preferences",
      classes: ["form-control"],
      id: "eatingPreferences",
      name: "eatingPreferences",
      type: "text",
      placeholder: "Eating Preferences",
      required: true,
      value: form.eatingPreferences,
      onChange: (e) => setForm({ ...form, eatingPreferences: e.target.value }),
    },
    {
      label: "Alert Preferences",
      classes: ["form-control"],
      id: "alertPreferences",
      name: "alertPreferences",
      type: "text",
      placeholder: "Alert Preferences",
      required: true,
      value: form.alertPreferences.join(", "),
      onChange: (e) =>
        setForm({ ...form, alertPreferences: e.target.value.split(", ") }),
    },
    {
      label: "Shirt Size",
      classes: ["form-control"],
      id: "shirtSize",
      name: "shirtSize",
      type: "text",
      placeholder: "Shirt Size",
      required: true,
      value: form.shirtSize,
      onChange: (e) => setForm({ ...form, shirtSize: e.target.value }),
    },
    {
      label: "Technologies",
      classes: ["form-control"],
      id: "technologies",
      name: "technologies",
      type: "text",
      placeholder: "Technologies",
      required: true,
      value: form.technologies.join(", "),
      onChange: (e) =>
        setForm({ ...form, technologies: e.target.value.split(", ") }),
    },
    {
      label: "Discord",
      classes: ["form-check-input"],
      id: "isDiscord",
      name: "isDiscord",
      type: "checkbox",
      placeholder: "Discord",
      required: true,
      value: form.isDiscord as unknown as string,
      onChange: (e) => setForm({ ...form, isDiscord: e.target.checked }),
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    console.log(form);
    /*     const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
    } else {
      console.log(data);
    } */

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {FIELDS.map((input) => (
          <Input key={input.id} {...input} />
        ))}

        <Link href="https://discord.com" />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          onClick={() => handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

// client side validation
const validate = (form) => {
  const errors = {
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    elsysEmail: "",
    classNumber: "",
    classLetter: "",
    eatingPreferences: "",
    alertPreferences: "",
    shirtSize: "",
    technologies: "",
  };

  if (!form.email) {
    errors.email = "Email is required";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  if (!form.repeatPassword) {
    errors.repeatPassword = "Repeat Password is required";
  }

  if (form.password !== form.repeatPassword) {
    errors.repeatPassword = "Passwords do not match";
  }

  if (!form.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!form.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!form.phone) {
    errors.phone = "Phone is required";
  }

  if (!form.elsysEmail) {
    errors.elsysEmail = "Elsys Email is required";
  }

  if (!form.classNumber) {
    errors.classNumber = "Class Number is required";
  }

  if (!form.classLetter) {
    errors.classLetter = "Class Letter is required";
  }

  if (!form.eatingPreferences) {
    errors.eatingPreferences = "Eating Preferences is required";
  }

  if (!form.alertPreferences) {
    errors.alertPreferences = "Alert Preferences is required";
  }

  if (!form.shirtSize) {
    errors.shirtSize = "Shirt Size is required";
  }

  if (!form.technologies) {
    errors.technologies = "Technologies is required";
  }

  return errors;
};

export default SignUp;
