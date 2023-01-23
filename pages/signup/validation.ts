import { SignUpForm } from "./../../types/ISignUp";
import {
  EATING_PREFERENCES,
  ALERGIES,
  TSHIRT_SIZE,
} from "../../constants/preferences";
import { TECHNOLOGIES } from "../../constants/technologies";
import { SignUpErrors } from "../../types/ISignUp";

type validate = (form: SignUpForm, setErrors: any) => SignUpErrors | void;

const validateInitial: validate = (form, setErrors) => {
  // initial
  console.log("validateInitial -> form", form);

  // check email if it's email using regex
  if (form.email.length === 0) {
    setErrors((prev: any) => ({ ...prev, email: "REQ_EMAIL" }));
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    setErrors((prev: any) => ({ ...prev, email: "INVALID_EMAIL" }));
  } else {
    setErrors((prev: any) => ({ ...prev, email: "" }));
  }

  // check password if it's at least 8 characters
  if (form.password.length === 0) {
    setErrors((prev: any) => ({ ...prev, password: "REQ_PASS" }));
  } else if (form.password.length < 8) {
    setErrors((prev: any) => ({ ...prev, password: "SHORT_PASS" }));
  } else {
    setErrors((prev: any) => ({ ...prev, password: "" }));
  }

  // check if password and confirm password are the same
  if (form.password !== form.confirmPassword) {
    console.log("DIFF -> ", form.password, form.confirmPassword);
    setErrors((prev: any) => ({ ...prev, confirmPassword: "PASS_NOT_MATCH" }));
  } else {
    setErrors((prev: any) => ({ ...prev, confirmPassword: "" }));
  }
};

const validateElsys: validate = (form, errors) => {
  // elsys

  const new_errors = errors;

  // check if first name is empty and if it's not in cyrillic
  if (form.firstName.length === 0) {
    new_errors.firstName = "REQ_FIRST_NAME";
  } else if (!/^[а-яА-Я]+$/.test(form.firstName)) {
    new_errors.firstName = "INVALID_FIRST_NAME";
  } else {
    new_errors.firstName = "";
  }

  // check if last name is empty
  if (form.lastName.length === 0) {
    new_errors.lastName = "REQ_LAST_NAME";
  } else if (!/^[а-яА-Я]+$/.test(form.lastName)) {
    new_errors.lastName = "INVALID_LAST_NAME";
  } else {
    new_errors.lastName = "";
  }

  // check if phone number is empty and if it's valid +359 phone number
  if (form.phone.length === 0) {
    new_errors.phone = "REQ_PHONE_NUMBER";
  } else if (!/^\+359+[0-9]{9}$/.test(form.phone)) {
    new_errors.phone = "INVALID_PHONE_NUMBER";
  } else {
    new_errors.phone = "";
  }

  // check if elsys email is empty and if it's valid @elsys-bg.org email
  if (form.elsysEmail.length === 0) {
    new_errors.elsysEmail = "REQ_ELSYS_EMAIL";
  } else if (!/^[a-zA-Z0-9._-]+@elsys-bg.org$/.test(form.elsysEmail)) {
    new_errors.elsysEmail = "INVALID_ELSYS_EMAIL";
  } else {
    new_errors.elsysEmail = "";
  }

  // check if grade is empty and if it's between 8 and 12
  let classNumber: number;

  if (form.classNumber.length === 0) {
    new_errors.classNumber = "REQ_GRADE";
  } else if (isNaN((classNumber = parseInt(form.classNumber)))) {
    new_errors.classNumber = "INVALID_GRADE";
  } else if (classNumber < 8 || classNumber > 12) {
    new_errors.classNumber = "INVALID_GRADE";
  } else {
    new_errors.classNumber = "";
  }

  // check if class letter is empty and if it's a letter between <А> and <Г>
  if (form.classLetter.length === 0) {
    new_errors.classLetter = "REQ_CLASS_LETTER";
  } else if (!/^[А-Г]$/.test(form.classLetter) || form.classLetter.length > 1) {
    new_errors.classLetter = "INVALID_CLASS_LETTER";
  } else {
    new_errors.classLetter = "";
  }

  return new_errors;
};

const validatePreferences: validate = (form, errors) => {
  // preferences
  // check if food is empty or if it's not valid - within the array
  if (form.eatingPreferences.length === 0) {
    errors.eatingPreferences = "REQ_FOOD";
  } else if (
    Object.values(EATING_PREFERENCES).indexOf(form.eatingPreferences) < 0
  ) {
    errors.eatingPreferences = "INVALID_FOOD";
  } else {
    errors.eatingPreferences = "";
  }

  // check if alergies is empty or if it's not valid - within the selecatble multichoice
  if (form.alergies.length === 0) {
    errors.alergies = "REQ_ALERGIES";
  } else {
    form.alergies.forEach((alergy) => {
      if (Object.values(ALERGIES).indexOf(alergy) < 0) {
        errors.alergies = "INVALID_ALERGIES";
        return;
      }
    });
  }

  // check if shirt size is empty or if it's not valid - within the array
  if (form.shirtSize.length === 0) {
    errors.shirtSize = "REQ_SHIRT_SIZE";
  } else if (Object.values(TSHIRT_SIZE)["size"].indexOf(form.shirtSize) < 0) {
    errors.shirtSize = "INVALID_SHIRT_SIZE";
  } else {
    errors.shirtSize = "";
  }

  return errors;
};

const validateTechnologies: validate = (form, errors) => {
  // check if technologies are valid and within the array of accepted technologies (empty is also valid)
  if (form.technologies.length > 0) {
    form.technologies.forEach((technology) => {
      if (Object.values(TECHNOLOGIES)["name"].indexOf(technology) < 0) {
        errors.technologies = "INVALID_TECHNOLOGIES";

        return;
      }
    });
  } else {
    errors.technologies = "";
  }

  return errors;
};

export {
  validateInitial,
  validateElsys,
  validatePreferences,
  validateTechnologies,
};