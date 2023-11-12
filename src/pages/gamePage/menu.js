import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import { ControlSettings } from "./settings";
import { GameModes } from "./gameModes/gameModes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import { Howl } from "howler";
import clickSoundPath from "../../assets/sounds/click.mp3";
import { themeContext } from "../../context/theme";
import { CardOne } from "../../components/cards/cardOne";

const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
const clickSound = new Howl({
      src: [clickSoundPath],
});
export const Menu = ({
      setShowMenuOverlay,
      game,
      setShowGameStartTimer,
      setShowBars,
}) => {
      const [showSettingsOverLay, setShowSettingsOverLay] = useState(false);
      const [showGameModes, setShowGameModes] = useState(false);
      const [renderMenu, setRenderMenu] = useState({});
      const { theme } = useContext(themeContext);

      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, []);
      const newGameButtonClickHandler = (event) => {
            game.reset();
            setShowMenuOverlay(false);
            setShowGameStartTimer(true);
      };

      const controlsClickHandler = async () => {
            setShowBars(true);
            await new Promise((resolve, reject) => {
                  setTimeout(() => {
                        resolve("yes");
                  }, 1400);
            });
            setShowSettingsOverLay(true);
      };

      const gameModesClickHandler = () => {
            setShowGameModes(true);
      };

      const resumeGameClickHandler = () => {
            if (game.isGameStarted) {
                  setShowMenuOverlay(false);
                  game.pause = false;
            }
      };
      const menuOverlayKeyDownHandler = (event) => {
            if (event.key === "ArrowDown") {
                  if (
                        focusableElements.index ===
                        focusableElements.elements.length - 1
                  ) {
                        focusableElements.index = 0;
                  } else {
                        focusableElements.index++;
                  }
                  navigationSound.play();
                  focusableElements.elements[focusableElements.index].focus();
            } else if (event.key === "ArrowUp") {
                  if (focusableElements.index === 0) {
                        return;
                  } else {
                        navigationSound.play();
                        focusableElements.index--;
                        focusableElements.elements[
                              focusableElements.index
                        ].focus();
                  }
            } else if (event.key === "Enter") {
                  clickSound.play();
                  focusableElements.elements[focusableElements.index].click();
            }
      };

      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='0']");
            focusableElements.elements[0].focus();
      }, [game.isGameStarted]);

      const gamepadLoop = () => {
            const joystick = game.joysticks[0];
            const gamepads = navigator.getGamepads();

            if (joystick) {
                  if (joystick.throttleCount < 10) {
                        joystick.throttleCount++;
                  }
                  const gamepad = gamepads[joystick.gamepad.index];
                  if (gamepad) {
                        gamepad.buttons.forEach((button, buttonIndex) => {
                              if (button.pressed) {
                                    if (
                                          joystick.previousPressedButtonIndex !==
                                          buttonIndex
                                    ) {
                                          menuOverlayKeyDownHandler({
                                                key: joystick
                                                      .navigationKeyBindings[
                                                      buttonIndex
                                                ],
                                          });
                                          joystick.previousPressedButtonIndex =
                                                buttonIndex;
                                          joystick.throttleCount = 0;
                                    } else if (joystick.throttleCount === 10) {
                                          menuOverlayKeyDownHandler({
                                                key: joystick
                                                      .navigationKeyBindings[
                                                      buttonIndex
                                                ],
                                          });
                                          joystick.throttleCount = 0;
                                    }
                              }
                        });
                  }
            }

            setRenderMenu({});
      };
      useEffect(() => {
            if (!showSettingsOverLay && !showGameModes) {
                  requestAnimationFrame(gamepadLoop);
            }
      }, [showSettingsOverLay, renderMenu, showGameModes]);

      return (
            <>
                  <CardOne
                        customClass={styles["menu-overlay-section"]}
                        keyDownHandler={menuOverlayKeyDownHandler}
                        customTag="section"
                  >
                        {!game.isGameStarted ? (
                              <div
                                    className={
                                          styles["option"] +
                                          " " +
                                          styles["option-" + theme]
                                    }
                                    tabIndex={0}
                                    onClick={newGameButtonClickHandler}
                              >
                                    NEW GAME
                              </div>
                        ) : null}

                        {game.isGameStarted && game.pause ? (
                              <div
                                    className={
                                          styles["option"] +
                                          " " +
                                          styles["option-" + theme]
                                    }
                                    tabIndex={0}
                                    onClick={resumeGameClickHandler}
                              >
                                    RESUME GAME
                              </div>
                        ) : null}

                        <div
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              onClick={controlsClickHandler}
                              tabIndex={0}
                        >
                              CONTROLS
                        </div>
                        <div
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={0}
                        >
                              SOUNDS
                        </div>
                        <div
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              onClick={gameModesClickHandler}
                              tabIndex={0}
                        >
                              GAME MODES
                        </div>
                  </CardOne>
                  {showSettingsOverLay ? (
                        <ControlSettings
                              setShowSettingsOverLay={setShowSettingsOverLay}
                              game={game}
                        ></ControlSettings>
                  ) : (
                        ""
                  )}

                  {showGameModes ? (
                        <GameModes
                              setShowGameModes={setShowGameModes}
                              game={game}
                        ></GameModes>
                  ) : null}
            </>
      );
};
