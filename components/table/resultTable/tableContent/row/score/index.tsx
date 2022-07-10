import styles from "../../../../../../styles/score.module.css";
import { DoneLab } from "../../../../../../types";

interface ScoreProps {
    elem: DoneLab;
  }

export const Score = (props: ScoreProps) => {
  return <div className={styles.scoreContainer}>
    <div className={styles.score}>
      <div className={styles.centerText}>
        <p className={styles.scoreNumber}>{props.elem.score}</p>
      </div>
    </div>
  </div>;
};