import { useState, useMemo, useEffect } from "react";
import styles from "./gamePage.module.css";
import { NavBar } from "../../components/navBar/navBar";
import { PlayerJsx } from "./player";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
      moveDown,
      moveRight,
      createPlayerBoardMatrix,
      isPossibleToMove,
      updateplayerBoardMatrix,
      moveLeft,
      isRotationPossible,
      areThereAnydestroyableRows,
      destroy,
      Player,
      Game,
      Controller,
} from "../../utilities/utilities";
import { Menu } from "./menu";
import { ControllerProvider } from "../../context/controller";
const CoordinatesAndColorsOfTetrominos = [
      {
            allCoordinates: [
                  [0, 5],
                  [1, 5],
                  [2, 5],
                  [2, 6],
            ],
            colorClass: "l-tetromino-active",
      }, // l tetromino
      {
            allCoordinates: [
                  [0, 5],
                  [0, 6],
                  [0, 7],
                  [1, 6],
            ],
            colorClass: "t-tetromino-active",
      }, // t tetromino

      {
            allCoordinates: [
                  [0, 5],
                  [0, 6],
                  [1, 5],
                  [1, 6],
            ],
            colorClass: "square-tetromino-active",
      }, // square

      {
            allCoordinates: [
                  [0, 5],
                  [0, 6],
                  [0, 7],
                  [0, 8],
            ],
            colorClass: "line-tetromino-active",
      }, // line tetromino

      {
            allCoordinates: [
                  [0, 5],
                  [1, 5],
                  [1, 6],
                  [2, 6],
            ],
            colorClass: "z-tetromino-active",
      }, // skew tetromino
];
let randomGeneratedTetrominos = [
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
      2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
];

let count = 0;
window.addEventListener("gamepadconnected", (e) => {
      console.log(
            "Gamepad connected at index %d: %s. %d buttons, %d axes.",
            e.gamepad.index,
            e.gamepad.id,
            e.gamepad.buttons.length,
            e.gamepad.axes.length
      );
});

export const GamePage = () => {
      const [renderPlayersUi, setRenderPlayersUi] = useState({});
      const game = useMemo(() => {
            return new Game(setRenderPlayersUi);
      }, []);

      useEffect(() => {
            game.gameLoop();
      }, [renderPlayersUi]);

      const [showMenyOverlay, setShowMenyOverlay] = useState(false);
      const pageKeyDownHandler = (event) => {
            if (event.key === "Escape") {
                  setShowMenyOverlay((previous) => {
                        console.log(previous);
                        return !previous;
                  });
            } else if (event.key === "ArrowDown") {
                  if (
                        isPossibleToMove(
                              event.key,
                              game.players[0].currentTetromino,
                              game.players[0].playerBoardMatrix
                        )
                  ) {
                        const newCoordinates = moveDown(
                              game.players[0].currentTetromino
                        );
                        game.players[0].currentTetromino = newCoordinates;
                        game.players[0].renderUi({});
                  }
            }
      };

      return (
            <>
                  <div
                        className={styles["page"]}
                        onKeyDown={pageKeyDownHandler}
                        tabIndex={0}
                  >
                        <ToastContainer></ToastContainer>
                        <NavBar></NavBar>
                        <main className={styles["main"]}>
                              {game.players.map((player) => {
                                    return (
                                          <>
                                                <PlayerJsx
                                                      player={player}
                                                ></PlayerJsx>
                                          </>
                                    );
                              })}
                              {showMenyOverlay ? (
                                    <ControllerProvider>
                                          <Menu
                                                setShowMenyOverlay={
                                                      setShowMenyOverlay
                                                }
                                          ></Menu>
                                    </ControllerProvider>
                              ) : (
                                    ""
                              )}
                        </main>
                  </div>
            </>
      );
};

