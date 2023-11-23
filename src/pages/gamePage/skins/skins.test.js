import { Skins } from "./skins";
import { Game } from "../../../utilities/utilities";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders skins heading", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Skins game={game}></Skins>);

      const output = screen.getByText("Skins");
      expect(output).toBeInTheDocument();
});

test("renders blue skin option", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Skins game={game}></Skins>);

      const output = screen.getByText("Blue");
      expect(output).toBeInTheDocument();
});

test("renders red skin option", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Skins game={game}></Skins>);

      const output = screen.getByText("Red");
      expect(output).toBeInTheDocument();
});

test("renders green skin option", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Skins game={game}></Skins>);

      const output = screen.getByText("Green");
      expect(output).toBeInTheDocument();
});

test("renders violet skin option", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Skins game={game}></Skins>);

      const output = screen.getByText("Violet");
      expect(output).toBeInTheDocument();
});

test("renders yellow skin option", async () => {
      const game = new Game(
            () => {},
            () => {},
            () => {},
            20,
            10,
            30
      );
      render(<Skins game={game}></Skins>);

      const output = screen.getByText("Yellow");
      expect(output).toBeInTheDocument();
});
