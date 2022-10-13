import { DoneLab, Student } from "../../../../../types";
import { ContactElem } from "./contactElem";
import styles from "./studentModal.module.css";

interface ModalProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  student: Student | null;
  setStudent: React.Dispatch<React.SetStateAction<Student | null>>
}

export const StudentModal = (props: ModalProps) => {

  const doneLabs: DoneLab[] = props.student ? props.student.done.filter((elem) => elem.status === 0) : []
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

  const parseContacts = (student: Student) => {
    if (student.contacts) {
      return (
        <div className={styles.anotherInfoContainer}>
          {student.contacts.map(elem => { return <ContactElem key={elem.id} contact={elem} /> })}
        </div>
      )
    }
  }

  const checkWork = (doneLabs: DoneLab[]) => {
    const count = doneLabs.length
    const rem = count % 10;
    const secondRem = count % 100;
    if (rem === 1 && secondRem !== 11) {
      return <p className={styles.counter}>Выполнена <span>{count}</span> работа</p>
    }
    if (2 <= rem && rem <= 4 && ![12, 13, 14].includes(secondRem)) {
      return <p className={styles.counter}>Выполнено <span>{count}</span> работы</p>
    }
    else return <p className={styles.counter}>Выполнено <span>{count}</span> работ</p>
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
                <p className={styles.studentNameContainer}>Группа: <span className={styles.group}>{student.group}</span></p>
                <p className={styles.studentCourseContainer}>Курс: <span className={styles.group}>{student.course}</span></p>
              </div>
            </div>
          </div>
          <div className={styles.infoFlexContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.infoContentContainer}>
                <p className={styles.title}>Контактная информация</p>
                <p className={styles.info}>{student.email}</p>
                <p className={styles.info}>{student.phone}</p>
                {student.contacts ? <p className={styles.anotherTitle}>Другие контакты:</p> : null}
                {parseContacts(student)}
              </div>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.title}>Сообщения</p>
            </div>
          </div>
          <div className={styles.compliteContainer}>
            <div className={styles.statistic}>
              <p className={styles.title}>Выполнение работ</p>
              {checkWork(doneLabs)}
            </div>
            <div></div>
          </div>
        </div>
      )
    }
  }

  return <div className={props.active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => setUnactive()}>
    {checkStudent(props.student)}
  </div>;
};