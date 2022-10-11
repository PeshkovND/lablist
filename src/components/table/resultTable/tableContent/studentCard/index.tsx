import styles from "./studentCard.module.css";
import { Student, DoneLab } from "../../../../../types";

interface StudentProps {
  elem: Student;
}

export const StudentCard = (props: StudentProps) => {


  const checkPhoto = (elem: string | null) => {
    if (elem) {
      return elem
    }
    else {
      return '/unk.png'
    }
  }

  const checkAttention = (array: DoneLab[]) => {
    const res = array.filter(elem => elem.status === 1)
    if (res.length !== 0) {
      return <img src="/attention.png" alt="" height={"100%"} />
    }

    else {
      return
    }
  }

  return (
    <div className={styles.studentCard}>
      <div className={styles.studentPicContainer}>
        <div className={styles.studentPicAlign}>
          <img
            src={checkPhoto(props.elem.photo)}
            alt=""
            className={styles.studentPic}
          />
        </div>
      </div>
      <div className={styles.studentNameContainer}>
        <div className={styles.attentionContainer}>
          {checkAttention(props.elem.done)}
        </div>
        <div>
          <p className={styles.name}>{props.elem.surname}</p>
          <p className={styles.name}>{props.elem.name}</p>
        </div>
      </div>

    </div>
  );
};
