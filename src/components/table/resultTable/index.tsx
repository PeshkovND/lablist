import { useEffect, useState } from "react";
import styles from "./resultTable.module.css";
import { TableHeader } from "./tableHeader";
import { TableContent } from "./tableContent";
import { Journal } from "../../../types";

interface ResultProps {
  step: number;
  journal: Journal
}

export const ResultTable = (props: ResultProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => setCount(props.journal.students.length), [props.journal.students.length]);
  const manCount = (len: number) => {
    const rem: number = len % 10
    if (rem <= 4 && rem >= 2) {
      return String(len) + ' человека'
    }
    return String(len) + ' человек'
  }

  return <div className={styles.resultTableContainer}>
    <div className={styles.tableNavContainer + ' ' + styles.header}>
      <div>
        <p className={styles.group}>{props.journal.discription}</p>
        <p className={styles.count}>{manCount(count)}</p>
      </div>
      <TableHeader journal={props.journal} step={props.step} />
    </div>
    <TableContent journal={props.journal} step={props.step} />
  </div>;
};
