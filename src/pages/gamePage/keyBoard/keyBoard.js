import keyBoardImage from "../../../assets/images/160060-and-mouse-pic-black-keyboard.png";
import styles from "./keyBoard.module.css";
import { KeyBoardSelect } from "./keyBoardSelect";
export const KeyBoard = ({ playerNumber, previousGamepadLoop, game }) => {
      return (
            <div className={styles["connected-key-board"]}>
                  <div>
                        <img
                              src={keyBoardImage}
                              alt="gamepad"
                              className={styles["key-board-image"]}
                        ></img>
                        <div>Player-{playerNumber}</div>
                  </div>
                  <div>
                        <KeyBoardSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowDown"
                              game={game}
                              playerNumber={playerNumber}
                        ></KeyBoardSelect>
                        <KeyBoardSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowRight"
                              playerNumber={playerNumber}
                              game={game}
                        ></KeyBoardSelect>
                        <KeyBoardSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="ArrowLeft"
                              playerNumber={playerNumber}
                              game={game}
                        ></KeyBoardSelect>
                        <KeyBoardSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="rotate"
                              playerNumber={playerNumber}
                              game={game}
                        ></KeyBoardSelect>
                  </div>
            </div>
      );
};