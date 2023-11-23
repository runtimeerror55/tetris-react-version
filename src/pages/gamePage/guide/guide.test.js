import { Guide } from "./guide";
import { Game } from "../../../utilities/utilities";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders controls component", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Guide game={game}></Guide>);

      const output = screen.getByText("Guide");
      expect(output).toBeInTheDocument();
});
