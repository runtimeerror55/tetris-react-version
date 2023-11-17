import styles from "./options.module.css";
import { useEffect, useMemo, useContext } from "react";
import { themeContext } from "../../context/theme";
import { navigationGamepadLoop } from "../../utilities/utilities";
export const Options = ({
      game,
      setShowOptions,
      previousGamepadLoop,
      clickHandler,
      attributes,
      children,
      showBottom,
}) => {
      const focusableElements = useMemo(() => {
            return { elements: null, index: 0 };
      }, []);
      const currentGamePadLoopState = useMemo(() => {
            return {
                  run: true,
            };
      }, []);
      const { theme } = useContext(themeContext);

      const controllerSettingsOverlayKeyDownHandler = (event) => {
            if (event.stopPropagation) {
                  event.stopPropagation();
            }
            if (event.preventDefault) {
                  event.preventDefault();
            }
            if (event.key === "ArrowDown") {
                  if (
                        focusableElements.index ===
                        focusableElements.elements.length - 1
                  ) {
                        focusableElements.index = 0;
                  } else {
                        focusableElements.index++;
                  }
                  game.sounds.navigationSound.play();
                  focusableElements.elements[focusableElements.index].focus();
            } else if (event.key === "ArrowUp") {
                  if (
                        focusableElements.index === 0 ||
                        focusableElements.index === -1
                  ) {
                        return;
                  } else {
                        game.sounds.navigationSound.play();
                        focusableElements.index--;
                        focusableElements.elements[
                              focusableElements.index
                        ].focus();
                  }
            } else if (event.key === "Enter") {
                  focusableElements.elements[focusableElements.index].click();
            } else if (event.key === "Back" || event.key === "Backspace") {
                  game.sounds.clickSound.play();
                  currentGamePadLoopState.run = false;
                  setShowOptions(false);
                  previousGamepadLoop.gamepadLoopState.run = true;
                  previousGamepadLoop.setStartGamePadLoop(true);
            }
      };

      useEffect(() => {
            navigationGamepadLoop(
                  game,
                  controllerSettingsOverlayKeyDownHandler,
                  currentGamePadLoopState
            );
            previousGamepadLoop.gamepadLoopState.run = false;
            previousGamepadLoop.setStartGamePadLoop(false);
      }, []);
      useEffect(() => {
            focusableElements.elements =
                  document.querySelectorAll("[tabindex='3']");
            focusableElements.elements[focusableElements.index]?.focus();
      });

      let className = styles["options"] + " " + styles["options-" + theme];
      if (!showBottom) {
            className = className + " " + styles["show-top"];
      }

      return (
            <div
                  className={className}
                  onClick={(event) => {
                        clickHandler(event, currentGamePadLoopState);
                  }}
                  {...attributes}
                  onKeyDown={controllerSettingsOverlayKeyDownHandler}
            >
                  {children}
            </div>
      );
};
