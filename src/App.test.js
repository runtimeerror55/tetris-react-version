import { render, screen } from "@testing-library/react";
import { isPossibleToMove } from "./utilities/utilities";
import { Game } from "./utilities/utilities";
import App from "./App";

test("renders learn react link", () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            15
      );
      expect(
            isPossibleToMove(
                  "ArrowDown",
                  game.players[0].currentTetromino,
                  game.players[0].boardMatrix,
                  game
            )
      ).toEqual(true);
});
