import styles from "./controlSettings.module.css";
import { GoBackButton } from "../../components/navBar/buttons/goBack";
import { useEffect, useState, useMemo } from "react";
import { Controller } from "./controller";
import { Howl } from "howler";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import clickSoundPath from "../../assets/sounds/click.mp3";
import { CardOne } from "../../components/cards/cardOne";
import { KeyBoard } from "./keyBoard/keyBoard";
import { navigationGamepadLoop } from "../../utilities/utilities";

const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
const clickSound = new Howl({
      src: [clickSoundPath],
});
export const ControlSettings = ({ setShowSettingsOverLay, game }) => {
      const [startGamePadLoop, setStartGamePadLoop] = useState(true);
      const gamepadLoopState = useMemo(() => {
            return { run: true };
      }, []);
      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, []);
      const controllerSettingsOverlayKeyDownHandler = (event) => {
            if (event.stopPropagation) {
                  event.stopPropagation();
            }

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
            } else if (event.key === "Back" || event.key === "Backspace") {
                  clickSound.play();
                  gamepadLoopState.run = false;
                  setShowSettingsOverLay(false);
            }
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
                  document.querySelectorAll("[tabindex='2']");
      }, []);

      useEffect(() => {
            if (gamepadLoopState.run) {
                  focusableElements.elements[focusableElements.index]?.focus();
            }
      }, [gamepadLoopState.run]);

      const settingsOverlayCloseButtonClickHandler = () => {
            setShowSettingsOverLay(false);
      };

      return (
            <CardOne
                  customClass={styles["settings-overlay"]}
                  customTag="section"
                  keyDownHandler={controllerSettingsOverlayKeyDownHandler}
            >
                  <GoBackButton
                        onClickHandler={settingsOverlayCloseButtonClickHandler}
                  ></GoBackButton>
                  <div className={styles["settings"]}>
                        <h1 className={styles["controller-settings-heading"]}>
                              Controller settings
                        </h1>
                        <div className={styles["connected-controllers"]}>
                              {game.players.map((player, index) => {
                                    const joystick = game.joysticks[index];
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
                              {game.players.map((player, index) => {
                                    return (
                                          <KeyBoard
                                                previousGamepadLoop={{
                                                      gamepadLoopState,
                                                      setStartGamePadLoop,
                                                }}
                                                playerNumber={index + ""}
                                                game={game}
                                          ></KeyBoard>
                                    );
                              })}
                        </div>
                  </div>
            </CardOne>
      );
};
