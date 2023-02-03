import Input from "../../components/form/Input";

import style from "./style.module.scss";

const ForgottenPasswordPage = () => {
  return (
    <div className={style.forgotten_password}>
      <div className={style.container}>
        <h1>Забравена парола?</h1>
        <form>
          <Input
            type="email"
            name="email"
            label="имейл"
            placeholder="goshobg@gmail.com"
            classes={["email"]}
            id={"email"}
            required={true}
          />
          <div>
            <button type="submit" style={{
                backgroundColor: "rgb(0, 0, 0)",
                color: "white",
            }}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPasswordPage;
