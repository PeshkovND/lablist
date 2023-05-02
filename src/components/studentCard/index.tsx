import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateStudentFilter } from "../../store/filterStore";
import { User } from "../../types";
import styles from "./studentCard.module.css";

interface StudentProps {
  setActive: React.Dispatch<React.SetStateAction<User | null>>;
  student: User;
}

export const StudentCard = (props: StudentProps) => {

  const dispatch = useAppDispatch()
  const labs = useAppSelector(state => state.labs.labs)

  const checkPhoto = (elem: string | undefined) => {
    if (elem) {
      return elem
    }
    return '/unk.svg'
  }

  const checkAttention = () => {
    const res = labs.find(elem => elem.status === "Сдана на проверку" && elem.userId === props.student._id)
    if (res) {
      return <img src="/attention.svg" alt="" height={"100%"} />
    }
    return
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
          {checkAttention()}
        </div>
        <div className={styles.name}>
          <span className={styles.hoverName} onClick={(e) => {props.setActive(props.student);
          e.stopPropagation()}}>{props.student.surname} <br/> {props.student.name} </span>
        </div>
      </div>

    </div>
  );
};
