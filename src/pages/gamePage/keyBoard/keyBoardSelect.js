import { useState, useEffect, useMemo } from "react";
import styles from "./keyBoardSelect.module.css";
import { KeyBoardOptions } from "./keyBoardOptions";

export const KeyBoardSelect = ({
      previousGamepadLoop,
      bindingValue,
      playerNumber,
      game,
}) => {
      const [showOptions, setShowOptions] = useState(false);
      const settingClickHandler = (event) => {
            event.stopPropagation();
            setShowOptions(true);
      };

      let assignedKeyBoardKey = null;

      for (let i in game.keyBoard.keyBoardMapping) {
            if (
                  game.keyBoard.keyBoardMapping[i].bindingValue ===
                        bindingValue &&
                  game.keyBoard.keyBoardMapping[i].playerNumber === playerNumber
            ) {
                  assignedKeyBoardKey = i;
            }
            if (assignedKeyBoardKey === " ") {
                  assignedKeyBoardKey = "space bar";
            }
      }

      return (
            <div className={styles["setting-container"]}>
                  <span>{bindingValue}</span>
                  <div
                        className={styles["setting"]}
                        tabIndex={2}
                        onClick={settingClickHandler}
                  >
                        {assignedKeyBoardKey ? assignedKeyBoardKey : "empty"}
                        {showOptions ? (
                              <KeyBoardOptions
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    bindingValue={bindingValue}
                                    setShowOptions={setShowOptions}
                                    assignedKeyBoardKey={assignedKeyBoardKey}
                                    playerNumber={playerNumber}
                              ></KeyBoardOptions>
                        ) : (
                              ""
                        )}
                  </div>
            </div>
      );
};
