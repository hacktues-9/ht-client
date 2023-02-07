import { SignUpForm } from "./../../types/ISignUp";
import {
  EATING_PREFERENCES,
  ALERGIES,
  TSHIRT_SIZE,
} from "../../constants/preferences";
import { TECHNOLOGIES } from "../../constants/technologies";
import { SignUpErrors } from "../../types/ISignUp";

type validate = (form: SignUpForm, setErrors: any) => Promise<any>;

const validateInitial: validate = async (form, error) => {
  // check email if it's email using regex
  let newError = { ...error };

  if (form.email.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, email: "REQ_EMAIL" }));
    newError = { ...newError, email: "REQ_EMAIL" };
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    // await setErrors((prev: any) => ({ ...prev, email: "INVALID_EMAIL" }));
    newError = { ...newError, email: "INVALID_EMAIL" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, email: "" }));
    const res = await fetch(`https://api.hacktues.bg/api/auth/check/email/${form.email}`);
    const data = await res.json();
    if (data.status === 401) {
      newError = { ...newError, email: "EMAIL_ALREADY_IN_USE" };
    } else if (data.status === 200) {
      newError = { ...newError, email: "" };
    } else {
      newError = { ...newError, email: "UNKNOWN_ERROR" };
    }
  }

  // check password if it's at least 8 characters
  if (form.password.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, password: "REQ_PASS" }));
    newError = { ...newError, password: "REQ_PASS" };
  } else if (form.password.length < 8) {
    // await setErrors((prev: any) => ({ ...prev, password: "SHORT_PASS" }));
    newError = { ...newError, password: "SHORT_PASS" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, password: "" }));
    newError = { ...newError, password: "" };
  }

  // check if password and confirm password are the same
  if (form.password !== form.confirmPassword) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   confirmPassword: "PASS_NOT_MATCH",
    // }));
    newError = { ...newError, confirmPassword: "PASS_NOT_MATCH" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, confirmPassword: "" }));
    newError = { ...newError, confirmPassword: "" };
  }

  return { ...newError };
};

const validateElsys: validate = async (form, error) => {
  let newError = { ...error };

  // check if first name is empty and if it's not in cyrillic
  let firstName = form.firstName.replace(/\s/g, "");
  if (firstName.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, firstName: "REQ_FIRST_NAME" }));
    newError = { ...newError, firstName: "REQ_FIRST_NAME" };
  } else if (!/^[а-яА-Я]+$/.test(firstName)) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   firstName: "INVALID_FIRST_NAME",
    // }));
    newError = { ...newError, firstName: "INVALID_FIRST_NAME" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, firstName: "" }));
    newError = { ...newError, firstName: "" };
  }

  // check if last name is empty
  let lastName = form.lastName.replace(/\s/g, "");
  if (lastName.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, lastName: "REQ_LAST_NAME" }));
    newError = { ...newError, lastName: "REQ_LAST_NAME" };
  } else if (!/^[а-яА-Я]+$/.test(lastName)) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   lastName: "INVALID_LAST_NAME",
    // }));
    newError = { ...newError, lastName: "INVALID_LAST_NAME" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, lastName: "" }));
    newError = { ...newError, lastName: "" };
  }

  // check if phone number is empty and if it's valid +359 phone number
  let phone = form.phone.replace(/\s/g, "");
  if (phone.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, phone: "REQ_PHONE_NUMBER" }));
    newError = { ...newError, phone: "REQ_PHONE_NUMBER" };
  } else if (
    !/^\+359[0-9]{9}$/.test(phone) &&
    !/^08[0-9]{8}$/.test(phone) &&
    !/^09[0-9]{8}$/.test(phone) &&
    !/^00359[0-9]{9}$/.test(phone)
  ) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   phone: "INVALID_PHONE_NUMBER",
    // }));
    newError = { ...newError, phone: "INVALID_PHONE_NUMBER" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, phone: "" }));
    newError = { ...newError, phone: "" };
  }

  // check if elsys email is empty and if it's valid @elsys-bg.org email
  if (form.elsysEmail.length === 0) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   elsysEmail: "REQ_ELSYS_EMAIL",
    // }));
    newError = { ...newError, elsysEmail: "REQ_ELSYS_EMAIL" };
  } else if (!/^[a-zA-Z0-9._-]+@elsys-bg.org$/.test(form.elsysEmail)) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   elsysEmail: "INVALID_ELSYS_EMAIL",
    // }));
    newError = { ...newError, elsysEmail: "INVALID_ELSYS_EMAIL" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, elsysEmail: "" }));
    // const res = await fetch(
    //   process.env.NEXT_PUBLIC_API_URL + "/api/elsys/checkEmail",
    const res = await fetch(
      `https://api.hacktues.bg/api/auth/check/elsys_email/${form.elsysEmail}`
    );
    const data = await res.json();
    if (data.status === 401) {
      // await setErrors((prev: any) => ({
      //   ...prev,
      //   elsysEmail: "EMAIL_NOT_FOUND",
      // }));
      newError = { ...newError, elsysEmail: "EMAIL_ALREADY_IN_USE" };
    } else if (data.status === 200) {
      // await setErrors((prev: any) => ({ ...prev, elsysEmail: "" }));
      newError = { ...newError, elsysEmail: "" };
    }
  }

  // check if grade is empty and if it's between 8 and 12
  let classNumber: number;

  if (form.classNumber.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, classNumber: "REQ_GRADE" }));
    newError = { ...newError, classNumber: "REQ_GRADE" };
  } else if (isNaN((classNumber = parseInt(form.classNumber)))) {
    // await setErrors((prev: any) => ({ ...prev, classNumber: "INVALID_GRADE" }));
    newError = { ...newError, classNumber: "INVALID_GRADE" };
  } else if (classNumber < 8 || classNumber > 12) {
    // await setErrors((prev: any) => ({ ...prev, classNumber: "INVALID_GRADE" }));
    newError = { ...newError, classNumber: "INVALID_GRADE" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, classNumber: "" }));
    newError = { ...newError, classNumber: "" };
  }

  // check if class letter is empty and if it's a letter between <А> and <Г>
  if (form.classLetter.length === 0) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   classLetter: "REQ_CLASS_LETTER",
    // }));
    newError = { ...newError, classLetter: "REQ_CLASS_LETTER" };
  } else if (!/^[А-Г]$/.test(form.classLetter) || form.classLetter.length > 1) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   classLetter: "INVALID_CLASS_LETTER",
    // }));
    newError = { ...newError, classLetter: "INVALID_CLASS_LETTER" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, classLetter: "" }));
    newError = { ...newError, classLetter: "" };
  }

  return { ...newError };
};

