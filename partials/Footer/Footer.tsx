import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandLinkedin,
} from "react-icons/tb";

import style from "./Footer.module.scss";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const yesFooter = ["/", "/regulation", "/ourteam", "/timetable", "/faq"];

  if (router && !yesFooter.includes(router.pathname)) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={style.footer}
    >
      <div>
        <a href={"https://hacktues.bg"}>HackTUES 9</a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "10rem",
        }}
      >
        <a href="https://instagram.com/hacktues">
          <TbBrandInstagram />
        </a>
        <a href="https://facebook.com/hacktues">
          <TbBrandFacebook />
        </a>
        <a href="https://linkedin.com/company/hacktues-tuesfest">
          <TbBrandLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
