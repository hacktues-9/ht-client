import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb";
import Input from "../../components/form/Input";

import style from "../../styles/login/Login.module.scss";
import logo from "../../styles/Home.module.scss";
import { TITLE } from "../../constants/arc";


import { useAuthContext } from "../../context/authContext";


const LogIN = () => {
  const [error, setError] = useState<string | null>(null);

  const { push } = useRouter();

  const { setAuthState } = useAuthContext();

  const githubClientID = "4f5f1918bf58eb0cccd4";
  const discordClientID = "1009547623637712977";
  const githubRedirectURI = "http://localhost:8080/api/auth/github"
  const discordRedirectURI = "http://localhost:8080/api/auth/discord"

  const githubLoginLink = "https://github.com/login/oauth/authorize?client_id=" + githubClientID + "&redirect_uri=" + githubRedirectURI + "&scope=user:email"
  const discordLoginLink = "https://discord.com/api/oauth2/authorize?client_id=" + discordClientID + "&redirect_uri="+ discordRedirectURI +"&response_type=code&scope=identify"
  const login = async (email: string, password: string) => {
    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password}),
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    } else {
      const { user } = data;
      setAuthState( "",  true);
    }
    return data;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password }: any = e.target;
    try {
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
    }
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
          <button className={style.discord} onClick={() => {location.href = discordLoginLink}}>
            <TbBrandDiscord />
            <p>discord</p>
          </button>
          <button className={style.github} onClick={() => {location.href = githubLoginLink}}>
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
