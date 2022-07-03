import { DoneLab } from "../types";
import styles from "../styles/score.module.css";

interface ScoreProps {
  done: DoneLab;
}

export const Score = (props: ScoreProps) => {
  const chooseStyle = () => {
    switch (props.done.status) {
      case 0:
        return styles.done;
      case 1:
        return styles.needCheck;
      case 2:
        return styles.remake;
    }
  };

  return (
    <div className={`${styles.markContainer} ${chooseStyle()}`}>
      <div className={styles.markScore}>{props.done.score}</div>
    </div>
  );
};
