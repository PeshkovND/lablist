import { messeges } from "../../../../../data";
import { User, Message } from "../../../../../types";
import { ContactElem } from "./contactElem";
import { MessageElem } from "./messegeElem";
import styles from "./studentModal.module.css";

interface ModalProps {
  student: User;
  setStudent: React.Dispatch<React.SetStateAction<User | null>>
}

export const StudentModal = (props: ModalProps) => {

  const userMessages: Message[] = messeges.filter(elem => (String(elem.from) === props.student?._id && elem.to === 100) || (elem.from === 100 && String(elem.to) === props.student?._id))

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

  const parseMessages = (student: User) => {
    return (
      <div className={styles.messagesContainer}>
        {userMessages.map(elem => { return <MessageElem key={elem.id} message={elem} student={props.student} /> })}
      </div>
    )
  }

  // const checkWork = (doneLabs: DoneLab[]) => {
  //   const count = doneLabs.length
  //   const rem = count % 10;
  //   const secondRem = count % 100;
  //   if (rem === 1 && secondRem !== 11) {
  //     return <p className={styles.counter}>Выполнена <span>{count}</span> работа</p>
  //   }
  //   if (2 <= rem && rem <= 4 && ![12, 13, 14].includes(secondRem)) {
  //     return <p className={styles.counter}>Выполнено <span>{count}</span> работы</p>
  //   }
  //   else return <p className={styles.counter}>Выполнено <span>{count}</span> работ</p>
  // }

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
                {/* <p className={styles.studentNameContainer}>Группа: <span className={styles.group}>{student.group}</span></p>
                <p className={styles.studentCourseContainer}>Курс: <span className={styles.group}>{student.course}</span></p> */}
                <p className={styles.studentNameContainer}>Группа: <span className={styles.group}>ФИТ-191</span></p>
                <p className={styles.studentCourseContainer}>Курс: <span className={styles.group}>2 курс, очного обучения</span></p>
              </div>
            </div>
          </div>
          <div className={styles.infoGridContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.infoContentContainer}>
                <p className={styles.title}>Контактная информация</p>
                <p className={styles.info}>{props.student.email}</p>
                <p className={styles.info}>{props.student.phone}</p>
                {props.student.contacts.length !== 0 ? <p className={styles.anotherTitle}>Другие контакты:</p> : null}
                {parseContacts(props.student)}
              </div>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.infoContentContainer}>
                <p className={styles.title}>Сообщения</p>
                {parseMessages(props.student)}
              </div>
            </div>
          </div>
          <div className={styles.compliteContainer}>
            <div className={styles.statistic}>
              <p className={styles.title}>Выполнение работ</p>
              {/* {checkWork(doneLabs)} */}
              <p className={styles.counter}>Выполнена <span>{0}</span> работа</p>
            </div>
            <div></div>
          </div>
        </div>
  </div>;
};