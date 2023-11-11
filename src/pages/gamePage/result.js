import { useRef, useState } from "react";
import styles from "./result.module.css";
import { useEffect } from "react";

import { PlayerResult } from "./playerResult";
export const GameResult = ({
      game,
      setShowGameStartTimer,
      setShowGameResult,
}) => {
      const playAgainButtonClickHandler = () => {
            game.reset();
            setShowGameStartTimer(true);
            setShowGameResult(false);
      };
      const playAgainRef = useRef();
      const playAgainButtonKeyDownHandler = (event) => {
            if (event.key === "Enter") {
                  event.target.click();
            }
      };

      useEffect(() => {
            playAgainRef.current.focus();
      });
      return (
            <section className={styles["game-result-section"]}>
                  <div className={styles["game-result-container"]}>
                        {game.playersStandings.map((player, index) => {
                              return (
                                    <PlayerResult
                                          player={player}
                                          index={index}
                                    ></PlayerResult>
                              );
                        })}
                  </div>
                  <button
                        ref={playAgainRef}
                        className={styles["play-again-button"]}
                        onClick={playAgainButtonClickHandler}
                        onKeyDown={playAgainButtonKeyDownHandler}
                  >
                        Play Again
                  </button>
            </section>
      );
};
