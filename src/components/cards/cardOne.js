import styles from "./cardOne.module.css";
import { themeContext } from "../../context/theme";
import { useContext } from "react";
export const CardOne = ({ customTag, children, attributes }) => {
      const { theme } = useContext(themeContext);

      if (attributes) {
            if (attributes.className) {
                  attributes.className =
                        attributes.className +
                        " " +
                        styles["card-one"] +
                        " " +
                        styles["card-one-" + theme];
            } else {
                  attributes.className =
                        styles["card-one"] + " " + styles["card-one-" + theme];
            }
      } else {
            attributes = {
                  className:
                        styles["card-one"] + " " + styles["card-one-" + theme],
            };
      }

      if (customTag === "section") {
            return <section {...attributes}>{children}</section>;
      } else {
            return <div {...attributes}>{children}</div>;
      }
};
