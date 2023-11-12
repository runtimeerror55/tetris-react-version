import { useState, useEffect, useMemo, useContext } from "react";
import styles from "./keyBoardSelect.module.css";
import { themeContext } from "../../../context/theme";
import { CardThree } from "../../../components/cards/cardThree";
import { Options } from "../../../components/options/options";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utilities/utilities";
import { Option } from "../../../components/options/option";

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
      const { theme } = useContext(themeContext);

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
      const optionsClickHandler = (event, currentGamePadLoopState) => {
            event.stopPropagation();
            const playerNumber =
                  event.currentTarget.getAttribute("data-player-number");

            const bindingValue =
                  event.currentTarget.getAttribute("data-binding-value");
            const key = event.target.getAttribute("data-key");

            if (
                  game.keyBoard.updateKeyBoardMapping(
                        key,
                        playerNumber,
                        bindingValue,
                        assignedKeyBoardKey
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
                        {assignedKeyBoardKey ? assignedKeyBoardKey : "empty"}
                        {showOptions ? (
                              <Options
                                    previousGamepadLoop={previousGamepadLoop}
                                    game={game}
                                    setShowOptions={setShowOptions}
                                    attributes={{
                                          "data-player-number": playerNumber,
                                          "data-binding-value": bindingValue,
                                    }}
                                    clickHandler={optionsClickHandler}
                              >
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "ArrowDown",
                                          }}
                                    >
                                          arrow down
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "ArrowLeft",
                                          }}
                                    >
                                          arrow left
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "ArrowRight",
                                          }}
                                    >
                                          arrow right
                                    </Option>

                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": " ",
                                          }}
                                    >
                                          space bar
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "a",
                                          }}
                                    >
                                          a
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "b",
                                          }}
                                    >
                                          b
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "c",
                                          }}
                                    >
                                          c
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "d",
                                          }}
                                    >
                                          d
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "e",
                                          }}
                                    >
                                          e
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "f",
                                          }}
                                    >
                                          f
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "g",
                                          }}
                                    >
                                          g
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "h",
                                          }}
                                    >
                                          h
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "i",
                                          }}
                                    >
                                          i
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "j",
                                          }}
                                    >
                                          j
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "k",
                                          }}
                                    >
                                          k
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "l",
                                          }}
                                    >
                                          l
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "m",
                                          }}
                                    >
                                          m
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "n",
                                          }}
                                    >
                                          n
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "o",
                                          }}
                                    >
                                          o
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "p",
                                          }}
                                    >
                                          p
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "q",
                                          }}
                                    >
                                          q
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "r",
                                          }}
                                    >
                                          r
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "s",
                                          }}
                                    >
                                          s
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "t",
                                          }}
                                    >
                                          t
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "u",
                                          }}
                                    >
                                          u
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "v",
                                          }}
                                    >
                                          v
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "w",
                                          }}
                                    >
                                          w
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "x",
                                          }}
                                    >
                                          x
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "y",
                                          }}
                                    >
                                          y
                                    </Option>
                                    <Option
                                          attributes={{
                                                tabIndex: 3,
                                                "data-key": "z",
                                          }}
                                    >
                                          z
                                    </Option>
                              </Options>
                        ) : (
                              ""
                        )}
                  </CardThree>
            </div>
      );
};
