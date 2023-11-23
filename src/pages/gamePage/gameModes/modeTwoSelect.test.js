import { ModeTwoSelect } from "./modeTwoSelect";
import { Game } from "../../../utilities/utilities";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders mode two", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(<ModeTwoSelect game={game}></ModeTwoSelect>);

      const output = screen.getByText("Mode two");
      expect(output).toBeInTheDocument();
});
