import { NextPageContext } from "next";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import Input from "../../components/form/Input";
import MultipleChoiceContainer, {
  ContainerAlergies,
  ContainerEatingPreferences,
  ContainerTshirt,
} from "../../components/form/signup/multipleChoice/Container";
import { IInput } from "../../constants/form/IInput";
import ElsysTab from "../../partials/SignUp/Elsys";
import PreferencesTab from "../../partials/SignUp/Preferences";
import TechnologiesTab from "../../partials/SignUp/Technologies";

/*                       <div key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        <input {...field} />
                        {errors[field.id] && <p>{errors[field.id]}</p>}
                      </div> */

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

enum Steps {
  initial,
  elsys,
  preferences,
  technologies,
  discord,
}

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    elsysEmail: "",
    classNumber: "",
    classLetter: "",
    eatingPreferences: "",
    alergies: [],
    shirtSize: "",
    technologies: [],
    isDiscord: false,
  });
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    elsysEmail: "",
    classNumber: "",
    classLetter: "",
    eatingPreferences: "",
    alergies: [],
    shirtSize: "",
    technologies: [],
    isDiscord: false,
  };

  const FIELDS = {
    initial: [
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
        id: "confirmPassword",
        name: "confirmPassword",
        type: "password",
        placeholder: "Repeat Password",
        required: true,
        value: form.confirmPassword,
        onChange: (e) => setForm({ ...form, confirmPassword: e.target.value }),
      },
    ] as IInput[],
    preferences: [
      {
        label: "Eating Preferences",
        classes: ["form-control"],
        id: "eatingPreferences",
        name: "eatingPreferences",
        type: "text",
        placeholder: "Eating Preferences",
        required: true,
        value: form.eatingPreferences,
        onChange: (e) =>
          setForm({ ...form, eatingPreferences: e.target.value }),
      },
      {
        label: "Alert Preferences",
        classes: ["form-control"],
        id: "alergies",
        name: "alergies",
        type: "text",
        placeholder: "Alert Preferences",
        required: true,
        value: form.alergies.join(", "),
        onChange: (e) =>
          setForm({ ...form, alergies: e.target.value.split(", ") }),
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
    ] as IInput[],
    technologies: {
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
    } as IInput,
    discord: {
      label: "Discord",
      classes: ["form-check-input"],
      id: "isDiscord",
      name: "isDiscord",
      type: "checkbox",
      placeholder: "Discord",
      required: true,
      value: form.isDiscord as unknown as string,
      onChange: (e) => setForm({ ...form, isDiscord: e.target.checked }),
    } as IInput,
  };

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

  console.log("use steps to access fields", FIELDS[Steps[0]]);

  // handle step change - hide or show fields
  useEffect(() => {
    console.log("step changed", step);
  }, [step]);

  return (
    <div className="container">
      {/* <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {(Object.keys(Steps) as Array<keyof typeof Steps>).map(
          (key: string) => {
            console.log(
              key,
              FIELDS[Steps[key]],
              FIELDS[Steps[key]] && Array.isArray(FIELDS),
              typeof FIELDS[Steps[key]]
            );
            return (
              FIELDS[Steps[key]] && (
                <div key={key}>
                  <h2>{key}</h2>
                  {FIELDS[Steps[key]] && Array.isArray(FIELDS[Steps[key]]) ? (
                    FIELDS[Steps[key]].map((field: IInput) => {
                      return <Input key={field.id} {...field} />;
                    })
                  ) : (
                    <Input
                      key={FIELDS[Steps[key]].id}
                      {...FIELDS[Steps[key]]}
                    />
                  )}
                  <button type="button" onClick={() => setStep(Steps[key] + 1)}>
                    Next
                  </button>
                </div>
              )
            );
          }
        )}

        <Link href="https://discord.com" />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
          onClick={() => handleSubmit}
        >
          Submit
        </button>
      </form> */}
      <ElsysTab form={form} setForm={setForm} />
      <PreferencesTab />
      <TechnologiesTab />
    </div>
  );
};

// client side validation
const validate = (form) => {
  const errors = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    elsysEmail: "",
    classNumber: "",
    classLetter: "",
    eatingPreferences: "",
    alergies: "",
    shirtSize: "",
    technologies: "",
  };

  if (!form.email) {
    errors.email = "Email is required";
  }

  if (!form.password) {
    errors.password = "Password is required";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Repeat Password is required";
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
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

  if (!form.alergies) {
    errors.alergies = "Alert Preferences is required";
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
