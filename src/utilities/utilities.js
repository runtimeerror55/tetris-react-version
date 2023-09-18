export class Game {
      players;
      isGameStarted;
      isGameOver;
      joysticks;
      pause;
      randomTetrominoIndexes;
      tetrominos;
      gameLoopWaitCount;
      renderPlayersUi;
      CoordinatesAndColorsOfTetrominos;
      constructor(renderPlayersUi) {
            this.players = [new Player(0)];
            this.isGameStarted = false;
            this.isGameOver = null;
            this.pause = false;
            this.randomTetrominoIndexes = [
                  2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3,
                  2, 3, 2, 0, 1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1,
                  1, 2, 0, 0, 1, 1, 0, 1, 1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1,
                  0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3, 2, 0, 1, 2, 0, 2, 2, 3, 2,
                  1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 1,
                  3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0, 1,
                  3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1,
                  1, 0, 1, 1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2,
                  2, 3, 1, 1, 0, 3, 3, 2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3,
                  2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 1, 3, 2, 2, 1, 1,
                  3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3,
                  0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1, 1, 2,
                  0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0,
                  3, 3, 2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2,
                  1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3,
                  3, 3, 1, 3, 1, 3, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2,
                  2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1, 1, 2, 0, 2, 3, 1, 3,
                  3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3, 2, 0, 1,
                  2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2,
                  1, 2, 2, 2, 2, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1,
                  3, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0,
                  1, 1, 2, 0, 0, 1, 1, 0, 1, 1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1,
                  1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3, 2, 0, 1, 2, 0, 2, 2, 3,
                  2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2,
                  1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
                  1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0,
                  1, 1, 0, 1, 1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0,
                  2, 2, 3, 1, 1, 0, 3, 3, 2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1,
                  3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 1, 3, 2, 2, 1,
                  1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0, 1, 3, 0, 1, 2,
                  3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1, 1,
                  2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1,
                  0, 3, 3, 2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2,
                  2, 1, 1, 1, 2, 2, 1,
            ];
            this.tetrominos = [
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
            this.joysticks = [null, null, null, null];
            this.gameLoopWaitCount = 0;
            this.renderPlayersUi = renderPlayersUi;
            this.CoordinatesAndColorsOfTetrominos = [
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
            this.onJoyStickConnect();
            this.onJoystickDisconnect();
            this.onKeyboard();
      }

      gamepadLoop = () => {
            let isTrue = false;
            const joysticks = this.joysticks;
            const gamepads = navigator.getGamepads();
            joysticks.forEach((joystick, joystickIndex) => {
                  if (joystick) {
                        if (joystick.throttleCount < 10) {
                              joystick.throttleCount++;
                        }
                        const gamepad = gamepads[joystick.gamepad.index];
                        if (gamepad) {
                              gamepad.buttons.forEach((button, buttonIndex) => {
                                    if (button.pressed) {
                                          console.log(buttonIndex);
                                          if (
                                                joystick.previousPressedButtonIndex !==
                                                buttonIndex
                                          ) {
                                                finalInput(
                                                      joystick
                                                            .defaultKeyBindings[
                                                            buttonIndex
                                                      ],
                                                      this.players[
                                                            joystickIndex
                                                      ]
                                                );
                                                joystick.previousPressedButtonIndex =
                                                      buttonIndex;
                                                joystick.throttleCount = 0;
                                                isTrue = true;
                                          } else {
                                                if (
                                                      joystick.throttleCount ===
                                                      10
                                                ) {
                                                      finalInput(
                                                            joystick
                                                                  .defaultKeyBindings[
                                                                  buttonIndex
                                                            ],
                                                            this.players[
                                                                  joystickIndex
                                                            ]
                                                      );

                                                      joystick.throttleCount = 0;

                                                      isTrue = true;
                                                }
                                          }
                                    }
                              });
                        }
                  }
            });
            return isTrue;
      };
      gameLoop = () => {
            if (this.gamepadLoop.bind(this)()) {
                  this.renderPlayersUi({});
                  return;
            }

            this.gameLoopWaitCount++;
            if (this.gameLoopWaitCount === 30) {
                  this.players.forEach((player) => {
                        if (
                              isPossibleToMove(
                                    "ArrowDown",
                                    player.currentTetromino,
                                    player.boardMatrix
                              )
                        ) {
                              const newCoordinates = moveDown(
                                    player.currentTetromino
                              );

                              player.currentTetromino = newCoordinates;
                        } else {
                              updateplayerBoardMatrix(
                                    player.currentTetromino,
                                    player.boardMatrix
                              );
                              const destroyableRows =
                                    areThereAnydestroyableRows(
                                          player.currentTetromino,
                                          player.boardMatrix
                                    );

                              if (destroyableRows.length > 0) {
                                    destroy(
                                          destroyableRows,
                                          player.boardMatrix,
                                          player.renderUi
                                    );
                                    updateStats(player, destroyableRows.length);
                              }
                              player.currentIndexOfrandomTetrominoIndexes++;

                              const newCoordinates =
                                    this.CoordinatesAndColorsOfTetrominos[
                                          this.randomTetrominoIndexes[
                                                player
                                                      .currentIndexOfrandomTetrominoIndexes
                                          ]
                                    ];
                              player.currentTetromino = newCoordinates;
                        }
                  });
                  this.renderPlayersUi({});
                  this.gameLoopWaitCount = 0;
                  return;
            }

            requestAnimationFrame(this.gameLoop.bind(this));
      };

      onJoyStickConnect = () => {
            window.addEventListener("gamepadconnected", (event) => {
                  for (let i = 0; i < this.joysticks.length; i++) {
                        if (this.joysticks[i] === null) {
                              this.joysticks[i] = new Joystick(
                                    event.gamepad,
                                    i
                              );
                              console.log(this.joysticks);
                              return;
                        }
                  }
            });
      };
      onJoystickDisconnect = () => {
            window.addEventListener("gamepaddisconnected", (event) => {
                  console.log(event);
                  for (let i = 0; i < this.joysticks.length; i++) {
                        if (
                              this.joysticks[i].gamepad.index ===
                              event.gamepad.index
                        ) {
                              this.joysticks[i] = null;
                              console.log(this.joysticks);
                              return;
                        }
                  }
            });
      };

      onKeyboard = () => {
            window.addEventListener("keydown", (event) => {
                  console.log(event.key);
                  finalInput(event.key, this.players[0]);
            });
      };
}

export class Player {
      stats;
      isGameOver;
      number;
      currentTetromino;
      boardMatrix;
      renderUi;
      currentIndexOfrandomTetrominoIndexes;
      constructor(playerNumber) {
            this.stats = {
                  score: 0,
                  singleShots: 0,
                  doubleShots: 0,
                  tripleShots: 0,
            };
            this.isGameOver = false;
            this.number = playerNumber;
            this.currentIndexOfrandomTetrominoIndexes = 0;
            this.currentTetromino = {
                  allCoordinates: [
                        [0, 5],
                        [0, 6],
                        [1, 5],
                        [1, 6],
                  ],
                  colorClass: "square-tetromino-active",
            };
            this.boardMatrix = createPlayerBoardMatrix();
            this.renderUi = null;
      }
}

export class Joystick {
      previousPressedButtonIndex;
      throttleCount;
      gamepad;
      mappedPlayerNumber;
      defaultKeyBindings;
      constructor(gamepad, player) {
            this.previousPressedButtonIndex = null;
            this.throttleCount = 0;
            this.gamepad = gamepad;
            this.mappedPlayerNumber = player;
            this.defaultKeyBindings = [
                  null,
                  "rotate",
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  "ArrowDown",
                  "ArrowLeft",
                  "ArrowRight",
                  null,
            ];
      }
}

export const updateStats = (player, numberOfDestroyedRows) => {
      if (numberOfDestroyedRows === 1) {
            player.stats.singleShots++;
      } else if (numberOfDestroyedRows === 2) {
            player.stats.doubleShots++;
      } else if (numberOfDestroyedRows === 3) {
            player.stats.tripleShots++;
      }
      player.stats.score += numberOfDestroyedRows * 100 * numberOfDestroyedRows;
};
export const moveRight = (currentTetromino) => {
      const newTetromino = [];
      currentTetromino.allCoordinates.forEach((coordinates, index) => {
            newTetromino[index] = [coordinates[0], coordinates[1] + 1];
      });

      return {
            colorClass: currentTetromino["colorClass"],
            allCoordinates: newTetromino,
      };
};

export const moveDown = (currentTetromino) => {
      const newTetromino = [];
      currentTetromino.allCoordinates.forEach((coordinates, index) => {
            newTetromino[index] = [coordinates[0] + 1, coordinates[1]];
      });

      return {
            colorClass: currentTetromino["colorClass"],
            allCoordinates: newTetromino,
      };
};
export const moveLeft = (currentTetromino) => {
      const newTetromino = [];
      currentTetromino.allCoordinates.forEach((coordinates, index) => {
            newTetromino[index] = [coordinates[0], coordinates[1] - 1];
      });

      return {
            colorClass: currentTetromino["colorClass"],
            allCoordinates: newTetromino,
      };
};

export const isPossibleToMove = (
      direction,
      currentTetromino,
      playerBoardMatrix
) => {
      if (direction === "ArrowLeft") {
            return currentTetromino.allCoordinates.every((coordinates) => {
                  return (
                        coordinates[1] > 0 &&
                        !playerBoardMatrix[coordinates[0]][coordinates[1] - 1]
                  );
            });
      } else if (direction === "ArrowRight") {
            return currentTetromino.allCoordinates.every((coordinates) => {
                  return (
                        coordinates[1] < 14 &&
                        !playerBoardMatrix[coordinates[0]][coordinates[1] + 1]
                  );
            });
      } else if (direction === "ArrowDown") {
            return currentTetromino.allCoordinates.every((coordinates) => {
                  return (
                        coordinates[0] < 21 &&
                        !playerBoardMatrix[coordinates[0] + 1][coordinates[1]]
                  );
            });
      } else if ("setStartingPosition") {
            return currentTetromino.allCoordinates.every((coordinates) => {
                  return !playerBoardMatrix[coordinates[0]][coordinates[1]];
            });
      }
      return false;
};

export const createPlayerBoardMatrix = () => {
      const playerBoardMatrix = [];

      for (let i = 0; i < 22; i++) {
            playerBoardMatrix[i] = [];

            for (let j = 0; j < 16; j++) {
                  if (j === 15) {
                        playerBoardMatrix[i][j] = 0;
                  } else {
                        playerBoardMatrix[i].push("");
                  }
            }
      }
      return playerBoardMatrix;
};

export const updateplayerBoardMatrix = (
      currentTetromino,
      playerBoardMatrix
) => {
      currentTetromino.allCoordinates.forEach((coordinates) => {
            playerBoardMatrix[coordinates[0]][15]++;
            playerBoardMatrix[coordinates[0]][coordinates[1]] =
                  currentTetromino.colorClass;
      });
};

export const isRotationPossible = (currentTetromino, playerBoardMatrix) => {
      const x = currentTetromino.allCoordinates;
      const y = playerBoardMatrix;
      const setOfrotatedCoordinates = x.map((coordinates) => {
            return [
                  coordinates[1] - x[0][1] + x[0][0],
                  -(coordinates[0] - x[0][0]) + x[0][1],
            ];
      });

      const output = setOfrotatedCoordinates.every((coordinates) => {
            return (
                  coordinates[0] < 22 &&
                  coordinates[0] > -1 &&
                  coordinates[1] < 14 &&
                  coordinates[1] > -1 &&
                  !y[coordinates[0]][coordinates[1]]
            );
      });

      if (output) {
            return setOfrotatedCoordinates;
      } else {
            return false;
      }
};

export const areThereAnydestroyableRows = (
      currentTetromino,
      playerBoardMatrix
) => {
      let destroyableRows = new Set();
      currentTetromino.allCoordinates.forEach((coordinates) => {
            if (playerBoardMatrix[coordinates[0]][15] === 15) {
                  destroyableRows.add(coordinates[0]);
            }
      });

      destroyableRows = [...destroyableRows].sort((a, b) => {
            return a - b;
      });

      return destroyableRows;
};

export const shiftBlocks = (destroyableRows, playerBoardMatrix) => {
      destroyableRows.forEach((row) => {
            let currentRow = row;
            let upperRow = row - 1;
            while (playerBoardMatrix[upperRow][15]) {
                  playerBoardMatrix[currentRow].forEach((element, column) => {
                        if (column === 15) {
                              playerBoardMatrix[currentRow][15] =
                                    playerBoardMatrix[upperRow][15];
                              playerBoardMatrix[upperRow][15] = 0;
                        } else {
                              playerBoardMatrix[currentRow][column] =
                                    playerBoardMatrix[upperRow][column];

                              playerBoardMatrix[upperRow][column] = "";
                        }
                  });

                  currentRow--;
                  upperRow--;
            }
      });
};

export const destroy = (destroyableRows, playerBoardMatrix, setDestroy) => {
      let column = 0;
      const destroyAnimationLoop = () => {
            if (column === 15) {
                  destroyableRows.forEach((row) => {
                        playerBoardMatrix[row][column] = 0;
                  });
                  shiftBlocks(destroyableRows, playerBoardMatrix);
                  setDestroy({});
                  return;
            }

            destroyableRows.forEach((row) => {
                  playerBoardMatrix[row][column] = "";
            });
            column++;
            setDestroy({});
            requestAnimationFrame(destroyAnimationLoop);
      };
      requestAnimationFrame(destroyAnimationLoop);
};

export const finalInput = (direction, player) => {
      if (direction === "ArrowDown") {
            if (
                  isPossibleToMove(
                        "ArrowDown",
                        player.currentTetromino,
                        player.boardMatrix
                  )
            ) {
                  const newTetromino = moveDown(player.currentTetromino);

                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  return true;
            }
      } else if (direction === "ArrowLeft") {
            if (
                  isPossibleToMove(
                        "ArrowLeft",
                        player.currentTetromino,
                        player.boardMatrix
                  )
            ) {
                  const newTetromino = moveLeft(player.currentTetromino);

                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  return true;
            }
      } else if (direction === "ArrowRight") {
            if (
                  isPossibleToMove(
                        "ArrowRight",
                        player.currentTetromino,
                        player.boardMatrix
                  )
            ) {
                  const newTetromino = moveRight(player.currentTetromino);

                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  return true;
            }
      } else if (direction === "rotate") {
            const setOfrotatedCoordinates = isRotationPossible(
                  player.currentTetromino,
                  player.boardMatrix
            );
            if (setOfrotatedCoordinates) {
                  player.currentTetromino.allCoordinates =
                        setOfrotatedCoordinates;
                  player.renderUi({});
                  return true;
            }
      }
      return false;
};
