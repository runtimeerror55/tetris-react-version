let x = 0;
let y = {};
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
      }

      gamepadLoop = () => {
            const joysticks = this.joysticks;
            const gamepads = navigator.getGamepads();
            joysticks.forEach((joystick) => {
                  if (joystick) {
                        if (joystick.throttleCount < 13) {
                              joystick.throttleCount++;
                        }
                        const gamepad = gamepads[joystick.gamepad.index];
                        if (gamepad) {
                              gamepad.buttons.forEach((button, buttonIndex) => {
                                    if (button.pressed) {
                                          if (
                                                joystick.previousPressedButtonIndex !==
                                                buttonIndex
                                          ) {
                                                console.log(buttonIndex);
                                                joystick.previousPressedButtonIndex =
                                                      buttonIndex;
                                                joystick.throttleCount = 0;
                                          } else {
                                                if (
                                                      joystick.throttleCount ===
                                                      13
                                                ) {
                                                      console.log(buttonIndex);
                                                      joystick.throttleCount = 0;
                                                }
                                          }
                                    }
                              });
                        }
                  }
            });
      };
      gameLoop = () => {
            this.gamepadLoop.bind(this)();

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
                                    console.log(destroyableRows);
                                    destroy(
                                          destroyableRows,
                                          player.boardMatrix,
                                          player.renderUi
                                    );
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
                  console.log(event);
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

export class GamepadInput {
      defualtGameControlsMapping;
      connectedControllers;
      mappedPlayers;
      constructor() {
            this.connectedControllers = [null];
            this.defualtGameControlsMapping = [
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
            this.onConnect();
      }
      onConnect = () => {
            window.addEventListener("gamepadconnected", (event) => {
                  console.log(event);

                  this.connectedControllers[event.gamepad.index] = {
                        mappedGameControls: this.defualtGameControlsMapping,
                        mappedPlayer: event.gamepad.index,
                        gamepad: event.gamepad,
                        previousPressedButton: null,
                        count: 0,
                  };
            });
      };
      onDisconnect = () => {
            window.addEventListener("gamepaddisconnected", (event) => {
                  console.log(event);
                  this.connectedControllers[event.gamepad.index] = null;
            });
      };

      updateGameControlsMapping = (controllerIndex, buttonIndex, action) => {
            let mappedAction =
                  this.connectedControllers[controllerIndex].mappedGameControls[
                        buttonIndex
                  ];
            if (mappedAction !== null && mappedAction !== action) {
                  return `already mapped to ${mappedAction}`;
            } else {
                  this.connectedControllers[controllerIndex].mappedGameControls[
                        buttonIndex
                  ] = action;
            }
      };
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
            console.log(row);
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
                  console.log(
                        playerBoardMatrix[currentRow][15],
                        playerBoardMatrix[upperRow][15]
                  );
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
