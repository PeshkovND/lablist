import { useEffect, useState } from "react";
import { journals, labs, users } from "../../../../data";
import styles from "./tableContent.module.css";
import { Row } from "./row";
import { StudentCard } from "./studentCard";
import { StudentModal } from "./studentModal";
import { Journal, User, Lab } from "../../../../types";

interface ContentProps {
  step: number;
  journal: Journal
}

export const TableContent = (props: ContentProps) => {
  const [labsData, setLabsData] = useState(labs.filter((elem) => elem.journalId === props.journal.id));
  const [studentsData, setStudentsData] = useState(users.filter((elem) => props.journal.students.includes(elem.id)).sort((a, b) => a.id > b.id ? 1 : -1));
  const [modalActive, setModalActive] = useState(false);
  const [modalStudent, setModalStudent] = useState<User | null>(null);

  useEffect(() => setLabsData(labs.filter((elem) => elem.journalId === props.journal.id)), []);
  useEffect(() => setStudentsData(users.filter((elem) => props.journal.students.includes(elem.id)).sort((a, b) => a.id > b.id ? 1 : -1)), []);

  const setModalActiveStudent = (student: User) => {
    setModalActive(true);
    setModalStudent(student)
  }

  const parseStudents = () => {
    return studentsData.map(elem => {
      const studentLabs = labsData.filter(i => elem.id === i.userId)
      return <div className={styles.studentElemContainer} key={elem.id} onClick={() => setModalActiveStudent(elem)}><StudentCard student={elem} labs={studentLabs} /></div>
    })
  }

  const parseRow = () => {
    return studentsData.map(elem => {
      const studentLabs = labsData.filter(i => elem.id === i.userId).sort((a, b) => a.num > b.num ? 1 : -1)
      return <Row key={elem.id} student={elem} studentLabs={studentLabs} labs={props.journal.labs} journal={props.journal} />
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
