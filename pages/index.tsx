import { data } from "../data";
import { useEffect, useState } from "react";
import styles from "../styles/table.module.css";
import { DoneLab } from "../types";
import { Score } from "../components/score";

const Home = () => {
  const [mainData, setMainData] = useState(data);
  useEffect(() => setMainData(data), []);

  const headerMaker = () => {
    return mainData[0].done.map((elem) => {
      return (
        <th key={elem.labId}>
          <div className={styles.header}>{"№ " + elem.labId}</div>
        </th>
      );
    });
  };

  const markMaker = (marks: DoneLab[]) => {
    return marks.map((elem) => {
      if (elem.status != 3)
        return (
          <td key={elem.labId}>
            <Score done={elem} />
          </td>
        );
      else return <td></td>;
    });
  };

  const stringMaker = () => {
    return mainData.map((elem) => {
      return (
        <tr key={elem.id}>
          <th className={styles.studentContainer}>
            <div className={styles.student}>
              <p className={styles.studentName}>
                {elem.name + " " + elem.surname}
              </p>
              <p className={styles.studentEmail}>{elem.email}</p>
            </div>
          </th>
          {markMaker(elem.done)}
        </tr>
      );
    });
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr className={styles.stickyHeader}>
            <th>
              <div className={styles.group}>Группа ОПГ-303, 2 курс</div>
            </th>
            {headerMaker()}
          </tr>
        </thead>
        <tbody className={styles.stickyBody}>{stringMaker()}</tbody>
      </table>
    </div>
  );
};

export default Home;
