import styles from "./navBar.module.css";
export const NavBar = () => {
      return (
            <nav className={styles["navBar"]}>
                  <div className={styles["logo"]}>TETRIS</div>
                  <div className={styles["nav-links"]}>
                        <a href="/" className={styles["nav-link"]}>
                              HOME
                        </a>
                        <a href="/stats" className={styles["nav-link"]}>
                              STATS
                        </a>
                        <a href="/login" className={styles["nav-link"]}>
                              LOGIN
                        </a>
                        <a href="/register" className={styles["nav-link"]}>
                              REGISTER
                        </a>
                  </div>
            </nav>
      );
};
