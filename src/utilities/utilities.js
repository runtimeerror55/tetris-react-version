import { Howl } from "howler";
import laserGunShotSoundPath from "../assets/sounds/laserGunShot.wav";
import fallPath from "../assets/sounds/fireball.wav";
import glassBreakPath from "../assets/sounds/laserInSpace.wav";
import gameOverPath from "../assets/sounds/gameOver.wav";
import navigationSoundPath from "../assets/sounds/navigation.m4a";
import clickSoundPath from "../assets/sounds/click.mp3";
import blasterSoundPath from "../assets/sounds/blaster.mp3";
import { toast } from "react-toastify";

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
export class Game {
      barsState;
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
      gameModes;
      renderMenuOverlay;
      speed;
      boardRows;
      boardColumns;
      playersStandings = null;
      timeLimit;
      constructor(
            renderPlayersUi,
            renderGameResult,
            renderMenuOverlay,
            boardRows,
            boardColumns,
            speed
      ) {
            this.barsState = "idle";
            this.boardRows = boardRows;
            this.boardColumns = boardColumns;
            this.speed = speed;
            this.isGameStarted = false;
            this.isGameOver = null;
            this.pause = false;
            this.renderGameResult = renderGameResult;
            this.renderMenuOverlay = renderMenuOverlay;
            // this.CoordinatesAndColorsOfTetrominos = [
            //       {
            //             allCoordinates: [
            //                   [0, 5],
            //                   [1, 5],
            //                   [2, 5],
            //                   [2, 6],
            //             ],
            //             colorClass: "l-tetromino-active",
            //       }, // l tetromino
            //       {
            //             allCoordinates: [
            //                   [0, 5],
            //                   [0, 6],
            //                   [0, 7],
            //                   [1, 6],
            //             ],
            //             colorClass: "t-tetromino-active",
            //       }, // t tetromino

            //       {
            //             allCoordinates: [
            //                   [0, 5],
            //                   [0, 6],
            //                   [1, 5],
            //                   [1, 6],
            //             ],
            //             colorClass: "square-tetromino-active",
            //       }, // square

            //       {
            //             allCoordinates: [
            //                   [0, 5],
            //                   [0, 6],
            //                   [0, 7],
            //                   [0, 8],
            //             ],
            //             colorClass: "line-tetromino-active",
            //       }, // line tetromino

            //       {
            //             allCoordinates: [
            //                   [0, 5],
            //                   [1, 5],
            //                   [1, 6],
            //                   [2, 6],
            //             ],
            //             colorClass: "z-tetromino-active",
            //       }, // skew tetromino
            // ];
            this.CoordinatesAndColorsOfTetrominos = tetrominoes(boardColumns);
            this.randomTetrominoIndexes = this.generateNewTetrominoIndexes();
            this.gameModes = {
                  modeOne: 1,
                  modeTwo: 1,
            };
            this.timeLimit = 10;
            this.players = [
                  new Player(
                        0,
                        this.CoordinatesAndColorsOfTetrominos[
                              this.randomTetrominoIndexes[0]
                        ],
                        this.boardRows,
                        this.boardColumns,
                        this.speed
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

                  blasterSound: new Howl({
                        src: [blasterSoundPath],
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

      createPlayers = (numberOfPlayers) => {
            const players = [];
            for (let i = 0; i < numberOfPlayers; i++) {
                  players.push(
                        new Player(
                              i,
                              this.CoordinatesAndColorsOfTetrominos[
                                    this.randomTetrominoIndexes[0]
                              ],
                              this.boardRows,
                              this.boardColumns,
                              this.speed
                        )
                  );
            }
            this.players = players;
      };
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
                              gamepad.buttons.every((button, buttonIndex) => {
                                    if (button.pressed) {
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
                                                      gamepad,
                                                      this
                                                );
                                                if (buttonIndex === 9) {
                                                      if (this.isGameStarted) {
                                                            this.renderMenuOverlay(
                                                                  true
                                                            );
                                                            this.pause = true;
                                                      }
                                                }
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
                                                            this.sounds,
                                                            null,
                                                            this
                                                      );

                                                      joystick.throttleCount = 0;

                                                      isTrue = true;
                                                }
                                          }
                                          return false;
                                    }
                                    return true;
                              });
                        }
                  }
            });
            return isTrue;
      };
      gameLoop = () => {
            console.log("hello");
            this.gamepadLoop.bind(this)();

            // this.gameLoopWaitCount++;
            let shouldReturn = false;

            this.players.forEach((player, index) => {
                  if (
                        player.time === this.timeLimit &&
                        this.gameModes.modeTwo === 2
                  ) {
                        player.isGameOver = true;
                        if (this.gameModes.modeOne === 2) {
                              if (this.checkGameOver()) {
                                    shouldReturn = true;
                              }
                        } else {
                              this.isGameOver = true;
                              this.renderGameResult(true);
                              shouldReturn = true;
                        }
                        this.renderPlayersUi({});
                  }

                  if (!player.isGameOver && !player.destroyInAction) {
                        player.frameCounter++;
                        if (player.frameCounter === player.currentSpeed) {
                              if (
                                    !finalInput(
                                          "ArrowDown",
                                          player,
                                          null,
                                          null,
                                          this
                                    )
                              ) {
                                    if (player.currentSpeed === 2) {
                                          player.currentSpeed =
                                                player.previousSpeed;
                                    }
                                    updateplayerBoardMatrix(player, this);
                                    const destroyableRows =
                                          areThereAnydestroyableRows(
                                                this,
                                                player
                                          );

                                    if (destroyableRows.length > 0) {
                                          destroy(
                                                destroyableRows,
                                                this,
                                                player
                                          );
                                          if (this.joysticks[index]) {
                                                let duration =
                                                      (destroyableRows.length -
                                                            1) *
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
                                          updateStats(
                                                player,
                                                destroyableRows.length
                                          );
                                          if (this.gameModes.modeOne === 2) {
                                                this.checkGameOver();
                                          }
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
                                    if (
                                          !finalInput(
                                                "startingPosition",
                                                player,
                                                null,
                                                null,
                                                this
                                          )
                                    ) {
                                          player.isGameOver = true;
                                          if (this.gameModes.modeOne === 2) {
                                                this.checkGameOver();
                                          } else {
                                                this.isGameOver = true;
                                                this.renderGameResult(true);
                                          }
                                    }
                              }
                              this.renderPlayersUi({});
                              shouldReturn = true;
                              player.frameCounter = 0;
                              player.hardDropCoordinates = null;
                              player.hardDropFinalCoordinates(this);
                        }
                  }
            });

            if (shouldReturn) {
                  return;
            }

            requestAnimationFrame(this.gameLoop.bind(this));
      };

      checkGameOver = () => {
            const gameOverPlayers = [];
            const playingPlayers = [];
            this.players.forEach((player, index) => {
                  if (!player.isGameOver) {
                        playingPlayers.push(player);
                  } else {
                        gameOverPlayers.push(player);
                  }
            });

            gameOverPlayers.sort((a, b) => {
                  return b.stats.score - a.stats.score;
            });

            if (playingPlayers.length === 0) {
                  this.isGameOver = true;
                  this.renderGameResult(true);
                  this.playersStandings = [...gameOverPlayers];
                  return true;
            } else if (playingPlayers.length === 1) {
                  if (
                        playingPlayers[0].stats.score >
                        gameOverPlayers[0].stats.score
                  ) {
                        this.isGameOver = true;
                        this.renderGameResult(true);
                        this.playersStandings = [
                              playingPlayers[0],
                              ...gameOverPlayers,
                        ];
                        return true;
                  }
            }
            return false;
      };
      onJoyStickConnect = () => {
            window.addEventListener("gamepadconnected", (event) => {
                  console.log(event);
                  toast.success(event.gamepad.id + " connected", toastOptions);
                  for (let i = 0; i < this.joysticks.length; i++) {
                        if (this.joysticks[i] === null) {
                              this.joysticks[i] = new Joystick(
                                    event.gamepad,
                                    i
                              );

                              this.renderPlayersUi({});
                              return;
                        }
                  }
            });
      };
      onJoystickDisconnect = () => {
            window.addEventListener("gamepaddisconnected", (event) => {
                  console.log(event);
                  toast.error(event.gamepad.id + " disconnected", toastOptions);
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
                  console.log("uitilities window");
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
                        if (!this.players[playerNumber].destroyInAction) {
                              finalInput(
                                    bindingValue,
                                    this.players[playerNumber],
                                    this.sounds,
                                    null,
                                    this
                              );
                        }

                        this.players.forEach((player) => {
                              player.hardDropCoordinates = null;
                              player.hardDropFinalCoordinates(this);
                        });
                  }
            });
      };

      start = () => {
            this.isGameStarted = true;
            this.renderPlayersUi({});
      };

      reset = () => {
            this.playersStandings = null;
            this.isGameOver = false;
            this.isGameStarted = false;
            this.pause = false;
            this.randomTetrominoIndexes = this.generateNewTetrominoIndexes();
            this.gameLoopWaitCount = 0;
            this.players.forEach((player) => {
                  player.reset(
                        this.CoordinatesAndColorsOfTetrominos[
                              this.randomTetrominoIndexes[0]
                        ],
                        this.speed
                  );
            });
      };

      generateNewTetrominoIndexes = () => {
            let a = [];
            for (let i = 0; i < 500; i++) {
                  const randomInteger = Math.floor(Math.random() * 5);
                  a.push(randomInteger);
            }

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
      timer;
      timerId;
      hardDropCoordinates;
      previousSpeed;
      currentSpeed;
      frameCounter;
      time;
      lifeSaverCount;
      destroyInAction;

      constructor(
            playerNumber,
            startingTetromino,
            boardRows,
            boardColumns,
            speed
      ) {
            this.destroyInAction = false;
            this.previousSpeed = speed;
            this.currentSpeed = speed;
            this.frameCounter = 0;
            this.stats = {
                  score: 0,
                  singleShots: 0,
                  doubleShots: 0,
                  tripleShots: 0,
            };
            this.lifeSaverCount = 1;
            this.time = 0;
            this.hardDropCoordinates = null;
            this.timer = 0;
            this.timerId = null;
            this.isGameOver = false;
            this.number = playerNumber;
            this.currentIndexOfrandomTetrominoIndexes = 0;
            this.currentTetromino = startingTetromino;
            this.boardMatrix = createPlayerBoardMatrix(boardRows, boardColumns);
            this.renderUi = null;
      }

      reset = (currentTetromino, speed) => {
            this.destroyInAction = false;
            this.lifeSaverCount = 1;
            this.isGameOver = false;
            this.currentSpeed = speed;
            this.previousSpeed = speed;
            this.frameCounter = 0;
            this.hardDropCoordinates = null;
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
                        if (j === columns - 1) {
                              this.boardMatrix[i][j] = 0;
                        } else {
                              this.boardMatrix[i][j] = "";
                        }
                  }
            }
            this.time = 0;
      };

      hardDropFinalCoordinates = (game) => {
            let currentTetromino = this.currentTetromino;
            let flag = false;

            while (
                  isPossibleToMove("ArrowDown", game, {
                        currentTetromino,
                        boardMatrix: this.boardMatrix,
                  })
            ) {
                  currentTetromino = moveDown(currentTetromino);
                  flag = true;
            }
            if (flag) {
                  this.hardDropCoordinates = currentTetromino;
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
                  "hardDrop",
                  "rotate",
                  null,
                  null,
                  null,
                  null,
                  null,
                  "lifeSaver",
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
                  "dpad up",
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
                  "Escape",
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
                        playerNumber: "0",
                        bindingValue: "hardDrop",
                  },
                  n: {
                        playerNumber: "0",
                        bindingValue: "lifeSaver",
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

export const isPossibleToMove = (direction, game, player) => {
      if (direction === "ArrowLeft") {
            return player.currentTetromino.allCoordinates.every(
                  (coordinates) => {
                        return (
                              coordinates[1] > 0 &&
                              !player.boardMatrix[coordinates[0]][
                                    coordinates[1] - 1
                              ]
                        );
                  }
            );
      } else if (direction === "ArrowRight") {
            return player.currentTetromino.allCoordinates.every(
                  (coordinates) => {
                        return (
                              coordinates[1] < game.boardColumns - 1 &&
                              !player.boardMatrix[coordinates[0]][
                                    coordinates[1] + 1
                              ]
                        );
                  }
            );
      } else if (direction === "ArrowDown") {
            return player.currentTetromino.allCoordinates.every(
                  (coordinates) => {
                        return (
                              coordinates[0] < game.boardRows - 1 &&
                              !player.boardMatrix[coordinates[0] + 1][
                                    coordinates[1]
                              ]
                        );
                  }
            );
      } else if ("startingPosition") {
            return player.currentTetromino.allCoordinates.every(
                  (coordinates) => {
                        return !player.boardMatrix[coordinates[0]][
                              coordinates[1]
                        ];
                  }
            );
      }
};

export const createPlayerBoardMatrix = (boardRows, boardColumns) => {
      const playerBoardMatrix = [];

      for (let i = 0; i < boardRows; i++) {
            playerBoardMatrix[i] = [];

            for (let j = 0; j < boardColumns + 1; j++) {
                  if (j === boardColumns) {
                        playerBoardMatrix[i][j] = 0;
                  } else {
                        playerBoardMatrix[i].push("");
                  }
            }
      }
      return playerBoardMatrix;
};

export const updateplayerBoardMatrix = (player, game) => {
      player.currentTetromino.allCoordinates.forEach((coordinates) => {
            player.boardMatrix[coordinates[0]][game.boardColumns]++;
            player.boardMatrix[coordinates[0]][coordinates[1]] =
                  player.currentTetromino.colorClass;
      });
};

export const isRotationPossible = (game, player) => {
      const x = player.currentTetromino.allCoordinates;
      const y = player.boardMatrix;
      const setOfrotatedCoordinates = x.map((coordinates) => {
            return [
                  coordinates[1] - x[0][1] + x[0][0],
                  -(coordinates[0] - x[0][0]) + x[0][1],
            ];
      });

      const output = setOfrotatedCoordinates.every((coordinates) => {
            return (
                  coordinates[0] < game.boardRows &&
                  coordinates[0] > -1 &&
                  coordinates[1] < game.boardColumns - 1 &&
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

export const areThereAnydestroyableRows = (game, player) => {
      let destroyableRows = new Set();
      player.currentTetromino.allCoordinates.forEach((coordinates) => {
            if (
                  player.boardMatrix[coordinates[0]][game.boardColumns] ===
                  game.boardColumns
            ) {
                  destroyableRows.add(coordinates[0]);
            }
      });

      destroyableRows = [...destroyableRows].sort((a, b) => {
            return a - b;
      });

      return destroyableRows;
};

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

export const shiftBlocks = (destroyableRows, player, game) => {
      destroyableRows.forEach((row) => {
            let currentRow = row;
            let upperRow = row - 1;
            while (
                  upperRow !== -1 &&
                  player.boardMatrix[upperRow][game.boardColumns]
            ) {
                  player.boardMatrix[currentRow].forEach((element, column) => {
                        if (column === game.boardColumns) {
                              player.boardMatrix[currentRow][
                                    game.boardColumns
                              ] =
                                    player.boardMatrix[upperRow][
                                          game.boardColumns
                                    ];
                              player.boardMatrix[upperRow][
                                    game.boardColumns
                              ] = 0;
                        } else {
                              player.boardMatrix[currentRow][column] =
                                    player.boardMatrix[upperRow][column];

                              player.boardMatrix[upperRow][column] = "";
                        }
                  });

                  currentRow--;
                  upperRow--;
            }
      });
};

//
export const destroy = (destroyableRows, game, player) => {
      let column = 0;
      let throttleCount = 0;
      game.sounds.blasterSound.play();
      player.destroyInAction = true;

      const destroyAnimationLoop = () => {
            throttleCount++;
            if (throttleCount === 2) {
                  if (column === game.boardColumns) {
                        destroyableRows.forEach((row) => {
                              player.boardMatrix[row][column] = 0;
                              const laserBeam = document.querySelector(
                                    `#player-${player.number}-laser-beam-${row}`
                              );
                              laserBeam.style.width = "0px";
                        });
                        shiftBlocks(destroyableRows, player, game);
                        player.renderUi({});
                        player.destroyInAction = false;
                        return;
                  }

                  destroyableRows.forEach((row) => {
                        player.boardMatrix[row][column] = "";
                        const laserBeam = document.querySelector(
                              `#player-${player.number}-laser-beam-${row}`
                        );

                        laserBeam.style.width = 25 * (column + 1) + "px";
                  });
                  column++;

                  player.renderUi({});
                  throttleCount = 0;
            }
            requestAnimationFrame(destroyAnimationLoop);
      };
      requestAnimationFrame(destroyAnimationLoop);
};

export const finalInput = (direction, player, sounds, gamepad, game) => {
      let returnValue = false;

      if (direction === "lifeSaver" && player.lifeSaverCount) {
            let firstNonEmptyRow = -1;

            for (let row = 0; row < game.boardRows; row++) {
                  if (player.boardMatrix[row][game.boardColumns]) {
                        firstNonEmptyRow = row;
                        break;
                  }
            }
            if (firstNonEmptyRow !== -1) {
                  const destroyableRows = [firstNonEmptyRow];
                  firstNonEmptyRow++;
                  while (
                        destroyableRows.length < 5 &&
                        firstNonEmptyRow < game.boardRows
                  ) {
                        destroyableRows.push(firstNonEmptyRow);
                        firstNonEmptyRow++;
                  }
                  destroy(destroyableRows, game, player);

                  if (gamepad) {
                        let duration = (destroyableRows.length - 1) * 200 + 200;
                        gamepad.vibrationActuator.playEffect("dual-rumble", {
                              startDelay: 0,
                              duration: duration,
                              weakMagnitude: 1.0,
                              strongMagnitude: 1.0,
                        });
                  }
                  player.lifeSaverCount--;
            }
      } else if (direction === "ArrowDown") {
            if (isPossibleToMove("ArrowDown", game, player)) {
                  const newTetromino = moveDown(player.currentTetromino);

                  if (sounds) {
                        sounds.fall.play();
                  }
                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  returnValue = true;
            }
      } else if (direction === "ArrowLeft") {
            if (isPossibleToMove("ArrowLeft", game, player)) {
                  const newTetromino = moveLeft(player.currentTetromino);

                  if (sounds) {
                        sounds.fall.play();
                  }
                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  returnValue = true;
            }
      } else if (direction === "ArrowRight") {
            if (isPossibleToMove("ArrowRight", game, player)) {
                  const newTetromino = moveRight(player.currentTetromino);

                  if (sounds) {
                        sounds.fall.play();
                  }
                  player.currentTetromino = newTetromino;
                  player.renderUi({});
                  returnValue = true;
            }
      } else if (direction === " " || direction === "rotate") {
            const setOfrotatedCoordinates = isRotationPossible(game, player);
            if (setOfrotatedCoordinates) {
                  if (sounds) {
                        sounds.fall.play();
                  }
                  player.currentTetromino.allCoordinates =
                        setOfrotatedCoordinates;
                  player.renderUi({});
                  returnValue = true;
            }
      } else if (direction === "startingPosition") {
            if (isPossibleToMove("startingPosition", game, player)) {
                  returnValue = true;
            }
      } else if (direction === "hardDrop") {
            game?.sounds?.blasterSound.play();
            if (player.currentSpeed !== 2) {
                  player.previousSpeed = player.currentSpeed;
            }
            player.currentSpeed = 2;
            player.frameCounter = 0;
            // if (game) {
            //       game.speed = 2;
            //       game.gameLoopWaitCount = 0;
            // }
            // player.hardDropCoordinates = null;
            // player.hardDropFinalCoordinates();
            // if (player.hardDropCoordinates) {
            //       player.currentTetromino = player.hardDropCoordinates;
            //       player.renderUi({});
            //       returnValue = true;
            // }
      }
      player.hardDropCoordinates = null;
      player.hardDropFinalCoordinates(game);
      return returnValue;
};

export const navigationGamepadLoop = (
      game,
      controllerSettingsOverlayKeyDownHandler,
      gamepadLoopState
) => {
      const joystick = game.joysticks[0];
      const gamepads = navigator.getGamepads();
      let shouldExit = false;

      if (joystick) {
            if (joystick.throttleCount < 10) {
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
                                    // if (buttonIndex === 1) {
                                    //       shouldExit = true;
                                    // }
                                    controllerSettingsOverlayKeyDownHandler({
                                          key: joystick.navigationKeyBindings[
                                                buttonIndex
                                          ],
                                    });
                                    joystick.previousPressedButtonIndex =
                                          buttonIndex;
                                    joystick.throttleCount = 0;
                                    console.log(buttonIndex);
                              } else if (joystick.throttleCount === 10) {
                                    // if (buttonIndex === 1) {
                                    //       shouldExit = true;
                                    // }
                                    controllerSettingsOverlayKeyDownHandler({
                                          key: joystick.navigationKeyBindings[
                                                buttonIndex
                                          ],
                                    });
                                    joystick.throttleCount = 0;
                                    console.log(buttonIndex);
                              }
                        }
                  });
            }
      }

      if (shouldExit || !gamepadLoopState.run) {
            return;
      }

      requestAnimationFrame(
            navigationGamepadLoop.bind(
                  null,
                  game,
                  controllerSettingsOverlayKeyDownHandler,
                  gamepadLoopState
            )
      );
};

export const tetrominoes = (boardColumns) => {
      let midpoint = -1;
      if (boardColumns % 2 === 0) {
            midpoint = boardColumns / 2 - 1;
            return [
                  {
                        allCoordinates: [
                              [0, midpoint],
                              [1, midpoint],
                              [2, midpoint],
                              [2, midpoint + 1],
                        ],
                        colorClass: "l-tetromino-active",
                  }, // l tetromino
                  {
                        allCoordinates: [
                              [0, midpoint - 1],
                              [0, midpoint],
                              [0, midpoint + 1],
                              [1, midpoint],
                        ],
                        colorClass: "t-tetromino-active",
                  }, // t tetromino

                  {
                        allCoordinates: [
                              [0, midpoint],
                              [0, midpoint + 1],
                              [1, midpoint],
                              [1, midpoint + 1],
                        ],
                        colorClass: "square-tetromino-active",
                  }, // square

                  {
                        allCoordinates: [
                              [0, midpoint - 1],
                              [0, midpoint],
                              [0, midpoint + 1],
                              [0, midpoint + 2],
                        ],
                        colorClass: "line-tetromino-active",
                  }, // line tetromino

                  {
                        allCoordinates: [
                              [0, midpoint],
                              [1, midpoint],
                              [1, midpoint + 1],
                              [2, midpoint + 1],
                        ],
                        colorClass: "z-tetromino-active",
                  }, // skew tetromino
            ];
      } else {
            midpoint = (boardColumns + 1) / 2 - 1;
            return [
                  {
                        allCoordinates: [
                              [0, midpoint],
                              [1, midpoint],
                              [2, midpoint],
                              [2, midpoint + 1],
                        ],
                        colorClass: "l-tetromino-active",
                  }, // l tetromino
                  {
                        allCoordinates: [
                              [0, midpoint - 1],
                              [0, midpoint],
                              [0, midpoint + 1],
                              [1, midpoint],
                        ],
                        colorClass: "t-tetromino-active",
                  }, // t tetromino

                  {
                        allCoordinates: [
                              [0, midpoint - 1],
                              [0, midpoint],
                              [1, midpoint - 1],
                              [1, midpoint],
                        ],
                        colorClass: "square-tetromino-active",
                  }, // square

                  {
                        allCoordinates: [
                              [0, midpoint - 2],
                              [0, midpoint - 1],
                              [0, midpoint],
                              [0, midpoint + 1],
                        ],
                        colorClass: "line-tetromino-active",
                  }, // line tetromino

                  {
                        allCoordinates: [
                              [0, midpoint],
                              [1, midpoint],
                              [1, midpoint + 1],
                              [2, midpoint + 1],
                        ],
                        colorClass: "z-tetromino-active",
                  }, // skew tetromino
            ];
      }
};
