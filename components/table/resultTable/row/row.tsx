import { Student, DoneLab } from "../../../../types";
import styles from "../../../../styles/table.module.css";
import { Score } from "./score/score";

interface RowProps {
  student: Student;
}

export const Row = (props: RowProps) => {
  const markMaker = (marks: DoneLab[]) => {
    return marks.map((elem) => {
      if (elem.status != 3)
        return (
          <td key={elem.id}>
            <Score done={elem} />
          </td>
        );
      else return <td key={elem.id}></td>;
    });
  };

  return (
    <tr>
      <th className={styles.studentContainer}>
        <div className={styles.student}>
          <p className={styles.studentName}>
            {props.student.name + " " + props.student.surname}
          </p>
          <p className={styles.studentEmail}>{props.student.email}</p>
        </div>
      </th>
      {markMaker(props.student.done)}
    </tr>
  );
};
