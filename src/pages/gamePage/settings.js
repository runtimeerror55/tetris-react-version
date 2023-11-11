import styles from "./settings.module.css";
import { GamePadSettings } from "./gamePadSettings";
import { GoBackButton } from "../../components/navBar/buttons/goBack";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
import { CardOne } from "../../components/cards/cardOne";
export const Settings = ({ setShowSettingsOverLay, game }) => {
      const settingsOverlayCloseButtonClickHandler = () => {
            setShowSettingsOverLay(false);
      };
      const { theme } = useContext(themeContext);

      return (
            <CardOne
                  customClass={styles["settings-overlay"]}
                  customTag="section"
            >
                  <GoBackButton
                        onClickHandler={settingsOverlayCloseButtonClickHandler}
                  ></GoBackButton>
                  <div className={styles["settings"]}>
                        <GamePadSettings
                              game={game}
                              setShowSettingsOverLay={setShowSettingsOverLay}
                        ></GamePadSettings>
                  </div>
            </CardOne>
      );
};
