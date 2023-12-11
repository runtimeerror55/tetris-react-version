import { useState, useMemo, useEffect } from "react";
import styles from "./gamePage.module.css";
import { PlayerJsx } from "./player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "../../utilities/utilities";
import { Menu } from "./menu";
import { StartTimer } from "./startTimer";
import { GameResult } from "./result";
import { CardOne } from "../../components/cards/cardOne";
import { Bars } from "../../components/bars/bars";

export const GamePage = () => {
      const [renderPlayersUi, setRenderPlayersUi] = useState({});
      const [showGameStartTimer, setShowGameStartTimer] = useState(false);
      const [showGameResult, setShowGameResult] = useState(false);
      const [showMenuOverlay, setShowMenuOverlay] = useState(true);
      const [showGame, setShowGame] = useState(false);

      const game = useMemo(() => {
            return new Game(
                  setRenderPlayersUi,
                  setShowGameResult,
                  setShowMenuOverlay,
                  20,
                  10,
                  30
            );
      }, []);
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
            });
      }, []);

      return (
            <>
                  <CardOne
                        customTag="div"
                        attributes={{
                              className:
                                    styles["page"] +
                                    " " +
                                    styles["page-animation"],
                        }}
                  >
                        <ToastContainer></ToastContainer>

                        <main className={styles["main"]}>
                              {showGame
                                    ? game.players.map((player) => {
                                            return (
                                                  <>
                                                        <PlayerJsx
                                                              player={player}
                                                              game={game}
                                                              key={
                                                                    "player " +
                                                                    player.number
                                                              }
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
                                          setShowGame={setShowGame}
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
                                          setShowGame={setShowGame}
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
                                          setShowMenuOverlay={
                                                setShowMenuOverlay
                                          }
                                    ></GameResult>
                              ) : (
                                    ""
                              )}
                        </main>
                  </CardOne>
            </>
      );
};
