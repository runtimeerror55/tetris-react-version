import { useState, useEffect, useMemo } from "react";
import styles from "./keyBoardOptions.module.css";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";

export const KeyBoardOptions = ({
      game,
      setShowOptions,
      previousGamepadLoop,
      bindingValue,
      assignedKeyBoardKey,
      playerNumber,
}) => {
      const focusableElements = useMemo(() => {
            return { elements: null, index: -1 };
      }, []);
      const currentGamePadLoopState = useMemo(() => {
            return {
                  run: true,
            };
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
                  focusableElements.elements[focusableElements.index].click();
            } else if (event.key === "Back") {
                  game.sounds.clickSound.play();
                  setShowOptions(false);
                  previousGamepadLoop.gamepadLoopState.run = true;
                  previousGamepadLoop.setStartGamePadLoop(true);
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

      const optionsClickHandler = (event) => {
            event.stopPropagation();
            const playerNumber =
                  event.currentTarget.getAttribute("data-player-number");

            const bindingValue =
                  event.currentTarget.getAttribute("data-binding-value");
            const key = event.target.getAttribute("data-key");

            if (
                  game.keyBoard.updateKeyBoardMapping(
                        key,
                        playerNumber,
                        bindingValue,
                        assignedKeyBoardKey
                  )
            ) {
                  game.sounds.clickSound.play();
                  setShowOptions(false);
                  currentGamePadLoopState.run = false;
                  previousGamepadLoop.gamepadLoopState.run = true;
                  previousGamepadLoop.setStartGamePadLoop(true);
                  toast.success("updated scuccesfully", toastOptions);
            } else {
                  toast.error("already used", toastOptions);
            }
      };
      return (
            <>
                  <div
                        className={styles["options"]}
                        onClick={optionsClickHandler}
                        data-player-number={playerNumber}
                        data-binding-value={bindingValue}
                  >
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="a"
                        >
                              a
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="b"
                        >
                              b
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="c"
                        >
                              c
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="d"
                        >
                              d
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="e"
                        >
                              e
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="f"
                        >
                              f
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="g"
                        >
                              g
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="h"
                        >
                              h
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="i"
                        >
                              i
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="j"
                        >
                              j
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="k"
                        >
                              k
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="l"
                        >
                              l
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="m"
                        >
                              m
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="n"
                        >
                              n
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="o"
                        >
                              o
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="p"
                        >
                              p
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="q"
                        >
                              q
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="r"
                        >
                              r
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="s"
                        >
                              s
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="u"
                        >
                              u
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="v"
                        >
                              v
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="w"
                        >
                              w
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="x"
                        >
                              x
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="y"
                        >
                              y
                        </div>
                        <div
                              className={styles["option"]}
                              tabIndex={3}
                              data-key="z"
                        >
                              z
                        </div>
                  </div>
            </>
      );
};
