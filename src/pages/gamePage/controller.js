import gamePadImage from "../../assets/images/pngwing.com.png";
import styles from "./controller.module.css";
import { ControllerSelect } from "./controllerSelect";
import { CardTwo } from "../../components/cards/cardTwo";
export const Controller = ({
      joystickIndex,
      previousGamepadLoop,
      joystick,
      game,
}) => {
      return (
            <CardTwo customClass={styles["connected-controller"]}>
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
                        <ControllerSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="lifeSaver"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></ControllerSelect>
                        <ControllerSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="hardDrop"
                              joystickIndex={joystickIndex}
                              joystick={joystick}
                              game={game}
                        ></ControllerSelect>
                  </div>
            </CardTwo>
      );
};
