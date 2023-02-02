import { SignUpForm } from "./../../types/ISignUp";
import {
  EATING_PREFERENCES,
  ALERGIES,
  TSHIRT_SIZE,
} from "../../constants/preferences";
import { TECHNOLOGIES } from "../../constants/technologies";
import { SignUpErrors } from "../../types/ISignUp";

type validate = (form: SignUpForm, setErrors: any) => Promise<void>;

const validateInitial: validate = async (form, setErrors) => {
  // initial
  console.log("validateInitial -> form", form);

  // check email if it's email using regex
  if (form.email.length === 0) {
    await setErrors((prev: any) => ({ ...prev, email: "REQ_EMAIL" }));
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    await setErrors((prev: any) => ({ ...prev, email: "INVALID_EMAIL" }));
  } else {
    await setErrors((prev: any) => ({ ...prev, email: "" }));
  }

  // check password if it's at least 8 characters
  if (form.password.length === 0) {
    await setErrors((prev: any) => ({ ...prev, password: "REQ_PASS" }));
  } else if (form.password.length < 8) {
    await setErrors((prev: any) => ({ ...prev, password: "SHORT_PASS" }));
  } else {
    await setErrors((prev: any) => ({ ...prev, password: "" }));
  }

  // check if password and confirm password are the same
  if (form.password !== form.confirmPassword) {
    await setErrors((prev: any) => ({
      ...prev,
      confirmPassword: "PASS_NOT_MATCH",
    }));
  } else {
    await setErrors((prev: any) => ({ ...prev, confirmPassword: "" }));
  }
};

const validateElsys: validate = async (form, setErrors) => {
  // elsys

  //const new_errors = errors;

  // check if first name is empty and if it's not in cyrillic
  let firstName = form.firstName.replace(/\s/g, "");
  if (firstName.length === 0) {
    //new_errors.firstName = "REQ_FIRST_NAME";
    await setErrors((prev: any) => ({ ...prev, firstName: "REQ_FIRST_NAME" }));
  } else if (!/^[а-яА-Я]+$/.test(firstName)) {
    //new_errors.firstName = "INVALID_FIRST_NAME";
    await setErrors((prev: any) => ({
      ...prev,
      firstName: "INVALID_FIRST_NAME",
    }));
  } else {
    //new_errors.firstName = "";
    await setErrors((prev: any) => ({ ...prev, firstName: "" }));
  }

  // check if last name is empty
  let lastName = form.lastName.replace(/\s/g, "");
  if (lastName.length === 0) {
    //new_errors.lastName = "REQ_LAST_NAME";
    await setErrors((prev: any) => ({ ...prev, lastName: "REQ_LAST_NAME" }));
  } else if (!/^[а-яА-Я]+$/.test(lastName)) {
    //new_errors.lastName = "INVALID_LAST_NAME";
    await setErrors((prev: any) => ({
      ...prev,
      lastName: "INVALID_LAST_NAME",
    }));
  } else {
    // new_errors.lastName = "";
    await setErrors((prev: any) => ({ ...prev, lastName: "" }));
  }

  // check if phone number is empty and if it's valid +359 phone number
  let phone = form.phone.replace(/\s/g, "");
  console.warn("PHONE -> ", phone);
  if (phone.length === 0) {
    await setErrors((prev: any) => ({ ...prev, phone: "REQ_PHONE_NUMBER" }));
  } else if (
    !/^\+359[0-9]{9}$/.test(phone) &&
    !/^08[0-9]{8}$/.test(phone) &&
    !/^09[0-9]{8}$/.test(phone) &&
    !/^00359[0-9]{9}$/.test(phone)
  ) {
    await setErrors((prev: any) => ({
      ...prev,
      phone: "INVALID_PHONE_NUMBER",
    }));
  } else {
    //new_errors.phone = "";
    await setErrors((prev: any) => ({ ...prev, phone: "" }));
  }

  // check if elsys email is empty and if it's valid @elsys-bg.org email
  if (form.elsysEmail.length === 0) {
    // new_errors.elsysEmail = "REQ_ELSYS_EMAIL";
    await setErrors((prev: any) => ({
      ...prev,
      elsysEmail: "REQ_ELSYS_EMAIL",
    }));
  } else if (!/^[a-zA-Z0-9._-]+@elsys-bg.org$/.test(form.elsysEmail)) {
    // new_errors.elsysEmail = "INVALID_ELSYS_EMAIL";
    await setErrors((prev: any) => ({
      ...prev,
      elsysEmail: "INVALID_ELSYS_EMAIL",
    }));
  } else {
    // new_errors.elsysEmail = "";
    await setErrors((prev: any) => ({ ...prev, elsysEmail: "" }));
  }

  // check if grade is empty and if it's between 8 and 12
  let classNumber: number;

  if (form.classNumber.length === 0) {
    // new_errors.classNumber = "REQ_GRADE";
    await setErrors((prev: any) => ({ ...prev, classNumber: "REQ_GRADE" }));
  } else if (isNaN((classNumber = parseInt(form.classNumber)))) {
    // new_errors.classNumber = "INVALID_GRADE";
    await setErrors((prev: any) => ({ ...prev, classNumber: "INVALID_GRADE" }));
  } else if (classNumber < 8 || classNumber > 12) {
    // new_errors.classNumber = "INVALID_GRADE";
    await setErrors((prev: any) => ({ ...prev, classNumber: "INVALID_GRADE" }));
  } else {
    // new_errors.classNumber = "";
    await setErrors((prev: any) => ({ ...prev, classNumber: "" }));
  }

  // check if class letter is empty and if it's a letter between <А> and <Г>
  if (form.classLetter.length === 0) {
    //new_errors.classLetter = "REQ_CLASS_LETTER";
    await setErrors((prev: any) => ({
      ...prev,
      classLetter: "REQ_CLASS_LETTER",
    }));
  } else if (!/^[А-Г]$/.test(form.classLetter) || form.classLetter.length > 1) {
    // new_errors.classLetter = "INVALID_CLASS_LETTER";
    await setErrors((prev: any) => ({
      ...prev,
      classLetter: "INVALID_CLASS_LETTER",
    }));
  } else {
    //new_errors.classLetter = "";
    await setErrors((prev: any) => ({ ...prev, classLetter: "" }));
  }

  //return new_errors;
};

