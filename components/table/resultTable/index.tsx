import { labData } from "../../../data";
import { useEffect, useState } from "react";
import styles from "../../../styles/table.module.css";
import { Row } from "./row/row";
import { TableHeader } from "./tableHeader/tableHeader";
import Image from "next/image";

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

  return <div className={styles.resultTableContainer}></div>;
};
