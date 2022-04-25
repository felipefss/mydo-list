import { BaseSyntheticEvent, KeyboardEvent, useContext, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

// Contexts
import { TodoContext } from "../context/TodoContext";

// Components
import CheckList from "./CheckList";

// Styles
import styles from "./TodoList.module.scss";

export default function TodoList() {
  const { todos, addRemoveTodo, checked, addChecked } = useContext(TodoContext);

  const [addText, setAddText] = useState("");

  const addItem = (): void => {
    if (addText.length) {
      addRemoveTodo({ type: "ADD_TODO", payload: addText });
      setAddText("");
    }
  };

  const detectEnter = ({ code }: KeyboardEvent): void => {
    if (code === "Enter") {
      addItem();
    }
  };

  const handleChecked = (
    { target }: BaseSyntheticEvent,
    checkIndex: number
  ): void => {
    addChecked({ type: "CHECK", payload: todos[checkIndex] });

    target.checked = false;
    addRemoveTodo({ type: "REMOVE_TODO", payload: checkIndex.toString() });
  };

  const handleUnchecked = (
    { target }: BaseSyntheticEvent,
    checkIndex: number
  ): void => {
    addRemoveTodo({ type: "ADD_TODO", payload: checked[checkIndex] });

    target.checked = false;
    addChecked({ type: "UNCHECK", payload: checkIndex.toString() });
  };

  return (
    <>
      <div className={styles.mainTextBox}>
        <Form.Control
          type="text"
          placeholder="What to add?"
          value={addText}
          onChange={(event) => setAddText(event.target.value)}
          onKeyUp={detectEnter}
        />

        <Button variant="outline-dark" onClick={addItem}>
          Add
        </Button>
      </div>

      <Stack gap={2}>
        <CheckList
          list={todos}
          idPrefix="Todo"
          handleCheck={handleChecked}
        />
      </Stack>

      {/* Checked todos */}
      {checked.length > 0 && (
        <Stack className={styles.checkedItems} gap={2}>
          <div>Checked items</div>
          <CheckList
            list={checked}
            idPrefix="Checked"
            handleCheck={handleUnchecked}
            checked
          />
        </Stack>
      )}
    </>
  );
}
