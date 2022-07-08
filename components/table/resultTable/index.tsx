import { labData, labs } from "../../../data";
import { useEffect, useState } from "react";
import styles from "../../../styles/table.module.css";
import { TableHeader } from "./tableHeader/tableHeader";
import { Scores } from "./scores";

export const ResultTable = () => {
  const [scoreData, setScoreData] = useState(labData);
  useEffect(() => setScoreData(labData), []);

  const [lrData, setLrRow] = useState(labs);
  useEffect(() => setLrRow(labs), []);

  const currentGroup = 'ОПГ-303'
  const course = 2

  const manCount = (len: number) =>{
    const rem: number = len % 10
    if(rem <= 4 && rem >= 2) {
      return String(len) + ' человека'
    }
    return String(len) + ' человек'
  }

  return <div className={styles.resultTableContainer}>
    <div className={styles.tableNavContainer +' '+ styles.header}>
      <div>
        <p className={styles.group}>Группа: {currentGroup}, {course} курс</p>
        <p className={styles.count}>{manCount(scoreData.length)}</p>
      </div>
      <TableHeader/>
    </div>
    <Scores/>
  </div>;
};
