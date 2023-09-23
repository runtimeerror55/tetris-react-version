import { Form } from "react-router-dom";
import gamePadImage from "../../assets/images/pngwing.com.png";
import styles from "./controller.module.css";
import { Select } from "./select";
export const Controller = ({
      joystickIndex,
      previousGamepadLoop,
      joystick,
      game,
}) => {
      return (
            <div className={styles["connected-controller"]}>
                  <div>
                        <img
                              src={gamePadImage}
                              alt="gamepad"
                              className={styles["gamepad-image"]}
                        ></img>
                        <div>Player-{joystickIndex}</div>
                  </div>
                  <div>
                        <Select
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowDown"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></Select>
                        <Select
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowRight"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></Select>
                        <Select
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowLeft"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></Select>
                        <Select
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="rotate"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></Select>
                  </div>
            </div>
      );
};
