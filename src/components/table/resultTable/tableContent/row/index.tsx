import styles from "./row.module.css";
import { Lab, User } from "../../../../../types";
import { Score } from "./score";
import { useAppSelector } from "../../../../../hooks";

interface RowProps {
  student: User;
  studentLabs: Lab[];
}

export const Row = (props: RowProps) => {
  const journal = useAppSelector((state) => state.journal.journal);

  if (journal) {
    const parseScore = (labs: {
      num: number;
      deadline?: Date | undefined;
    }[]) => {
      return labs.map(elem => {
        const lab = props.studentLabs.find(i => i.num === elem.num)
        if (lab)
          return <Score lab={lab} key={String(lab.journalId) + String(lab.userId) + String(lab.num)} />
        else return <Score lab={lab} key={String(journal._id) + String(props.student._id) + String(elem.num)} />
      })
    }

    return (
      <div className={styles.rowContainer}>
        {parseScore(props.studentLabs)}
      </div>
    )
  }
  return <div></div>
};
