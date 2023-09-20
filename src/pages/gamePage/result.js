import { useState } from "react";
import styles from "./result.module.css";
import { useEffect } from "react";

import { PlayerResult } from "./playerResult";
export const GameResult = ({
      game,
      setShowGameStartTimer,
      setShowGameResult,
}) => {
      const playAgainButtonClickHandler = () => {
            setShowGameStartTimer(true);
            setShowGameResult(false);
      };
      return (
            <section className={styles["game-result-section"]}>
                  <div className={styles["game-result-container"]}>
                        {game.players.map((player) => {
                              console.log(player);
                              return (
                                    <PlayerResult
                                          player={player}
                                    ></PlayerResult>
                              );
                        })}
                  </div>
                  <button
                        className={styles["play-again-button"]}
                        onClick={playAgainButtonClickHandler}
                  >
                        Play Again
                  </button>
            </section>
      );
};
