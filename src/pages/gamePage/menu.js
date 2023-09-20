import { useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import { Settings } from "./settings";
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
      const [showSettingsOveryLay, setShowSettingsOverLay] = useState(false);
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
                                          console.log(buttonIndex);
                                    } else if (joystick.throttleCount === 10) {
                                          menuOverlayKeyDownHandler({
                                                key: joystick
                                                      .navigationKeyBindings[
                                                      buttonIndex
                                                ],
                                          });
                                          joystick.throttleCount = 0;
                                          console.log(buttonIndex);
                                    }
                              }
                        });
                  }
            }

            setRenderMenu({});
      };
      useEffect(() => {
            if (!showSettingsOveryLay) {
                  requestAnimationFrame(gamepadLoop);
            }
      }, [showSettingsOveryLay, renderMenu]);
      return (
            <>
                  <section
                        className={styles["menu-overlay-section"]}
                        onKeyDown={menuOverlayKeyDownHandler}
                  >
                        <button
                              onClick={newGameButtonClickHandler}
                              className={styles["menu-overlay-close-button"]}
                              tabIndex={-1}
                        >
                              <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <div
                              className={styles["option"]}
                              tabIndex={0}
                              onClick={newGameButtonClickHandler}
                        >
                              NEW GAME
                        </div>
                        <div className={styles["option"]} tabIndex={0}>
                              RESUME GAME
                        </div>
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
                  </section>
                  {showSettingsOveryLay ? (
                        <Settings
                              setShowSettingsOverLay={setShowSettingsOverLay}
                              game={game}
                        ></Settings>
                  ) : (
                        ""
                  )}
            </>
      );
};
