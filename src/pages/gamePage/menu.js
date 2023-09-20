import { useEffect, useMemo, useState } from "react";
import styles from "./menu.module.css";
import { Settings } from "./settings";
import menuNavigationSoundPath from "../../assets/sounds/navigation.m4a";
import { Howl } from "howler";
const navigationSound = new Howl({
      src: [menuNavigationSoundPath],
});
export const Menu = ({ setShowMenuOverlay, game, setShowGameStartTimer }) => {
      const [showSettingsOveryLay, setShowSettingsOverLay] = useState(false);

      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, []);
      const meuOverlayCloseButtonClickHandler = () => {
            setShowMenuOverlay(false);
            setShowGameStartTimer(true);
      };

      const controlsClickHandler = () => {
            setShowSettingsOverLay(true);
      };

      const menuOverlayKeyDownHandler = (event) => {
            if (event.key === "ArrowDown") {
                  console.log(focusableElements);
                  if (
                        focusableElements.index ===
                        focusableElements.elements.length - 1
                  ) {
                        focusableElements.index = 0;
                  } else {
                        focusableElements.index++;
                  }
                  navigationSound.play();
                  focusableElements.elements[focusableElements.index].focus();
            } else if (event.key === "ArrowUp") {
                  if (focusableElements.index === 0) {
                        return;
                  } else {
                        navigationSound.play();
                        focusableElements.index--;
                        focusableElements.elements[
                              focusableElements.index
                        ].focus();
                  }
            }
      };

      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='0']");
            focusableElements.elements[0].focus();
            console.log(focusableElements);
      }, []);

      const gamepadLoop = () => {};
      useEffect(() => {
            gamepadLoop();
      }, []);
      return (
            <>
                  <section
                        className={styles["menu-overlay-section"]}
                        onKeyDown={menuOverlayKeyDownHandler}
                        tabIndex={-1}
                  >
                        {/* <button
                              onClick={meuOverlayCloseButtonClickHandler}
                              className={styles["menu-overlay-close-button"]}
                              tabIndex={-1}
                        >
                              Close
                        </button> */}
                        <div
                              className={styles["option"]}
                              tabIndex={0}
                              onClick={meuOverlayCloseButtonClickHandler}
                        >
                              NEW GAME
                        </div>
                        <div className={styles["option"]} tabIndex={0}>
                              RESUME GAME
                        </div>
                        <div
                              className={styles["option"]}
                              onClick={controlsClickHandler}
                              tabIndex={0}
                        >
                              CONTROLS
                        </div>
                        <div className={styles["option"]} tabIndex={0}>
                              SOUNDS
                        </div>
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
