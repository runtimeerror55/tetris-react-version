import { useEffect, useState, useMemo, useContext } from "react";
import styles from "./skins.module.css";
import { GoBackButton } from "../../../components/navBar/buttons/goBack";
import { CardOne } from "../../../components/cards/cardOne";
import { navigationGamepadLoop } from "../../../utilities/utilities";
import { themeContext } from "../../../context/theme";
export const Skins = ({ setShowSkins, game }) => {
      const gameModesCloseButtonClickHandler = () => {
            setShowSkins(false);
      };
      const { theme, setTheme } = useContext(themeContext);

      const [startGamePadLoop, setStartGamePadLoop] = useState(true);
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
                  if (
                        focusableElements.index === 0 ||
                        focusableElements.index === -1
                  ) {
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
            } else if (event.key === "Back") {
                  game.sounds.clickSound.play();
                  gamepadLoopState.run = false;
                  setShowSkins(false);
            }
      };

      const optionsClickHandler = (event) => {
            event.stopPropagation();
            const value = event.target.getAttribute("data-theme");
            setTheme(value);
      };
      useEffect(() => {
            if (gamepadLoopState.run) {
                  navigationGamepadLoop(
                        game,
                        controllerSettingsOverlayKeyDownHandler,
                        gamepadLoopState
                  );
            }
      }, [startGamePadLoop]);

      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='3']");
      }, []);

      useEffect(() => {
            focusableElements.elements[focusableElements.index]?.focus();
      }, [gamepadLoopState.run]);

      return (
            <CardOne
                  customClass={styles["game-modes-section"]}
                  customTag="section"
            >
                  <GoBackButton
                        onClickHandler={gameModesCloseButtonClickHandler}
                  ></GoBackButton>
                  <div className={styles["game-modes"]}>
                        <h1 className={styles["game-modes-heading"]}>Skins</h1>
                        <div
                              className={styles["setting-container"]}
                              onClick={optionsClickHandler}
                        >
                              <div
                                    tabIndex={3}
                                    className={
                                          styles["option"] + " " + styles["red"]
                                    }
                                    data-theme="theme-0"
                              >
                                    Red
                              </div>
                              <div
                                    tabIndex={3}
                                    className={
                                          styles["option"] +
                                          " " +
                                          styles["green"]
                                    }
                                    data-theme="theme-1"
                              >
                                    Green
                              </div>
                              <div
                                    tabIndex={3}
                                    className={
                                          styles["option"] +
                                          " " +
                                          styles["violet"]
                                    }
                                    data-theme="theme-2"
                              >
                                    Violet
                              </div>
                              <div
                                    tabIndex={3}
                                    className={
                                          styles["option"] +
                                          " " +
                                          styles["yellow"]
                                    }
                                    data-theme="theme-3"
                              >
                                    Yellow
                              </div>
                        </div>
                  </div>
            </CardOne>
      );
};
