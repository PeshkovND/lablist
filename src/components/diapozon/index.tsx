import styles from "../../styles/diapozon.module.css";

export const Diapozon = () => {
  return (
    <div className={styles.diapazonContainer}>
      <p className={styles.text}>
        Диапазон дат: <input className={styles.inputer} /> -{" "}
        <input className={styles.inputer} />
      </p>
    </div>
  );
};
