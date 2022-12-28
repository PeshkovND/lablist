import styles from "./table.module.css";
import { ResultTable } from "./resultTable";
import { History } from "./history";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { ShewhartMap } from "./ShewhartMap";
import { Loading } from "../Loading";

export const Table = () => {
  const [step, setStep] = useState(0)
  const [modalActive, setModalActive] = useState(false);
  const journal = useAppSelector((state) => state.journal.journal);
  const JournalLoading = useAppSelector((state) => state.journal.loading);
  const UsersLoading = useAppSelector((state) => state.users.loading);
  const LabsLoading = useAppSelector((state) => state.labs.loading);

  const loading = JournalLoading || UsersLoading || LabsLoading;

  const checkArrow = (step: number, maxStep: number, arrow: boolean): { grayscale: number, opacity: number } => {
    if (arrow === false) {
      if (step <= 0 || maxStep <= 0) {
        return { grayscale: 100, opacity: 0.7 }
      }
      return { grayscale: 0, opacity: 1 }
    }
    if (step >= maxStep || maxStep <= 0) {
      return { grayscale: 100, opacity: 0.7 }
    }
    return { grayscale: 0, opacity: 1 }

  }
  const drawTable = () => {
    if (loading) { console.log('loading'); return <Loading /> }
    if (journal) {

      const handleClick = (step: number, dirrection: number) => {
        if ((step >= maxStep && dirrection === 1) || (step <= 0 && dirrection === -1)) {
          return
        }
        else {
          const newStep = step + dirrection;
          setStep(newStep)
        }
      }
      const maxStep = journal ? journal.labs.length - 10 : 1;
      const leftArrow = checkArrow(step, maxStep, false);
      const rightArrow = checkArrow(step, maxStep, true);
      return (<div className={styles.table}>
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
                  style={{ transform: 'rotate(180deg)', filter: `grayscale(${leftArrow.grayscale}%)`, opacity: leftArrow.opacity }}
                />
              </div>
              <div className={styles.arrow} onClick={() => handleClick(step, 1)}>
                <img
                  src={'/arrow.svg'}
                  alt=""
                  width={'100%'}
                  style={{ filter: `grayscale(${rightArrow.grayscale}%)`, opacity: rightArrow.opacity }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.mapButton} onClick={() => setModalActive(true)}>Статистика</button>
        </div>
        <ResultTable step={step} />
        <History />
        <ShewhartMap active={modalActive} setActive={setModalActive} />
      </div>)
    }
  }
  return (
    <div className={styles.tableContainer}>
      {drawTable()}
    </div>
  );
}
