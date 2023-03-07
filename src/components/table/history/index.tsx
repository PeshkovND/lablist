import styles from "./history.module.css";
import { HistoryElem } from "./historyElem";
import { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { AllHistoryState } from "../../../types";

export const History = () => {
  const [chooseButton, setChooseButton] = useState('history')
  const data = useAppSelector((state) => state.history) as AllHistoryState;

  const renderElems = () => {
    if (chooseButton === 'history') {
      if (data.history.length !== 0) {
        return data.history.map((elem) => {
          return <HistoryElem key={elem._id} elem={elem} />;
        })
      }
      return <div className={styles.errorMessage}> Сообщений нет </div>
    };
    if (data.messages.length !== 0) {
      return data.messages.map((elem) => {
        return <HistoryElem key={elem._id} elem={elem} />;
      })
    }
    return <div className={styles.errorMessage}> Сообщений нет </div>
  }

  return (
    <div className={styles.historyContainer}>
      <div className={styles.togler}>
        <div className={chooseButton === "history" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('history')}>История ({data.history.length})</div>
        <div className={chooseButton === "messages" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('messages')}>Сообщения ({data.messages.length})</div>
      </div>
      <div className={styles.elemContainer}>{renderElems()}</div>
    </div>
  );
};
