import { useRef, useMemo } from "react";
import styles from "./result.module.css";
import { useEffect } from "react";
import { CardOne } from "../../components/cards/cardOne";
import { Option } from "../../components/options/option";
import { PlayerResult } from "./playerResult";
import { navigationGamepadLoop } from "../../utilities/utilities";
import { CardsFlying } from "../../components/svg/cardsFlying";

export const GameResult = ({
      game,
      setShowGameStartTimer,
      setShowGameResult,
      setShowMenuOverlay,
      setShowGame,
}) => {
      const gamepadLoopState = useMemo(() => {
            return { run: true };
      }, []);
      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, []);
      const controllerSettingsOverlayKeyDownHandler = (event) => {
            if (event.key === "ArrowDown") {
                  if (
                        focusableElements.index ===
                        focusableElements.elements.length - 1
                  ) {
                        focusableElements.index = 0;
                  } else {
                        focusableElements.index++;
                  }
                  game.sounds.navigationSound.play();
                  focusableElements.elements[focusableElements.index].focus();
            } else if (event.key === "ArrowUp") {
                  if (focusableElements.index === 0) {
                        return;
                  } else {
                        game.sounds.navigationSound.play();
                        focusableElements.index--;
                        focusableElements.elements[
                              focusableElements.index
                        ].focus();
                  }
            } else if (event.key === "Enter") {
                  game.sounds.clickSound.play();
                  focusableElements.elements[focusableElements.index].click();
            }
      };
      const playAgainButtonClickHandler = () => {
            game.reset();
            gamepadLoopState.run = false;
            setShowGameStartTimer(true);
            setShowGameResult(false);
      };

      const goToMenuClickHandler = () => {
            game.reset();
            gamepadLoopState.run = false;
            setShowMenuOverlay(true);
            setShowGameResult(false);
            setShowGame(false);
      };
      useEffect(() => {
            if (gamepadLoopState.run) {
                  navigationGamepadLoop(
                        game,
                        controllerSettingsOverlayKeyDownHandler,
                        gamepadLoopState
                  );
            }
      }, []);

      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='4']");
            focusableElements.elements[0].focus();
      }, []);
      return (
            <section
                  className={
                        styles["game-result-section"] +
                        " " +
                        styles["page-animation"]
                  }
            >
                  <CardsFlying></CardsFlying>
                  <div className={styles["game-result-container"]}>
                        {game.players
                              .sort((a, b) => {
                                    return b.stats.score - a.stats.score;
                              })
                              .map((player, index) => {
                                    return (
                                          <PlayerResult
                                                player={player}
                                                index={index}
                                          ></PlayerResult>
                                    );
                              })}
                  </div>

                  <CardOne>
                        <Option
                              attributes={{
                                    onClick: playAgainButtonClickHandler,
                                    tabIndex: 4,
                              }}
                              customClass={styles["play-again-button"]}
                        >
                              Play Again
                        </Option>
                        <Option
                              attributes={{
                                    onClick: goToMenuClickHandler,
                                    tabIndex: 4,
                              }}
                              customClass={styles["play-again-button"]}
                        >
                              MENU
                        </Option>
                  </CardOne>
            </section>
      );
};
