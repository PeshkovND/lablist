
import { User } from "../../types";
import { ContactElem } from "./contactElem";
import styles from "./studentModal.module.css";

interface ModalProps {
  student: User;
  setStudent: React.Dispatch<React.SetStateAction<User | null>>
}

export const StudentModal = (props: ModalProps) => {

  const checkPhoto = (elem: string | undefined) => {
    if (elem) {
      return elem
    }
    else {
      return '/unk.svg'
    }
  }

  const parseContacts = (student: User) => {
    if (student.contacts) {
      return (
        <div className={styles.anotherInfoContainer}>
          {student.contacts.map(elem => { return <ContactElem key={Math.random()} contact={elem} /> })}
        </div>
      )
    }
  }

  return <div className={styles.modal} onClick={() => props.setStudent(null)}>
    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div className={styles.closeContainer}>
            <div onClick={() => props.setStudent(null)} className={styles.closeClickContainer}>
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
                <p className={styles.studentNameContainer}>Группа: <span className={styles.group}>ФИТ-191</span></p>
                <p className={styles.studentCourseContainer}>Курс: <span className={styles.group}>2 курс, очного обучения</span></p>
              </div>
            </div>
          </div>
          <div className={styles.infoGridContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.infoContentContainer}>
                <p className={styles.title}>Контактная информация</p>
                <p className={styles.info}>E-mail: {props.student.email}</p>
                <p className={styles.info}>Телефон: {props.student.phone}</p>
                {props.student.contacts.length !== 0 ? <p className={styles.subtitle}>Другие контакты:</p> : null}
                {parseContacts(props.student)}
              </div>
            </div>
          </div>
        </div>
  </div>;
};