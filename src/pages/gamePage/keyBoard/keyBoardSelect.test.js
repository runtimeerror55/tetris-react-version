import { KeyBoardSelect } from "./keyBoardSelect";
import { Game } from "../../../utilities/utilities";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("renders player-0 keyboard ArrowDown label", () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(
            <KeyBoardSelect
                  playerNumber={0}
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
                  bindingValue={"ArrowDown"}
            ></KeyBoardSelect>
      );

      const output = screen.getByText("ArrowDown");
      expect(output).toBeInTheDocument();
});

test("renders player-0 keyboard select  option-1 on button click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      const keyBoardMapping = [
            "arrow down",
            "arrow left",
            "arrow right",
            "space bar",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
      ];

      render(
            <KeyBoardSelect
                  playerNumber={0}
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
                  bindingValue={"ArrowDown"}
            ></KeyBoardSelect>
      );

      const output = screen.getByTestId("key-board-select");
      await act(() => {
            userEvent.click(output);
      });
      keyBoardMapping.forEach((key) => {
            const outputTwo = screen.getByText(key);
            expect(outputTwo).toBeInTheDocument();
      });
});
