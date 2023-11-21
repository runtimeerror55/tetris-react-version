import { useEffect, useState, useMemo, useRef } from "react";
import styles from "./guide.module.css";
import { CardOne } from "../../../components/cards/cardOne";
import { CardTwo } from "../../../components/cards/cardTwo";
import { GoBackButton } from "../../../components/navBar/buttons/goBack";
import { navigationGamepadLoop } from "../../../utilities/utilities";

export const Guide = ({ setShowGuide, game }) => {
      const [startGamePadLoop, setStartGamePadLoop] = useState(true);
      const guideRef = useRef();
      const gamepadLoopState = useMemo(() => {
            return { run: true };
      }, []);
      const gameModesCloseButtonClickHandler = () => {
            setShowGuide(false);
      };

      const controllerSettingsOverlayKeyDownHandler = (event) => {
            if (event.stopPropagation) {
                  event.stopPropagation();
            }
            if (event.key === "ArrowDown") {
            } else if (event.key === "ArrowUp") {
            } else if (event.key === "Enter") {
            } else if (event.key === "Back" || event.key === "Backspace") {
                  game.sounds.clickSound.play();
                  gamepadLoopState.run = false;
                  setShowGuide(false);
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
            guideRef.current.focus();
      }, []);
      return (
            <CardOne
                  customTag="section"
                  attributes={{
                        className: styles["guide-section"],
                        onKeyDown: controllerSettingsOverlayKeyDownHandler,
                        tabIndex: -1,
                        ref: guideRef,
                  }}
            >
                  <GoBackButton
                        onClickHandler={gameModesCloseButtonClickHandler}
                  ></GoBackButton>
                  <div className={styles["guide"]}>
                        <h1 className={styles["guide-heading"]}>Guide</h1>
                        <CardTwo customClass={styles["container"]}>
                              <h2 className={styles["h2-heading"]}>
                                    Introduction
                              </h2>
                              <p className={styles["p1"]}>
                                    Dive into the world of our simple, elegant,
                                    and fun web-based Tetris game. Designed with
                                    ease of use,clean user interface ,split
                                    screen,controller support and many more.
                                    This classic favorite has been given a
                                    fresh, contemporary twist for your
                                    enjoyment. Whether you're a seasoned Tetris
                                    pro or a newcomer to the game, this guide is
                                    here to help you make the most of your
                                    experience. Let's explore the exciting
                                    features and navigate through the
                                    captivating world of Tetris!
                              </p>
                              <h2 className={styles["h2-heading"]}>
                                    Game Modes
                              </h2>
                              <p className={styles["p1"]}>
                                    Get ready for an exhilarating Tetris
                                    experience with two distinct game modes,
                                    each offering its own set of challenges and
                                    excitement.
                              </p>
                              <ul>
                                    <li>
                                          <h3>Mode one:</h3>
                                    </li>

                                    <ul>
                                          <li>
                                                Single Player: Embark on a solo
                                                journey to achieve the highest
                                                score possible.
                                          </li>
                                          <li>
                                                split screen (2 Players): Invite
                                                a friend to join the fun!
                                                Experience the thrill of
                                                competitive Tetris with two
                                                players on the same screen, side
                                                by side. It's a test of skill
                                                and strategy as you aim to
                                                outlast and outscore your
                                                opponent.
                                          </li>
                                    </ul>
                              </ul>

                              <ul>
                                    <li>
                                          <h3>Mode Two:</h3>
                                    </li>

                                    <ul>
                                          <li>
                                                Score Until You Die: Keep
                                                clearing lines and stacking
                                                blocks until you can't go on any
                                                longer. Challenge yourself to
                                                reach new heights with each
                                                game.
                                          </li>
                                          <li>
                                                Maximize Score in 5 Min: Feel
                                                the pressure as you aim to
                                                achieve the highest score
                                                possible within a time limit of
                                                5 minutes. Quick thinking and
                                                precision are key to mastering
                                                this fast-paced mode.
                                          </li>
                                    </ul>
                              </ul>

                              <h2 className={styles["h2-heading"]}>
                                    In game controls
                              </h2>
                              <ul>
                                    <li>controller only support</li>
                                    <li>controller and keyboard support</li>
                                    <li> keyboard only support</li>
                                    <li>upto 2 controllers are supported</li>
                                    <li>
                                          you can change key bindings in the
                                          controls section.
                                    </li>
                                    <li>
                                          To see mutltiple controllers(mutltiple
                                          contollers should be connected) and
                                          mutltiple keyboards bindings(single
                                          connected keyboard is enough) you need
                                          to select split screen mode
                                    </li>
                              </ul>
                              <h2 className={styles["h2-heading"]}>
                                    Naviagtion controls
                              </h2>
                              <p className={styles["p1"]}>
                                    Another big feature of our game is that you
                                    get full contoller support and keyboard
                                    support for navigating the whole game.
                              </p>
                              <ul>
                                    <li>
                                          <h3>controller:</h3>
                                    </li>

                                    <ul>
                                          <li>
                                                use d-pad up and d-pad down
                                                buttons to navigate through
                                                options
                                          </li>
                                          <li>
                                                use X button to select an option
                                          </li>
                                          <li>
                                                use B button to go back to
                                                previous options
                                          </li>
                                    </ul>
                              </ul>
                              <ul>
                                    <li>
                                          <h3>keyboard:</h3>
                                    </li>

                                    <ul>
                                          <li>
                                                use Arrow up and Arrow down keys
                                                to navigate through options
                                          </li>
                                          <li>
                                                use Enter key to select an
                                                option
                                          </li>
                                          <li>
                                                use backspace key to go back to
                                                previous options
                                          </li>
                                    </ul>
                              </ul>

                              <h2 className={styles["h2-heading"]}>Skins</h2>
                              <p className={styles["p1"]}>
                                    Explore our collection of carefully crafted
                                    skins, each designed to elevate your gaming
                                    experience. With different color schemes and
                                    minimalist designs, there's a skin for every
                                    taste. Choose the one that reflects your
                                    style and adds an extra layer of enjoyment
                                    to your Tetris sessions.Our skins are not
                                    just about aesthetics—they're designed for
                                    optimal visual appeal. Crisp graphics,
                                    seamless animations, and attention to detail
                                    create a visually engaging environment.
                              </p>

                              <ul>
                                    <li>Blue</li>
                                    <li>Red</li>
                                    <li>Green</li>
                                    <li>Violet</li>
                                    <li>Yellow</li>
                              </ul>
                        </CardTwo>
                  </div>
            </CardOne>
      );
};
