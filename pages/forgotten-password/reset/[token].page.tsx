// TODO: Marto -> Do it, please

import { useState } from "react";
import { useRouter } from "next/router";

import Input from "../../../components/form/Input";

import style from "../style.module.scss";
import Head from "next/head";

const ResetPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [working, setWorking] = useState(false);

  const router = useRouter();
  const { token } = router.query;

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

    fetch(`https://api.hacktues.bg/api/user/reset/${token}`, {
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
          router.push("/login");
        } else {
          setError("Възникна грешка при промяна на паролата!");
        }
        setWorking(false);
      })
      .catch((err) => {
        if (err.message === "The string did not match the expected pattern.") {
          setError("");
          setSuccess(
            "Успешно променихте паролата си! След 3 секунди ще бъдете пренасочени към страницата за вход."
          );
          // after 3 seconds redirect to login
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          return;
        }
        setError(err.message);
        setWorking(false);
      });
  };

  return (
    <>
      <Head>
        <title>Промяна на парола | HackTUES 9</title>
      </Head>
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
    </>
  );
};

export default ResetPage;
