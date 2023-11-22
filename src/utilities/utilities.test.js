import {
      Game,
      areThereAnydestroyableRows,
      isPossibleToMove,
      moveDown,
      moveLeft,
      moveRight,
      updateplayerBoardMatrix,
      isRotationPossible,
      createPlayerBoardMatrix,
      updateStats,
      shiftBlocks,
} from "./utilities";

describe("tetromino movements", () => {
      test("returns true if possible to move down  else false", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );

            // test case 1 ,using random tetromino , no blocks filled below it
            const player = game.players[0];
            let output = isPossibleToMove("ArrowDown", game, player);
            expect(output).toBe(true);

            //test case 2 ,using l shaped tetromino ,positioned  at the last row of the board
            player.currentTetromino.allCoordinates = [
                  [17, 5],
                  [18, 5],
                  [19, 5],
                  [19, 6],
            ];
            output = isPossibleToMove("ArrowDown", game, player);
            expect(output).toBe(false);

            //test case 3 ,using l shaped tetromino , already filled block below it
            player.currentTetromino.allCoordinates = [
                  [0, 5],
                  [1, 5],
                  [2, 5],
                  [2, 6],
            ];

            player.boardMatrix[3][6] = "color-class";
            output = isPossibleToMove("ArrowDown", game, player);
            expect(output).toBe(false);
      });

      test("returns true if possible to move right  else false", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );

            // test case 1 ,using random tetromino , no blocks filled to its right
            const player = game.players[0];
            let output = isPossibleToMove("ArrowRight", game, player);
            expect(output).toBe(true);

            //test case 2, using l shaped tetromino, positioned at the last column of the board
            player.currentTetromino.allCoordinates = [
                  [0, 8],
                  [1, 8],
                  [2, 8],
                  [2, 9],
            ];
            output = isPossibleToMove("ArrowRight", game, player);
            expect(output).toBe(false);

            //test case 3 ,using l shaped tetromino , already filled block to its right
            player.currentTetromino.allCoordinates = [
                  [0, 5],
                  [1, 5],
                  [2, 5],
                  [2, 6],
            ];

            player.boardMatrix[2][6] = "color-class";
            output = isPossibleToMove("ArrowRight", game, player);
            expect(output).toBe(false);
      });

      test("returns true if possible to move left  else false", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );

            // test case 1 ,using random tetromino,no  filled blocks to its left
            const player = game.players[0];
            let output = isPossibleToMove("ArrowLeft", game, player);
            expect(output).toBe(true);

            //test case 2, using l shaped tetromino, positioned at the first column of the board
            player.currentTetromino.allCoordinates = [
                  [0, 0],
                  [1, 0],
                  [2, 0],
                  [2, 9],
            ];
            output = isPossibleToMove("ArrowLeft", game, player);
            expect(output).toBe(false);

            //test case 3 ,using l shaped tetromino , already filled block to its left
            player.currentTetromino.allCoordinates = [
                  [0, 5],
                  [1, 5],
                  [2, 5],
                  [2, 6],
            ];

            player.boardMatrix[1][4] = "color-class";
            output = isPossibleToMove("ArrowLeft", game, player);
            expect(output).toBe(false);
      });

      test("returns new tetromino  if  moved in the down direction", () => {
            // test case 1 ,using t shaped tetromino
            let currentTetromino = {
                  allCoordinates: [
                        [0, 5],
                        [0, 6],
                        [0, 7],
                        [1, 6],
                  ],
                  colorClass: "t-tetromino-active",
            };
            let output = moveDown(currentTetromino);
            expect(output).toEqual({
                  allCoordinates: [
                        [1, 5],
                        [1, 6],
                        [1, 7],
                        [2, 6],
                  ],
                  colorClass: "t-tetromino-active",
            });
      });

      test("returns new tetromino  if  moved in the right direction", () => {
            // test case 1 ,using t shaped tetromino
            let currentTetromino = {
                  allCoordinates: [
                        [0, 5],
                        [0, 6],
                        [0, 7],
                        [1, 6],
                  ],
                  colorClass: "t-tetromino-active",
            };
            let output = moveRight(currentTetromino);
            expect(output).toEqual({
                  allCoordinates: [
                        [0, 6],
                        [0, 7],
                        [0, 8],
                        [1, 7],
                  ],
                  colorClass: "t-tetromino-active",
            });
      });

      test("returns new tetromino  if  moved in the left direction", () => {
            // test case 1 ,using t shaped tetromino
            let currentTetromino = {
                  allCoordinates: [
                        [0, 5],
                        [0, 6],
                        [0, 7],
                        [1, 6],
                  ],
                  colorClass: "t-tetromino-active",
            };
            let output = moveLeft(currentTetromino);
            expect(output).toEqual({
                  allCoordinates: [
                        [0, 4],
                        [0, 5],
                        [0, 6],
                        [1, 5],
                  ],
                  colorClass: "t-tetromino-active",
            });
      });

      test("returns rotated coordinates if rotation is possible else false boolean", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );
            // test case 1, using line shaped tetromino
            const player = game.players[0];
            player.currentTetromino = {
                  allCoordinates: [
                        [0, 3],
                        [0, 4],
                        [0, 5],
                        [0, 6],
                  ],
                  colorClass: "line-tetromino-active",
            };
            let output = isRotationPossible(game, player);
            expect(output).toEqual([
                  [0, 3],
                  [1, 3],
                  [2, 3],
                  [3, 3],
            ]);

            // test case 2, using line shaped tetromino, positioned in a way it collides with the edge of board
            player.currentTetromino = {
                  allCoordinates: [
                        [0, 0],
                        [1, 0],
                        [2, 0],
                        [3, 0],
                  ],
                  colorClass: "line-tetromino-active",
            };
            output = isRotationPossible(game, player);
            expect(output).toEqual(false);

            // test case 3, using line shaped tetromino, positioned in a way it collides with already filled block

            player.currentTetromino = {
                  allCoordinates: [
                        [0, 3],
                        [0, 4],
                        [0, 5],
                        [0, 6],
                  ],
                  colorClass: "line-tetromino-active",
            };
            player.boardMatrix[0][3] = "color-class";
            output = isRotationPossible(game, player);
            expect(output).toEqual(false);
      });
});

