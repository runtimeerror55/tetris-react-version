import { createContext, useContext } from "react";
// import { GamepadInput } from "../utilities/utilities";
export const controllerContext = createContext(null);

export const ControllerProvider = ({ children }) => {
      const controller = null;
      return (
            <controllerContext.Provider value={controller}>
                  {children}
            </controllerContext.Provider>
      );
};
