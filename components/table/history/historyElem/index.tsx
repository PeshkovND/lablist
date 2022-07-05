import styles from "../../../../styles/historyElem.module.css";

export const HistoryElem = () => {
  return (
    <div className={styles.HistoryElemContainer}>
      <div className={styles.dateContainer}>
        <div className={styles.boxStatus}></div>
        <p className={styles.date}>01.06.2022</p>
      </div>
      <p className={styles.name}>Сидорово-Загоруйский В.</p>
      <p className={styles.labName}>Название длинное длинное для лабораторной работы</p>
      <div className={styles.statusContainer}>
        <p className={styles.statusWord}>Статус:</p>
        <p className={styles.status}>Возвращена на доработку</p>
      </div>
    </div>
  );
};
