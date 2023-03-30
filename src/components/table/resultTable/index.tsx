import styles from "./resultTable.module.css";
import { TableHeader } from "./tableHeader";
import { TableContent } from "./tableContent";
import { HistoryType, Journal, Lab } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useContext, useEffect } from "react";
import { WebsocketContext } from "../../../contexts/WebSocketContext";
import { update } from "../../../store/historySlice";
import { addLab, updateLab } from "../../../store/labSlice";

interface ResultProps {
  step: number;
}

export const ResultTable = (props: ResultProps) => {
  const journal = useAppSelector((state) => state.journal.journal) as Journal;
  const appSockets = useContext(WebsocketContext)
  const dispatch = useAppDispatch()

  useEffect(() => {
    appSockets.messagesSocket.on('Message: ' + journal._id, (data: HistoryType) => {
      dispatch(update(data))
    })

    appSockets.labsSocket.on('New Lab: ' + journal._id, (data: Lab) => {
      dispatch(addLab(data))
    })

    appSockets.labsSocket.on('Update Lab: ' + journal._id, (data: Lab) => {
      dispatch(updateLab(data))
    })

    return () => {
      appSockets.messagesSocket.off('Message: ' + journal._id)
      appSockets.labsSocket.off('New Lab: ' + journal._id)
      appSockets.labsSocket.off('Update Lab: : ' + journal._id)
    }
  }, [journal])
  
  const manCount = (len: number) => {
    const rem: number = len % 10
    if (rem <= 4 && rem >= 2) {
      return String(len) + ' человека'
    }
    return String(len) + ' человек'
  }

    return <div className={styles.resultTableContainer}>
      <div className={styles.tableNavContainer + ' ' + styles.header}>
        <div>
          <p className={styles.group}>{journal.discription}</p>
          <p className={styles.count}>{manCount(journal.students.length)}</p>
        </div>
        <TableHeader step={props.step} />
      </div>
      <TableContent step={props.step} />
    </div>;
};
