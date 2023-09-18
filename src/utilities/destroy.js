// class Destroy extends GameMenu {
//       constructor() {
//             super();
//       }
//       destroy(destroyableRows, currentTetromino, playerBoardMatrix) {
//             // glassBreak.play();
//             let y = this;
//             destroyableRows.forEach((row) => {
//                   const laserBeamNode = document.querySelector(
//                         `#player-1-laser-beam-${row}`
//                   );

//                   let r1 = this.playerBoardMatrix[row];
//                   r1.forEach((cell, index) => {
//                         let id;
//                         let count = -(index + 1) * 1.5;
//                         let w = (index + 1) * 20;
//                         if (index != 15) {
//                               function destroyAnimation() {
//                                     if (count >= 0) {
//                                           if (cell.colorClass) {
//                                                 cell.node.classList.toggle(
//                                                       cell.colorClass
//                                                 );
//                                                 cell.colorClass = "";
//                                           }

//                                           laserBeamNode.style.width = `${w}px`;
//                                           cancelAnimationFrame(id);
//                                     } else {
//                                           count++;
//                                           id =
//                                                 requestAnimationFrame(
//                                                       destroyAnimation
//                                                 );
//                                     }
//                               }
//                               destroyAnimation();
//                         } else {
//                               function yes() {
//                                     if (count >= 0) {
//                                           row--;
//                                           while (row > 0) {
//                                                 let r2 =
//                                                       this.playerBoardMatrix[
//                                                             row
//                                                       ];
//                                                 if (r2[15]) {
//                                                       for (
//                                                             let i = 0;
//                                                             i < 15;
//                                                             i++
//                                                       ) {
//                                                             let cell1 = r1[i];
//                                                             let cell2 = r2[i];
//                                                             if (
//                                                                   cell2.colorClass
//                                                             ) {
//                                                                   cell2.node.classList.toggle(
//                                                                         cell2.colorClass
//                                                                   );
//                                                                   cell1.node.classList.toggle(
//                                                                         cell2.colorClass
//                                                                   );
//                                                                   cell1.colorClass =
//                                                                         cell2.colorClass;
//                                                                   cell2.colorClass =
//                                                                         "";
//                                                             }
//                                                       }
//                                                       r1[15] = r2[15];
//                                                       r2[15] = 0;
//                                                       r1 = r2;
//                                                 }
//                                                 row--;
//                                           }
//                                           laserBeamNode.style.width = "0px";
//                                           cancelAnimationFrame(id);
//                                     } else {
//                                           count++;
//                                           id = requestAnimationFrame(
//                                                 yes.bind(y)
//                                           );
//                                     }
//                               }
//                               yes();
//                         }
//                   });
//             });
//       }

//       areThereAnydestroyableRows(currentTetromino, playerBoardMatrix) {
//             let destroyableRows = new Set();
//             currentTetromino.allCoordinates.forEach((coordinates) => {
//                   if (playerBoardMatrix[coordinates[0]][15] === 15) {
//                         destroyableRows.add(coordinates[0]);
//                   }
//             });
//             console.log([...destroyableRows]);
//             destroyableRows = [...destroyableRows].sort((a, b) => {
//                   return a - b;
//             });
//             console.log(destroyableRows);
//             return destroyableRows;
//       }
// }

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
