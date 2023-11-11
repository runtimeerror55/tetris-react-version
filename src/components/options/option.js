import { useContext } from "react";
import styles from "./option.module.css";
import { themeContext } from "../../context/theme";
export const Option = ({ children, attributes }) => {
      const { theme } = useContext(themeContext);
      return (
            <div
                  className={styles["option"] + " " + styles["option-" + theme]}
                  {...attributes}
            >
                  {children}
            </div>
      );
};
