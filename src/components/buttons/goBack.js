import styles from "./goBack.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export const GoBackButton = ({ onClickHandler }) => {
      return (
            <button
                  onClick={onClickHandler}
                  className={styles["go-back-button"]}
            >
                  <FontAwesomeIcon icon={faArrowLeft} />
            </button>
      );
};
