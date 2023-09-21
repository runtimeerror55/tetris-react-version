import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage/homePage";
import { GamePage } from "./pages/gamePage/gamePage";
import { GameProvider } from "./context/game";

const router = createBrowserRouter([
      {
            path: "/",
            element: <HomePage></HomePage>,
      },
      {
            path: "/play",
            element: <GamePage></GamePage>,
      },
]);

function App() {
      return <RouterProvider router={router} />;
}

export default App;
