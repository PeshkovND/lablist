import styles from "../../../styles/history.module.css";
import { HistoryElem } from "./historyElem";
import { historyData } from "../../../data";
import { useEffect, useState } from "react";

export const History = () => {
  const [data, setMainData] = useState(historyData);
  useEffect(() => setMainData(historyData), []);

  const renderHistory = () => {
    return historyData.map((elem) => {
      return <HistoryElem key={elem.id} elem={elem} />;
    });
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.togler}>
        <div className={styles.historyButton}>История (7)</div>
        <div className={styles.messageButton}>Сообщения (11)</div>
      </div>
      <div className={styles.elemContainer}>{renderHistory()}</div>
    </div>
  );
};
