import Link from "next/link";
import router from "next/router";

import { FormEvent, useEffect, useState } from "react";

import { useAuthContext } from "../../context/authContext";

import ElsysTab from "../../partials/SignUp/Elsys";
import InitialTab from "../../partials/SignUp/Initial";
import PreferencesTab from "../../partials/SignUp/Preferences";
import TechnologiesTab from "../../partials/SignUp/Technologies";

import {
  SIGN_UP_ERRORS,
  SIGN_UP_FORM,
  SignUpErrors,
  SignUpForm,
  Steps,
} from "../../types/ISignUp";
import {
  validateElsys,
  validateInitial,
  validatePreferences,
  validateTechnologies,
} from "./validation";

import styles from "../../styles/login/Login.module.scss";

import style from "./style.module.scss";

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>(SIGN_UP_FORM);
  const [errors, setErrors] = useState<SignUpErrors>(SIGN_UP_ERRORS);
  const [finalError, setFinalError] = useState<string | null>(null);
  const [step, setStep] = useState<Steps | null>(null);
  const [nextStep, setNextStep] = useState<Steps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(false);

  const { setAuthState } = useAuthContext();

  const handleNextStep = async () => {
    if (step == Steps.initial) await validateInitial(form, setErrors);
    if (step == Steps.elsys) await validateElsys(form, setErrors);
    if (step == Steps.preferences) await validatePreferences(form, setErrors);

    if (Object.values(errors).some((error) => error)) return;

    // next step
    setNextStep(step + 1);
  };

  const handlePrevStep = () => {
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

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = async (
    event
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    // client-side validation

    await validateInitial(form, setErrors);
    await validateElsys(form, setErrors);
    await validatePreferences(form, setErrors);
    //validateTechnologies(form, setErrors);

    // if there are errors, exit the function

    if (Object.values(errors).some((error) => error.length > 0)) {
      console.log("handleSubmit with errors");
      setIsSubmitting(false);
      return;
    }

    // api post req using axios

    fetch("https://api.hacktues.bg/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setIsSubmitting(false);
        } else {
          // save user data to context and get authentication token + refresh token
          // check status code
          if (data.status !== 200) {
            if (data.message === "Duplicate entry") {
              setFinalError("Вече съществува потребител с този имейл адрес.");
            } else {
              setFinalError("Възникна грешка при регистрацията.");
            }
            setIsSubmitting(false);
            return;
          }
          setAuthState(data, true);
          router
            .push("/")
            .then(() => window.scrollTo(0, 0))
            .then(() => window.location.reload);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.log(error);
      });

    setIsSubmitting(false);
  };

  // handle step change - after error validation and prevent going next if there are errors

  useEffect(() => {
    if (step == null) {
      setStep(0);
      setNextStep(0);
    }
    // if (step < nextStep) {
    //   setErrors(SIGN_UP_ERRORS);
    // }
  }, [step]);

  // on error change
  useEffect(() => {
    if(step == null) return;
    if(step == nextStep) return;
    
    if (Object.values(errors).some((error) => error.length > 0)) {
      console.log("ERRORS", step, nextStep)
      setNextStep(step);
    } else {
      console.log("NO ERRORS", step, nextStep)
      setStep(nextStep);
    }
  }, [errors, nextStep, step]);

  return (
    <div className={style.sign_container}>
      <form className={style.sign_form} onSubmit={handleSubmit}>
        <div className={style.tabs}>
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
        <div className={style.buttons} style={{ marginTop: "1rem" }}>
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
              type={"button"}
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
                style={{}}
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
