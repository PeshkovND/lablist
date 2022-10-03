import { useEffect, useState } from "react";
import { labData } from "../../../../data";
import styles from "./tableContent.module.css";
import { Row } from "./row";
import { StudentCard } from "./studentCard";

export const TableContent = () => {
    const [scoreData, setScoreData] = useState(labData);
    useEffect(() => setScoreData(labData), []);
    
    const parseStudents = () => {
        return scoreData.map(elem =>{
            return <StudentCard key={elem.id} elem={elem}/>
        })
    }

    const parseRow = () => {
      return scoreData.map(elem =>{
          return <Row key={elem.id} elem={elem}/>
      })
  }

  return (
    <div className={styles.tableNavContainer + " " + styles.scores}>
      <div className={styles.studentsContainer}>
        {parseStudents()}
      </div>
      <div className={styles.scoresContainer}>
        {parseRow()}
      </div>
    </div>
  );
};
