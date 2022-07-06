import styles from "../../styles/profile.module.css";
import Image from "next/image";

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePicContainer}>
        <Image
          src="/profileImage.png"
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
        <Image
          src="/stroke.png"
          alt=""
          width={"10%"}
          height={"7%"}
        />
        </div>
    </div>
  );
};
