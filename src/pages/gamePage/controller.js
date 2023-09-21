import { Form } from "react-router-dom";
import gamePadImage from "../../assets/images/pngwing.com.png";
import styles from "./controller.module.css";
import { Select } from "./select";
export const Controller = ({ game, previousGamepadLoop }) => {
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
                              <Select
                                    game={game}
                                    previousGamepadLoop={previousGamepadLoop}
                              ></Select>
                        </div>

                        <div className={styles["setting-container"]}>
                              <span>RIGHT</span>
                              <Select
                                    game={game}
                                    previousGamepadLoop={previousGamepadLoop}
                              ></Select>
                        </div>
                        <div className={styles["setting-container"]}>
                              <span>LEFT</span>
                              <Select
                                    game={game}
                                    previousGamepadLoop={previousGamepadLoop}
                              ></Select>
                        </div>
                        <div className={styles["setting-container"]}>
                              <span>DROP</span>
                              <Select
                                    game={game}
                                    previousGamepadLoop={previousGamepadLoop}
                              ></Select>
                        </div>
                  </Form>
            </div>
      );
};
