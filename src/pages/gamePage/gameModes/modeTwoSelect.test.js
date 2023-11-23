import { ModeTwoSelect } from "./modeTwoSelect";
import { Game } from "../../../utilities/utilities";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("renders mode two score till you die option on button click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(
            <ModeTwoSelect
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
            ></ModeTwoSelect>
      );

      const output = screen.getByTestId("mode-two-select");
      await act(() => {
            userEvent.click(output);
      });
      const outputTwo = screen.getAllByText("score till you die");
      expect(outputTwo.length).toBe(2);
});

test("renders mode two maximize score in 5 min option on button click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(
            <ModeTwoSelect
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
            ></ModeTwoSelect>
      );

      const output = screen.getByTestId("mode-two-select");
      await act(() => {
            userEvent.click(output);
      });
      const outputTwo = screen.getByText("maximize score in 5 min");
      expect(outputTwo).toBeInTheDocument(2);
});
