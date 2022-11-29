/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "./resultTable.module.css";
import { TableHeader } from "./tableHeader";
import { TableContent } from "./tableContent";
import { useAppSelector } from "../../../hooks";

interface ResultProps {
  step: number;
}

export const ResultTable = (props: ResultProps) => {
  const [count, setCount] = useState(0);

  const journal = useAppSelector((state) => state.journal.journal);

  useEffect(() => journal ? setCount(journal.students.length) : setCount(0), []);
  const manCount = (len: number) => {
    const rem: number = len % 10
    if (rem <= 4 && rem >= 2) {
      return String(len) + ' человека'
    }
    return String(len) + ' человек'
  }

  if (journal) {
    return <div className={styles.resultTableContainer}>
      <div className={styles.tableNavContainer + ' ' + styles.header}>
        <div>
          <p className={styles.group}>{journal.discription}</p>
          <p className={styles.count}>{manCount(count)}</p>
        </div>
        <TableHeader step={props.step} />
      </div>
      <TableContent step={props.step} />
    </div>;
  }
  return <div></div>
};
