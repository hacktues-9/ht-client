import { useRouter } from "next/router";
import { useAuthContext } from "../../context/authContext";
import { isUser } from "../../utils/auth";

const User = () => {
  const router = useRouter();
  const { user } = router.query as { user: string };
  const { authState } = useAuthContext();

  // check if user has right to see personal info

  const {
    name,
    email,
    phone,
    sclass,
    shirtSize,
    emailVerified,
    profilePic,
    technologies,
  } = {
    name: "John Doe",
    email: "john@elsys-bg.org",
    phone: "0888888888",
    sclass: "11B",
    shirtSize: "M",
    emailVerified: true,
    profilePic: "https://i.imgur.com/6jJZj0L.jpg",
    technologies: ["C++", "Java", "Python", "JavaScript", "HTML"],
  }; // get from api with refresh token and change it

  if (isUser(authState.userId, user))
    return (
      <div>
        <h1>{name}</h1>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{sclass}</p>
        <p>{shirtSize}</p>
        <p>{emailVerified}</p>
        <img
          src={profilePic}
          alt="profile picture"
          style={{ width: "100px", height: "100px" }}
        />
        <ul>
          {technologies.map((tech, i) => (
            <li key={i}>{tech}</li>
          ))}
        </ul>
      </div>
    );

  return <div>Profile {user}</div>;
};

export default User;
