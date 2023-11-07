import { useEffect, useState } from "react";
import styles from "./playerResult.module.css";

export const PlayerResult = ({ player }) => {
      const [score, setScore] = useState(0);
      const statsLoop = () => {
            if (score + 20 > player.stats.score) {
                  setScore(player.stats.score);
            } else {
                  setScore((previous) => {
                        return previous + 20;
                  });
            }
      };

      useEffect(() => {
            requestAnimationFrame(statsLoop);
      }, [score]);
      return (
            <div className={styles["player-result"]}>
                  <div className={styles["player-number"]}>
                        PLAYER {player.number}
                  </div>
                  <div
                        className={
                              styles["player-score"] +
                              " " +
                              styles["player-stat"]
                        }
                  >
                        <div>SCore:</div>
                        <div>{score}</div>
                  </div>
                  <div className={styles["player-stat"]}>
                        <div>1x shots:</div>
                        <div>{player.stats.singleShots}</div>
                  </div>
                  <div className={styles["player-stat"]}>
                        <div>2x shots:</div>
                        <div>{player.stats.doubleShots}</div>
                  </div>
                  <div className={styles["player-stat"]}>
                        <div>3x shots:</div>
                        <div>{player.stats.tripleShots}</div>
                  </div>
            </div>
      );
};
