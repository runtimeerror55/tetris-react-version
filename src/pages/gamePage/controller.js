import gamePadImage from "../../assets/images/pngwing.com.png";
import styles from "./controller.module.css";
import { ControllerSelect } from "./controllerSelect";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
export const Controller = ({
      joystickIndex,
      previousGamepadLoop,
      joystick,
      game,
}) => {
      const { theme } = useContext(themeContext);
      return (
            <div
                  className={
                        styles["connected-controller"] +
                        " " +
                        styles["connected-controller-" + theme]
                  }
            >
                  <div>
                        <img
                              src={gamePadImage}
                              alt="gamepad"
                              className={styles["gamepad-image"]}
                        ></img>
                        <div>Player-{joystickIndex}</div>
                  </div>
                  <div>
                        <ControllerSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowDown"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></ControllerSelect>
                        <ControllerSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowRight"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></ControllerSelect>
                        <ControllerSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowLeft"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></ControllerSelect>
                        <ControllerSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="rotate"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></ControllerSelect>
                  </div>
            </div>
      );
};
