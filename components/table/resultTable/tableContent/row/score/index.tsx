import styles from "../../../../../../styles/score.module.css";
import { DoneLab } from "../../../../../../types";

interface ScoreProps {
  elem: DoneLab;
}

export const Score = (props: ScoreProps) => {
  const checkStatus = (elem: DoneLab) => {
    let color: string;
    switch (elem.status) {
      case 3:
        return;
      case 0:
        color = styles.done;
        break;
      case 1:
        color = styles.send;
        break;
      default:
        color = styles.return;
    }
    return (
      <div className={styles.score + ' ' + color}>
        <div className={styles.centerText}>
          <p className={styles.scoreNumber}>{elem.score}</p>
        </div>
      </div>
    );
  };

  return <div className={styles.scoreContainer}>
    {checkStatus(props.elem)}
  </div>;
};
