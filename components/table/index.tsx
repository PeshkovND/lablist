import { data } from "../../data";
import { useEffect, useState } from "react";
import styles from "../../styles/table.module.css";
import { Row } from "./resultTable/row/row";
import { TableHeader } from "./resultTable/tableHeader/tableHeader";
import { ResultTable } from "./resultTable";
import { History } from "./history";

export const Table = () => {
  const [mainData, setMainData] = useState(data);
  useEffect(() => setMainData(data), []);

  const headerMaker = () => {
    return mainData[0].done.map((elem) => {
      return <TableHeader key={elem.id} lab={elem} />;
    });
  };

  const rowMaker = () => {
    return mainData.map((elem) => {
      return <Row key={elem.id} student={elem} />;
    });
  };

  return (
    <div className={styles.table}>
      <ResultTable/>
      <History/>
    </div>
  );
};
