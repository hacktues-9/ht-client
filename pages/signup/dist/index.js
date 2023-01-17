"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var Elsys_1 = require("../../partials/SignUp/Elsys");
var Preferences_1 = require("../../partials/SignUp/Preferences");
var Technologies_1 = require("../../partials/SignUp/Technologies");
var preferences_1 = require("../../constants/preferences");
var technologies_1 = require("../../constants/technologies");
var Steps;
(function (Steps) {
    Steps[Steps["initial"] = 0] = "initial";
    Steps[Steps["elsys"] = 1] = "elsys";
    Steps[Steps["preferences"] = 2] = "preferences";
    Steps[Steps["technologies"] = 3] = "technologies";
    Steps[Steps["discord"] = 4] = "discord";
})(Steps || (Steps = {}));
var SignUp = function () {
    var _a = react_1.useState({
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
        isDiscord: false
    }), form = _a[0], setForm = _a[1];
    var _b = react_1.useState(0), step = _b[0], setStep = _b[1];
    var _c = react_1.useState(false), isSubmitting = _c[0], setIsSubmitting = _c[1];
    var errors = {
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
        isDiscord: ""
    };
    var FIELDS = {
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
                onChange: function (e) { return setForm(__assign(__assign({}, form), { email: e.target.value })); }
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
                onChange: function (e) { return setForm(__assign(__assign({}, form), { password: e.target.value })); }
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
                onChange: function (e) { return setForm(__assign(__assign({}, form), { confirmPassword: e.target.value })); }
            },
        ],
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
                onChange: function (e) {
                    return setForm(__assign(__assign({}, form), { eatingPreferences: e.target.value }));
                }
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
                onChange: function (e) {
                    return setForm(__assign(__assign({}, form), { alergies: e.target.value.split(", ") }));
                }
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
                onChange: function (e) { return setForm(__assign(__assign({}, form), { shirtSize: e.target.value })); }
            },
        ],
        technologies: {
            label: "Technologies",
            classes: ["form-control"],
            id: "technologies",
            name: "technologies",
            type: "text",
            placeholder: "Technologies",
            required: true,
            value: form.technologies.join(", "),
            onChange: function (e) {
                return setForm(__assign(__assign({}, form), { technologies: e.target.value.split(", ") }));
            }
        },
        discord: {
            label: "Discord",
            classes: ["form-check-input"],
            id: "isDiscord",
            name: "isDiscord",
            type: "checkbox",
            placeholder: "Discord",
            required: true,
            value: form.isDiscord,
            onChange: function (e) { return setForm(__assign(__assign({}, form), { isDiscord: e.target.checked })); }
        }
    };
    var handleSubmit = function (event) {
        event.preventDefault();
        setIsSubmitting(true);
        console.log(form);
        // client-side validation
        // initial
        // check email if it's email using regex 
        if (form.email.length === 0) {
            errors.email = "REQ_EMAIL";
        }
        else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = "INVALID_EMAIL";
        }
        else {
            errors.email = "";
        }
        // check password if it's at least 8 characters
        if (form.password.length === 0) {
            errors.password = "REQ_PASS";
        }
        else if (form.password.length < 8) {
            errors.password = "SHORT_PASS";
        }
        else {
            errors.password = "";
        }
        // check if password and confirm password are the same
        if (form.password !== form.confirmPassword) {
            errors.confirmPassword = "PASS_NOT_MATCH";
        }
        // elsys
        // check if first name is empty and if it's not in cyrillic
        if (form.firstName.length === 0) {
            errors.firstName = "REQ_FIRST_NAME";
        }
        else if (!/^[а-яА-Я]+$/.test(form.firstName)) {
            errors.firstName = "INVALID_FIRST_NAME";
        }
        else {
            errors.firstName = "";
        }
        // check if last name is empty
        if (form.lastName.length === 0) {
            errors.lastName = "REQ_LAST_NAME";
        }
        else if (!/^[а-яА-Я]+$/.test(form.lastName)) {
            errors.lastName = "INVALID_LAST_NAME";
        }
        else {
            errors.lastName = "";
        }
        // check if phone number is empty and if it's valid +359 phone number
        if (form.phone.length === 0) {
            errors.phone = "REQ_PHONE_NUMBER";
        }
        else if (!/^\+359[0-9]{7}$/.test(form.phone)) {
            errors.phone = "INVALID_PHONE_NUMBER";
        }
        else {
            errors.phone = "";
        }
        // check if elsys email is empty and if it's valid @elsys-bg.org email
        if (form.elsysEmail.length === 0) {
            errors.elsysEmail = "REQ_ELSYS_EMAIL";
        }
        else if (!/^[a-zA-Z0-9._-]+@elsys-bg.org$/.test(form.elsysEmail)) {
            errors.elsysEmail = "INVALID_ELSYS_EMAIL";
        }
        else {
            errors.elsysEmail = "";
        }
        // check if grade is empty and if it's between 8 and 12
        var classNumber;
        if (form.classNumber.length === 0) {
            errors.classNumber = "REQ_GRADE";
        }
        else if (isNaN(classNumber = parseInt(form.classNumber))) {
            errors.classNumber = "INVALID_GRADE";
        }
        else if (classNumber < 8 || classNumber > 12) {
            errors.classNumber = "INVALID_GRADE";
        }
        else {
            errors.classNumber = "";
        }
        // check if class letter is empty and if it's a letter between <А> and <Г>
        if (form.classLetter.length === 0) {
            errors.classLetter = "REQ_CLASS_LETTER";
        }
        else if (!/^[А-Г]$/.test(form.classLetter) || form.classLetter.length > 1) {
            errors.classLetter = "INVALID_CLASS_LETTER";
        }
        else {
            errors.classLetter = "";
        }
        // preferences 
        // check if food is empty or if it's not valid - within the array
        if (form.eatingPreferences.length === 0) {
            errors.eatingPreferences = "REQ_FOOD";
        }
        else if (Object.values(preferences_1.EATING_PREFERENCES).indexOf(form.eatingPreferences) < 0) {
            errors.eatingPreferences = "INVALID_FOOD";
        }
        else {
            errors.eatingPreferences = "";
        }
        // check if alergies is empty or if it's not valid - within the selecatble multichoice
        if (form.alergies.length === 0) {
            errors.alergies = "REQ_ALERGIES";
        }
        else {
            form.alergies.forEach(function (alergy) {
                if (Object.values(preferences_1.ALERGIES).indexOf(alergy) < 0) {
                    errors.alergies = "INVALID_ALERGIES";
                    return;
                }
            });
        }
        // check if shirt size is empty or if it's not valid - within the array
        if (form.shirtSize.length === 0) {
            errors.shirtSize = "REQ_SHIRT_SIZE";
        }
        else if (Object.values(preferences_1.TSHIRT_SIZE)['size'].indexOf(form.shirtSize) < 0) {
            errors.shirtSize = "INVALID_SHIRT_SIZE";
        }
        else {
            errors.shirtSize = "";
        }
        // check if technologies are valid and within the array of accepted technologies (empty is also valid)
        if (form.technologies.length > 0) {
            form.technologies.forEach(function (technology) {
                if (Object.values(technologies_1.TECHNOLOGIES)['name'].indexOf(technology) < 0) {
                    errors.technologies = "INVALID_TECHNOLOGIES";
                    return;
                }
            });
        }
        else {
            errors.technologies = "";
        }
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
    react_1.useEffect(function () {
        console.log("step changed", step);
    }, [step]);
    return (React.createElement("div", { className: "container" },
        React.createElement(Elsys_1["default"], { form: form, setForm: setForm }),
        React.createElement(Preferences_1["default"], null),
        React.createElement(Technologies_1["default"], null)));
};
// client side validation
var validate = function (form) {
    var errors = {
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
        technologies: ""
    };
    return errors;
};
exports["default"] = SignUp;
