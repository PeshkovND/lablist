import styles from "./history.module.css";
import { HistoryElem } from "../historyElem";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AllHistoryState } from "../../types";
import { paggingUpdateHistory } from "../../store/historySlice";
import { PaggingLoading } from "../paggingLoading";
import { useParams } from "react-router-dom";
import { paggingUpdateMessages } from "../../store/messagesSlice";


export const History = () => {
  const [chooseButton, setChooseButton] = useState('history')
  const dispatch = useAppDispatch()
  const historyData = useAppSelector((state) => state.history) as AllHistoryState
  const messagesData = useAppSelector((state) => state.messages) as AllHistoryState
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const { id } = useParams();

  const data = chooseButton === 'history' ? historyData : messagesData
  const updateData = chooseButton === 'history' ? paggingUpdateHistory : paggingUpdateMessages

  useEffect(() => {
    const { scrollHeight, clientHeight } = ref.current;
    if (scrollHeight === clientHeight && !data.updating && data.cursor && !data.error) {
        dispatch(updateData([data.cursor, id as string]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData.cursor, data.cursor])

  const scrollHandler = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;

      if (scrollHeight - (scrollTop + clientHeight) <= 5 && !data.updating && data.cursor && !data.error) {
        dispatch(updateData([data.cursor, id as string]))
      }
    }
  }

  const checkLoading = () => {
    if (data.updating) {
      return <PaggingLoading />
    }
  }

  const checkError = () => {
    if (data.error) {
      return <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Ошибка</p>
        <button className={styles.errorButton} onClick={() => dispatch(paggingUpdateHistory([data.cursor as string, id as string]))}>Повторить</button>
      </div>
    }
  }

  const renderElems = () => {
    if (data.messages.length !== 0) {
      return data.messages.map((elem) => {
        return <HistoryElem key={elem._id} elem={elem} />;
      })
    }
    return <div className={styles.errorMessage}> Сообщений нет </div>
  };

  return (
    <div className={styles.historyContainer}>
      <div className={styles.togler}>
        <div className={chooseButton === "history" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('history')}>История ({historyData.count})</div>
        <div className={chooseButton === "messages" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('messages')}>Сообщения ({messagesData.count})</div>
      </div>
      <div className={styles.elemContainer} onScroll={() => scrollHandler()} ref={ref}>
        {renderElems()}
        {checkLoading()}
        {checkError()}
      </div>
    </div>
  );
}