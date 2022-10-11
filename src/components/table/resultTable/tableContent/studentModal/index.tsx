import { Student } from "../../../../../types";
import styles from "./studentModal.module.css";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>
}

export const StudentModal = (props: ModalProps) => {

  const setUnactive = () => {
    props.setActive(false)
    props.setStudent(null)
  }

  const checkPhoto = (elem: string | null) => {
    if (elem) {
      return elem
    }
    else {
      return '/unk.png'
    }
  }

  const checkStudent = (student: Student | null) => {
    if (student) {
      return (
        <div className={props.active ? styles.modalContent + ' ' + styles.active : styles.modalContent} onClick={e => e.stopPropagation()}>
          <div className={styles.closeContainer}>
            <div onClick={() => setUnactive()} className={styles.closeClickContainer}>
              <img
                src={'/close.png'}
                className={styles.closePicture}
                alt='Закрыть'
              />
            </div>
          </div>
          <div className={styles.studentProfileContainer}>
            <div className={styles.studentPhotoContainer}>
              <img
                src={checkPhoto(student.photo)}
                className={styles.studentPhoto}
                alt='Фото'
              />
            </div>
            <div className={styles.studentNameContainer}>
              <p className={styles.studentName}>{student.surname}</p>
              <p className={styles.studentName}>{student.name}</p>
              <div className={styles.groupInfo}>
                <p>Группа: <span className={styles.group}>{student.group}</span></p>
                <p>Курс: <span className={styles.group}>{student.course}</span></p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return <div className={props.active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setUnactive()}>
    {checkStudent(props.student)}
  </div>;
};