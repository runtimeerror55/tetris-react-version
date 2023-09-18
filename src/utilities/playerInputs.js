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
export const rotate = (setOfrotatedCoordinates) => {
      this.currentTetromino.allCoordinates.forEach((coordinates) => {
            this.toggleClass(coordinates);
      });
      setOfrotatedCoordinates.forEach((coordinates) => {
            this.toggleClass(coordinates);
      });
      this.currentTetromino.allCoordinates = setOfrotatedCoordinates;
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
