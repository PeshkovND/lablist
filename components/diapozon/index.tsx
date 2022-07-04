import styles from "../../styles/diapozon.module.css";

export const Diapozon = () => {
  return (
    <p className={styles.text}>
      Диапазон дат: <input className={styles.inputer} /> -{" "}
      <input className={styles.inputer} />
    </p>
  );
};
