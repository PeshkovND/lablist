import styles from "./header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerImage}>
        <img src="/logo.svg" alt="" width={"19%"} />
      </div>
      <div className={styles.headerImage}>
        <img src="/add.svg" alt="" width={"35%"}/>
      </div>
      <div className={styles.headerImage}>
        <img src="/home.svg" alt="" width={"25%"}/>
      </div>
      <div className={styles.headerImage}>
        <img src="/journal.svg" alt="" width={"25%"}/>
      </div>
      <div className={styles.headerImage}>
        <img src="/folder.svg" alt="" width={"25%"}/>
      </div>
      <div className={styles.headerImage}>
        <img src="/book.svg" alt="" width={"25%"}/>
      </div>
      <div className={styles.headerImage}>
        <img src="/notebook.svg" alt="" width={"22%"}/>
      </div>
      <div className={styles.headerImage}>
        <img src="/presentations.svg" alt="" width={"27%"}/>
      </div>
    </div>
  );
};
