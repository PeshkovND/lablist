import { labData } from "../../data";
import { useEffect, useState } from "react";
import styles from "../../styles/table.module.css";
import { Row } from "./resultTable/row/row";
import { TableHeader } from "./resultTable/tableHeader/tableHeader";
import { ResultTable } from "./resultTable";
import { History } from "./history";

export const Table = () => {
  const [mainData, setMainData] = useState(labData);
  useEffect(() => setMainData(labData), []);

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
