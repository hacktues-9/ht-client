import style from './style.module.scss';

const Theme = () => {
  return (
    <div className={style.page}>
      <div className={style.container}>
        <img src="/assets/art/coming_soon.svg" alt="Coming Soon" />
      </div>
    </div>
  );
};

export default Theme;
