import getConfig from "next/config";

import { useEffect, useState } from "react";

import useKeyPress from "../../hooks/useKeyPress";

import { useAuthContext } from "../../context/authContext";
interface AdminProps {
  secret: string;
}

const Admin = (props: AdminProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [keyCombo, setKeyCombo] = useState<string>("");

  const { authState, isUserAuthenticated } = useAuthContext();
  const [userId, setUserId] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);

  console.log(process.env.OOOPSIE);

  const onKeyPress = (event: KeyboardEvent) => {
    setKeyCombo((prevCombo) => prevCombo + event.key);
  };

  useKeyPress("hacktues 9".split(""), onKeyPress);

  useEffect(() => {
    if (keyCombo === "hacktues 9" && roleId == "5") setShow(true);

  }, [keyCombo]);

  useEffect(() => {
    if (isUserAuthenticated) {
      setUserId(authState.userId);
    }
  }, [authState.userId, isUserAuthenticated]);

  useEffect(() => {
    fetch(`https://api.hacktues.bg/api/user/get/role/${userId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setRoleId(data.data);
          }
        })
  }, [userId]);

    return show ? (
      <div
        style={{
          paddingTop: "3rem",
        }}
      >
        <h1>Kur Panel</h1>
        <table
          style={{
            // show border
            border: "1px solid black",
            // show borders on every cell
            //borderCollapse: "collapse",
            // make table 100% of the page

            width: "100%",
          }}
        >
          <tr
            style={{
              backgroundColor: "#f2f2f2",
              color: "black",
              padding: "10px",
              border: "1px solid black",
            }}
          >
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
            <th>отбор</th>
          </tr>
          <tr
            style={{
              border: "1px solid black",
              backgroundColor: "#f2f2f2",
              color: "black",
            }}
          >
            <td>11</td>
            <td>Кур</td>
            <td>Кур</td>
            <td>
              <a href="mailto:kur@kur.bg ">kur@kur.bg</a>
            </td>
            <td>
              <a href="mailto:kur@elsys-bg.org">kur@elsys-bg.org</a>
            </td>
            <td>0888888888</td>
            <td>XL</td>
            <td>Няма</td>
            <td>Няма</td>
            <td>Да</td>
            <td>Да</td>
            <td>Да</td>
            <td>Да</td>
            <td>
              <a href="https://discord.com/users/1234567890">Kur#1234</a>
            </td>
            <td>
              <a href="github.com/kur">github.com/kur</a>
            </td>
            <td>Кур</td>
          </tr>
        </table>
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
