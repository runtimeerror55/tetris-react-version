import { ControllerSelect } from "./controllerSelect";
import { Game, Joystick } from "../../utilities/utilities";
import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("renders player-0 gamepad ArrowDown label", () => {
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
            <ControllerSelect
                  joystick={joystick}
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
                  bindingValue={"ArrowDown"}
            ></ControllerSelect>
      );

      const output = screen.getByText("ArrowDown");
      expect(output).toBeInTheDocument();
});

test("renders player-0 gamepad select  options on button click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      const gamepadKeyBindings = [
            "a",
            "b",
            "x",
            "y",
            "l1",
            "r1",
            "l2",
            "r2",
            "dpad up",
            // "dpad down",
            "dpad left",
            "dpad right",
      ];
      const joystick = new Joystick({}, 0);

      render(
            <ControllerSelect
                  joystick={joystick}
                  game={game}
                  previousGamepadLoop={{
                        gamepadLoopState: { run: true },
                        setStartGamePadLoop: () => {},
                  }}
                  bindingValue={"ArrowDown"}
            ></ControllerSelect>
      );

      const output = screen.getByTestId("gamepad-select");
      await act(() => {
            userEvent.click(output);
      });
      gamepadKeyBindings.forEach((key) => {
            const outputTwo = screen.getByText(key);
            expect(outputTwo).toBeInTheDocument();
      });
});
