import { labData } from "../../data";
import { useEffect, useState } from "react";
import styles from "../../styles/table.module.css";
import { Row } from "./resultTable/row/row";
import { TableHeader } from "./resultTable/tableHeader/tableHeader";
import { ResultTable } from "./resultTable";
import { History } from "./history";
import Image from "next/image";

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
      <div className={styles.tableNavContainer}>
        <p className={styles.tableNavText}>Студенты:</p>
        <div className={styles.tableNav}>
          <p className={styles.tableNavText}>Выполнение работ:</p>
          <div>
            <div className={styles.arrow}>
              <Image
                src="/leftArrow.png"
                alt=""
                width={"20%"}
                height={"10%"}
                className={styles.arrow}
              />
            </div>
            <div className={styles.arrow}>
              <Image
                src="/rightArrow.png"
                alt=""
                width={"20%"}
                height={"10%"}
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <ResultTable />
      <History />
    </div>
  );
};
