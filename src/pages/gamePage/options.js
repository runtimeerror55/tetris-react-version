import { useState, useEffect, useMemo } from "react";
import { Howl } from "howler";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import clickSoundPath from "../../assets/sounds/click.mp3";
import styles from "./options.module.css";
const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
const clickSound = new Howl({
      src: [clickSoundPath],
});
export const Options = ({ game, setShowOptions, previousGamepadLoop }) => {
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
                  console.log(
                        focusableElements.elements[focusableElements.index]
                  );
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
            } else if (event.key === "back") {
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
                                                setShowOptions(false);
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
                                          controllerSettingsOverlayKeyDownHandler(
                                                {
                                                      key: joystick
                                                            .navigationKeyBindings[
                                                            buttonIndex
                                                      ],
                                                }
                                          );
                                          joystick.throttleCount = 0;
                                    }
                              }
                        });
                  }
            }
            if (shouldExit) {
                  setShowOptions(false);
                  previousGamepadLoop.gamepadLoopState.run = true;
                  previousGamepadLoop.setStartGamePadLoop(true);
                  return;
            }

            requestAnimationFrame(gamepadLoop);
      };

      useEffect(() => {
            gamepadLoop();
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='3']");
            previousGamepadLoop.gamepadLoopState.run = false;
            previousGamepadLoop.setStartGamePadLoop(false);
            console.log(focusableElements);
      }, []);
      return (
            <>
                  <div className={styles["options"]}>
                        <div
                              className={styles["option"]}
                              value="12"
                              tabIndex={3}
                        >
                              dpad up
                        </div>
                        <div
                              className={styles["option"]}
                              value="13"
                              tabIndex={3}
                        >
                              dpad down
                        </div>
                        <div
                              className={styles["option"]}
                              value="14"
                              tabIndex={3}
                        >
                              dpad left
                        </div>
                        <div
                              className={styles["option"]}
                              value="15"
                              tabIndex={3}
                        >
                              dpad right
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              x
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              a
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              b
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              y
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              r1
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              r2
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              l1
                        </div>
                        <div className={styles["option"]} tabIndex={3}>
                              l2
                        </div>
                  </div>
            </>
      );
};
