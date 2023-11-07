import { useState } from "react";
import styles from "./modeOneSelect.module.css";
import { ModeOneOptions } from "./modeOneOptions";
export const ModeOneSelect = ({ previousGamepadLoop, game }) => {
      const [showOptions, setShowOptions] = useState(false);
      const settingClickHandler = (event) => {
            event.stopPropagation();
            setShowOptions(true);
      };
      const modeOneValue =
            game.gameModes.modeOne === 1
                  ? "single player"
                  : "couch play(2 players)";
      return (
            <div className={styles["setting-container"]}>
                  <span>mode one</span>
                  <div
                        className={styles["setting"]}
                        tabIndex={2}
                        onClick={settingClickHandler}
                  >
                        {modeOneValue}
                        {showOptions ? (
                              <ModeOneOptions
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    setShowOptions={setShowOptions}
                              ></ModeOneOptions>
                        ) : null}
                  </div>
            </div>
      );
};
