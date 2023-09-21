import { useState, useEffect, useMemo } from "react";
import styles from "./select.module.css";
import { Options } from "./options";
export const Select = ({ game, previousGamepadLoop }) => {
      const [showOptions, setShowOptions] = useState(false);
      const settingClickHandler = () => {
            setShowOptions(true);
      };

      return (
            <div
                  className={styles["setting"]}
                  tabIndex={2}
                  onClick={settingClickHandler}
            >
                  {showOptions ? (
                        <>
                              dpad up
                              <Options
                                    setShowOptions={setShowOptions}
                                    game={game}
                                    previousGamepadLoop={previousGamepadLoop}
                              ></Options>
                        </>
                  ) : (
                        "dpad up"
                  )}
            </div>
      );
};
