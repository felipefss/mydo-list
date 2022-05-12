import { BaseSyntheticEvent, useContext } from "react";
import { Form } from "react-bootstrap";
import { FaSun, FaMoon } from "react-icons/fa";

// Styles
import styles from "./SwitchTheme.module.scss";

// Contexts
import { ThemeContext } from "../context/ThemeContext";

export default function SwitchTheme() {
  const { theme, toggleDarkMode } = useContext(ThemeContext);

  const handleCheck = ({ target }: BaseSyntheticEvent) => {
    toggleDarkMode(target.checked);
  };

  return (
    <>
      <FaSun color="white" />
      <Form.Check
        type="switch"
        id="dark-mode-switch"
        className={styles.switch}
        onChange={handleCheck}
        checked={theme === 'dark'}
      />
      <FaMoon color="white" />
    </>
  );
}