import { screen, render, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../../App";

describe("menu options", () => {
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
});

test("renders controls component", async () => {
      render(<App></App>);

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

test("renders game modes component", async () => {
      render(<App></App>);

      const output = screen.getByText("GAME MODES");
      await act(() => {
            userEvent.click(output);
      });

      const output2 = screen.getByText("Game modes");
      expect(output2).toBeInTheDocument();
});

test("renders guide  component", async () => {
      render(<App></App>);

      const output = screen.getByText("GUIDE");
      await act(() => {
            userEvent.click(output);
      });

      const output2 = await screen.findByText("Guide");
      expect(output2).toBeInTheDocument();
});

test("renders guide page introduction", async () => {
      render(<App></App>);

      const output = screen.getByText("GUIDE");
      await act(() => {
            userEvent.click(output);
      });

      const output2 = await screen.findByText("Introduction");
      expect(output2).toBeInTheDocument();
});
