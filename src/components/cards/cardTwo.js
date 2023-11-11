import styles from "./cardTwo.module.css";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
export const CardTwo = ({ customClass, children }) => {
      const { theme } = useContext(themeContext);
      const className = customClass
            ? customClass + " " + styles["card-two-" + theme]
            : styles["card-two-" + theme];

      return <div className={className}>{children}</div>;
};
