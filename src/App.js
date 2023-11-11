import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage/homePage";
import { GamePage } from "./pages/gamePage/gamePage";
import { GameProvider } from "./context/game";
import { ThemeProvider } from "./context/theme";

const router = createBrowserRouter([
      //   {
      //         path: "/",
      //         element: <HomePage></HomePage>,
      //   },
      {
            path: "/",
            element: <GamePage></GamePage>,
      },
]);

function App() {
      return (
            <ThemeProvider>
                  <RouterProvider router={router} />
            </ThemeProvider>
      );
}

export default App;
