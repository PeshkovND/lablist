import styles from "./history.module.css";
import { HistoryElem } from "../historyElem";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AllHistoryState } from "../../types";
import { paggingUpdateHistory, paggingUpdateMessages } from "../../store/historySlice";
import { PaggingLoading } from "../paggingLoading";
import { useParams } from "react-router-dom";


export const History = () => {
  const [chooseButton, setChooseButton] = useState('history')
  const paginationStep = 15;
  const dispatch = useAppDispatch()
  const data = useAppSelector((state) => state.history) as AllHistoryState
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const { id } = useParams();

  const updating = chooseButton === 'history' ? data.historyUpdating : data.messagesUpdating

  useEffect(() => {
    const { scrollHeight, clientHeight } = ref.current;
    if (chooseButton === 'history') {
      if (scrollHeight === clientHeight && !updating && data.history.length !== data.historyCount) {
        dispatch(paggingUpdateHistory([paginationStep, id as string]))
      }
    }
    else {
      if (scrollHeight === clientHeight && !updating && data.messages.length !== data.messagesCount) {
        dispatch(paggingUpdateMessages([paginationStep, id as string]))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const scrollHandler = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (chooseButton === 'history') {
        if (scrollHeight - (scrollTop + clientHeight) <= 5 && !updating && data.history.length !== data.historyCount) {
          dispatch(paggingUpdateHistory([paginationStep, id as string]))
        }
      }
      else {
        if (scrollHeight - (scrollTop + clientHeight) <= 5 && !updating && data.messages.length !== data.messagesCount) {
          dispatch(paggingUpdateMessages([paginationStep, id as string]))
        }
      }
    }
  }

  const checkLoading = () => {
    if (updating) {
      return <PaggingLoading />
    }
  }

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
        <div className={chooseButton === "history" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('history')}>История ({data.historyCount})</div>
        <div className={chooseButton === "messages" ? styles.button + ' ' + styles.active : styles.button} onClick={() => setChooseButton('messages')}>Сообщения ({data.messagesCount})</div>
      </div>
      <div className={styles.elemContainer} onScroll={() => scrollHandler()} ref={ref}>
        {renderElems()}
        {checkLoading()}
      </div>
    </div>
  );
};
