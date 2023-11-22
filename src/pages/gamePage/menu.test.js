import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";

test("renders new game option", () => {
      render(<App></App>);
      const output = screen.getByText("NEW GAME");
      expect(output).toBeInTheDocument();
});

test("renders controls option", () => {
      render(<App></App>);
      const output = screen.getByText("CONTROLS");
      expect(output).toBeInTheDocument();
});

test("renders game modes option", () => {
      render(<App></App>);
      const output = screen.getByText("GAME MODES");
      expect(output).toBeInTheDocument();
});

test("renders skins option", () => {
      render(<App></App>);
      const output = screen.getByText("SKINS");
      expect(output).toBeInTheDocument();
});

test("renders guide option", () => {
      render(<App></App>);
      const output = screen.getByText("GUIDE");
      expect(output).toBeInTheDocument();
});
