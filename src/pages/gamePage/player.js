import { useContext, useEffect, useState } from "react";
import styles from "./player.module.css";
import { themeContext } from "../../context/theme";
import { ScoreAnimation } from "./scoreAnimation";
const createGameBox = (
      currentTetromino,
      playerBoardMatrix,
      hardDropCoordinates,
      game,
      theme,
      playerNumber
) => {
      const arrayOne = new Array(game.boardRows).fill(0);
      const arrayTwo = new Array(game.boardColumns).fill(0);

      return (
            <>
                  {arrayOne.map((Element, i) => {
                        return (
                              <div
                                    className={styles["row"]}
                                    id={styles["player-1-row-" + i]}
                                    key={i}
                              >
                                    <span
                                          className={styles["laser-beam"]}
                                          id={
                                                `player-${playerNumber}-laser-beam-` +
                                                i
                                          }
                                    ></span>
                                    {arrayTwo.map((element, j) => {
                                          let className = styles["column"];
                                          const isCoordinatePresent =
                                                currentTetromino.allCoordinates.some(
                                                      (coordinates) => {
                                                            return (
                                                                  i ===
                                                                        coordinates[0] &&
                                                                  j ===
                                                                        coordinates[1]
                                                            );
                                                      }
                                                );
                                          if (isCoordinatePresent) {
                                                className =
                                                      className +
                                                      " " +
                                                      styles[
                                                            currentTetromino.colorClass +
                                                                  "-" +
                                                                  theme
                                                      ];
                                          }
                                          if (playerBoardMatrix[i][j]) {
                                                className =
                                                      styles["column"] +
                                                      " " +
                                                      styles[
                                                            playerBoardMatrix[
                                                                  i
                                                            ][j] +
                                                                  "-" +
                                                                  theme
                                                      ];
                                          }

                                          let isHardDropCoordinatePresent =
                                                hardDropCoordinates?.allCoordinates.some(
                                                      (coordinates) => {
                                                            return (
                                                                  i ===
                                                                        coordinates[0] &&
                                                                  j ===
                                                                        coordinates[1]
                                                            );
                                                      }
                                                );

                                          if (isHardDropCoordinatePresent) {
                                                className =
                                                      className +
                                                      " " +
                                                      styles[
                                                            "hard-drop-active"
                                                      ];
                                          }

                                          return (
                                                <div
                                                      className={className}
                                                      id={
                                                            styles[
                                                                  "player-1-column-" +
                                                                        j
                                                            ]
                                                      }
                                                      key={i + j}
                                                ></div>
                                          );
                                    })}
                              </div>
                        );
                  })}
            </>
      );
};

export const PlayerJsx = ({ player, game }) => {
      const setRender = useState({})[1];
      const [timer, setTimer] = useState(0);
      const { theme } = useContext(themeContext);
      if (game.gameModes.modeTwo === 1) {
            if (player.time === 240) {
                  player.currentSpeed = 20;
                  player.frameCounter = 0;
            } else if (player.time === 480) {
                  player.currentSpeed = 15;
                  player.frameCounter = 0;
            }
      }

      useEffect(() => {
            player.renderUi = setRender;
      });
      useEffect(() => {
            if (game.isGameStarted && !game.isGameOver) {
                  const timerId = setInterval(() => {
                        player.time++;
                        setTimer((previous) => {
                              return previous + 1;
                        });
                  }, 1000);
                  return () => {
                        setTimer(0);
                        clearInterval(timerId);
                  };
            }
      }, [game.isGameStarted, game.isGameOver]);

      return (
            <>
                  <section
                        className={
                              styles["player-section"] +
                              " " +
                              (player.destroyInAction ? styles["shaking"] : "")
                        }
                  >
                        <div
                              className={
                                    styles["game-info"] +
                                    " " +
                                    styles["game-info-" + theme]
                              }
                        >
                              <div
                                    className={
                                          styles["info-item"] +
                                          " " +
                                          styles["info-item-" + theme]
                                    }
                                    id={styles["time"]}
                              >
                                    Timer: {timer} s
                              </div>
                              <div
                                    className={
                                          styles["info-item"] +
                                          " " +
                                          styles["info-item-" + theme]
                                    }
                                    id={styles["score"]}
                              >
                                    <div
                                          className={
                                                player.destroyInAction
                                                      ? styles[
                                                              "score-update-animation"
                                                        ]
                                                      : null
                                          }
                                    >
                                          Score: {player.stats.score}
                                    </div>
                              </div>

                              <div
                                    className={
                                          styles["info-item"] +
                                          " " +
                                          styles["info-item-" + theme]
                                    }
                                    id={styles["life-saver"]}
                              >
                                    life saver: {player.lifeSaverCount}
                              </div>

                              <div
                                    className={
                                          styles["info-item"] +
                                          " " +
                                          styles["info-item-" + theme]
                                    }
                                    id={styles["single-shot"]}
                              >
                                    1X blast: {player.stats.singleShots}
                              </div>
                              <div
                                    className={
                                          styles["info-item"] +
                                          " " +
                                          styles["info-item-" + theme]
                                    }
                                    id={styles["double-shot"]}
                              >
                                    2X blast: {player.stats.doubleShots}
                              </div>
                              <div
                                    className={
                                          styles["info-item"] +
                                          " " +
                                          styles["info-item-" + theme]
                                    }
                                    id={styles["triple-shot"]}
                              >
                                    3X blast: {player.stats.tripleShots}
                              </div>
                        </div>
                        <div
                              className={
                                    styles["container"] +
                                    " " +
                                    styles["container-" + theme]
                              }
                        >
                              <ScoreAnimation
                                    player={player}
                                    game={game}
                              ></ScoreAnimation>

                              {createGameBox(
                                    player.currentTetromino,
                                    player.boardMatrix,
                                    player.hardDropCoordinates,
                                    game,
                                    theme,
                                    player.number
                              )}

                              <div className={styles["menu"]}>
                                    <button
                                          className={styles["menu-item"]}
                                          id={styles["play-button"]}
                                    >
                                          Play
                                    </button>
                              </div>
                        </div>
                  </section>
            </>
      );
};
