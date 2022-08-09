import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ innerText }) {
  return <button className={styles.btn}>{innerText}</button>;
}

Button.propTypes = {
  innerText: PropTypes.string.isRequired,
};

export default Button;
