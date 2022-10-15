import { useEffect, useState } from "react";
import { labData } from "../../../../data";
import styles from "./tableContent.module.css";
import { Row } from "./row";
import { StudentCard } from "./studentCard";
import { StudentModal } from "./studentModal";
import { Student } from "../../../../types";

interface ContentProps {
  step: number;
}

export const TableContent = (props: ContentProps) => {
  const [scoreData, setScoreData] = useState(labData);
  const [modalActive, setModalActive] = useState(false);
  const [modalStudent, setModalStudent] = useState<Student | null>(null);

  useEffect(() => setScoreData(labData), []);


  const setModalActiveStudent = (student: Student) => {
    setModalActive(true);
    setModalStudent(student)
  }

  const parseStudents = () => {
    return scoreData.map(elem => {
      return <div className={styles.studentElemContainer} key={elem.id} onClick={() => setModalActiveStudent(elem)}><StudentCard elem={elem} /></div>
    })
  }

  const parseRow = () => {
    return scoreData.map(elem => {
      return <Row key={elem.id} elem={elem} />
    })
  }

  return (
    <div className={styles.tableNavContainer + " " + styles.scores}>
      <div className={styles.studentsContainer}>
        {parseStudents()}
      </div>
      <div className={styles.scoresWindow}>
        <div className={styles.scoresConteiner} style={{
          transform: `translate(calc(${props.step}*-10%))`
        }}>
          {parseRow()}
        </div>
      </div>
      <StudentModal key={modalStudent?.id} active={modalActive} setActive={setModalActive} student={modalStudent} setStudent={setModalStudent} />
    </div>
  );
};
