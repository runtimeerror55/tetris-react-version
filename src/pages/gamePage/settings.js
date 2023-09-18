import styles from "./settings.module.css";
import { GamePadSettings } from "./gamePadSettings";
export const Settings = ({ setShowSettingsOverLay }) => {
      const settingsOverlayCloseButtonClickHandler = () => {
            setShowSettingsOverLay(false);
      };
      return (
            <section className={styles["settings-overlay"]}>
                  <button
                        onClick={settingsOverlayCloseButtonClickHandler}
                        className={styles["settings-overlay-close-button"]}
                  >
                        Close
                  </button>
                  <div className={styles["settings"]}>
                        <GamePadSettings></GamePadSettings>
                  </div>
            </section>
      );
};
