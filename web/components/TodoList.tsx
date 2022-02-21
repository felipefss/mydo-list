import { BaseSyntheticEvent, KeyboardEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";

// Components
import CheckList from "./CheckList";

// Styles
import styles from "./TodoList.module.scss";


  //TODO: Edit items
  //TODO: Create dark mode
  //TODO: Make input element smaller
  //TODO: Have an undo last action

export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [addText, setAddText] = useState("");

  useEffect(() => {
    try {
      localStorage.todos && setTodos(localStorage.todos.split(','));
      
      localStorage.checked && setChecked(localStorage.checked.split(','));
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    localStorage.todos = todos.toString();
  }, [todos]);
  
  useEffect(() => {
    localStorage.checked = checked.toString();
  }, [checked]);

  const addItem = (): void => {
    if (addText.length) {
      setTodos((list: string[]) => [...list, addText]);
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
    setChecked((old: string[]) => [...old, todos[checkIndex]]);

    target.checked = false;
    setTodos(todos.filter((str, i) => i !== checkIndex));
  };

  const handleUnchecked = (
    { target }: BaseSyntheticEvent,
    checkIndex: number
  ): void => {
    setTodos((old: string[]) => [...old, checked[checkIndex]]);

    target.checked = false;
    setChecked(checked.filter((str, i) => i !== checkIndex));
  };

  return (
    <>
      <Form.Group as={Row} className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="What to add?"
            value={addText}
            onChange={(event) => setAddText(event.target.value)}
            onKeyUp={detectEnter}
          />
        </Col>
        <Col>
          <Button variant="outline-dark" onClick={addItem}>
            Add
          </Button>
        </Col>
      </Form.Group>

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
