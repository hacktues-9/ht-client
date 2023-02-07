// TODO: Marto -> Do it, please

import { useRouter } from "next/router";
import { useState } from "react";

import Input from "../../../components/form/Input";

import style from "./style.module.scss";

const ResetPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [working, setWorking] = useState(false);

  const router = useRouter();
  const token = router.query;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWorking(true);
    setError("");
    setSuccess("");

    if (password.length === 0) {
      setError("Моля въведете парола");
      setWorking(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Паролите не съвпадат");
      setWorking(false);
      return;
    }

    fetch(`https://api.hacktues.bg/api/user/reset//${router.query.token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setSuccess("Успешно променихте паролата си!");
        } else {
          setError("Възникна грешка при промяна на паролата!");
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
        <h1>Въведи нова парола</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            label="Нова парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classes={["email"]}
            id={"password"}
            name={"password"}
            placeholder={"••••••••"}
            required={false}
          />
          <Input
            type="password"
            label="Потвърди новата парола"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            classes={["email"]}
            id={"passwordConfirm"}
            name={"passwordConfirm"}
            placeholder={"••••••••"}
            required={false}
          />
          {error && <p className={style.error}>{error}</p>}
          {success && <p>{success}</p>}
          <button type="submit" disabled={working}>
            {working ? "зареждане..." : "промени паролата"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPage;
