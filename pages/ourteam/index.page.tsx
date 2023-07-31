import Head from "next/head";
import style from "./style.module.scss";
import FuturisticCard from "../../components/about/FuturisticCard";

const team = [
  {
    name: "Кики",
    link: "@kirilka.angelova",
    role: "Ментор",
    image: "/assets/team/kiki.webp",
  },
  {
    name: "Надя",
    link: "@nadya__geo",
    role: "Координатор",
    image: "/assets/team/nadya.webp",
  },
  {
    name: "Калата",
    link: "@kaloyanx",
    role: "ИТ & Уебсайт",
    image: "/assets/team/kalata.webp",
  },
  {
    name: "Марто",
    link: "@suicidal_programmer",
    role: "ИТ & Уебсайт",
    image: "/assets/team/marto.webp",
  },
  {
    name: "Сара",
    link: "@sara_tambourkovska",
    role: "Дизайн",
    image: "/assets/team/sara.webp",
  },
  {
    name: "Иви",
    link: "@viva_iva_",
    role: "Дизайн",
    image: "/assets/team/ivi.webp",
  },
  {
    name: "Марти",
    link: "@moonylvr.bg",
    role: "Дизайн",
    image: "/assets/team/marti.webp",
  },
  {
    name: "Ива",
    link: "@rebstone14",
    role: "Логистика",
    image: "/assets/team/iva.webp",
  },
  {
    name: "Роси",
    link: "@slivi.za_meth",
    role: "Логистика",
    image: "/assets/team/rosi.webp",
  },
  {
    name: "Иво",
    link: "@ivaylokanyov",
    role: "Логистика",
    image: "/assets/team/ivo.webp",
  },
  {
    name: "Еми",
    link: "@georgievaemillia",
    role: "Спонсори",
    image: "/assets/team/emi.webp",
  },
  {
    name: "Виктор",
    link: "@viktor_dim_",
    role: "Спонсори",
    image: "/assets/team/viktor.webp",
  },
  {
    name: "Събев",
    link: "@georgi_sabev",
    role: "Спонсори",
    image: "/assets/team/sabev.webp",
  },
  {
    name: "Ачо",
    link: "@achoto5",
    role: "PR",
    image: "/assets/team/acho.webp",
  },
  {
    name: "Плами",
    link: "@plam.pie123",
    role: "PR",
    image: "/assets/team/plami.webp",
  },
];

const HTTeam = () => {
  return (
    <>
      <Head>
        <title>Нашият Екип | HackTUES 9</title>
      </Head>
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          paddingTop: "5rem",
          paddingBottom: "5rem",
          justifyContent: "center",
          alignItems: "center",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          placeItems: "center",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        {team.map((member) => (
          <FuturisticCard key={member.name} {...member} />
        ))}
      </div>
    </>
  );
};

export default HTTeam;
