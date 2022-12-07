import Link from "next/link";
import { useRouter } from "next/router";
import Input from "../../components/form/Input";

import style from "../../styles/login/Login.module.scss";

const LogIN = () => {
  //const { login } = useAuth();
  const { push } = useRouter();

  // check if user is logged in

  // if (user) {
  //   push("/dashboard");
  // }

  const handleLogin = () => {
    //login();
    push("/");
  };

  console.log(style.title);

  return (
    <div className={style.container}>
      <form className={style.form}>
        <h1 className={style.title}>хей, отново</h1>
        <Input
          label="имейл"
          classes={["form-control"]}
          id="email"
          name="email"
          type="email"
          placeholder="ivan.georgiev@gmail.com"
          required={true}
        />
        <Input
          label="парола"
          classes={["form-control"]}
          id="password"
          name="password"
          type="password"
          placeholder="********"
          required={true}
        />
        <Link href="/signup">забравена парола?</Link>
        <button onClick={handleLogin}>Login</button>
        <p>or with</p>
        <div className={style.social}>
          <button className={style.discord}>discord</button>
          <button className={style.github}>github</button>
        </div>
      </form>
    </div>
  );
};

export default LogIN;
