import style from "./style.module.scss";

const TIMETABLE = [
  {
    content: "Откриваща церемония",
    time: "08.03",
    loc: "YouTube",
  },
  {
    content: "Тематична лекция",
    time: "08.03",
    loc: "YouTube",
  },
  {
    content: "Време за работа",
    time: "от 08.03<br>до 11.03 07:59",
    loc: 'София Тех Парк<br>"Джон Атанасов"',
  },
  {
    content: "Полуфинали",
    time: "11.03",
    loc: 'София Тех Парк<br>"Джон Атанасов"',
  },
  {
    content: "Финали",
    time: "11.03",
    loc: 'София Тех Парк<br>"Джон Атанасов"',
  },
  {
    content: "Награждаване",
    time: "11.03",
    loc: 'София Тех Парк<br>"Джон Атанасов"',
  },
];

const Time = ({ content, time, loc }) => {
  return (
    <div className={style.time}>
      <h3 className={style.time_content}>{content}</h3>
      <div>
        <p
          className={style.time_time}
          dangerouslySetInnerHTML={{ __html: time }}
        />
        <p
          className={style.time_loc}
          dangerouslySetInnerHTML={{ __html: loc }}
        />
      </div>
    </div>
  );
};

const Timetable = () => {
  return (
    <div className={style.page}>
      <h1 className={style.title}>Програма</h1>
      <div className={style.timetable}>
        {TIMETABLE.map((time, index) => (
          <Time key={index} {...time} />
        ))}
      </div>
    </div>
  );
};

export default Timetable;
