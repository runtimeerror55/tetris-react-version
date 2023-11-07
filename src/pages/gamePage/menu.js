import { useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import { Settings } from "./settings";
import { GameModes } from "./gameModes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import { Howl } from "howler";
import clickSoundPath from "../../assets/sounds/click.mp3";
const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
const clickSound = new Howl({
      src: [clickSoundPath],
});
export const Menu = ({ setShowMenuOverlay, game, setShowGameStartTimer }) => {
      const [showSettingsOverLay, setShowSettingsOverLay] = useState(false);
      const [showGameModes, setShowGameModes] = useState(false);
      const [renderMenu, setRenderMenu] = useState({});

      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, []);
      const newGameButtonClickHandler = (event) => {
            game.reset();
            setShowMenuOverlay(false);
            setShowGameStartTimer(true);
      };

      const controlsClickHandler = () => {
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
      }, []);

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
                  <section
                        className={styles["menu-overlay-section"]}
                        onKeyDown={menuOverlayKeyDownHandler}
                  >
                        {!game.isGameStarted ? (
                              <div
                                    className={styles["option"]}
                                    tabIndex={0}
                                    onClick={newGameButtonClickHandler}
                              >
                                    NEW GAME
                              </div>
                        ) : null}

                        {game.isGameStarted && game.pause ? (
                              <div
                                    className={styles["option"]}
                                    tabIndex={0}
                                    onClick={resumeGameClickHandler}
                              >
                                    RESUME GAME
                              </div>
                        ) : null}

                        <div
                              className={styles["option"]}
                              onClick={controlsClickHandler}
                              tabIndex={0}
                        >
                              CONTROLS
                        </div>
                        <div className={styles["option"]} tabIndex={0}>
                              SOUNDS
                        </div>
                        <div
                              className={styles["option"]}
                              onClick={gameModesClickHandler}
                              tabIndex={0}
                        >
                              GAME MODES
                        </div>
                  </section>
                  {showSettingsOverLay ? (
                        <Settings
                              setShowSettingsOverLay={setShowSettingsOverLay}
                              game={game}
                        ></Settings>
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
