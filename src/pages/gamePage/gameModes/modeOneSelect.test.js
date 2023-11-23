import { ModeOneSelect } from "./modeOneSelect";
import { Game } from "../../../utilities/utilities";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders mode one", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(<ModeOneSelect game={game}></ModeOneSelect>);

      const output = screen.getByText("Mode one");
      expect(output).toBeInTheDocument();
});
