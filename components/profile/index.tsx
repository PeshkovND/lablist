import styles from "../../styles/profile.module.css";
import Image from "next/image";

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profilePicContainer}>
        <Image
          src="/profileImage.png"
          alt=""
          width={60}
          height={60}
          className={styles.profilePic}
        />
      </div>
      <div>
        <p className={styles.name}>Пусилий Котовский</p>
        <p className={styles.mail}>kotik_kompotik@gmail.com</p>
      </div>
    </div>
  );
};
