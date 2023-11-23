import { ControlSettings } from "./controlSettings";
import { Game } from "../../utilities/utilities";
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
      render(<ControlSettings game={game}></ControlSettings>);

      const output = screen.getByText("Controls");
      expect(output).toBeInTheDocument();
});
