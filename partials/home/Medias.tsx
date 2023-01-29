import style from "../../styles/Medias.module.scss"

const MEDIAS = [
    {
        title: "224 ученици и 25 фирми участват в осмия хакатон на ТУЕС",
        icon: "/assets/medias/bnr.png",
        link: "https://bnr.bg/sofia/post/101613996/tues",
        date: "03-10-2022"
    },
    {
        title: "Започна осмият хакатон на Технологично училище в София",
        icon: "/assets/medias/capital.png",
        link: "https://stolica.bg/sofia/zapochna-osmiyat-hakaton-na-tehnologichno-uchilishte-v-sofiya",
        date: "03-10-2022"
    },
    {
        title: "Знания и талант ще демонстрират ученици в осмото издание на хакатона HackTUES",
        icon: "/assets/medias/investor.png",
        link: "https://www.investor.bg/a/261-novini/347522-znaniya-i-talant-shte-demonstrirat-uchenitsi-v-osmoto-izdanie-na-hakatona-hacktues",
        date: "03-08-2022"
    },
    {
        title: "Ученици демонстрират знания и талант в осмото издание на хакатона HackTUES",
        icon: "/assets/medias/bloomberg.png",
        link: "https://www.bloombergtv.bg/a/16-biznes-start/104120-uchenitsi-demonstrirat-znaniya-i-talant-osmoto-izdanie-na-hakatona-hacktues",
        date: "03-08-2022"
    },
]

const Media = ({ title, icon, link, date }) => {
    // format date from dd-mm-yyyy to dd month yyyy
    const dateFormatted = new Date(date).toLocaleDateString("bg-BG", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <a className={style.media} href={link}>
            <div className={style.media_image}>
                <img
                    src={icon}
                    alt={title}
                />
            </div>
            <h4>{title}</h4>
            <p>{dateFormatted}</p>
        </a>
    );
}

const Medias = () => {
    return (
        <div className={style.medias}>
            <h2>медиите за нас</h2>
            <div className={style.medias_grid}>
                {
                    MEDIAS && MEDIAS.map((media) => <Media key={media.title} {...media} />)
                }
            </div>
        </div>
    );
}

export default Medias;