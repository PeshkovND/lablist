import { useState } from "react";
import styles from "./labModal.module.css";
import { useAppSelector } from "../../hooks";
import { Journal, JournalLab, KafkaMessage, Lab, User } from "../../types";

interface ModalProps {
  student: User;
  lab: JournalLab
  mark: Lab | null
  setMark: React.Dispatch<React.SetStateAction<Lab | null>>
  setStudent: React.Dispatch<React.SetStateAction<User | null>>
  setLab: React.Dispatch<React.SetStateAction<JournalLab | null>>
}

export const LabModal = (props: ModalProps) => {

  const [input, setInput] = useState<string>(props.mark ? String(props.mark.score) : "");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const journal = useAppSelector(state => state.journal.journal) as Journal

  const checkPhoto = (elem: string | undefined) => {
    if (elem) {
      return elem
    }
    else {
      return '/unk.svg'
    }
  }

  const checkLabName = () => {
    if (props.lab.name) {
      return (
        <div className={styles.labInfo}>
          Название работы: <span className={styles.group}>{props.lab.name}</span>
        </div>
      )
    }
  }

  const validateInput = (mark: string) => {
    const numberMark = Number(mark)
    if ((numberMark <= 10 && numberMark >= 0) || mark === "") {
      if (input === "0" && mark !== "") return
      setInput(mark)
    }
  }

  const closeForm = () => {
    props.setStudent(null)
    props.setLab(null)
    props.setMark(null)
  }

  const validateForm = () => {
    if (input === "") {
      setError(true)
      setStatus("")
    }
    else {
      const message: KafkaMessage = {
        num: props.lab.num,
        userId: props.student._id,
        journalId: journal._id,
        text: "№" + props.lab.num + (props.lab.name ? " " + props.lab.name : ""),
        status: status,
        score: Number(input)
      }

      fetch("http://localhost:3001/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      closeForm()
    }
  }

  return <div className={styles.modal} onClick={() => closeForm()}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
      <div className={styles.layout}>
        <div className={styles.closeContainer}>
          <div onClick={() => closeForm()} className={styles.closeClickContainer}>
            <img
              src={'/close.svg'}
              width={'100%'}
              alt='Закрыть'
            />
          </div>
        </div>
        <div className={styles.studentProfileContainer}>
          <div className={styles.studentPhotoContainer}>
            <img
              src={checkPhoto(props.student.photo)}
              className={styles.studentPhoto}
              alt='Фото'
            />
          </div>
          <div className={styles.studentNameContainer}>
            <p className={styles.studentName}>{props.student.surname}</p>
            <p className={styles.studentName}>{props.student.name}</p>
            <div className={styles.groupInfo}>
              {/* <p className={styles.studentNameContainer}>Группа: <span className={styles.group}>{student.group}</span></p>
                <p className={styles.studentCourseContainer}>Курс: <span className={styles.group}>{student.course}</span></p> */}
              <p className={styles.studentNameContainer}>Группа: <span className={styles.group}>ФИТ-191</span></p>
            </div>
          </div>
        </div>
        <div className={styles.labInfo}>
          Номер работы: <span className={styles.group}>{props.lab.num}</span>
        </div>
        {checkLabName()}
        <form className={styles.form} onSubmit={e => {
          e.preventDefault();
          validateForm()
        }}>
          <div className={styles.inputContainer}>
            <div>Оценка: </div>
            <input className={styles.input} type="text" value={input} onChange={(e) => validateInput(e.target.value)} onFocus={() => setError(false)} />
            <div className={error ? styles.error + " " + styles.active : styles.error}>Введите оценку</div>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.button + " " + styles.done} type="submit" onClick={()=> setStatus("Принята")}>Принять</button>
            <button className={styles.button + " " + styles.comeback} type="submit" onClick={()=> setStatus("Возвращена на доработку")}>Вернуть на доработку</button>
          </div>
        </form>
      </div>
    </div>
  </div>;
};