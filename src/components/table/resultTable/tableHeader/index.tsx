import { useAppSelector } from "../../../../hooks";
import styles from "./tableHeader.module.css";

interface HeaderProps {
  step: number;
}

export const TableHeader = (props: HeaderProps) => {
  const journal = useAppSelector((state) => state.journal.journal);

  if (journal) {

    const labData = [...journal.labs].sort((a, b) => a.num > b.num ? 1 : -1);

    const dateMaker = (date: string) => {
      const strDay: string = date.substring(8, 10);

      const strMonth: string = date.substring(5, 7);

      return strDay + "." + strMonth;
    };

    const checkdeadline = (deadline: string | undefined) => {
      if (deadline) {
        return <p className={styles.labDeadline}>{'Срок ' + dateMaker(deadline)}</p>
      }
    }

    const parseLabs = () => {
      return labData.map((elem) => {
        return (
          <div className={styles.labContainer} key={elem.num}>
            <p className={styles.labNumber}>№{elem.num}</p>
            {checkdeadline(elem.deadline)}
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
  return <div></div>;
}
