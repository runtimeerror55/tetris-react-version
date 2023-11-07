import { useEffect, useMemo, useState } from "react";
import styles from "./player.module.css";
import {} from "../../utilities/playerInputs";

const createGameBox = (
      currentTetromino,
      playerBoardMatrix,
      hardDropCoordinates,
      game
) => {
      console.log(playerBoardMatrix);
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
                                                styles[
                                                      "player-1-laser-beam-" + i
                                                ]
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
                                                            currentTetromino
                                                                  .colorClass
                                                      ];
                                          }
                                          if (playerBoardMatrix[i][j]) {
                                                className =
                                                      styles["column"] +
                                                      " " +
                                                      styles[
                                                            playerBoardMatrix[
                                                                  i
                                                            ][j]
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

      if (game.gameModes.modeTwo === 1) {
            if (timer === 60) {
                  game.speed = 20;
                  game.gameLoopWaitCount = 0;
            } else if (timer === 120) {
                  game.speed = 15;
                  game.gameLoopWaitCount = 0;
            }
      } else if (game.gameModes.modeTwo === 2 && timer === 120) {
            game.isGameOver = true;
            game.renderGameResult(true);
      }

      useEffect(() => {
            player.renderUi = setRender;
      });
      useEffect(() => {
            if (game.isGameStarted && !game.isGameOver) {
                  const timerId = setInterval(() => {
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
                  <div id={styles["game-info"]}>
                        <div
                              className={styles["info-item"]}
                              id={styles["time"]}
                        >
                              Timer: {timer} s
                        </div>
                        <div
                              className={styles["info-item"]}
                              id={styles["score"]}
                        >
                              Score: {player.stats.score}
                        </div>

                        <div
                              className={styles["info-item"]}
                              id={styles["single-shot"]}
                        >
                              1X blast: {player.stats.singleShots}
                        </div>
                        <div
                              className={styles["info-item"]}
                              id={styles["double-shot"]}
                        >
                              2X blast: {player.stats.doubleShots}
                        </div>
                        <div
                              className={styles["info-item"]}
                              id={styles["triple-shot"]}
                        >
                              3X blast: {player.stats.tripleShots}
                        </div>
                        {/* <button
                              className={styles["menu-item"]}
                              id={styles["pause-button"]}
                        >
                              Pause
                        </button> */}
                  </div>
                  <div className={styles["container"]}>
                        {createGameBox(
                              player.currentTetromino,
                              player.boardMatrix,
                              player.hardDropCoordinates,
                              game
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
            </>
      );
};
