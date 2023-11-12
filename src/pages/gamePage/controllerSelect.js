import { useState } from "react";
import styles from "./controllerSelect.module.css";
import { CardThree } from "../../components/cards/cardThree";
import { Options } from "../../components/options/options";
import { Option } from "../../components/options/option";
import { toast } from "react-toastify";
import { toastOptions } from "../../utilities/utilities";

export const ControllerSelect = ({
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

      let assignedButtonName = null;
      for (let i = 0; i < joystick.defaultKeyBindings.length; i++) {
            if (joystick.defaultKeyBindings[i] === bindingValue) {
                  assignedButtonName = joystick.buttonsNames[i];
            }
      }

      const optionsClickHandler = (event, currentGamePadLoopState) => {
            event.stopPropagation();
            const buttonIndex = event.target.getAttribute("data-button-index");
            const joystickIndex = event.currentTarget.getAttribute(
                  "data-joystick-index"
            );
            const bindingValue =
                  event.currentTarget.getAttribute("data-binding-value");

            if (
                  game.joysticks[joystickIndex].updateGameKeyBinding(
                        buttonIndex,
                        bindingValue
                  )
            ) {
                  game.sounds.clickSound.play();
                  setShowOptions(false);
                  currentGamePadLoopState.run = false;
                  previousGamepadLoop.gamepadLoopState.run = true;
                  previousGamepadLoop.setStartGamePadLoop(true);
                  toast.success("updated scuccesfully", toastOptions);
            } else {
                  toast.error("already used", toastOptions);
            }
      };

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
                                    setShowOptions={setShowOptions}
                                    attributes={{
                                          "data-joystick-index": 0,
                                          "data-binding-value": bindingValue,
                                    }}
                                    clickHandler={optionsClickHandler}
                              >
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "12",
                                          }}
                                    >
                                          dpad up
                                    </Option>

                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "13",
                                          }}
                                    >
                                          dpad down
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "14",
                                          }}
                                    >
                                          dpad left
                                    </Option>

                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "15",
                                          }}
                                    >
                                          dpad right
                                    </Option>

                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "2",
                                          }}
                                    >
                                          x
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "0",
                                          }}
                                    >
                                          a
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "1",
                                          }}
                                    >
                                          b
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "3",
                                          }}
                                    >
                                          y
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "5",
                                          }}
                                    >
                                          r1
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "7",
                                          }}
                                    >
                                          r2
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "4",
                                          }}
                                    >
                                          l1
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-button-index": "6",
                                          }}
                                    >
                                          l2
                                    </Option>
                              </Options>
                        ) : null}
                  </CardThree>
            </div>
      );
};
