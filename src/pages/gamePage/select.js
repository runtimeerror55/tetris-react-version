import { useState, useEffect, useMemo, useContext } from "react";
import styles from "./select.module.css";
import { Options } from "./options";
import { themeContext } from "../../context/theme";
import { CardThree } from "../../components/cards/cardThree";
let count = 0;
export const Select = ({
      joystickIndex,
      previousGamepadLoop,
      bindingValue,
      joystick,
      game,
}) => {
      const [showOptions, setShowOptions] = useState(false);
      const settingClickHandler = (event) => {
            event.stopPropagation();
            setShowOptions(true);
      };
      const { theme } = useContext(themeContext);

      let assignedButtonName = null;
      for (let i = 0; i < joystick.defaultKeyBindings.length; i++) {
            if (joystick.defaultKeyBindings[i] === bindingValue) {
                  assignedButtonName = joystick.buttonsNames[i];
            }
      }
      console.log(showOptions, assignedButtonName);

      return (
            <div className={styles["setting-container"]}>
                  <span>{bindingValue}</span>
                  <CardThree
                        customClass={styles["setting"]}
                        tabIndex={2}
                        onClick={settingClickHandler}
                  >
                        {assignedButtonName}
                        {showOptions ? (
                              <Options
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    assignedButtonName={assignedButtonName}
                                    bindingValue={bindingValue}
                                    setShowOptions={setShowOptions}
                              ></Options>
                        ) : (
                              ""
                        )}
                  </CardThree>
            </div>
      );
};
