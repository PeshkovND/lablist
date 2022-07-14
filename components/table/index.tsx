import styles from "../../styles/table.module.css";
import { ResultTable } from "./resultTable";
import { History } from "./history";
import Image from "next/image";

export const Table = () => {

  return (
    <div className={styles.table}>
      <div className={styles.tableNavContainer}>
        <p className={styles.tableNavText}>Студенты:</p>
        <div className={styles.tableNav}>
          <p className={styles.tableNavText}>Выполнение работ:</p>
          <div style={{marginRight: '0.4vw'}}>
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
