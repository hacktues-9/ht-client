import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TbBrandDiscord, TbBrandGithub } from "react-icons/tb";
import Input from "../../components/form/Input";

import { TITLE } from "../../constants/arc";
import logo from "../../styles/Home.module.scss";
import style from "../../styles/login/Login.module.scss";

import { useAuthContext } from "../../context/authContext";

const LogIN = () => {
  const [error, setError] = useState<string | null>(null);

  const { push } = useRouter();

  const { setAuthState } = useAuthContext();

  const githubClientID = "4f5f1918bf58eb0cccd4";
  const discordClientID = "1009547623637712977";
  const githubRedirectURI = "https://api.hacktues.bg/api/auth/github";
  const discordRedirectURI = "https://api.hacktues.bg/api/auth/discord";

  const githubLoginLink =
    "https://github.com/login/oauth/authorize?client_id=" +
    githubClientID +
    "&redirect_uri=" +
    githubRedirectURI +
    "&scope=user:email";
  const discordLoginLink =
    "https://discord.com/api/oauth2/authorize?client_id=" +
    discordClientID +
    "&redirect_uri=" +
    discordRedirectURI +
    "&response_type=code&scope=identify";

  const login = async (email: string, password: string) => {
    const response = await fetch("https://api.hacktues.bg/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://api.hacktues.bg/",
      },
      body: JSON.stringify({ identifier: email, password }),
      credentials: "include",
    });

    const data = await response.json();
    if (response.status != 200) {
      console.log("VERY IMPORTANT", response.status, data);
      if (data.description === "user: find: record not found") {
        setError("Няма такъв потребител");
      } else if (data.description === "password: compare: wrong password") {
        setError("Грешна парола");
      } else {
        setError("Нещо се обърка");
      }
    } else {
      console.log("VERY IMPORTANT", data);
      // setAuthState(null, true);
      // TODO: Fix this instead of reloadig
      push("/").then(() => window.location.reload());
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password }: any = e.target;
    try {
      setError(null);
      await login(email.value, password.value);
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

  // check if user is logged in
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const response = await fetch("https://api.hacktues.bg/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://api.hacktues.bg/",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status == 200) {
        push("/");
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.image}>
        <Link className={logo.stack} href={"/"}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                margin: "0",
                fontSize: ".8rem",
              }}
            >
              {error}
            </p>
          )}
          <Link className={style.forgor} href="/forgotten-password" style={{
            margin: "0 0 0 auto"
          }}>
            забравена парола?
          </Link>
        </div>
        <button className={style.login} type="submit">
          влез
        </button>
        <p className={style.alt_login_title}>или със</p>
        <div className={style.alt_login}>
          <button
            className={style.discord}
            onClick={() => {
              location.href = discordLoginLink;
            }}
          >
            <TbBrandDiscord />
            <p>discord</p>
          </button>
          <button
            className={style.github}
            onClick={() => {
              location.href = githubLoginLink;
            }}
          >
            <TbBrandGithub />
            <p>github</p>
          </button>
        </div>
        <p className={style.signup}>
          нямаш акаунт? <Link href="/signup">регистрирай се</Link>
        </p>
      </form>
    </div>
  );
};

export default LogIN;
