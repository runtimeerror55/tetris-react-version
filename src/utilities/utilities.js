import { Howl } from "howler";
import laserGunShotSoundPath from "../assets/sounds/laserGunShot.wav";
import fallPath from "../assets/sounds/fireball.wav";
import glassBreakPath from "../assets/sounds/laserInSpace.wav";
import gameOverPath from "../assets/sounds/gameOver.wav";
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
      renderGameResult;
      CoordinatesAndColorsOfTetrominos;
      sounds;
      anyGameStarted;
      constructor(renderPlayersUi, renderGameResult) {
            this.isGameStarted = false;
            this.isGameOver = null;
            this.pause = false;
            this.renderGameResult = renderGameResult;
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
            this.randomTetrominoIndexes = this.generateNewTetrominoIndexes();

            this.players = [
                  new Player(
                        0,
                        this.CoordinatesAndColorsOfTetrominos[
                              this.randomTetrominoIndexes[0]
                        ]
                  ),
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
            this.anyGameStarted = false;
            this.onJoyStickConnect();
            this.onJoystickDisconnect();
            this.onKeyboard();
            this.sounds = {
                  laserGunShotSound: new Howl({
                        src: [laserGunShotSoundPath],
                  }),

                  fall: new Howl({
                        src: [fallPath],
                  }),

                  glassBreak: new Howl({
                        src: [glassBreakPath],
                  }),

                  gameOver: new Howl({
                        src: [gameOverPath],
                  }),
            };
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
                                                      ],
                                                      this.sounds,
                                                      gamepad
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
                                                            ],
                                                            this.sounds
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
            this.gamepadLoop.bind(this)();

            this.gameLoopWaitCount++;
            if (this.gameLoopWaitCount === 30) {
                  this.players.forEach((player, index) => {
                        if (!finalInput("ArrowDown", player)) {
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
                                          player.renderUi,
                                          this.sounds
                                    );
                                    if (this.joysticks[index]) {
                                          let duration =
                                                (destroyableRows.length - 1) *
                                                      200 +
                                                200;
                                          this.joysticks[
                                                index
                                          ].gamepad.vibrationActuator.playEffect(
                                                "dual-rumble",
                                                {
                                                      startDelay: 0,
                                                      duration: duration,
                                                      weakMagnitude: 1.0,
                                                      strongMagnitude: 1.0,
                                                }
                                          );
                                    }
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
                              if (!finalInput("startingPosition", player)) {
                                    player.isGameOver = true;
                                    this.isGameOver = true;
                                    this.renderGameResult(true);
                              }
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
                  if (this.isGameStarted) {
                        console.log(event.key);
                        finalInput(event.key, this.players[0], this.sounds);
                  }
            });
      };

      start = () => {
            this.isGameStarted = true;
            this.renderPlayersUi({});
      };

      reset = () => {
            this.isGameOver = false;
            this.isGameStarted = false;
            this.pause = false;
            this.randomTetrominoIndexes = this.generateNewTetrominoIndexes();
            this.gameLoopWaitCount = 0;
            this.players.forEach((player) => {
                  player.reset(
                        this.CoordinatesAndColorsOfTetrominos[
                              this.randomTetrominoIndexes[0]
                        ]
                  );
            });
            // this.joysticks.forEach((joystick) => {
            //       if (joystick) {
            //             joystick.reset();
            //       }
            // });
      };

      generateNewTetrominoIndexes = () => {
            let a = [];
            for (let i = 0; i < 500; i++) {
                  const randomInteger = Math.ceil(Math.random() * 4);
                  a.push(randomInteger);
            }
            console.log(a);
            return a;
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
      constructor(playerNumber, startingTetromino) {
            this.stats = {
                  score: 1000,
                  singleShots: 5,
                  doubleShots: 4,
                  tripleShots: 2,
            };
            this.isGameOver = false;
            this.number = playerNumber;
            this.currentIndexOfrandomTetrominoIndexes = 0;
            this.currentTetromino = startingTetromino;
            this.boardMatrix = createPlayerBoardMatrix();
            this.renderUi = null;
      }

      reset = (currentTetromino) => {
            this.stats.score = 0;
            this.stats.singleShots = 0;
            this.stats.doubleShots = 0;
            this.stats.tripleShots = 0;
            this.currentIndexOfrandomTetrominoIndexes = 0;
            this.currentTetromino = currentTetromino;
            let rows = this.boardMatrix.length;
            for (let i = 0; i < rows; i++) {
                  const columns = this.boardMatrix[i].length;
                  for (let j = 0; j < columns; j++) {
                        if (j === 15) {
                              this.boardMatrix[i][j] = 0;
                        } else {
                              this.boardMatrix[i][j] = "";
                        }
                  }
            }
      };
}

export class Joystick {
      previousPressedButtonIndex;
      throttleCount;
      gamepad;
      mappedPlayerNumber;
      defaultKeyBindings;
      navigationKeyBindings;
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
            this.navigationKeyBindings = [
                  null,
                  null,
                  "Enter",
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  null,
                  "ArrowUp",
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
      } else if ("startingPosition") {
            return currentTetromino.allCoordinates.every((coordinates) => {
                  return !playerBoardMatrix[coordinates[0]][coordinates[1]];
            });
      }
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

export const destroy = (
      destroyableRows,
      playerBoardMatrix,
      setDestroy,
      sounds
) => {
      let column = 0;
      let throttleCount = 0;
      sounds.glassBreak.play();

      const destroyAnimationLoop = () => {
            throttleCount++;
            if (throttleCount === 2) {
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
                  throttleCount = 0;
            }
            requestAnimationFrame(destroyAnimationLoop);
      };
      requestAnimationFrame(destroyAnimationLoop);
};

export const finalInput = (direction, player, sounds, gamepad) => {
      if (direction === "ArrowDown") {
            if (
                  isPossibleToMove(
                        "ArrowDown",
                        player.currentTetromino,
                        player.boardMatrix
                  )
            ) {
                  const newTetromino = moveDown(player.currentTetromino);

                  if (sounds) {
                        sounds.fall.play();
                  }
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

                  if (sounds) {
                        sounds.fall.play();
                  }
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

                  if (sounds) {
                        sounds.fall.play();
                  }
                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  return true;
            }
      } else if (direction === " " || direction === "rotate") {
            const setOfrotatedCoordinates = isRotationPossible(
                  player.currentTetromino,
                  player.boardMatrix
            );
            if (setOfrotatedCoordinates) {
                  if (sounds) {
                        sounds.fall.play();
                  }
                  player.currentTetromino.allCoordinates =
                        setOfrotatedCoordinates;
                  player.renderUi({});
                  return true;
            }
      } else if (direction === "startingPosition") {
            if (
                  isPossibleToMove(
                        "startingPosition",
                        player.currentTetromino,
                        player.boardMatrix
                  )
            ) {
                  return true;
            }
      }
      return false;
};
