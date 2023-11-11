import { useState } from "react";
import styles from "./modeTwoSelect.module.css";
import { CardThree } from "../../../components/cards/cardThree";
import { Option } from "../../../components/options/option";
import { CardTwo } from "../../../components/cards/cardTwo";
import { Options } from "../../../components/options/options";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
export const ModeTwoSelect = ({ previousGamepadLoop, game }) => {
      const [showOptions, setShowOptions] = useState(false);
      const settingClickHandler = (event) => {
            event.stopPropagation();
            setShowOptions(true);
      };

      const optionsClickHandler = (event, currentGamePadLoopState) => {
            event.stopPropagation();
            game.sounds.clickSound.play();
            const value = event.target.getAttribute("data-value");
            game.gameModes.modeTwo = +value;
            game.reset();

            setShowOptions(false);
            currentGamePadLoopState.run = false;
            previousGamepadLoop.gamepadLoopState.run = true;
            previousGamepadLoop.setStartGamePadLoop(true);
            toast.success("updated scuccesfully", toastOptions);
      };
      const modeTwoValue =
            game.gameModes.modeTwo === 1
                  ? "score till you die"
                  : "maximize score in 5 min";
      return (
            <CardTwo customClass={styles["setting-container"]}>
                  <span>mode one</span>
                  <CardThree
                        customClass={styles["setting"]}
                        tabIndex={2}
                        onClick={settingClickHandler}
                  >
                        {modeTwoValue}
                        {showOptions ? (
                              //   <ModeTwoOptions
                              //         previousGamepadLoop={previousGamepadLoop}
                              //         game={game}
                              //         setShowOptions={setShowOptions}
                              //   ></ModeTwoOptions>
                              <Options
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    setShowOptions={setShowOptions}
                                    clickHandler={optionsClickHandler}
                              >
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-value": "1",
                                          }}
                                    >
                                          score till you die
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-value": "2",
                                          }}
                                    >
                                          maximize score in 5 min
                                    </Option>
                              </Options>
                        ) : null}
                  </CardThree>
            </CardTwo>
      );
};