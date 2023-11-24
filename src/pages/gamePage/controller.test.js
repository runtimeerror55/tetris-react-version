import { Controller } from "./controller";
import { Game, Joystick } from "../../utilities/utilities";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders gamepad player zero", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      const joystick = new Joystick({}, 0);

      render(
            <Controller
                  joystick={joystick}
                  joystickIndex={0}
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
            ></Controller>
      );

      const output = screen.getByText("Player-0");
      expect(output).toBeInTheDocument();
});
