import Image from "next/image";
import styles from "../../styles/searcher.module.css";

export const Searcher = () => {
  return (
    <div className={styles.searcher}>
      <div className={styles.searchIcon}>
        <Image src="/search.png" alt="" width={"100%"} height={"100%"} />
      </div>
      <input type="search" className={styles.searchField} />
    </div>
  );
};
