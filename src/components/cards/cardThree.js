import styles from "./cardThree.module.css";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
export const CardThree = ({
      customClass,
      tabIndex,
      onClick,
      children,
      testId,
}) => {
      const { theme } = useContext(themeContext);
      const className = customClass
            ? customClass +
              " " +
              //   styles["card-three"] +
              //   " " +
              styles["card-three-" + theme]
            : styles["card-three"] + " " + styles["card-three-" + theme];

      return (
            <div
                  className={className}
                  tabIndex={tabIndex}
                  onClick={onClick}
                  data-testid={testId ? testId : null}
            >
                  {children}
            </div>
      );
};
