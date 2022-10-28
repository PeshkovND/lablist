import styles from "./row.module.css";
import { Journal, Lab, User } from "../../../../../types";
import { Score } from "./score";

interface RowProps {
  student: User;
  studentLabs: Lab[];
  labs: {
    num: number;
    deadline?: Date | undefined;
  }[]
  journal: Journal
}

export const Row = (props: RowProps) => {

  const parseScore = (labs: {
    num: number;
    deadline?: Date | undefined;
  }[]) => {
    return labs.map(elem => {
      const lab = props.studentLabs.find(i => i.num === elem.num)
      if (lab)
        return <Score lab={lab} key={String(lab.journalId) + String(lab.userId) + String(lab.num)} />
      else return <Score lab={lab} key={String(props.journal.id) + String(props.student.id) + String(elem.num)} />
    })
  }

  return (
    <div className={styles.rowContainer}>
      {parseScore(props.labs)}
    </div>
  )
};
