import styles from "./cardOne.module.css";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
export const CardOne = ({
      customClass,
      customTag,
      keyDownHandler,
      children,
}) => {
      const { theme } = useContext(themeContext);
      const className = customClass
            ? styles["card-one-" + theme] + " " + customClass
            : styles["card-one-" + theme];

      if (customTag === "section") {
            return (
                  <section
                        className={className}
                        onKeyDown={keyDownHandler ? keyDownHandler : null}
                  >
                        {children}
                  </section>
            );
      } else {
            console.log("yes");
            return (
                  <div
                        className={className}
                        onKeyDown={keyDownHandler ? keyDownHandler : null}
                  >
                        {children}
                  </div>
            );
      }
};
