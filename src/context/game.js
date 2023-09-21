import { createContext, useMemo } from "react";
import { Game } from "../utilities/utilities";
export const gameContext = createContext(null);

export const GameProvider = ({ children }) => {
      const gameOne = useMemo(() => {
            return new Game();
      }, []);
      return (
            <gameContext.Provider value={gameOne}>
                  {children}
            </gameContext.Provider>
      );
};
