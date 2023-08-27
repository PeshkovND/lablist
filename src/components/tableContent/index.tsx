import { WebsocketContext } from "../../contexts/WebSocketContext";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateMessages } from "../../store/historySlice";
import { addLab, updateLab } from "../../store/labSlice";
import { HistoryType, Journal, JournalLab, Lab, User } from "../../types";
import { LabModal } from "../labModal";
import { Row } from "../row";
import { StudentCard } from "../studentCard";
import { StudentModal } from "../studentModal";
import { TableContentHeader } from "../tableContentHeader";
import styles from "./tableContent.module.css";
import { useContext, useEffect, useState } from "react";


interface ResultProps {
  step: number;
}

export const TableContent = (props: ResultProps) => {
  const [modalStudent, setModalStudent] = useState<User | null>(null);
  const [modalLab, setModalLab] = useState<JournalLab | null>(null);
  const [modalLabStudent, setModalLabStudent] = useState<User | null>(null);
  const [modalMark, setModalMark] = useState<Lab | null>(null);
  const journal = useAppSelector((state) => state.journal.journal) as Journal;
  const allUsers = useAppSelector((state) => state.users.users);
  const allLabs = useAppSelector((state) => state.labs.labs);
  const filter = useAppSelector((state) => state.filter);
  const appSockets = useContext(WebsocketContext)
  const dispatch = useAppDispatch()

  useEffect(() => {
    appSockets.messagesSocket.on('Message: ' + journal._id, (data: HistoryType) => {
      dispatch(updateMessages(data))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const manCount = (len: number) => {
    const rem: number = len % 10
    if (rem <= 4 && rem >= 2) {
      return String(len) + ' человека'
    }
    return String(len) + ' человек'
  }

  const checkFilter = (id: string) => {
    if (filter.studentFilter) {
      if (id === filter.studentFilter) {
        return styles.studentElemContainer + " " + styles.selected
      }
      return styles.studentElemContainer + " " + styles.notSelected
    }
    return styles.studentElemContainer
  }

  const parseStudents = () => {
    return allUsers.map(elem => {
      return <div className={checkFilter(elem._id)} key={elem._id}><StudentCard setActive={setModalStudent} student={elem} /></div>
    })
  }

  const parseRow = () => {
    return allUsers.map(elem => {
      const studentLabs = allLabs.filter(i => elem._id === i.userId).sort((a, b) => a.num > b.num ? 1 : -1)
      return <Row key={elem._id} student={elem} studentLabs={studentLabs}
        setModalLab={setModalLab} setModalLabStudent={setModalLabStudent} setModalMark={setModalMark} />
    })
  }

  const checkStudentModal = () => {
    if (modalStudent) {
      return <StudentModal key={modalStudent?._id} student={modalStudent} setStudent={setModalStudent} />
    }
    else return
  }

  const checkLabModal = () => {
    if (modalLab && modalLabStudent) {
      return <LabModal key={modalLabStudent?._id} mark={modalMark} student={modalLabStudent} lab={modalLab}
        setLab={setModalLab} setStudent={setModalLabStudent} setMark={setModalMark} />
    }
    else return
  }

  return <div className={styles.tableContentContainer}>
    <div className={styles.tableContentHeaderContainer}>
      <div>
        <p className={styles.discription}>{journal.discription}</p>
        <p className={styles.count}>{manCount(journal.students.length)}</p>
      </div>
      <TableContentHeader step={props.step} />
    </div>
    <div className={styles.tableJournalContainer + " " + styles.scores}>
      <div className={styles.studentsContainer}>
        {parseStudents()}
      </div>
      <div className={styles.scoresWindow}>
        <div className={styles.scoresConteiner} style={{
          transform: `translate(calc(${props.step}*-10%))`
        }}>
          {parseRow()}
        </div>
      </div>
      {checkStudentModal()}
      {checkLabModal()}
    </div>
  </div>;
};
