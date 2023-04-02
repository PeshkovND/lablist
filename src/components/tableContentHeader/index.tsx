import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateLabFilter } from "../../store/filterStore";
import { Journal, JournalLab } from "../../types";
import styles from "./tableContentHeader.module.css"


interface HeaderProps {
  step: number;
}

export const TableContentHeader = (props: HeaderProps) => {
  const journal = useAppSelector((state) => state.journal.journal) as Journal;
  const lastDeadline = useAppSelector((state) => state.journal.lastDeadline);
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch()

  const labData = [...journal.labs].sort((a, b) => a.num > b.num ? 1 : -1);

  const dateMaker = (date: string) => {
    const strDay: string = date.substring(8, 10);

    const strMonth: string = date.substring(5, 7);

    return strDay + "." + strMonth;
  };

  const renderDeadline = (deadline: string | undefined) => {
    if (deadline) {
      return <p className={styles.labDeadline}>{'Срок ' + dateMaker(deadline)}</p>
    }
  }

  const checkDeadline = (lab: JournalLab) => {
    if (lastDeadline && lab.deadline) {
      if (lab.num === lastDeadline.num) {
        return styles.lastdeadline
      }
    }
  }

  const checkFilter = (labNum: number) => {
    if (filter.labFilter) {
      if (labNum === filter.labFilter) {
        return styles.labContainer + " " + styles.selected
      }
      return styles.labContainer + " " + styles.notSelected
    }
    return styles.labContainer
  }

  const parseLabs = () => {
    return labData.map((elem) => {
      return (
        <div className={styles.deadlineContainer + " " + checkDeadline(elem)} key={elem.num}>
          <div className={checkFilter(elem.num)} onClick={(e) => { dispatch(updateLabFilter(elem.num)) }} >
            <p className={styles.labNumber}>№{elem.num}</p>
            {renderDeadline(elem.deadline)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.headerWindow}><div className={styles.headerContainer} style={{
      transform: `translate(calc(${props.step}*-10%))`
    }}>{parseLabs()}</div>
    </div>)
}
