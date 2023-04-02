import { useAppDispatch } from "../../hooks";
import { updateStudentFilter } from "../../store/filterStore";
import { Lab, User } from "../../types";
import styles from "./studentCard.module.css";

interface StudentProps {
  setActive: React.Dispatch<React.SetStateAction<User | null>>;
  student: User;
  labs: Lab[];
}

export const StudentCard = (props: StudentProps) => {

  const dispatch = useAppDispatch()

  const checkPhoto = (elem: string | undefined) => {
    if (elem) {
      return elem
    }
    else {
      return '/unk.svg'
    }
  }

  const checkAttention = (array: Lab[]) => {
    const res = array.find(elem => elem.status === "Сдана на проверку")
    if (res) {
      return <img src="/attention.svg" alt="" height={"100%"} />
    }

    else {
      return
    }
  }

  return (
    <div className={styles.studentCard} onClick={() => dispatch(updateStudentFilter(props.student._id))}>
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
        <div className={styles.name}>
          <span className={styles.hoverName} onClick={(e) => {props.setActive(props.student);
          e.stopPropagation()}}>{props.student.surname} <br/> {props.student.name} </span>
        </div>
      </div>

    </div>
  );
};
