import styles from "./studentCard.module.css";
import { User, Lab } from "../../../../../types";

interface StudentProps {
  student: User;
  labs: Lab[];
}

export const StudentCard = (props: StudentProps) => {


  const checkPhoto = (elem: string | null) => {
    if (elem) {
      return elem
    }
    else {
      return '/unk.svg'
    }
  }

  const checkAttention = (array: Lab[]) => {
    const res = array.find(elem => elem.status === 1)
    if (res) {
      return <img src="/attention.svg" alt="" height={"100%"} />
    }

    else {
      return
    }
  }

  return (
    <div className={styles.studentCard}>
      <div className={styles.studentPicContainer}>
        <img
          src={checkPhoto(props.student.photo)}
          alt=""
          className={styles.studentPic}
        />
      </div>

      <div className={styles.studentNameContainer}>
        <div className={styles.attentionContainer}>
          {checkAttention(props.labs)}
        </div>
        <div>
          <p className={styles.name}>{props.student.surname}</p>
          <p className={styles.name}>{props.student.name}</p>
        </div>
      </div>

    </div>
  );
};
