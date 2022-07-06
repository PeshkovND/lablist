import { labData } from "../../../data";
import { useEffect, useState } from "react";
import styles from "../../../styles/table.module.css";
import { Row } from "./row/row";
import { TableHeader } from "./tableHeader/tableHeader";

export const ResultTable = () => {
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
    <div className={styles.resultTable}>
      <table style={{ maxHeight: "100%", maxWidth: '100%' }}>
        <thead>
          <tr className={styles.stickyHeader}>
            <th>
              <div className={styles.group}>Группа ОПГ-303, 2 курс</div>
            </th>
            {headerMaker()}
          </tr>
        </thead>
        <tbody className={styles.stickyBody}>{rowMaker()}</tbody>
      </table>
    </div>
  );
};