test("returns a 2d  matrix with mentioned board columns,boards rows which are filled with empty strings and extra column which denotes no of filled blocks in that particular row", () => {
      //test case 1
      let output = createPlayerBoardMatrix(2, 2);
      expect(output).toEqual([
            ["", "", 0],
            ["", "", 0],
      ]);

      // test case-2
      output = createPlayerBoardMatrix(20, 10);
      expect(output).toEqual([
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", "", "", 0],
      ]);
});

test("returns updated player board matrix", () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            12,
            8,
            30
      );
      const player = game.players[0];
      player.currentTetromino = {
            allCoordinates: [
                  [11, 3],
                  [11, 4],
                  [11, 5],
                  [11, 6],
            ],
            colorClass: "line-tetromino-active",
      };
      let output = updateplayerBoardMatrix(player, game);
      expect(player.boardMatrix).toEqual([
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            [
                  "",
                  "",
                  "",
                  "line-tetromino-active",
                  "line-tetromino-active",
                  "line-tetromino-active",
                  "line-tetromino-active",
                  "",
                  4,
            ],
      ]);
});

test("return array of destroyable rows if there are any else empty array", () => {
      // test case 1
      const game = new Game(
            () => {},
            () => {},
            () => {},
            12,
            8,
            30
      );
      const player = game.players[0];
      player.currentTetromino = {
            allCoordinates: [
                  [11, 3],
                  [11, 4],
                  [11, 5],
                  [11, 6],
            ],
            colorClass: "line-tetromino-active",
      };
      player.boardMatrix[11][3] = "line-tetromino-active";
      player.boardMatrix[11][4] = "line-tetromino-active";
      player.boardMatrix[11][5] = "line-tetromino-active";
      player.boardMatrix[11][6] = "line-tetromino-active";
      player.boardMatrix[11][8] = 4;

      let output = areThereAnydestroyableRows(game, player);
      expect(output.length).toEqual(0);

      // test case 2

      player.boardMatrix[11][0] = "line-tetromino-active";
      player.boardMatrix[11][1] = "line-tetromino-active";
      player.boardMatrix[11][2] = "line-tetromino-active";
      player.boardMatrix[11][7] = "line-tetromino-active";
      player.boardMatrix[11][8] = game.boardColumns;

      output = areThereAnydestroyableRows(game, player);
      expect(output).toEqual([11]);
});

test("updates player stats", () => {
      // test case 1
      const game = new Game(
            () => {},
            () => {},
            () => {},
            12,
            8,
            30
      );
      const player = game.players[0];
      updateStats(player, 1);
      expect(player.stats).toEqual({
            score: 100,
            singleShots: 1,
            doubleShots: 0,
            tripleShots: 0,
      });

      // test case 2

      updateStats(player, 2);
      expect(player.stats).toEqual({
            score: 500,
            singleShots: 1,
            doubleShots: 1,
            tripleShots: 0,
      });

      // test case 3

      updateStats(player, 3);
      expect(player.stats).toEqual({
            score: 1400,
            singleShots: 1,
            doubleShots: 1,
            tripleShots: 1,
      });
});

test("shifts blocks after destorying", () => {
      // test case 1
      const game = new Game(
            () => {},
            () => {},
            () => {},
            12,
            8,
            30
      );
      const player = game.players[0];
      player.boardMatrix[8][0] = "line-tetromino-active";
      player.boardMatrix[8][5] = "t-tetromino-active";
      player.boardMatrix[8][8] = 2;

      player.boardMatrix[6][3] = "square-tetromino-active";
      player.boardMatrix[6][2] = "t-tetromino-active";
      player.boardMatrix[6][8] = 2;

      shiftBlocks([7, 9], player, game);
      expect(player.boardMatrix).toEqual([
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
            [
                  "",
                  "",
                  "t-tetromino-active",
                  "square-tetromino-active",
                  "",
                  "",
                  "",
                  "",
                  2,
            ],
            [
                  "line-tetromino-active",
                  "",
                  "",
                  "",
                  "",
                  "t-tetromino-active",
                  "",
                  "",
                  2,
            ],
            ["", "", "", "", "", "", "", "", 0],
            ["", "", "", "", "", "", "", "", 0],
      ]);
});
