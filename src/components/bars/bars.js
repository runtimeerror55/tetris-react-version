import { useEffect, useState } from "react";
import styles from "./bars.module.css";

export const Bars = () => {
      const [count, setCount] = useState(-1);
      useEffect(() => {
            for (let i = 0; i < 8; i++) {
                  setTimeout(() => {
                        setCount((previous) => {
                              return previous + 1;
                        });
                  }, (i + 1) * 100);
            }
      }, []);
      return (
            <section className={styles["bars-section"]}>
                  <div
                        className={
                              0 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              1 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              2 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              3 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              4 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              5 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              6 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              7 <= count
                                    ? styles["bar"] + " " + styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
            </section>
      );
};
