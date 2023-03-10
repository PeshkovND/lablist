import styles from "./score.module.css";
import { JournalLab, Lab } from "../../../../../../types";
import { useAppSelector } from "../../../../../../hooks";

interface ScoreProps {
  userId: string;
  lab: Lab | undefined;
  num: number;
}

export const Score = (props: ScoreProps) => {
  const filter = useAppSelector((state) => state.filter);
  const journal = useAppSelector((state) => state.journal);

  const checkStatus = (elem: Lab | undefined) => {
    let color: string;
    if (props.lab) {
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
    }
    else return
    return (
      <div className={styles.score + ' ' + color}>
        <div className={styles.centerText}>
          <p className={styles.scoreNumber}>{props.lab.score}</p>
        </div>
      </div>
    );
  };

  const checkDeadline = (num: number, userId: string) => {
    if (journal.lastDeadline?.deadline) {
      const journalLab = journal.journal?.labs.find(e => e.num === num) as JournalLab
      if (journalLab.deadline && journalLab.deadline <= journal.lastDeadline.deadline) {
        if(journal.lastDeadline.num === journalLab.num && journalLab.num !== filter.labFilter ){
          if(userId === filter.studentFilter){
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

return <div className={checkFilter(props.num, props.userId) + " " + checkDeadline(props.num, props.userId)}>
  {checkStatus(props.lab)}
</div>;
};
