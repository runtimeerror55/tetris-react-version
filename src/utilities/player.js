class Player extends playerInputsController {
      number;
      currentTetrominoIndex;
      playerBoardMatrix;
      count;
      constructor() {
            super();
            this.number = 1;
            this.currentTetrominoIndex = 0;
            this.createPlayerBoardMatrix();
            this.count = 0;
            this.updateCurrentTetromino();
      }
      createPlayerBoardMatrix() {
            this.playerBoardMatrix = [];

            for (let i = 0; i < 22; i++) {
                  this.playerBoardMatrix[i] = [];
                  const rowColumnNodes = document.querySelectorAll(
                        `#player-1-row-${i} .column`
                  );
                  for (let j = 0; j < 16; j++) {
                        if (j == 15) {
                              this.playerBoardMatrix[i].push(0);
                        } else {
                              this.playerBoardMatrix[i].push({
                                    node: rowColumnNodes[j],
                                    colorClass: "",
                              });
                        }
                  }
            }
      }

      refreshBinaryMatrix() {
            for (let i = 0; i < 22; i++) {
                  for (let j = 0; j < 16; j++) {
                        this.binaryMatrix[i][j] = 0;
                  }
            }
      }
      updateplayerBoardMatrix() {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  this.playerBoardMatrix[coordinates[0]][
                        coordinates[1]
                  ].colorClass = this.currentTetromino.colorClass;
                  this.playerBoardMatrix[coordinates[0]][15]++;
            });
      }
      updateCurrentTetromino() {
            this.currentTetrominoIndex++;
            this.currentTetromino = {
                  allCoordinates: CoordinatesAndColorsOfTetrominos[
                        randomGeneratedTetrominos[this.currentTetrominoIndex]
                  ].allCoordinates.map((element) => [element[0], element[1]]),

                  colorClass:
                        CoordinatesAndColorsOfTetrominos[
                              randomGeneratedTetrominos[
                                    this.currentTetrominoIndex
                              ]
                        ].colorClass,
            };
      }
      setStartingPosition() {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  this.toggleClass(coordinates);
            });
      }

      saveScoreInTheDatabase() {
            console.log(this.score);
            fetch("/matchStats", {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(this.stats),
            })
                  .then((response) => {
                        return response.json();
                  })
                  .then((data) => {
                        console.log(data);
                  });
      }

      start() {
            this.stats.timeStamp = new Date().toLocaleDateString();
            if (this.count == 30) {
                  if (playerone.isPossibleToMove("ArrowDown")) {
                        playerone.moveDown();
                        this.count = 0;
                  } else {
                        this.updateplayerBoardMatrix();
                        const destroyableRows =
                              this.areThereAnydestroyableRows();
                        if (destroyableRows.length > 0) {
                              this.destroy(destroyableRows);
                              this.updateGameStats(destroyableRows.length);
                        }
                        this.updateCurrentTetromino();
                        if (this.isPossibleToMove("setStartingPosition")) {
                              this.setStartingPosition();
                        } else {
                              gameOver.play();
                              this.menu.classList.toggle("menu-toggle");
                              console.log(JSON.stringify(this.stats));
                              this.saveScoreInTheDatabase();
                              console.log("game over");
                              return;
                        }
                  }
            } else {
                  this.count++;
            }
            requestAnimationFrame(this.start.bind(this));
      }

      reset() {
            const destroyableRows = [];
            this.playerBoardMatrix.forEach((row, index) => {
                  if (row[15] > 0) {
                        destroyableRows.push(index);
                        row[15] = 0;
                  }
            });
            destroyableRows.forEach((rowIndex) => {
                  const row = this.playerBoardMatrix[rowIndex];
                  row.forEach((cell) => {
                        if (cell.colorClass) {
                              cell.node.classList.toggle(cell.colorClass);
                              cell.colorClass = "";
                        }
                  });
            });

            this.stats.score = 0;
            this.stats.singleShots = 0;
            this.stats.doubleShots = 0;
            this.stats.tripleShots = 0;
            this.stats.timeStamp = undefined;

            this.scoreNode.innerText = "0";
            this.singleShotNode.innerText = "0";
            this.doubleShotNode.innerText = "0";
            this.tripleShotNode.innerText = "0";
      }
}

const playerone = new Player();
