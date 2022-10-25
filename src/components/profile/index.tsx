import styles from "./profile.module.css";

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePicContainer}>
        <img
          src="/profileImage.svg"
          alt=""
          width={"100%"}
          height={"100%"}
          className={styles.profilePic}
        />
      </div>
      <div className={styles.nameContainer}>
        <p className={styles.name}>Пусилий Котовский</p>
        <p className={styles.mail}>kotik_kompotik@gmail.com</p>
      </div>
      <div className={styles.strokeContainer}>
        <img src="/stroke.svg" alt="" width={"10%"} height={"7%"} />
      </div>
    </div>
  );
};
