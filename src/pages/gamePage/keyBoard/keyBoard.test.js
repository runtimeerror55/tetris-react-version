import { KeyBoard } from "./keyBoard";
import { Game } from "../../../utilities/utilities";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders keyboard player zero", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );

      render(
            <KeyBoard
                  playerNumber={0}
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
            ></KeyBoard>
      );

      const output = screen.getByText("Player-0");
      expect(output).toBeInTheDocument();
});
