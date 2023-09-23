import styles from "./gamePadSettings.module.css";
import gamePadImage from "../../assets/images/pngwing.com.png";
import { useEffect, useState, useContext, useMemo } from "react";
import { toast } from "react-toastify";
import { Form } from "react-router-dom";
import { Controller } from "./controller";
import { Howl } from "howler";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import clickSoundPath from "../../assets/sounds/click.mp3";
import { KeyBoard } from "./keyBoard/keyBoard";
const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
const clickSound = new Howl({
      src: [clickSoundPath],
});

export const GamePadSettings = ({ game, setShowSettingsOverLay }) => {
      const [startGamePadLoop, setStartGamePadLoop] = useState(true);
      const gamepadLoopState = useMemo(() => {
            return { run: true };
      }, []);
      const focusableElements = useMemo(() => {
            return { elements: null, index: -1 };
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
                  navigationSound.play();
                  focusableElements.elements[focusableElements.index].focus();
            } else if (event.key === "ArrowUp") {
                  if (
                        focusableElements.index === 0 ||
                        focusableElements.index === -1
                  ) {
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
            } else if (event.key === "Back") {
                  clickSound.play();
                  setShowSettingsOverLay(false);
            }
      };
      const gamepadLoop = () => {
            const joystick = game.joysticks[0];
            const gamepads = navigator.getGamepads();
            let shouldExit = false;

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
                                          if (buttonIndex === 1) {
                                                shouldExit = true;
                                          }
                                          controllerSettingsOverlayKeyDownHandler(
                                                {
                                                      key: joystick
                                                            .navigationKeyBindings[
                                                            buttonIndex
                                                      ],
                                                }
                                          );
                                          joystick.previousPressedButtonIndex =
                                                buttonIndex;
                                          joystick.throttleCount = 0;
                                          console.log(buttonIndex);
                                    } else if (joystick.throttleCount === 10) {
                                          if (buttonIndex === 1) {
                                                shouldExit = true;
                                          }
                                          controllerSettingsOverlayKeyDownHandler(
                                                {
                                                      key: joystick
                                                            .navigationKeyBindings[
                                                            buttonIndex
                                                      ],
                                                }
                                          );
                                          joystick.throttleCount = 0;
                                          console.log(buttonIndex);
                                    }
                              }
                        });
                  }
            }
            if (shouldExit || !gamepadLoopState.run) {
                  return;
            }

            requestAnimationFrame(gamepadLoop);
      };
      useEffect(() => {
            if (gamepadLoopState.run) {
                  gamepadLoop();
            }
      }, [startGamePadLoop]);

      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='2']");
      });

      return (
            <>
                  <h1 className={styles["controller-settings-heading"]}>
                        Controller settings
                  </h1>
                  <div className={styles["connected-controllers"]}>
                        {game.joysticks.map((joystick, index) => {
                              if (joystick) {
                                    return (
                                          <Controller
                                                key={index}
                                                joystickIndex={index}
                                                previousGamepadLoop={{
                                                      gamepadLoopState,
                                                      setStartGamePadLoop,
                                                }}
                                                joystick={joystick}
                                                game={game}
                                          ></Controller>
                                    );
                              }
                        })}
                        <KeyBoard
                              previousGamepadLoop={{
                                    gamepadLoopState,
                                    setStartGamePadLoop,
                              }}
                              playerNumber="0"
                              game={game}
                        ></KeyBoard>
                        <KeyBoard
                              previousGamepadLoop={{
                                    gamepadLoopState,
                                    setStartGamePadLoop,
                              }}
                              playerNumber="1"
                              game={game}
                        ></KeyBoard>
                  </div>
            </>
      );
};
