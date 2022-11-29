import styles from "./score.module.css";
import { Lab } from "../../../../../../types";

interface ScoreProps {
  lab: Lab | undefined;
}

export const Score = (props: ScoreProps) => {
  const checkStatus = (elem: Lab | undefined) => {
    let color: string;
    if (props.lab) {
      switch (props.lab.status) {
        case "Принята":
          color = styles.done;
          break;
        case "Сдана на проверку":
          color = styles.send;
          break;
        default:
          color = styles.return;
      }
    }
    else return
    return (
      <div className={styles.score + ' ' + color}>
        <div className={styles.centerText}>
          <p className={styles.scoreNumber}>{props.lab.score}</p>
        </div>
      </div>
    );
  };

  return <div className={styles.scoreContainer}>
    {checkStatus(props.lab)}
  </div>;
};