// const gameLoop = () => {
//     // if (gamepadLoop()) {
//     //       count = 0;
//     //       return;
//     // }
//     count++;
//     if (count === 30) {
//           playerNames.forEach((playerName) => {
//                 if (
//                       isPossibleToMove(
//                             "ArrowDown",
//                             currentTetromino[playerName],
//                             matrixes[playerName]
//                       )
//                 ) {
//                       const newCoordinates = moveDown(
//                             currentTetromino[playerName]
//                       );
//                       currentTetromino[playerName] = newCoordinates;

//                       setF({});
//                 } else {
//                       updateplayerBoardMatrix(
//                             currentTetromino[playerName],
//                             matrixes[playerName]
//                       );
//                       const destroyableRows =
//                             areThereAnydestroyableRows(
//                                   currentTetromino[playerName],
//                                   matrixes[playerName]
//                             );

//                       if (destroyableRows.length > 0) {
//                             console.log(destroyableRows);
//                             destroy(
//                                   destroyableRows,
//                                   matrixes[playerName],
//                                   setDestroy
//                             );
//                       }
//                       indexes[playerName]++;
//                       const newCoordinates =
//                             CoordinatesAndColorsOfTetrominos[
//                                   randomGeneratedTetrominos[
//                                         indexes[playerName] + 1
//                                   ]
//                             ];
//                       currentTetromino[playerName] = newCoordinates;

//                       setF({});
//                 }
//           });

//           count = 0;
//           countOne++;
//           return;
//     }

//     requestAnimationFrame(gameLoop);
// };
//   let gamepadLoop = () => {
//             let isPressed = false;
//             navigator.getGamepads()[0]?.buttons.forEach((button, index) => {
//                   if (button.pressed) {
//                         console.log(index);
//                         if (!pressed && index === 14) {
//                               if (
//                                     isPossibleToMove(
//                                           "ArrowLeft",
//                                           currentTetromino["one"],
//                                           matrixes["one"]
//                                     )
//                               ) {
//                                     isPressed = true;
//                                     const newCoordinates = moveLeft(
//                                           currentTetromino["one"]
//                                     );
//                                     console.log(
//                                           currentTetromino["one"],
//                                           newCoordinates
//                                     );
//                                     currentTetromino["one"] = newCoordinates;
//                                     setF({});
//                               } else {
//                                     isPressed = false;
//                               }
//                               pressed = true;
//                         } else if (!downPressed && index === 13) {
//                               if (
//                                     isPossibleToMove(
//                                           "ArrowDown",
//                                           currentTetromino["one"],
//                                           matrixes["one"]
//                                     )
//                               ) {
//                                     isPressed = true;
//                                     const newCoordinates = moveDown(
//                                           currentTetromino["one"]
//                                     );

//                                     currentTetromino["one"] = newCoordinates;
//                                     setF({});
//                               }
//                               downPressed = true;
//                         } else if (!rightPressed && index === 15) {
//                               if (
//                                     isPossibleToMove(
//                                           "ArrowRight",
//                                           currentTetromino["one"],
//                                           matrixes["one"]
//                                     )
//                               ) {
//                                     isPressed = true;
//                                     const newCoordinates = moveRight(
//                                           currentTetromino["one"]
//                                     );

//                                     currentTetromino["one"] = newCoordinates;
//                                     setF({});
//                               }
//                               rightPressed = true;
//                         } else if (!redPressed && index === 1) {
//                               const setOfrotatedCoordinates =
//                                     isRotationPossible(
//                                           currentTetromino["one"],
//                                           matrixes["one"]
//                                     );
//                               if (setOfrotatedCoordinates) {
//                                     isPressed = true;
//                                     currentTetromino["one"].allCoordinates =
//                                           setOfrotatedCoordinates;
//                                     setF({});
//                               }
//                               redPressed = true;
//                         }
//                   }
//                   if (!button.pressed) {
//                         if (index === 14) {
//                               pressed = false;
//                         }
//                         if (index === 13) {
//                               downPressed = false;
//                         }
//                         if (index === 15) {
//                               rightPressed = false;
//                         }
//                         if (index === 1) {
//                               redPressed = false;
//                         }
//                   }
//             });
//             return isPressed;
//       };
