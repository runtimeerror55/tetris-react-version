import { useState } from "react";
import styles from "./scoreAnimation.module.css";
export const ScoreAnimation = ({ player, game }) => {
      const [showScoreAdded, setShowScoreAdded] = useState(false);
      const [showDelecious, setShowDelicious] = useState(false);
      const [showTimeLeft, setShowTimeLeft] = useState(false);
      const [showSpeedIncrease, setShowSpeedIncrease] = useState(false);

      if (player.destroyInAction) {
            if (!showScoreAdded) {
                  setShowScoreAdded(true);
            }
            if (!showDelecious) {
                  console.log(player.numberOfDestroyedRows);
                  if (player.numberOfDestroyedRows >= 3) {
                        setShowDelicious(true);
                        game.sounds.deliciousSound.play();
                  }
            }
      }

      if (game.gameModes.modeTwo === 2) {
            if (
                  game.timeLimit - player.time === 60 ||
                  game.timeLimit - player.time === 10
            ) {
                  if (!showTimeLeft) {
                        setShowTimeLeft(true);
                  }
            }
      }

      if (game.gameModes.modeTwo === 1) {
            if (player.time === 240 || player.time === 480) {
                  if (!showSpeedIncrease) {
                        setShowSpeedIncrease(true);
                  }
            }
      }
      return (
            <section className={styles["score-animation-section"]}>
                  {showScoreAdded ? (
                        <h3
                              className={styles["score-update-animation"]}
                              onAnimationEnd={() => {
                                    setShowScoreAdded(false);
                              }}
                        >
                              {player.numberOfDestroyedRows *
                                    100 *
                                    player.numberOfDestroyedRows}
                        </h3>
                  ) : null}

                  {showDelecious ? (
                        <h3
                              className={styles["score-update-animation"]}
                              onAnimationEnd={() => {
                                    setShowDelicious(false);
                              }}
                        >
                              Delicious
                        </h3>
                  ) : null}

                  {showTimeLeft ? (
                        <h3
                              className={styles["score-update-animation"]}
                              onAnimationEnd={() => {
                                    setShowTimeLeft(false);
                              }}
                        >
                              {game.timeLimit - player.time}s left
                        </h3>
                  ) : null}

                  {showSpeedIncrease ? (
                        <h3
                              className={styles["score-update-animation"]}
                              onAnimationEnd={() => {
                                    setShowSpeedIncrease(false);
                              }}
                        >
                              speed increase:{" "}
                              {player.time === 240
                                    ? "1.5x"
                                    : player.time === 480
                                    ? "2x"
                                    : null}
                        </h3>
                  ) : null}
            </section>
      );
};
