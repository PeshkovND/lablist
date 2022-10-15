import styles from "./table.module.css";
import { ResultTable } from "./resultTable";
import { History } from "./history";
import { useState } from "react";
import { labs } from "../../data";

export const Table = () => {
  const [step, setStep] = useState(0)
  const maxStep = labs.length - 10;

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
        return '/leftArrowUnactive.png'
      }
      else { return '/leftArrow.png' }
    }
    else {
      if (arrow === true) {
        if (step >= maxStep || maxStep <= 0) {
          return '/rightArrowUnactive.png'
        }
        else {
          return '/rightArrow.png'
        }
      }
    }
  }

    return (
      <div className={styles.table}>
        <div className={styles.tableNavContainer}>
          <p className={styles.tableNavText}>Студенты:</p>
          <div className={styles.tableNav}>
            <p className={styles.tableNavText}>Выполнение работ:</p>
            <div style={{ marginRight: '0.4vw' }}>
              <div className={styles.arrow} onClick={() => handleClick(step, -1)}>
                <img
                  src={checkArrow(step, maxStep, false)}
                  alt=""
                  width={"20%"}
                  height={"10%"}
                  className={styles.arrow}
                />
              </div>
              <div className={styles.arrow} onClick={() => handleClick(step, 1)}>
                <img
                  src={checkArrow(step, maxStep, true)}
                  alt=""
                  width={"20%"}
                  height={"10%"}
                />
              </div>
            </div>
          </div>
        </div>
        <div></div>
        <ResultTable step={step} />
        <History />
      </div>
    );
  }
