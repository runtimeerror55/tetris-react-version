import { Howl } from "howler";
import laserGunShotSoundPath from "../assets/sounds/laserGunShot.wav";
import fallPath from "../assets/sounds/fireball.wav";
import glassBreakPath from "../assets/sounds/laserInSpace.wav";
import gameOverPath from "../assets/sounds/gameOver.wav";
import navigationSoundPath from "../assets/sounds/navigation.m4a";
import clickSoundPath from "../assets/sounds/click.mp3";

import { toast } from "react-toastify";
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
      keyBoard;
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
            this.keyBoard = new KeyBoard();
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
                  navigationSound: new Howl({
                        src: [navigationSoundPath],
                  }),
                  clickSound: new Howl({
                        src: [clickSoundPath],
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
                              this.renderPlayersUi({});
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
                  if (this.isGameStarted && !this.pause && !this.isGameOver) {
                        if (
                              !this.keyBoard.keyBoardMapping[event.key] ||
                              !this.keyBoard.keyBoardMapping[event.key]
                                    .playerNumber
                        ) {
                              return;
                        }
                        const playerNumber =
                              this.keyBoard.keyBoardMapping[event.key]
                                    .playerNumber;
                        const bindingValue =
                              this.keyBoard.keyBoardMapping[event.key]
                                    .bindingValue;
                        finalInput(
                              bindingValue,
                              this.players[playerNumber],
                              this.sounds
                        );
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
                  score: 0,
                  singleShots: 0,
                  doubleShots: 0,
                  tripleShots: 0,
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
      buttonsNames;
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
            this.buttonsNames = [
                  "a",
                  "b",
                  "x",
                  "y",
                  "l1",
                  "r1",
                  "l2",
                  "r2",
                  null,
                  null,
                  null,
                  null,
                  null,
                  "dpad down",
                  "dpad left",
                  "dpad right",
                  null,
            ];
            this.navigationKeyBindings = [
                  null,
                  "Back",
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

      updateGameKeyBinding = (buttonIndex, bindingValue) => {
            if (this.defaultKeyBindings[buttonIndex] === null) {
                  for (let i = 0; i < this.defaultKeyBindings.length; i++) {
                        if (this.defaultKeyBindings[i] === bindingValue) {
                              this.defaultKeyBindings[i] = null;
                        }
                  }
                  this.defaultKeyBindings[buttonIndex] = bindingValue;
                  return true;
            } else {
                  return false;
            }
      };
}

export class KeyBoard {
      keyBoardMapping;
      constructor() {
            this.keyBoardMapping = {
                  ArrowDown: {
                        playerNumber: "0",
                        bindingValue: "ArrowDown",
                  },
                  ArrowLeft: {
                        playerNumber: "0",
                        bindingValue: "ArrowLeft",
                  },
                  ArrowRight: {
                        playerNumber: "0",
                        bindingValue: "ArrowRight",
                  },
                  " ": {
                        playerNumber: "0",
                        bindingValue: "rotate",
                  },
                  a: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  b: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  c: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  d: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  e: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  f: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  g: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  h: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  i: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  j: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  k: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  l: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  m: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  n: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  o: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  p: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  q: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  r: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  s: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  t: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  u: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  v: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  w: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  x: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  y: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  z: {
                        playerNumber: null,
                        bindingValue: null,
                  },
                  Control: {
                        0: {
                              playerNumber: null,
                              bindingValue: null,
                        },
                        1: {
                              playerNumber: null,
                              bindingValue: null,
                        },
                  },
                  Shift: {
                        0: {
                              playerNumber: null,
                              bindingValue: null,
                        },
                        1: {
                              playerNumber: null,
                              bindingValue: null,
                        },
                  },
            };
      }

      updateKeyBoardMapping(
            key,
            playerNumber,
            bindingValue,
            assignedKeyBoardKey,
            keyLocation
      ) {
            if (assignedKeyBoardKey === "space bar") {
                  assignedKeyBoardKey = " ";
            }
            if (keyLocation) {
                  if (
                        this.keyBoardMapping[key][keyLocation].playerNumber ===
                        null
                  ) {
                        this.keyBoardMapping[key][keyLocation].playerNumber =
                              playerNumber;
                        this.keyBoardMapping[key][keyLocation].bindingValue =
                              bindingValue;
                        return true;
                  }
            } else if (this.keyBoardMapping[key].playerNumber === null) {
                  this.keyBoardMapping[key].playerNumber = playerNumber;
                  this.keyBoardMapping[key].bindingValue = bindingValue;
                  if (assignedKeyBoardKey) {
                        this.keyBoardMapping[assignedKeyBoardKey].playerNumber =
                              null;
                        this.keyBoardMapping[assignedKeyBoardKey].bindingValue =
                              null;
                  }
                  return true;
            }
            return false;
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

export const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
};
