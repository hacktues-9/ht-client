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

  const [sclass, setSclass] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [elsysEmail, setElsysEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [eatingPreference, setEatingPreference] = useState<string>("");
  const [shirtSize, setShirtSize] = useState<string>("");
  const [grade, setGrade] = useState<number>(0);

  const [users, setUsers] = useState<any>([]);

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

    fetch(`https://api.hacktues.bg/api/admin/search`, {
      credentials: "include",
      body: JSON.stringify({
        class: "",
        name: "",
        email: "",
        elsys_email: "",
        mobile: "",
        team_name: "",
        eating_preference: "",
        shirt_size: "",
        grade: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUsers(data.data);
        }
      });
  }, [userId]);

  useEffect(() => {
    fetch(`https://api.hacktues.bg/api/admin/search`, {
      credentials: "include",
      body: JSON.stringify({
        class: sclass,
        name: name,
        email: email,
        elsys_email: elsysEmail,
        mobile: mobile,
        team: teamName,
        eating_preference: eatingPreference,
        shirt_size: shirtSize,
        grade: grade,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setUsers(data.data);
        }
      });
  }, [sclass, name, email, elsysEmail, mobile, teamName, eatingPreference, shirtSize, grade]);
  //add inputs above the table for filtering 
  // how do i get the data from the input fields ? => use state for each input field and then use it in the fetch request example: 
  
    return show ? (
      <div
        style={{
          paddingTop: "3rem",
        }}
      >
        <h1>Kur Panel</h1>
        {/* add input fields for : shirt_size, grade, class, name, email, elsys_email, mobile, team_name, eating_preference */}
        
        < input type="text" placeholder="Име" onChange={(e) => {setName(e.target.value)}}/>
        < input type="text" placeholder="Имейл" onChange={(e) => {setEmail(e.target.value)}}/>
        < input type="text" placeholder="Elsys имейл" onChange={(e) => {setElsysEmail(e.target.value)}}/>
        < input type="text" placeholder="Телефон" onChange={(e) => {setMobile(e.target.value)}}/>
        < input type="text" placeholder="отбор" onChange={(e) => {setTeamName(e.target.value)}}/>
        {/* < input type="text" placeholder="Тениска" /> */}
        <label htmlFor="grade">Клас : </label>
        <select name="grade" id="grade" onChange={(e) => {setGrade(parseInt(e.target.value))}}>
          <option value="0"></option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
        <label htmlFor="class">Клас : </label>
        <select name="class" id="class" onChange={(e) => {setSclass(e.target.value)}}>
          <option value=""></option>
          <option value="А">А</option>
          <option value="Б">Б</option>
          <option value="В">В</option>
          <option value="Г">Г</option>
        </select>
        <label htmlFor="shirt_size">Тениска : </label>
        <select name="shirt_size" id="shirt_size" onChange={(e) => {setShirtSize(e.target.value)}}>
          <option value=""></option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        {/* < input type="text" placeholder="Диета" /> */}
        <label htmlFor="eating_preference">Диета : </label>
        <select name="eating_preference" id="eating_preference" onChange={(e) => {setEatingPreference(e.target.value)}}>
          <option value=""></option>
          <option value="VEGETARIAN">Вегетарианец</option>
          <option value="VEGAN">Веган</option>
          <option value="NONE">Няма</option>
        </select>
        
        <br />
        {/* place a value of the size of the array of users here */}
        <p>Брой участници: {users?.length}</p> 
        <br />
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
            <th>Диета</th>
            <th>Потвърдил имейл</th>
            <th>Потвърдил elsys имейл</th>
            <th>Потвърдил телефон</th>
            <th>Discord</th>
            <th>GitHub</th>
            <th>отбор</th>
          </tr>
          {users ? users.map((user) => (
            <>
            <tr
            style={{
              border: "1px solid black",
              backgroundColor: "#f2f2f2",
              color: "black",
            }}
          >
            <td>{user.class}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>
              <a >{user.email}</a>
            </td>
            <td>
              <a>{user.elsys_email}</a>
            </td>
            <td>{user.mobile}</td>
            <td>{user.shirt_size}</td>
            <td>{user.eating_preference}</td>
            <td>{user.email_verified.toString()}</td>
            <td>{user.elsys_email_verified.toString()}</td>
            <td>{user.manual_verified.toString()}</td>
            <td>
              <a >{user.discord}</a>
            </td>
            <td>
              <a >{user.github}</a>
            </td>
            <td>{user.team}</td>
          </tr>
            </>
          )) : (
            <></>
          )}
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
