import { useEffect, useState, useMemo } from "react";
import styles from "./gameModes.module.css";
import { GoBackButton } from "../../components/navBar/buttons/goBack";
import { ModeOneSelect } from "./modeOneSelect";
import { ModeTwoSelect } from "./modeTwoSelect";
export const GameModes = ({ setShowGameModes, game }) => {
      const gameModesCloseButtonClickHandler = () => {
            setShowGameModes(false);
      };

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
                  setShowGameModes(false);
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
            <section className={styles["game-modes-section"]}>
                  <GoBackButton
                        onClickHandler={gameModesCloseButtonClickHandler}
                  ></GoBackButton>
                  <div className={styles["game-modes"]}>
                        <h1 className={styles["game-modes-heading"]}>
                              Game modes
                        </h1>
                        <ModeOneSelect
                              previousGamepadLoop={{
                                    gamepadLoopState,
                                    setStartGamePadLoop,
                              }}
                              game={game}
                        ></ModeOneSelect>
                        <ModeTwoSelect
                              previousGamepadLoop={{
                                    gamepadLoopState,
                                    setStartGamePadLoop,
                              }}
                              game={game}
                        ></ModeTwoSelect>
                  </div>
            </section>
      );
};
