import { useAppSelector } from "../../hooks";
import { JournalLab, Lab, User } from "../../types";
import styles from "./score.module.css";

type NewType = Lab;

interface ScoreProps {
  user: User;
  lab: Lab | undefined;
  journalLab: JournalLab;
  setModalMark: React.Dispatch<React.SetStateAction<NewType | null>>
  setModalLab: React.Dispatch<React.SetStateAction<JournalLab | null>>;
  setModalLabStudent: React.Dispatch<React.SetStateAction<User | null>>;
}

export const Score = (props: ScoreProps) => {
  const filter = useAppSelector((state) => state.filter);
  const journal = useAppSelector((state) => state.journal);

  const onClick = () => {
    props.setModalLab(props.journalLab);
    props.setModalLabStudent(props.user);
    if (props.lab) {
      props.setModalMark(props.lab)
    }
  }

  const checkStatus = (elem: Lab | undefined) => {
    let color: string;
    if (props.lab && props.lab.isActual) {
      switch (props.lab.status) {
        case "Принята":
          color = styles.done;
          break;
        case "Сдана на проверку":
          color = styles.send;
          break;
        default:
          color = styles.return;
      }
      return (
        <div className={styles.score + ' ' + color} onClick={() =>onClick()}>
          <div className={styles.centerText}>
            <p className={styles.scoreNumber}>{props.lab.score}</p>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.score + ' ' + styles.none} onClick={() => onClick()}>
        <div className={styles.centerText}>
          <p className={styles.scoreNumber + " " + styles.none}>+</p>
        </div>
      </div>
    );
  };

  const checkDeadline = (num: number, userId: string) => {
    if (journal.lastDeadline?.deadline) {
      if (props.journalLab.num <= journal.lastDeadline.num) {
        if (journal.lastDeadline.num === props.journalLab.num && props.journalLab.num !== filter.labFilter) {
          if (userId === filter.studentFilter) {
            return styles.deadlined + " " + styles.lastWithstudentFilter
          }
          return styles.deadlined + " " + styles.last
        }
        return styles.deadlined
      }
    }
  }

  const checkFilter = (labNum: number, userId: string) => {
    if (filter.labFilter || filter.studentFilter) {
      if (labNum === filter.labFilter) {
        return styles.scoreContainer + " " + styles.selected
      }
      if (userId === filter.studentFilter) {
        return styles.scoreContainer + " " + styles.selectedRow
      }
      return styles.scoreContainer + " " + styles.notSelected
    }
    return styles.scoreContainer
  }

  return <div className={checkFilter(props.journalLab.num, props.user._id) + " " + checkDeadline(props.journalLab.num, props.user._id)}>
    {checkStatus(props.lab)}
  </div>;
};