const validatePreferences: validate = async (form, setErrors) => {
  // preferences
  // check if food is empty or if it's not valid - within the array
  if (form.eatingPreferences.length === 0) {
    await setErrors((prev: any) => ({
      ...prev,
      eatingPreferences: "REQ_FOOD",
    }));
  } else if (
    Object.keys(EATING_PREFERENCES).indexOf(form.eatingPreferences) < 0
  ) {
    await setErrors((prev: any) => ({
      ...prev,
      eatingPreferences: "INVALID_FOOD",
    }));
  } else {
    await setErrors((prev: any) => ({ ...prev, eatingPreferences: "" }));
  }

  let newErrorsNum = 0;
  form.alergies.forEach(async (alergy) => {
    if (Object.keys(ALERGIES).indexOf(alergy) < 0) {
      await setErrors((prev: any) => ({
        ...prev,
        alergies: "INVALID_ALERGIES",
      }));
      newErrorsNum++;
    }
  });

  if (newErrorsNum === 0) {
    await setErrors((prev: any) => ({ ...prev, alergies: "" }));
  }

  // check if shirt size is empty or if it's not valid - within the array
  if (form.shirtSize.length === 0) {
    //errors.shirtSize = "REQ_SHIRT_SIZE";
    await setErrors((prev: any) => ({ ...prev, shirtSize: "REQ_SHIRT_SIZE" }));
  } else if (
    TSHIRT_SIZE.map((tshirt) => tshirt.size).indexOf(form.shirtSize) < 0
  ) {
    // errors.shirtSize = "INVALID_SHIRT_SIZE";
    await setErrors((prev: any) => ({
      ...prev,
      shirtSize: "INVALID_SHIRT_SIZE",
    }));
  } else {
    // errors.shirtSize = "";
    await setErrors((prev: any) => ({ ...prev, shirtSize: "" }));
  }
};

const validateTechnologies: validate = async (form, setErrors) => {
  // check if technologies are valid and within the array of accepted technologies (empty is also valid)
  if (form.technologies === undefined || form.technologies === null) {
    await setErrors((prev: any) => ({ ...prev, technologies: "" }));
    return;
  }

  if (form.technologies.length > 0) {
    form.technologies.forEach(async (technology) => {
      if (Object.keys(TECHNOLOGIES).indexOf(technology) < 0) {
        // errors.technologies = "INVALID_TECHNOLOGIES";
        await setErrors((prev: any) => ({
          ...prev,
          technologies: "INVALID_TECHNOLOGIES",
        }));
      }
    });
  }
};

export {
  validateInitial,
  validateElsys,
  validatePreferences,
  validateTechnologies,
};
