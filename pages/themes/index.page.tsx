import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import style from "./style.module.scss";
import Head from "next/head";

const THEMES = [
  {
    title: "Data Security",
    description: "",
    img: "/assets/art/data_security.png",
  },
  {
    title: "IoT & Smart Home Security",
    description: "",
    img: "/assets/art/iot_security.png",
  },
  {
    title: "Physical Security",
    description: "",
    img: "/assets/art/physical_security.png",
  },
  {
    title: "Security by Design",
    description: "",
    img: "/assets/art/security_by_design.png",
  },
  {
    title: "Sport Security",
    description: "",
    img: "/assets/art/sport_security.png",
  },
];

const ThemeModal = ({ img, title, description, closeModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className={style.modal}>
      <div className={style.modal__content} ref={modalRef}>
        <img src={img} alt={title} />
        <div className={style.modal__text}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const Theme = ({ img, title, openModal }) => {
  return (
    <div className={style.theme} onClick={() => openModal(title)}>
      <img src={img} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

const ThemePage = () => {
  const [modal, setModal] = useState("");

  const openModal = (title) => {
    setModal(title);
  };

  return (
    <>
    <Head>
        <title>Теми | HackTUES 9</title>
    </Head>
      <div className={style.page}>
        <div className={style.container}>
          {THEMES.map((theme, index) => (
            <Theme key={theme.title} {...theme} openModal={openModal} />
          ))}
        </div>
      </div>
      {modal && (
        <ThemeModal
          {...THEMES.find((theme) => theme.title === modal)}
          closeModal={() => setModal("")}
        />
      )}
    </>
  );
};

export default ThemePage;
