import {  useState } from "react";
import styles from "./tableContent.module.css";
import { Row } from "./row";
import { StudentCard } from "./studentCard";
import { StudentModal } from "./studentModal";
import { User } from "../../../../types";
import { useAppSelector } from "../../../../hooks";

interface ContentProps {
  step: number;
}

export const TableContent = (props: ContentProps) => {
  const [modalStudent, setModalStudent] = useState<User | null>(null);

  const allUsers = useAppSelector((state) => state.users.users);
  const allLabs = useAppSelector((state) => state.labs.labs);
  const filter = useAppSelector((state) => state.filter);


  const setModalActiveStudent = (student: User) => {
    setModalStudent(student)
  }

  const checkFilter = (id: string) => {
    if (filter.studentFilter) {
      if (id === filter.studentFilter) {
        return styles.studentElemContainer + " " + styles.selected
      }
        return styles.studentElemContainer + " " + styles.notSelected
    }
    return styles.studentElemContainer
  }

  const parseStudents = () => {
    return allUsers.map(elem => {
      const studentLabs = allLabs.filter(i => elem._id === i.userId)
      return <div className={checkFilter(elem._id)} key={elem._id}><StudentCard setActive={setModalActiveStudent} student={elem} labs={studentLabs} /></div>
    })
  }


  const parseRow = () => {
    return allUsers.map(elem => {
      const studentLabs = allLabs.filter(i => elem._id === i.userId).sort((a, b) => a.num > b.num ? 1 : -1)
      return <Row key={elem._id} student={elem} studentLabs={studentLabs} />
    })
  }

  const checkModal = () => {
    if (modalStudent){
      return <StudentModal key={modalStudent?._id} student={modalStudent} setStudent={setModalStudent} />
    }
    else return
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
      {checkModal()}
    </div>
  );
};
