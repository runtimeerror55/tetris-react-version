import { useState } from "react";
import { CardTwo } from "../../../components/cards/cardTwo";
import styles from "./modeOneSelect.module.css";
import { Options } from "../../../components/options/options";
import { toastOptions } from "../../../utilities/utilities";
import { toast } from "react-toastify";
import { CardThree } from "../../../components/cards/cardThree";
import { Option } from "../../../components/options/option";

export const ModeOneSelect = ({ previousGamepadLoop, game }) => {
      const [showOptions, setShowOptions] = useState(false);
      const [showBottom, setShowBottom] = useState(true);
      const settingClickHandler = (event) => {
            event.stopPropagation();
            const positions = event.currentTarget.getBoundingClientRect();
            if (positions.top < window.innerHeight / 2) {
                  setShowBottom(true);
            } else {
                  setShowBottom(false);
            }
            setShowOptions(true);
      };
      const modeOneValue =
            game.gameModes.modeOne === 1
                  ? "single player"
                  : "split screen (2 players)";

      const optionsClickHandler = (event, currentGamePadLoopState) => {
            event.stopPropagation();
            game.sounds.clickSound.play();
            const value = event.target.getAttribute("data-value");
            game.gameModes.modeOne = +value;
            game.createPlayers(+value);

            if (value === "1") {
                  let j = 0;
                  while (!game.joysticks[0] && j < game.joysticks.length) {
                        if (game.joysticks[j] !== null) {
                              game.joysticks[0] = game.joysticks[j];
                              game.joysticks[j] = null;
                        }
                        j++;
                  }
                  console.log(game.joysticks, navigator.getGamepads());
                  // game.reset();
            }

            setShowOptions(false);
            currentGamePadLoopState.run = false;
            previousGamepadLoop.gamepadLoopState.run = true;
            previousGamepadLoop.setStartGamePadLoop(true);
            toast.success("updated scuccesfully", toastOptions);
      };
      return (
            <CardTwo customClass={styles["setting-container"]}>
                  <span>Mode one</span>
                  <CardThree
                        customClass={styles["setting"]}
                        tabIndex={2}
                        onClick={settingClickHandler}
                        testId="mode-one-select"
                  >
                        {modeOneValue}
                        {showOptions ? (
                              <Options
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    setShowOptions={setShowOptions}
                                    clickHandler={optionsClickHandler}
                                    showBottom={showBottom}
                              >
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-value": "1",
                                          }}
                                    >
                                          single player
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-value": "2",
                                          }}
                                    >
                                          split screen (2 players)
                                    </Option>
                              </Options>
                        ) : null}
                  </CardThree>
            </CardTwo>
      );
};
