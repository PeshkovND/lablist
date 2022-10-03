import styles from "./historyElem.module.css";
import { HistoryType } from "../../../../types";

interface HistoryElemProps {
  elem: HistoryType;
}

export const HistoryElem = (props: HistoryElemProps) => {
  const dateMaker = (date: Date) => {
    const day: number = date.getDate();
    let strDay: string = String(day);
    if (day < 10) {
      strDay = "0" + strDay;
    }

    const month: number = date.getMonth();
    let strMonth: string = String(month);
    if (month < 10) {
      strMonth = "0" + strMonth;
    }

    const strYear: string = String(date.getFullYear());

    return strDay + "." + strMonth + "." + strYear;
  };

  const parseStatus = (status: number) => {
    switch (status) {
      case 0:
        return { style: styles.done, str: "Принята" };
      case 1:
        return { style: styles.send, str: "Сдана на проверку" };
      default:
        return { style: styles.remake, str: "Возвращена на доработку" };
    }
  };

  const status = parseStatus(props.elem.status);
  const color = status.style;
  const text = status.str;

  return (
    <div className={styles.historyElemContainer}>
      <div className={styles.dateContainer}>
        <div className={styles.boxStatus + " " + color}></div>
        <p className={styles.date + " " + color}>
          {dateMaker(props.elem.date)}
        </p>
      </div>
      <p className={styles.text + " " + styles.name}>
        {props.elem.studentName}
      </p>
      <p className={styles.text + " " + styles.labName}>{props.elem.labName}</p>
      <p className={styles.text + " " + styles.status}> Статус: <span className={styles.text + " " + color}>{text}</span></p>
      
    </div>
  );
};
