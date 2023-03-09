import styles from "./row.module.css";
import { Journal, JournalLab, Lab, User } from "../../../../../types";
import { Score } from "./score";
import { useAppSelector } from "../../../../../hooks";

interface RowProps {
  student: User;
  studentLabs: Lab[];
}

export const Row = (props: RowProps) => {
  const journal = useAppSelector((state) => state.journal.journal) as Journal;

    const parseScore = (labs: JournalLab[]) => {
      return labs.map(elem => {
        const lab = props.studentLabs.find(i => i.num === elem.num)
        if (lab)
          return <Score lab={lab} num={lab.num} key={String(lab.journalId) + String(lab.userId) + String(lab.num)} />
        else return <Score lab={lab} num={elem.num} key={String(journal._id) + String(props.student._id) + String(elem.num)} />
      })
    }

    return (
      <div className={styles.rowContainer}>
        {parseScore(journal.labs)}
      </div>
    )
};
