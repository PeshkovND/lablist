import { labData } from "../../../data";
import { useEffect, useState } from "react";
import styles from "./resultTable.module.css";
import { TableHeader } from "./tableHeader/tableHeader";
import { TableContent } from "./tableContent";

interface ResultProps {
  step: number;
}

export const ResultTable = (props: ResultProps) => {
  const [scoreData, setScoreData] = useState(labData);
  useEffect(() => setScoreData(labData), []);

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
      <TableHeader step={props.step}/>
    </div>
    <TableContent step={props.step}/>
  </div>;
};
