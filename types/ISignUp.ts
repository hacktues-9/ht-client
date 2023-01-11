export interface SignUpForm {
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

const SIGN_UP_FORM: SignUpForm = {
  // initial

  email: "",
  password: "",
  confirmPassword: "",

  // elsys

  firstName: "",
  lastName: "",
  phone: "",
  elsysEmail: "",
  classNumber: "",
  classLetter: "",

  // preferences

  eatingPreferences: "",
  alergies: [],
  shirtSize: "",

  // technologies

  technologies: [],

  // discord

  isDiscord: "",
};

export interface SignUpErrors {
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
  alergies: string;
  shirtSize: string;

  // technologies

  technologies: string;

  // discord

  isDiscord: string;
}

const SIGN_UP_ERRORS: SignUpErrors = {
  // initial

  email: "",
  password: "",
  confirmPassword: "",

  // elsys

  firstName: "",
  lastName: "",
  phone: "",
  elsysEmail: "",
  classNumber: "",
  classLetter: "",

  // preferences

  eatingPreferences: "",
  alergies: "",
  shirtSize: "",

  // technologies

  technologies: "",

  // discord

  isDiscord: "",
};

export enum Steps {
  initial,
  elsys,
  preferences,
  technologies,
  discord,
}

export { SIGN_UP_FORM, SIGN_UP_ERRORS };