const validatePreferences: validate = async (form, error) => {
  let newError = { ...error };

  // check if food is empty or if it's not valid - within the array
  if (form.eatingPreferences.length === 0) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   eatingPreferences: "REQ_FOOD",
    // }));
    newError = { ...newError, eatingPreferences: "REQ_FOOD" };
  } else if (
    Object.keys(EATING_PREFERENCES).indexOf(form.eatingPreferences) < 0
  ) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   eatingPreferences: "INVALID_FOOD",
    // }));
    newError = { ...newError, eatingPreferences: "INVALID_FOOD" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, eatingPreferences: "" }));
    newError = { ...newError, eatingPreferences: "" };
  }

  let newErrorsNum = 0;
  form.alergies.forEach(async (alergy) => {
    if (Object.keys(ALERGIES).indexOf(alergy) < 0) {
      // await setErrors((prev: any) => ({
      //   ...prev,
      //   alergies: "INVALID_ALERGIES",
      // }));
      newError = { ...newError, alergies: "INVALID_ALERGIES" };
      newErrorsNum++;
    }
  });

  if (newErrorsNum === 0) {
    // await setErrors((prev: any) => ({ ...prev, alergies: "" }));
    newError = { ...newError, alergies: "" };
  }

  // check if shirt size is empty or if it's not valid - within the array
  if (form.shirtSize.length === 0) {
    // await setErrors((prev: any) => ({ ...prev, shirtSize: "REQ_SHIRT_SIZE" }));
    newError = { ...newError, shirtSize: "REQ_SHIRT_SIZE" };
  } else if (
    TSHIRT_SIZE.map((tshirt) => tshirt.size).indexOf(form.shirtSize) < 0
  ) {
    // await setErrors((prev: any) => ({
    //   ...prev,
    //   shirtSize: "INVALID_SHIRT_SIZE",
    // }));
    newError = { ...newError, shirtSize: "INVALID_SHIRT_SIZE" };
  } else {
    // await setErrors((prev: any) => ({ ...prev, shirtSize: "" }));
    newError = { ...newError, shirtSize: "" };
  }

  return { ...newError };
};

const validateTechnologies: validate = async (form, error) => {
  let newError = { ...error };

  // check if technologies are valid and within the array of accepted technologies (empty is also valid)
  if (form.technologies === undefined || form.technologies === null) {
    // await setErrors((prev: any) => ({ ...prev, technologies: "" }));
    return { ...newError, technologies: "" };
  }

  let newErrorsNum = 0;
  form.technologies.forEach(async (tech) => {
    if (TECHNOLOGIES.map(({ name }) => name).indexOf(tech) < 0) {
      // await setErrors((prev: any) => ({
      //   ...prev,
      //   technologies: "INVALID_TECHNOLOGIES",
      // }));
      newError = { ...newError, technologies: "INVALID_TECHNOLOGIES" };
      newErrorsNum++;
    }
  });

  if (newErrorsNum === 0) {
    // await setErrors((prev: any) => ({ ...prev, technologies: "" }));
    newError = { ...newError, technologies: "" };
  }

  return { ...newError };
};

export {
  validateInitial,
  validateElsys,
  validatePreferences,
  validateTechnologies,
};
