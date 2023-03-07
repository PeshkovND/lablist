import styles from "./resultTable.module.css";
import { TableHeader } from "./tableHeader";
import { TableContent } from "./tableContent";
import { Journal } from "../../../types";
import { useAppSelector } from "../../../hooks";

interface ResultProps {
  step: number;
}

export const ResultTable = (props: ResultProps) => {
  const journal = useAppSelector((state) => state.journal.journal) as Journal;
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
          <p className={styles.group}>{journal.discription}</p>
          <p className={styles.count}>{manCount(journal.students.length)}</p>
        </div>
        <TableHeader step={props.step} />
      </div>
      <TableContent step={props.step} />
    </div>;
};
