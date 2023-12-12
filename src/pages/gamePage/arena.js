import styles from "./arena.module.css";
import { PlayerJsx } from "./player";
import { CardOne } from "../../components/cards/cardOne";

export const Arena = ({ game }) => {
      return (
            <CardOne
                  customTag="section"
                  attributes={{
                        className: styles["arena-overlay"],
                  }}
            >
                  {game.players.map((player) => {
                        return (
                              <>
                                    <PlayerJsx
                                          player={player}
                                          game={game}
                                          key={"player " + player.number}
                                    ></PlayerJsx>
                              </>
                        );
                  })}
            </CardOne>
      );
};
