import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import { ControlSettings } from "./controlSettings";
import { GameModes } from "./gameModes/gameModes";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import { Howl } from "howler";
import clickSoundPath from "../../assets/sounds/click.mp3";
import { themeContext } from "../../context/theme";
import { CardOne } from "../../components/cards/cardOne";
import { Skins } from "./skins/skins";
import { Guide } from "./guide/guide";
import { LasersShooting } from "../../components/svg/lasersShooting";
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
      setShowGame,
}) => {
      const [showSettingsOverLay, setShowSettingsOverLay] = useState(false);
      const [showGameModes, setShowGameModes] = useState(false);
      const [showSkins, setShowSkins] = useState(false);
      const [showGuide, setShowGuide] = useState(false);
      const [renderMenu, setRenderMenu] = useState({});
      const { theme } = useContext(themeContext);

      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, [game.isGameStarted, game.pause]);
      const newGameButtonClickHandler = (event) => {
            game.reset();
            setShowMenuOverlay(false);
            setShowGameStartTimer(true);
      };

      const controlsClickHandler = async () => {
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

      const skinsClickHandler = () => {
            setShowSkins(true);
      };

      const guideClickHandler = () => {
            setShowGuide(true);
      };
      const quitGameClickHandler = () => {
            game.reset();
            setRenderMenu({});
            setShowGame(false);
      };
      const menuOverlayKeyDownHandler = (event) => {
            console.log("menu is ww");
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

      useEffect(() => {
            if (
                  !showSettingsOverLay &&
                  !showGameModes &&
                  !showSkins &&
                  !showGuide
            ) {
                  focusableElements.elements[focusableElements.index]?.focus();
            }
      }, [showSettingsOverLay, showGameModes, showSkins, showGuide]);

      const gamepadLoop = () => {
            const joystick = game.joysticks[0];

            if (joystick) {
                  if (joystick.throttleCount < 10) {
                        joystick.throttleCount++;
                  }
                  const gamepads = navigator.getGamepads();
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
            if (
                  !showSettingsOverLay &&
                  !showGameModes &&
                  !showSkins &&
                  !showGuide
            ) {
                  requestAnimationFrame(gamepadLoop);
            }
      }, [
            showSettingsOverLay,
            renderMenu,
            showGameModes,
            showSkins,
            showGuide,
      ]);

      return (
            <>
                  <CardOne
                        customTag="section"
                        attributes={{
                              className: styles["menu-overlay-section"],
                              onKeyDown: menuOverlayKeyDownHandler,
                              tabIndex: -1,
                        }}
                  >
                        <LasersShooting></LasersShooting>
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
                        {/* <div
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              tabIndex={0}
                        >
                              SOUNDS
                        </div> */}
                        {!game.isGameStarted && !game.pause ? (
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
                        ) : (
                              <div
                                    className={
                                          styles["option"] +
                                          " " +
                                          styles["option-" + theme]
                                    }
                                    onClick={quitGameClickHandler}
                                    tabIndex={0}
                              >
                                    QUIT GAME
                              </div>
                        )}

                        <div
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              onClick={skinsClickHandler}
                              tabIndex={0}
                        >
                              SKINS
                        </div>
                        <div
                              className={
                                    styles["option"] +
                                    " " +
                                    styles["option-" + theme]
                              }
                              onClick={guideClickHandler}
                              tabIndex={0}
                        >
                              GUIDE
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
                  {showSkins ? (
                        <Skins setShowSkins={setShowSkins} game={game}></Skins>
                  ) : null}

                  {showGuide ? (
                        <Guide setShowGuide={setShowGuide} game={game}></Guide>
                  ) : null}
            </>
      );
};
