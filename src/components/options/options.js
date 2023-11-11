import styles from "./options.module.css";
import { useState, useEffect, useMemo, useContext } from "react";
import { themeContext } from "../../context/theme";
export const Options = ({
      game,
      setShowOptions,
      previousGamepadLoop,
      clickHandler,
      attributes,
      children,
}) => {
      const focusableElements = useMemo(() => {
            return { elements: null, index: -1 };
      }, []);
      const currentGamePadLoopState = useMemo(() => {
            return {
                  run: true,
            };
      }, []);
      const { theme } = useContext(themeContext);

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
                  focusableElements.elements[focusableElements.index].click();
            } else if (event.key === "Back") {
                  game.sounds.clickSound.play();
                  setShowOptions(false);
                  previousGamepadLoop.gamepadLoopState.run = true;
                  previousGamepadLoop.setStartGamePadLoop(true);
            }
      };
      const gamepadLoop = () => {
            console.log(game);
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
                                                currentGamePadLoopState.run = false;
                                                controllerSettingsOverlayKeyDownHandler(
                                                      {
                                                            key: joystick
                                                                  .navigationKeyBindings[
                                                                  buttonIndex
                                                            ],
                                                      }
                                                );
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
                                          //   console.log(buttonIndex);
                                    } else if (joystick.throttleCount === 10) {
                                          controllerSettingsOverlayKeyDownHandler(
                                                {
                                                      key: joystick
                                                            .navigationKeyBindings[
                                                            buttonIndex
                                                      ],
                                                }
                                          );
                                          joystick.throttleCount = 0;
                                          //   console.log(buttonIndex);
                                    }
                              }
                        });
                  }
            }
            if (!currentGamePadLoopState.run) {
                  return;
            }

            requestAnimationFrame(gamepadLoop);
      };

      useEffect(() => {
            gamepadLoop();
            previousGamepadLoop.gamepadLoopState.run = false;
            previousGamepadLoop.setStartGamePadLoop(false);
      }, []);
      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='3']");
      });
      return (
            <div
                  className={
                        styles["options"] + " " + styles["options-" + theme]
                  }
                  onClick={(event) => {
                        clickHandler(event, currentGamePadLoopState);
                  }}
                  {...attributes}
            >
                  {children}
            </div>
      );
};