import styles from "./row.module.css";
import { Journal, JournalLab, Lab, User } from "../../../../../types";
import { Score } from "./score";
import { useAppSelector } from "../../../../../hooks";

interface RowProps {
  student: User;
  studentLabs: Lab[];
  setModalMark: React.Dispatch<React.SetStateAction<Lab | null>>
  setModalLab: React.Dispatch<React.SetStateAction<JournalLab | null>>;
  setModalLabStudent: React.Dispatch<React.SetStateAction<User | null>>
}

export const Row = (props: RowProps) => {
  const journal = useAppSelector((state) => state.journal.journal) as Journal;

  const parseScore = (labs: JournalLab[]) => {
    return labs.map(elem => {
      const lab = props.studentLabs.find(i => i.num === elem.num)
      if (lab)
        return <Score user={props.student} lab={lab} journalLab={elem}
          key={String(lab.journalId) + String(lab.userId) + String(lab.num)} 
          setModalLab={props.setModalLab} setModalLabStudent={props.setModalLabStudent} setModalMark={props.setModalMark} />
      else return <Score user={props.student} lab={lab} journalLab={elem}
        key={String(journal._id) + String(props.student._id) + String(elem.num)}
         setModalLab={props.setModalLab} setModalLabStudent={props.setModalLabStudent} setModalMark={props.setModalMark}/>
    })
  }

  return (
    <div className={styles.rowContainer}>
      {parseScore(journal.labs)}
    </div>
  )
};
