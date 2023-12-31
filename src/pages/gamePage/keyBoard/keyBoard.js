import keyBoardImage from "../../../assets/images/160060-and-mouse-pic-black-keyboard.png";
import styles from "./keyBoard.module.css";
import { KeyBoardSelect } from "./keyBoardSelect";
import { CardTwo } from "../../../components/cards/cardTwo";
export const KeyBoard = ({ playerNumber, previousGamepadLoop, game }) => {
      return (
            <CardTwo customClass={styles["connected-key-board"]}>
                  <div className={styles["container"]}>
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
                        <KeyBoardSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="lifeSaver"
                              playerNumber={playerNumber}
                              game={game}
                        ></KeyBoardSelect>
                        <KeyBoardSelect
                              previousGamepadLoop={previousGamepadLoop}
                              bindingValue="hardDrop"
                              playerNumber={playerNumber}
                              game={game}
                        ></KeyBoardSelect>
                  </div>
            </CardTwo>
      );
};
