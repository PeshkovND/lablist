import { useEffect, useState } from "react";
import { labs } from "../../../../data";
import styles from "../../../../styles/tableHeader.module.css";

export const TableHeader = () => {
  const [lrData, setLrRow] = useState(labs);
  useEffect(() => setLrRow(labs), []);

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

  const parseLabs = () => {
    return lrData.map((elem) => {
      return (
        <div className={styles.labContainer} key={elem.id}>
          <p className={styles.labNumber}>№{elem.number}</p>
          <p className={styles.labDeadline}>{'Срок ' + dateMaker(elem.deadline)}</p>
        </div>
      );
    });
  };

  return <div className={styles.headerContainer}>{parseLabs()}</div>;
};
