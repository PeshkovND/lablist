import styles from "./table.module.css";
import { ResultTable } from "./resultTable";
import { History } from "./history";
import { useState } from "react";
import { useAppSelector } from "../../hooks";

export const Table = () => {
  const [step, setStep] = useState(0)

  const journal = useAppSelector((state) => state.journal.journal);
  const maxStep = journal ? journal.labs.length - 10 : 1;

  const handleClick = (step: number, dirrection: number) => {
    if ((step >= maxStep && dirrection === 1) || (step <= 0 && dirrection === -1)) {
      return
    }
    else {
      const newStep = step + dirrection;
      setStep(newStep)
    }
  }

  const checkArrow = (step: number, maxStep: number, arrow: boolean) => {
    if (arrow === false) {
      if (step <= 0 || maxStep <= 0) {
        return 100
      }
      else { return 0 }
    }
    else {
      if (arrow === true) {
        if (step >= maxStep || maxStep <= 0) {
          return 100
        }
        else {
          return 0
        }
      }
    }
  }
  if (journal) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.tableNavContainer}>
            <p className={styles.tableNavText}>Студенты:</p>
            <div className={styles.tableNav}>
              <p className={styles.tableNavText}>Выполнение работ:</p>
              <div className={styles.arrowsContainer}>
                <div className={styles.arrow} onClick={() => handleClick(step, -1)}>
                  <img
                    src={'/arrow.svg'}
                    alt=""
                    width={'100%'}
                    style={{ transform: 'rotate(180deg)', filter: `grayscale(${checkArrow(step, maxStep, false)}%)` }}
                  />
                </div>
                <div className={styles.arrow} onClick={() => handleClick(step, 1)}>
                  <img
                    src={'/arrow.svg'}
                    alt=""
                    width={'100%'}
                    style={{ filter: `grayscale(${checkArrow(step, maxStep, true)}%)` }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <ResultTable step={step} />
          <History />
        </div>
      </div>
    );
  }
  return <div></div>
}
