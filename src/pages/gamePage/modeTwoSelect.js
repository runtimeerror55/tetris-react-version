import { useState } from "react";
import styles from "./modeTwoSelect.module.css";
import { ModeTwoOptions } from "./modeTwoOptions";
export const ModeTwoSelect = ({ previousGamepadLoop, game }) => {
      const [showOptions, setShowOptions] = useState(false);
      const settingClickHandler = (event) => {
            event.stopPropagation();
            setShowOptions(true);
      };
      const modeTwoValue =
            game.gameModes.modeTwo === 1
                  ? "score till you die"
                  : "maximize score in 5 min";
      return (
            <div className={styles["setting-container"]}>
                  <span>mode one</span>
                  <div
                        className={styles["setting"]}
                        tabIndex={2}
                        onClick={settingClickHandler}
                  >
                        {modeTwoValue}
                        {showOptions ? (
                              <ModeTwoOptions
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    setShowOptions={setShowOptions}
                              ></ModeTwoOptions>
                        ) : null}
                  </div>
            </div>
      );
};
