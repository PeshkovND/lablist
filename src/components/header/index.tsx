import styles from "../../styles/header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerImage}>
        <img src="/logo.png" alt="" width={"14vh"} height={"33vh"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/add.png" alt="" width={"40vh"} height={"40vh"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/pct1.png" alt="" width={"25vh"} height={"21vh"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/pct2.png" alt="" width={"25vh"} height={"25vh"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/pct3.png" alt="" width={"25vh"} height={"25vh"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/pct4.png" alt="" width={"21vh"} height={"25vh"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/pct5.png" alt="" width={"25vh"} height={"25vh"} />
      </div>
    </div>
  );
};