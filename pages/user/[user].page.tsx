import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "../../components/form/Input";
import { TITLE } from "../../constants/arc";
import { useAuthContext } from "../../context/authContext";
import ProtectedRoute from "../../wrappers/ProtectedRoute";

import Select from "react-dropdown-select";
import { TECHNOLOGIES } from "../../constants/technologies";
import style from "../../styles/0/profile/Profile.module.scss";
import {
  TbBrandDiscord,
  TbBrandGithub,
  TbClock,
  TbShirt,
} from "react-icons/tb";
import { connect } from "http2";

const fetcher = (url: string) => fetch(url, {credentials:"include"}).then((res) => res.json());
const isUser = (authUserId: string, userId: string) => authUserId === userId;

interface USER_INFO {
  firstName: string;
  lastName: string;

  email: string;
  elsysEmail: string;
  phone: string;

  sclass: string;
  shirtSize: string;

  emailVerified: boolean;
  profilePicVerified: boolean;

  discord: string;
  github: string;
  lookingForTeam: boolean;

  profilePic: string;
  technologies: string[];
}

const User = () => {
  const router = useRouter();
  const { user } = router.query as { user: string };
  const { authState } = useAuthContext();
  
  const githubClientID = "4f5f1918bf58eb0cccd4";
  const discordClientID = "1009547623637712977";
  const githubRedirectURI = "http://localhost:8080/api/user/github"
  const discordRedirectURI = "http://localhost:8080/api/user/discord"

  const githubLoginLink = "https://github.com/login/oauth/authorize?client_id=" + githubClientID + "&state=" + user + "&redirect_uri=" + githubRedirectURI + "&scope=user:email"
  const discordLoginLink = "https://discord.com/api/oauth2/authorize?client_id=" + discordClientID + "&state=" + user +  "&redirect_uri="+ discordRedirectURI +"&response_type=code&scope=identify"

  // check if user has right to see personal info

  const [userInfo, setUserInfo] = useState<USER_INFO | null>(null);
  const [newUserInfo, setNewUserInfo] = useState<USER_INFO | null>(null);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (user) {
      fetcher(`http://localhost:8080/api/user/${user}`)
        .then((res) => {
          setUserInfo(res);
          setNewUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
          //router.push("/404");
        });
    }
  }, [user]);

  useEffect(() => {
    if (userInfo && newUserInfo) {
      if (userInfo !== newUserInfo) setChanged(true);
      else setChanged(false);
    }
  }, [newUserInfo, userInfo]);

  // send api request to update profile picture from discord / github
  // if the url changes (on the api), then send it back here and update the profile picture on the frontend
  const changeProfilePic = () => {};
  const changeLookingForTeam = () => {
    if (userInfo) {
      setNewUserInfo({
        ...newUserInfo,
        lookingForTeam: !newUserInfo.lookingForTeam,
      });
    }
  };

  const connectDiscord = () => {
    location.href = discordLoginLink;
  };
  const connectGithub = () => {
    location.href = githubLoginLink;
  };

  const handleChange = (e) => {};
  const hadnleUpdate = (e) => {
    e.preventDefault();
    setChanged(false);

    // send api request to update user info

    // if successfull, update userInfo
    setUserInfo(newUserInfo);
  };

  if (!userInfo) return <div>Loading...</div>;

  // if (isUser(authState.userId, user)) // check if you are the user and you have the right to see personal info
  if (true)
    return (
      <>
        <Head>
          <title>
            {userInfo.firstName} {userInfo.lastName} | {TITLE}
          </title>
        </Head>
        <div className={style.wrapper}>
          <div className={style.profile_container}>
            <div className={style.info}>
              <div className={style.profilepic}>
                {userInfo.profilePic && userInfo.profilePicVerified && (
                  <Image
                    src={userInfo.profilePic}
                    width={200}
                    height={200}
                    alt="profile picture"
                  />
                )}
              </div>
              <div className={style.names}>
                <Input
                  type="firstName"
                  value={userInfo.firstName}
                  label={"име"}
                  classes={["email"]}
                  id={""}
                  name={""}
                  placeholder={""}
                  required={false}
                />
                <Input
                  type="lastName"
                  value={userInfo.lastName}
                  label={"фамилия"}
                  classes={["email"]}
                  id={""}
                  name={""}
                  placeholder={""}
                  required={false}
                />
                <div className={style.immutableinfo}>
                  <div>
                    <TbShirt />
                    <p>{userInfo.shirtSize}</p>
                  </div>
                  <div>
                    <TbClock />
                    <p>{userInfo.sclass}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.more_info}>
              <div className={style.contact_info}>
                <Input
                  type="email"
                  value={userInfo.email}
                  label={"имейл"}
                  classes={["email"]}
                  id={""}
                  name={""}
                  placeholder={""}
                  required={false}
                />
                <Input
                  type="email"
                  value={userInfo.elsysEmail}
                  label={"elsys имейл"}
                  classes={["email"]}
                  id={""}
                  name={""}
                  placeholder={""}
                  required={false}
                />
                <Input
                  type="phone"
                  value={userInfo.phone}
                  label={"телефон"}
                  classes={["email"]}
                  id={""}
                  name={""}
                  placeholder={""}
                  required={false}
                />
              </div>
              <div className={style.sel}>
                <label className={style.label} htmlFor="teamTechologies">
                  технологии
                </label>
                <Select
                  //label="технологии"
                  //classes={["email"]}
                  //id="teamTechnologies"
                  name="teamTechnologies"
                  //type="select"
                  options={TECHNOLOGIES.map((tech) => {
                    return { value: tech.name, label: tech.name, ...tech };
                  })}
                  values={newUserInfo.technologies?.map((tech) => {
                    return { value: tech, label: tech };
                  })}
                  onChange={(e) =>
                    setNewUserInfo({
                      ...newUserInfo,
                      technologies: e.map((tech) => tech.value),
                    })
                  }
                  className={style.select}
                  placeholder="C++ Java Angular"
                  searchBy="label"
                  searchable={true}
                  multi={true}
                  required={true}
                  keepSelectedInList={true}
                  dropdownHandle={false}
                  debounceDelay={300}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2)",
                    padding: ".5rem",
                    height: "198px",
                  }}
                />
              </div>
            </div>
            <div className={style.action}>
              <div className={style.socials}>
                <button
                  className={style.discord}
                  type="button"
                  onClick={() => { !newUserInfo.discord ? connectDiscord() : window.open(`https://discord.com/users/${newUserInfo.discord}`)}}
                >
                  {!newUserInfo.discord && `свържи се с `}
                  <TbBrandDiscord size={32} />
                  {newUserInfo.discord && newUserInfo.discord}
                </button>
                <button
                  className={style.github}
                  type="button"
                  onClick={() => { newUserInfo.github ? window.open(`https://github.com/${newUserInfo.github}`) : connectGithub() }}
                >
                  {!newUserInfo.github && `свържи се с `}
                  <TbBrandGithub size={32} />
                  {newUserInfo.github && newUserInfo.github}
                </button>
              </div>
              <div className={style.actions}>
                <button onClick={changeLookingForTeam}>
                  {!newUserInfo.lookingForTeam
                    ? "търся си отбор"
                    : "не си търся отбор"}
                </button>
                <button
                  type="submit"
                  disabled={!changed}
                  onClick={hadnleUpdate}
                >
                  запази
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );

  return <div>Profile {user}</div>;
};

const UserPage = () => {
  return (
    <ProtectedRoute>
      <User />
    </ProtectedRoute>
  );
};

export default UserPage;
