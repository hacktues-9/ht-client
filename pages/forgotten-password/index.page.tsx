import { useState } from "react";

import Input from "../../components/form/Input";

import style from "./style.module.scss";

const ForgottenPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWorking(true);
    setError(null);

    // check if elsys email is valid
    if (email.length === 0) {
      setError("моля въведете elsys имейл");
      setWorking(false);
    } else if (!/^[a-zA-Z0-9._-]+@elsys-bg.org$/.test(email)) {
      setError("моля въведете валиден elsys имейл");
      setWorking(false);
      return;
    } else {
      setError(null);
    }

    fetch(`https://api.hacktues.bg/api/auth/forgot/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 404) {
          alert("Имейлът не е намерен!");
        } else if (data.status === 500) {
          alert("Възникна грешка при изпращането на имейла!");
        }

        if (data.status === 200 && data.data === "success") {
          alert("Имейлът е изпратен успешно!");
        }
        setWorking(false);
      })
      .catch((err) => {
        setError(err.message);
        setWorking(false);
      });
  };

  return (
    <div className={style.forgotten_password}>
      <div className={style.container}>
        <h1>Забравена парола?</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="elsysEmail"
            label="elsys имейл"
            placeholder="kristiyan.m.bogdanov.2019@elsys-bg.org"
            classes={["email"]}
            id={"elsysEmail"}
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className={style.error}>{error}</p>}
          <button disabled={working} type="submit">
            изпрати имейл
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPasswordPage;
