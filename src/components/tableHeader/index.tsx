import { useState } from 'react';
import styles from './tableHeader.module.css'
import { ShewhartMap } from '../shewhartMap';
import { useAppSelector } from '../../hooks';

interface tableHeaderProps {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
}

export const TableHeader = (props: tableHeaderProps) => {
    const [modalActive, setModalActive] = useState(false);
    const journal = useAppSelector((state) => state.journal.journal);

    const checkShewartMap = ()=> {
        if(modalActive) {
          return <ShewhartMap setActive={setModalActive} />
        }
      }

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

    const handleClick = (step: number, dirrection: number) => {
        if ((step >= maxStep && dirrection === 1) || (step <= 0 && dirrection === -1)) {
          return
        }
        else {
          const newStep = step + dirrection;
          props.setStep(newStep)
        }
      }
      const maxStep = journal ? journal.labs.length - 10 : 1;
      const leftArrow = checkArrow(props.step, maxStep, false);
      const rightArrow = checkArrow(props.step, maxStep, true);

    return (
        <>
        <div className={styles.tableNavContainer}>
          <p className={styles.tableNavText}>Студенты:</p>
          <div className={styles.tableSliderControlContainer}>
            <p className={styles.tableNavText}>Выполнение работ:</p>
            <div className={styles.arrowsContainer}>
              <div className={styles.arrow} onClick={() => handleClick(props.step, -1)}>
                <img
                  src={'/arrow.svg'}
                  alt=""
                  width={'100%'}
                  style={{ transform: 'rotate(180deg)', filter: `grayscale(${leftArrow.grayscale}%)`, opacity: leftArrow.opacity }}
                />
              </div>
              <div className={styles.arrow} onClick={() => handleClick(props.step, 1)}>
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
        {checkShewartMap()}
        </>
    )
}