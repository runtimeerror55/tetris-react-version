import { ModeOneSelect } from "./modeOneSelect";
import { Game } from "../../../utilities/utilities";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("renders mode one single player option on button click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(
            <ModeOneSelect
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
            ></ModeOneSelect>
      );

      const output = screen.getByTestId("mode-one-select");
      await act(() => {
            userEvent.click(output);
      });
      const outputTwo = screen.getAllByText("single player");
      expect(outputTwo.length).toBe(2);
});

test("renders mode couch play option on button click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(
            <ModeOneSelect
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
            ></ModeOneSelect>
      );

      const output = screen.getByTestId("mode-one-select");
      await act(() => {
            userEvent.click(output);
      });
      const outputTwo = screen.getByText("couch play(2 players)");
      expect(outputTwo).toBeInTheDocument();
});
