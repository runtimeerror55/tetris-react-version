import { useEffect, useMemo, useState } from "react";
import styles from "./player.module.css";
import {
      moveDown,
      moveRight,
      createPlayerBoardMatrix,
      isPossibleToMove,
      updateplayerBoardMatrix,
      moveLeft,
      isRotationPossible,
} from "../../utilities/playerInputs";

const createGameBox = (currentTetromino, playerBoardMatrix) => {
      const arrayOne = new Array(22).fill(0);
      const arrayTwo = new Array(15).fill(0);

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

export const PlayerJsx = ({ player }) => {
      const setRender = useState({})[1];

      useEffect(() => {
            player.renderUi = setRender;
      }, []);

      return (
            <>
                  <div id={styles["game-info"]}>
                        <div
                              className={styles["info-item"]}
                              id={styles["score"]}
                        >
                              Score: 0
                        </div>

                        <div
                              className={styles["info-item"]}
                              id={styles["single-shot"]}
                        >
                              1X blast: 0
                        </div>
                        <div
                              className={styles["info-item"]}
                              id={styles["double-shot"]}
                        >
                              2X blast: 0
                        </div>
                        <div
                              className={styles["info-item"]}
                              id={styles["triple-shot"]}
                        >
                              3X blast: 0
                        </div>
                        <button
                              className={styles["menu-item"]}
                              id={styles["pause-button"]}
                        >
                              Pause
                        </button>
                  </div>
                  <div className={styles["container"]} tabIndex={0}>
                        {createGameBox(
                              player.currentTetromino,
                              player.boardMatrix
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
