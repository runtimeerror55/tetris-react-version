import { Form } from "react-router-dom";
import gamePadImage from "../../assets/images/pngwing.com.png";
import styles from "./controller.module.css";

export const Controller = () => {
      return (
            <div className={styles["connected-controller"]}>
                  <div>
                        <img
                              src={gamePadImage}
                              alt="gamepad"
                              className={styles["gamepad-image"]}
                        ></img>
                        <div>Player-1</div>
                  </div>
                  <Form
                  // onChange={(event) => {
                  //     //   gameControlChangeHandler(event, 0);
                  // }}
                  >
                        <div className={styles["setting-container"]}>
                              <span>DOWN</span>
                              <select
                                    className={styles["setting"]}
                                    tabIndex={2}
                              >
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
                              <select
                                    className={styles["setting"]}
                                    tabIndex={2}
                              >
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
                              <select
                                    className={styles["setting"]}
                                    tabIndex={2}
                              >
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
                              <select
                                    className={styles["setting"]}
                                    tabIndex={2}
                              >
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
            </div>
      );
};
