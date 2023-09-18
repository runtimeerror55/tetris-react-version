import styles from "./gamePadSettings.module.css";
import gamePadImage from "../../assets/images/pngwing.com.png";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Form } from "react-router-dom";
import { controllerContext } from "../../context/controller";

export const GamePadSettings = () => {
      const [blinkController, setBlinkController] = useState(false);
      const controller = useContext(controllerContext);
      console.log(controller);
      let controllerClassName = styles["connected-controller"];
      if (blinkController) {
            controllerClassName =
                  controllerClassName + " " + styles["controller-active"];
      }

      const gamepadLoop = () => {
            navigator.getGamepads().forEach((gamePad) => {
                  if (gamePad) {
                        gamePad.buttons.forEach((button, index) => {
                              if (button.pressed) {
                                    setBlinkController({});
                              }
                        });
                  }
            });
            requestAnimationFrame(gamepadLoop);
      };
      useEffect(() => {
            gamepadLoop();
      }, []);

      useEffect(() => {
            let id;
            if (blinkController) {
                  id = setTimeout(() => {
                        setBlinkController(false);
                        console.log("hello", blinkController);
                  }, 100);
            }
            return () => {
                  clearTimeout(id);
            };
      }, [blinkController]);

      const gameControlChangeHandler = (event, controllerIndex) => {
            controller.updateGameControlsMapping(0, event.target.value, "some");
            console.log(controller);
      };
      return (
            <>
                  <div className={styles["connected-controllers"]}>
                        <div
                              className={
                                    blinkController
                                          ? controllerClassName
                                          : styles["connected-controller"]
                              }
                        >
                              <img
                                    src={gamePadImage}
                                    alt="gamepad"
                                    className={styles["gamepad-image"]}
                              ></img>
                        </div>
                        <div className={styles["connected-controller"]}>
                              <img
                                    src={gamePadImage}
                                    alt="gamepad"
                                    className={styles["gamepad-image"]}
                              ></img>
                        </div>
                  </div>

                  <Form
                        onChange={(event) => {
                              gameControlChangeHandler(event, 0);
                        }}
                  >
                        <div className={styles["setting-container"]}>
                              <span>DOWN</span>
                              <select className={styles["setting"]}>
                                    <option value="12">dpad up</option>
                                    <option value="13">dpad down</option>
                                    <option value="14">dpad left</option>
                                    <option value="15">dpad right</option>
                                    <option>x</option>
                                    <option>a</option>
                                    <option>b</option>
                                    <option>y</option>
                                    <option>r1</option>
                                    <option>r2</option>
                                    <option>l1</option>
                                    <option>l2</option>
                              </select>
                        </div>

                        <div className={styles["setting-container"]}>
                              <span>RIGHT</span>
                              <select className={styles["setting"]}>
                                    <option value="12">dpad up</option>
                                    <option value="13">dpad down</option>
                                    <option value="14">dpad left</option>
                                    <option value="15">dpad right</option>
                                    <option>x</option>
                                    <option>a</option>
                                    <option>b</option>
                                    <option>y</option>
                                    <option>r1</option>
                                    <option>r2</option>
                                    <option>l1</option>
                                    <option>l2</option>
                              </select>
                        </div>
                        <div className={styles["setting-container"]}>
                              <span>LEFT</span>
                              <select className={styles["setting"]}>
                                    <option value="12">dpad up</option>
                                    <option value="13">dpad down</option>
                                    <option value="14">dpad left</option>
                                    <option value="15">dpad right</option>
                                    <option>x</option>
                                    <option>a</option>
                                    <option>b</option>
                                    <option>y</option>
                                    <option>r1</option>
                                    <option>r2</option>
                                    <option>l1</option>
                                    <option>l2</option>
                              </select>
                        </div>
                        <div className={styles["setting-container"]}>
                              <span>DROP</span>
                              <select className={styles["setting"]}>
                                    <option value="12">dpad up</option>
                                    <option value="13">dpad down</option>
                                    <option value="14">dpad left</option>
                                    <option value="15">dpad right</option>
                                    <option>x</option>
                                    <option>a</option>
                                    <option>b</option>
                                    <option>y</option>
                                    <option>r1</option>
                                    <option>r2</option>
                                    <option>l1</option>
                                    <option>l2</option>
                              </select>
                        </div>
                  </Form>
            </>
      );
};
