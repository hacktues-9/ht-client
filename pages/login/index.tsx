import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb";
import Input from "../../components/form/Input";

import style from "../../styles/login/Login.module.scss";
import logo from "../../styles/Home.module.scss";
import { TITLE } from "../../constants/arc";


const LogIN = () => {
  const [error, setError] = useState<string | null>(null);

  const { push } = useRouter();

  /*   const login = async (email: string, password: string) => {
      const response = await fetch(
        "https://orca-app-g2n2e.ondigitalocean.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else {
        localStorage.setItem("token", data.token);
      }
      return data;
    }; */

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password }: any = e.target;
    /*     try {
          setError(null);
          await login(email.value, password.value);
          push("/");
        } catch (error) {
          console.log("TEST", error);
          if (error.message === "user not found") {
            setError("Няма такъв потребител");
          } else if (error.message === "invalid password") {
            setError("Грешна парола");
          } else {
            setError("Нещо се обърка");
          }
        } */
  };

  return (
    <div className={style.container}>
      <div className={style.image}>
        <Link className={logo.stack} href={'/'}>
          <span id={logo.stack0}>{TITLE}</span>
          <span id={logo.stack1}>{TITLE}</span>
          <span id={logo.stack2}>{TITLE}</span>
        </Link>
      </div>
      <form className={style.form} onSubmit={handleLogin}>
        <h1 className={style.title}>здравей</h1>
        <div className={style.inputs}>
          <Input
            label="имейл"
            classes={["form-control", "email", "input"]}
            id="email"
            name="email"
            type="email"
            placeholder="ivan.georgiev@gmail.com"
            required={true}
          />
          <Input
            label="парола"
            classes={["form-control", "email", "input"]}
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required={true}
          />
        </div>
        <Link className={style.forgor} href="/forgotten-password">
          забравена парола?
        </Link>
        <button className={style.login} type="submit">
          влез
        </button>
        <p className={style.alt_login_title}>или със</p>
        <div className={style.alt_login}>
          <button className={style.discord}>
            <TbBrandDiscord />
            <p>discord</p>
          </button>
          <button className={style.github}>
            <TbBrandGithub />
            <p>github</p>
          </button>
        </div>
        <p className={style.signup}>
          нямаш акаунт? <Link href="/signup">регистрирай се</Link>
        </p>
      </form>
    </div >
  );
};

export default LogIN;
