import { useEffect, useState } from "react";
import styles from "./bars.module.css";

export const Bars = ({ setShowBars }) => {
      const [count, setCount] = useState(-1);
      useEffect(() => {
            for (let i = 0; i < 20; i++) {
                  setTimeout(() => {
                        setCount((previous) => {
                              return previous + 1;
                        });
                  }, (i + 1) * 100);
            }
      }, []);
      useEffect(() => {
            if (count === 10) {
                  for (let i = 0; i < 30; i++) {
                        setTimeout(() => {
                              setCount((previous) => {
                                    return previous + 1;
                              });
                        }, (i + 1) * 100);
                  }
            }
            if (count === 18) {
                  setTimeout(() => {
                        setShowBars(false);
                  }, 1000);
            }
      });
      return (
            <section className={styles["bars-section"]}>
                  <div
                        className={
                              0 <= count
                                    ? 11 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              1 <= count
                                    ? 13 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              2 <= count
                                    ? 15 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              3 <= count
                                    ? 17 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              4 <= count
                                    ? 19 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              5 <= count
                                    ? 21 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              6 <= count
                                    ? 23 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
                  <div
                        className={
                              7 <= count
                                    ? 25 <= count
                                          ? styles["bar"] +
                                            " " +
                                            styles["bar-shift-side"] +
                                            " " +
                                            styles["bars-close"]
                                          : styles["bar"] +
                                            " " +
                                            styles["bar-start"]
                                    : styles["bar"]
                        }
                  ></div>
            </section>
      );
};
