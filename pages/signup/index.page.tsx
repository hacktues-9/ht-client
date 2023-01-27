import router from "next/router";
import Link from "next/link";
import axios from "axios";

import { FormEvent, useEffect, useState } from "react";

import { useAuthContext } from "../../context/authContext";

import InitialTab from "../../partials/SignUp/Initial";
import ElsysTab from "../../partials/SignUp/Elsys";
import PreferencesTab from "../../partials/SignUp/Preferences";
import TechnologiesTab from "../../partials/SignUp/Technologies";

import {
  validateElsys,
  validateInitial,
  validatePreferences,
  validateTechnologies,
} from "./validation";
import {
  SIGN_UP_ERRORS,
  SIGN_UP_FORM,
  SignUpErrors,
  SignUpForm,
  Steps,
} from "../../types/ISignUp";

import styles from "../../styles/login/Login.module.scss";

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>(SIGN_UP_FORM);
  const [errors, setErrors] = useState<SignUpErrors>(SIGN_UP_ERRORS);
  const [step, setStep] = useState<Steps | null>(null);
  const [nextStep, setNextStep] = useState<Steps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(false);

  const { setAuthState } = useAuthContext();

  const validate = () => {
    const errors_val: SignUpErrors = SIGN_UP_ERRORS;

    step == Steps.initial && validateInitial(form, errors_val);
    step == Steps.elsys && validateElsys(form, errors_val);
    step == Steps.preferences && validatePreferences(form, errors_val);
    step == Steps.technologies && validateTechnologies(form, errors_val);

    //console.log(errors)
    return errors_val;
  };

  const handleNextStep = () => {
    // validate current step
    // if there are errors, exit the function
    // if not, continue with the next step

    console.log("handleNextStep -> current step", step, step == Steps.elsys);

    /*     validate().then((error_res) => {
          console.log("validate", error_res)
          if (error_res) setErrors(error_res);
          if (errors) console.log("errors in state", errors)
        }); */

    /*     setErrors(validate());
        if (errors) console.log("errors in state", errors);
    
        if (!Object.values(errors).some((error) => error.length > 0)) */
    // setStep(step + 1);

    if (step == Steps.initial) validateInitial(form, setErrors);
    if (step == Steps.elsys) validateElsys(form, setErrors);
    if (step == Steps.preferences) validatePreferences(form, setErrors);
    if (step == Steps.technologies) validateTechnologies(form, setErrors);

    //
    // next step
    setNextStep(step + 1);
    ///
  };

  const handlePrevStep = () => {
    /*     if (Object.values(errors).some((error) => error.length > 0)) {
          console.log("handlePrevStep with errors")
          setErrors(SIGN_UP_ERRORS);
        } */

    // clear errors for the next step and THEN go to the previous step

    if (step == Steps.elsys)
      setErrors({
        ...errors,
        firstName: "",
        lastName: "",
        phone: "",
        elsysEmail: "",
        classNumber: "",
        classLetter: "",
      });
    if (step == Steps.preferences)
      setErrors({
        ...errors,
        eatingPreferences: "",
        alergies: "",
        shirtSize: "",
      });
    if (step == Steps.technologies) setErrors({ ...errors, technologies: "" });

    // previous step
    setNextStep(step - 1);
  };

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    console.log(form);

    // client-side validation

    validateInitial(form, setErrors);
    validateElsys(form, setErrors);
    validatePreferences(form, setErrors);
    validateTechnologies(form, setErrors);

    // if there are errors, exit the function

    if (Object.values(errors).some((error) => error.length > 0)) {
      console.log("handleSubmit with errors");
      setIsSubmitting(false);
      return;
    }

    // api post req using axios

    axios
      .post("http://localhost:8080/api/auth/register", JSON.stringify(form), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else if (response.status == 200) {
          console.log(response.data);
          // save user data to context and get authentication token + refresh token
          const { data } = response.data;
          console.log(data)
          setAuthState(data, true);
          router.push("/signup/success");
        }
      })
      .catch((error) => {
        console.log(error);
      });

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

  // handle step change - after error validation and prevent going next if there are errors

  // TODO: Optimize this shit - it's so down bad, i don't even know how to explain it
  // fix it during the holidays
  useEffect(() => {
    console.log("useEffect step", errors);
    console.log(!Object.values(errors).some((error) => error.length > 0));
    if (
      step !== null &&
      step !== undefined &&
      step < 4 &&
      step >= 0 &&
      nextStep !== null &&
      nextStep !== undefined &&
      nextStep < 4 &&
      nextStep >= 0
    ) {
      if (
        !Object.values(errors).some((error) => error.length > 0) &&
        step === nextStep - 1
      ) {
        console.log("useEffect step -> setStep");
        setStep(nextStep);
      } else if (
        Object.values(errors).some((error) => error.length > 0) &&
        step === nextStep
      ) {
        console.log("useEffect step -> setStep");
        setStep(nextStep - 1);
      } else if (
        Object.values(errors).some((error) => error.length > 0) &&
        step === nextStep - 1
      ) {
        console.log("useEffect step -> setStep");
        setStep(nextStep - 1);
      } else if (
        !Object.values(errors).some((error) => error.length > 0) &&
        step === nextStep
      ) {
        console.log("useEffect step -> setStep");
        setStep(nextStep);
      } else {
        console.log("useEffect step -> setStep");
        setStep(nextStep);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (step == null) {
      setStep(0);
      setNextStep(0);
    }
    // if (step < nextStep) {
    //   setErrors(SIGN_UP_ERRORS);
    // }
  }, [step]);

  /*   useEffect(() => {
        if (nextStep !== null && nextStep !== undefined && nextStep < 4 && nextStep >= 0) {
          if (step !== nextStep)
            setStep(nextStep);
        }
  }, [nextStep]); */

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="tabs">
          {step == Steps.initial && (
            <InitialTab form={form} setForm={setForm} errors={errors} />
          )}
          {step == Steps.elsys && (
            <ElsysTab form={form} setForm={setForm} errors={errors} />
          )}
          {step == Steps.preferences && (
            <PreferencesTab form={form} setForm={setForm} errors={errors} />
          )}
          {step == Steps.technologies && (
            <TechnologiesTab form={form} setForm={setForm} errors={errors} />
          )}
          {/* <SubmitTab /> */}
        </div>
        <div className="buttons" style={{ marginTop: "1rem" }}>
          {step > 0 && (
            <button
              className={styles.login}
              type="button"
              onClick={handlePrevStep}
            >
              назад
            </button>
          )}
          {step < 3 && (
            <button
              className={styles.login}
              type={step == 3 ? "submit" : "button"}
              onClick={handleNextStep}
            >
              напред
            </button>
          )}
          {step == 3 && (
            <>
              <Link href="https://discord.com" />
              <button
                className={styles.login}
                disabled={isSubmitting}
                type="submit"
                onClick={() => handleSubmit}
              >
                регистрирай се
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
