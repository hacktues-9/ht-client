import Head from "next/head";
import style from "./style.module.scss";
import FuturisticCard from "../../components/about/FuturisticCard";

const team = [
  {
    name: "Кики",
    link: "@kirilka.angelova",
    role: "Ментор",
    image: "/assets/team/kiki.jpg",
  },
  {
    name: "Надя",
    link: "@nadya__geo",
    role: "Координатор",
    image: "/assets/team/nadya.jpg",
  },
  {
    name: "Калата",
    link: "@kaloyanx",
    role: "ИТ & Уебсайт",
    image: "/assets/team/kalata.jpg",
  },
  {
    name: "Марто",
    link: "@suicidal_programmer",
    role: "ИТ & Уебсайт",
    image: "/assets/team/marto.jpg",
  },
  {
    name: "Сара",
    link: "@sara_tambourkovska",
    role: "Дизайн",
    image: "/assets/team/sara.jpg",
  },
  {
    name: "Иви",
    link: "@viva_iva_",
    role: "Дизайн",
    image: "/assets/team/ivi.jpg",
  },
  {
    name: "Марти",
    link: "@moonylvr.bg",
    role: "Дизайн",
    image: "/assets/team/marti.jpg",
  },
  {
    name: "Ива",
    link: "@rebstone14",
    role: "Логистика",
    image: "/assets/team/iva.jpg",
  },
  {
    name: "Роси",
    link: "@slivi.za_meth",
    role: "Логистика",
    image: "/assets/team/rosi.jpg",
  },
  {
    name: "Иво",
    link: "@ivaylokanyov",
    role: "Логистика",
    image: "/assets/team/ivo.jpg",
  },
  {
    name: "Еми",
    link: "@georgievaemillia",
    role: "Спонсори",
    image: "/assets/team/emi.jpg",
  },
  {
    name: "Виктор",
    link: "@viktor_dim_",
    role: "Спонсори",
    image: "/assets/team/viktor.jpg",
  },
  {
    name: "Събев",
    link: "@georgi_sabev",
    role: "Спонсори",
    image: "/assets/team/sabev.jpg",
  },
  {
    name: "Ачо",
    link: "@achoto5",
    role: "PR",
    image: "/assets/team/acho.jpg",
  },
  {
    name: "Плами",
    link: "@plam.pie123",
    role: "PR",
    image: "/assets/team/plami.jpg",
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
