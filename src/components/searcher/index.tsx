import styles from "./searcher.module.css";

export const Searcher = () => {
  return (
    <div className={styles.searcher}>
      <div className={styles.searchIcon}>
        <img src="/search.svg" alt="" width={"100%"} height={"100%"} />
      </div>
      <input type="search" className={styles.searchField} />
    </div>
  );
};
