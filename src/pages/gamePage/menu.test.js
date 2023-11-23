import { screen, render, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../../App";
import { Menu } from "./menu";
import { Game } from "../../utilities/utilities";

describe("menu options", () => {
      test("renders new game option", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );
            render(<Menu game={game}></Menu>);
            const output = screen.getByText("NEW GAME");
            expect(output).toBeInTheDocument();
      });

      test("renders controls option", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );
            render(<Menu game={game}></Menu>);
            const output = screen.getByText("CONTROLS");
            expect(output).toBeInTheDocument();
      });

      test("renders game modes option", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );
            render(<Menu game={game}></Menu>);
            const output = screen.getByText("GAME MODES");
            expect(output).toBeInTheDocument();
      });

      test("renders skins option", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );
            render(<Menu game={game}></Menu>);
            const output = screen.getByText("SKINS");
            expect(output).toBeInTheDocument();
      });

      test("renders guide option", () => {
            const game = new Game(
                  () => {},
                  () => {},
                  () => {},
                  20,
                  10,
                  30
            );
            render(<Menu game={game}></Menu>);
            const output = screen.getByText("GUIDE");
            expect(output).toBeInTheDocument();
      });
});

test("renders controls component on click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Menu game={game} setShowBars={() => {}}></Menu>);

      const output = screen.getByText("CONTROLS");
      await act(() => {
            userEvent.click(output);
      });

      await waitFor(
            () => {
                  const output2 = screen.getByText("Controls");
                  expect(output2).toBeInTheDocument();
            },
            { timeout: 3000 }
      );
});

test("renders game modes component on click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Menu game={game}></Menu>);

      const output = screen.getByText("GAME MODES");
      await act(() => {
            userEvent.click(output);
      });

      const output2 = screen.getByText("Game modes");
      expect(output2).toBeInTheDocument();
});

test("renders guide  component on click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Menu game={game}></Menu>);

      const output = screen.getByText("GUIDE");
      await act(() => {
            userEvent.click(output);
      });

      const output2 = await screen.findByText("Guide");
      expect(output2).toBeInTheDocument();
});

test("renders skins  component on click", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Menu game={game}></Menu>);

      const output = screen.getByText("SKINS");
      await act(() => {
            userEvent.click(output);
      });

      const output2 = await screen.findByText("Skins");
      expect(output2).toBeInTheDocument();
});
