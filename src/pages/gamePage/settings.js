import styles from "./settings.module.css";
import { GamePadSettings } from "./gamePadSettings";
import { GoBackButton } from "../../components/navBar/buttons/goBack";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
export const Settings = ({ setShowSettingsOverLay, game }) => {
      const settingsOverlayCloseButtonClickHandler = () => {
            setShowSettingsOverLay(false);
      };
      return (
            <section className={styles["settings-overlay"]}>
                  <GoBackButton
                        onClickHandler={settingsOverlayCloseButtonClickHandler}
                  ></GoBackButton>
                  <div className={styles["settings"]}>
                        <GamePadSettings
                              game={game}
                              setShowSettingsOverLay={setShowSettingsOverLay}
                        ></GamePadSettings>
                  </div>
            </section>
      );
};
