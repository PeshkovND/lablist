import { useEffect, useState } from "react";
import { Journal } from "../../../../types";
import styles from "./tableHeader.module.css";

interface HeaderProps {
  step: number;
  journal: Journal
}

export const TableHeader = (props: HeaderProps) => {
  const [labData, setLabData] = useState(props.journal.labs.sort((a, b) => a.num > b.num ? 1 : -1));
  useEffect(() => setLabData(props.journal.labs), [props.journal.labs]);

  const dateMaker = (date: Date) => {
    const day: number = date.getDate();
    let strDay: string = String(day);
    if (day < 10) {
      strDay = "0" + strDay;
    }

    const month: number = date.getMonth() + 1;
    let strMonth: string = String(month);
    if (month < 10) {
      strMonth = "0" + strMonth;
    }

    return strDay + "." + strMonth + ".";
  };

  const checkdeadline = (deadline: Date | undefined) => {
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
};
