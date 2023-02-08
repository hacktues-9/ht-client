import Link from "next/link";
import router from "next/router";

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

import style from "./style.module.scss";
import styles from "../../styles/login/Login.module.scss";

const SignUp = () => {
  const [form, setForm] = useState<SignUpForm>(SIGN_UP_FORM);
  const [errors, setErrors] = useState<SignUpErrors>(SIGN_UP_ERRORS);
  const [finalError, setFinalError] = useState<string | null>(null);
  const [step, setStep] = useState<Steps | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(false);

  const { setAuthState } = useAuthContext();

  const handleNextStep = async () => {
    // client-side validation
    let newErrors = null;
    if (step == Steps.initial) newErrors = await validateInitial(form, errors);
    if (step == Steps.elsys) newErrors = await validateElsys(form, errors);
    if (step == Steps.preferences)
      newErrors = await validatePreferences(form, errors);

    // if there are errors, exit the function
    if (newErrors == null) return;
    if (Object.values(newErrors).some((error: string) => error.length > 0)) {
      setErrors(newErrors);
      return;
    }

    // next step'
    setErrors(SIGN_UP_ERRORS);
    setStep(step + 1);
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
    setStep(step - 1);
  };

  const handleSubmit: (event: FormEvent<HTMLFormElement>) => void = async (
    event
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    // client-side validation

    let newErrors = null;
    newErrors = await validateTechnologies(form, errors);
    newErrors = await validatePreferences(form, newErrors);
    newErrors = await validateElsys(form, newErrors);
    newErrors = await validateInitial(form, newErrors);

    // if there are errors, exit the function
    if (Object.values(newErrors).some((error: string) => error.length > 0)) {
      setErrors(newErrors);
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
        if (data.error) {
          setFinalError(data.message);
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
          if (data.status === 200) {
            setFinalError("Успешна регистрация! Моля, потвърдете имейла си.");
            setAuthState(data, true);
            router.push("/").then(() => window.location.reload);
          }
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFinalError("Възникна грешка при регистрацията.");
      });

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (step == null) {
      setStep(0);
    }
  }, [step]);

  // check if user is logged in
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const response = await fetch("https://api.hacktues.bg/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://api.hacktues.bg/",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status == 200) {
        router.push("/");
      }
    };

    checkIfLoggedIn();
  }, []);

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
        {finalError && (
          <div className={style.error}>
            <p>{finalError}</p>
          </div>
        )}
        <div
          className={style.buttons}
          style={{
            marginTop: "1rem",
            flexDirection: step === 3 ? "column" : "row",
            gap: step !== 3 ? "1rem" : ".5rem",
          }}
        >
          {step > 0 && (
            <button
              className={styles.login}
              style={{
                opacity: 0.5,
              }}
              type="button"
              disabled={isSubmitting}
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
