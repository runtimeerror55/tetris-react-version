import { GameModes } from "./gameModes";
import { Game } from "../../../utilities/utilities";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders game modes component", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(<GameModes game={game}></GameModes>);

      const output = screen.getByText("Game modes");
      expect(output).toBeInTheDocument();
});
