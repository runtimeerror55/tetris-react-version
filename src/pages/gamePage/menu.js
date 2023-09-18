import { useState } from "react";
import styles from "./menu.module.css";
import { Settings } from "./settings";
export const Menu = ({ setShowMenyOverlay }) => {
      const [showSettingsOveryLay, setShowSettingsOverLay] = useState(false);
      const meuOverlayCloseButtonClickHandler = () => {
            setShowMenyOverlay(false);
      };

      const controlsClickHandler = () => {
            setShowSettingsOverLay(true);
      };
      return (
            <>
                  <section className={styles["menu-overlay-section"]}>
                        <button
                              onClick={meuOverlayCloseButtonClickHandler}
                              className={styles["menu-overlay-close-button"]}
                        >
                              Close
                        </button>
                        <div className={styles["option"]}>NEW GAME</div>
                        <div className={styles["option"]}>RESUME GAME</div>
                        <div
                              className={styles["option"]}
                              onClick={controlsClickHandler}
                        >
                              CONTROLS
                        </div>
                        <div className={styles["option"]}>SOUNDS</div>
                  </section>
                  {showSettingsOveryLay ? (
                        <Settings
                              setShowSettingsOverLay={setShowSettingsOverLay}
                        ></Settings>
                  ) : (
                        ""
                  )}
            </>
      );
};
