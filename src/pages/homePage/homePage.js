import styles from "./homePage.module.css";
import { NavBar } from "../../components/navBar/navBar";
export const HomePage = () => {
      return (
            <>
                  <div className={styles["page"]}>
                        <NavBar></NavBar>
                        <main className={styles["main"]}>
                              <div>
                                    <button className={styles["button"]}>
                                          <a
                                                href="/play"
                                                className={
                                                      styles["button-link"]
                                                }
                                          >
                                                SINGLE PLAYER
                                          </a>
                                    </button>
                                    <button className={styles["button"]}>
                                          <a
                                                href="/gameArena"
                                                className={
                                                      styles["button-link"]
                                                }
                                          >
                                                MULTI PLAYER
                                          </a>
                                    </button>
                              </div>
                        </main>
                  </div>
            </>
      );
};
