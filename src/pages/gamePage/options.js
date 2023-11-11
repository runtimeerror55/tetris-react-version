import { useState, useEffect, useMemo, useContext } from "react";
import { Howl } from "howler";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import clickSoundPath from "../../assets/sounds/click.mp3";
import styles from "./options.module.css";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";
import { themeContext } from "../../context/theme";
const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
const clickSound = new Howl({
      src: [clickSoundPath],
});
export const Options = ({
      game,
      setShowOptions,
      previousGamepadLoop,
      assignedButtonName,
      bindingValue,
}) => {
      const { theme } = useContext(themeContext);
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
                  focusableElements.elements[focusableElements.index].click();
            } else if (event.key === "Back") {
                  clickSound.play();
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
            const buttonIndex = event.target.getAttribute("data-button-index");
            const joystickIndex = event.currentTarget.getAttribute(
                  "data-joystick-index"
            );
            const bindingValue =
                  event.currentTarget.getAttribute("data-binding-value");

            if (
                  game.joysticks[joystickIndex].updateGameKeyBinding(
                        buttonIndex,
                        bindingValue
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
                        className={
                              styles["options"] +
                              " " +
                              styles["options-" + theme]
                        }
                        onClick={optionsClickHandler}
                        data-joystick-index="0"
                        data-binding-value={bindingValue}
                  >
                        <div
                              data-button-index="12"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              value="12"
                              tabIndex={3}
                        >
                              dpad up
                        </div>
                        <div
                              data-button-index="13"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              value="13"
                              tabIndex={3}
                        >
                              dpad down
                        </div>
                        <div
                              data-button-index="14"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              value="14"
                              tabIndex={3}
                        >
                              dpad left
                        </div>
                        <div
                              data-button-index="15"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              value="15"
                              tabIndex={3}
                        >
                              dpad right
                        </div>
                        <div
                              data-button-index="2"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              x
                        </div>
                        <div
                              data-button-index="0"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              a
                        </div>
                        <div
                              data-button-index="1"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              b
                        </div>
                        <div
                              data-button-index="3"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              y
                        </div>
                        <div
                              data-button-index="5"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              r1
                        </div>
                        <div
                              data-button-index="7"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              r2
                        </div>
                        <div
                              data-button-index="4"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              l1
                        </div>
                        <div
                              data-button-index="6"
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={3}
                        >
                              l2
                        </div>
                  </div>
            </>
      );
};
