import { useEffect, useState } from "react";
import styles from "./tableContent.module.css";
import { Row } from "./row";
import { StudentCard } from "./studentCard";
import { StudentModal } from "./studentModal";
import { User } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { fetchUsers } from "../../../../store/userSlice";
import { fetchLabs } from "../../../../store/labSlice";

interface ContentProps {
  step: number;
}

export const TableContent = (props: ContentProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [modalStudent, setModalStudent] = useState<User | null>(null);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(fetchLabs())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const allUsers = useAppSelector((state) => state.users.users);
  const allLabs = useAppSelector((state) => state.labs.labs);

  const setModalActiveStudent = (student: User) => {
    setModalActive(true);
    setModalStudent(student)
  }

  const parseStudents = () => {
    return allUsers.map(elem => {
      const studentLabs = allLabs.filter(i => elem._id === i.userId)
      return <div className={styles.studentElemContainer} key={elem._id} onClick={() => setModalActiveStudent(elem)}><StudentCard student={elem} labs={studentLabs} /></div>
    })
  }

  const parseRow = () => {
    return allUsers.map(elem => {
      const studentLabs = allLabs.filter(i => elem._id === i.userId).sort((a, b) => a.num > b.num ? 1 : -1)
      return <Row key={elem._id} student={elem} studentLabs={studentLabs} />
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
      <StudentModal key={modalStudent?._id} active={modalActive} setActive={setModalActive} student={modalStudent} setStudent={setModalStudent} />
    </div>
  );
};
