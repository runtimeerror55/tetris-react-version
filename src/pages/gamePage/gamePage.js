import { useState, useMemo, useEffect } from "react";
import styles from "./gamePage.module.css";
import { NavBar } from "../../components/navBar/navBar";
import { PlayerJsx } from "./player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "../../utilities/utilities";
import { Menu } from "./menu";
import { StartTimer } from "./startTimer";
import { GameResult } from "./result";

export const GamePage = () => {
      const [renderPlayersUi, setRenderPlayersUi] = useState({});
      const [showGameStartTimer, setShowGameStartTimer] = useState(false);
      const [showGameResult, setShowGameResult] = useState(false);
      const game = useMemo(() => {
            return new Game(setRenderPlayersUi, setShowGameResult);
      }, []);

      const [showMenuOverlay, setShowMenuOverlay] = useState(true);
      const [showGame, setShowGame] = useState(true);
      useEffect(() => {
            if (!game.pause && game.isGameStarted && !game.isGameOver) {
                  game.gameLoop();
            }
      }, [renderPlayersUi, game.pause]);

      useEffect(() => {
            window.addEventListener("keydown", (event) => {
                  if (event.key === "Escape") {
                        if (game.isGameStarted) {
                              setShowMenuOverlay((previous) => {
                                    return !previous;
                              });
                              game.pause = !game.pause;
                        }
                  }
                  console.log(game.pause);
            });
      }, []);

      return (
            <>
                  <div className={styles["page"]} tabIndex={-1}>
                        <ToastContainer></ToastContainer>
                        <NavBar></NavBar>
                        <main className={styles["main"]}>
                              {showGame
                                    ? game.players.map((player) => {
                                            return (
                                                  <>
                                                        <PlayerJsx
                                                              player={player}
                                                        ></PlayerJsx>
                                                  </>
                                            );
                                      })
                                    : ""}
                              {showMenuOverlay ? (
                                    <Menu
                                          setShowMenuOverlay={
                                                setShowMenuOverlay
                                          }
                                          setShowGameStartTimer={
                                                setShowGameStartTimer
                                          }
                                          game={game}
                                    ></Menu>
                              ) : (
                                    ""
                              )}
                              {showGameStartTimer ? (
                                    <StartTimer
                                          setShowGameStartTimer={
                                                setShowGameStartTimer
                                          }
                                          game={game}
                                    ></StartTimer>
                              ) : (
                                    ""
                              )}
                              {showGameResult ? (
                                    <GameResult
                                          setShowGameResult={setShowGameResult}
                                          game={game}
                                          setShowGameStartTimer={
                                                setShowGameStartTimer
                                          }
                                    ></GameResult>
                              ) : (
                                    ""
                              )}
                        </main>
                  </div>
            </>
      );
};
