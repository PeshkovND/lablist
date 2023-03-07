import styles from "./historyElem.module.css";
import { HistoryType, User } from "../../../../types";
import { useAppSelector } from "../../../../hooks";

interface HistoryElemProps {
  elem: HistoryType;
}

export const HistoryElem = (props: HistoryElemProps) => {
  const dateMaker = (date: string) => {
    const strDay: string = date.substring(8, 10);

    const strMonth: string = date.substring(5, 7);

    const strYear: string = date.substring(0, 4);

    return strDay + "." + strMonth + "." + strYear;
  };

  const user = useAppSelector((state) => state.users.users.find(e => e._id === props.elem.userId)) as User;

  console.log(typeof(props.elem.date))
  const parseStatus = (status: string | undefined) => {
    switch (status) {
      case "Принята":
        return styles.done;
      case "Сдана на проверку":
        return styles.send;
      case "Возвращена на доработку":
        return styles.remake;
      case undefined:
        return styles.blue;
    }
  };

  const checkStatus = (status: string | undefined) => {
    if (status){
      return <p className={styles.text + " " + styles.status}> Статус: <span className={styles.text + " " + statusStyle}>{status}</span></p>
    }
  }

  const statusStyle = parseStatus(props.elem.status);

  return (
    <div className={styles.historyElemContainer}>
      <div className={styles.dateContainer}>
        <div className={styles.boxStatus + " " + statusStyle}></div>
        <p className={styles.date + " " + statusStyle}>
          {dateMaker(props.elem.date)}
        </p>
      </div>
      <p className={styles.text + " " + styles.name}>
        {user.name + " " + user.surname}
      </p>
      <p className={styles.text + " " + styles.labName}>{props.elem.text}</p>
      {checkStatus(props.elem.status)}
    </div>
  );
};
