import styles from "../../../../../styles/row.module.css";
import { DoneLab, Student } from "../../../../../types";
import { Score } from "./score";

interface RowProps {
    elem: Student;
  }

  const parseScore = (labs: DoneLab[]) => {
    return labs.map(elem => {return <Score elem={elem} key={elem.id}/>})
  }

export const Row = (props: RowProps) => {
  return <div className={styles.rowContainer}>
    {parseScore(props.elem.done)}
  </div>;
};
