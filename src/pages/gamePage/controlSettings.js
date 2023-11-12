import styles from "./controlSettings.module.css";
import { GamePadSettings } from "./gamePadSettings";
import { GoBackButton } from "../../components/navBar/buttons/goBack";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
import { CardOne } from "../../components/cards/cardOne";
export const ControlSettings = ({ setShowSettingsOverLay, game }) => {
      const settingsOverlayCloseButtonClickHandler = () => {
            setShowSettingsOverLay(false);
      };

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
