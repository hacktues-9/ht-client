import { useEffect, useState } from "react";
import getConfig from "next/config";

import useKeyPress from "../../hooks/useKeyPress";

interface AdminProps {
  secret: string;
}

const Admin = (props: AdminProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [keyCombo, setKeyCombo] = useState<string>("");

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  console.log(process.env.OOOPSIE);

  const onKeyPress = (event: KeyboardEvent) => {
    setKeyCombo((prevCombo) => prevCombo + event.key);
  };

  useKeyPress("hacktues 9".split(""), onKeyPress);

  useEffect(() => {
    if (keyCombo === "hacktues 9") setShow(true);
  }, [keyCombo]);

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");

    // api call
    fetch(`https://api.hacktues.bg/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));

      setLoggedIn(true);
  };

  if (show && loggedIn) {
    return (
      <div>
        <h1>Admin Panel</h1>
        <table>
          <tr>
            <th>Kлас</th>
            <th>Име</th>
            <th>Фамилия</th>
            <th>Имейл</th>
            <th>Elsys имейл</th>
            <th>Телефон</th>
            <th>Тениска</th>
            <th>Aлергии</th>
            <th>Диета</th>
            <th>Потвърдил имейл</th>
            <th>Потвърдил elsys имейл</th>
            <th>Потвърдил телефон</th>
            <th>Потвърдил профилна</th>
            <th>Discord</th>
            <th>GitHub</th>
          </tr>
        </table>
      </div>
    );
  }

  return show && !loggedIn ? (
    <div>
      login as kur
      <div>
        <form onSubmit={handleLogin}>
          <input type="text" name="username" />
          <input type="password" name="password" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  ) : (
    <h1>404</h1>
  );
};

const getStaticProps = () => {
  return {
    props: {
      secret: process.env.OOOPSIE,
    },
  };
};

export default Admin;
