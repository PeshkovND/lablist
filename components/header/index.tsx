import Image from "next/image";
import styles from "../../styles/header.module.css";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div>
        <Image src="/logo.png" alt="" width={14} height={33} />
      </div>
      <div>
        <Image src="/pct1.png" alt="" width={30} height={25} />
      </div>
      <div>
        <Image src="/pct2.png" alt="" width={30} height={30} />
      </div>
      <div>
        <Image src="/pct3.png" alt="" width={30} height={30} />
      </div>
      <div>
        <Image src="/pct4.png" alt="" width={25} height={30} />
      </div>
      <div>
        <Image src="/pct5.png" alt="" width={30} height={30} />
      </div>
    </div>
  );
};
