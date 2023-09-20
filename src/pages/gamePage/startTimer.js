import { useState } from "react";
import styles from "./startTimer.module.css";
import { useEffect } from "react";
import countingSoundPath from "../../assets/sounds/counting.mp3";
import { Howl } from "howler";
export const StartTimer = ({ setShowGameStartTimer, game }) => {
      const [time, setTime] = useState(3);
      const [timerId, setTimerId] = useState(null);
      const [countingSound, setCountingSound] = useState(
            new Howl({
                  src: [countingSoundPath],
            })
      );

      useEffect(() => {
            const id = setInterval(() => {
                  setTime((previous) => {
                        return previous - 1;
                  });
            }, 900);
            setTimerId(id);
            countingSound.play();
      }, []);
      useEffect(() => {
            if (time === 0) {
                  clearTimeout(timerId);
                  setShowGameStartTimer(false);
                  game.start();
            }
      }, [time]);
      return (
            <section className={styles["start-timer-section"]}>
                  <p className={styles["time"]}>{time}</p>
            </section>
      );
};
