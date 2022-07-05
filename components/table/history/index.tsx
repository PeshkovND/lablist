import styles from "../../../styles/history.module.css";
import { HistoryElem } from "./historyElem";

export const History = () => {
  return (
    <div className={styles.historyContainer}>
      <div className={styles.togler}>
        <div className={styles.historyButton}>История (7)</div>
        <div className={styles.messageButton}>Сообщения (11)</div>
      </div>
      <div className={styles.elemContainer}>
        <HistoryElem/>
      </div>
    </div>
  );
};
