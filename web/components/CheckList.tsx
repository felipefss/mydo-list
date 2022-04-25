import { BaseSyntheticEvent, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { TodoContext } from "../context/TodoContext";

// Styles
import styles from "./CheckList.module.scss";

interface CheckListProps {
  list: string[];
  idPrefix: string;
  handleCheck: (event: BaseSyntheticEvent, i: number) => void;
  checked?: boolean;
}

interface KeyboardEvent {
  key: string;
}

export default function CheckList({ list, idPrefix, handleCheck, checked = false }: CheckListProps) {
  const [editing, setEditing] = useState<number>(null);
  const [editText, setEditText] = useState('');
  const { addRemoveTodo, editTodo } = useContext(TodoContext);

  const beginEdit = (index: number) => {
    setEditing(index);
  };

  const handleEdit = (event: BaseSyntheticEvent) => {
    setEditText(event.target.value);
  };

  const handleSave = (index: number) => {
    if (editText.length) {
      editTodo(index, editText);
      setEditText('');
    }
    setEditing(null);
  };

  const handleDelete = (index: number) => {
    addRemoveTodo({ type: 'REMOVE_TODO', payload: index.toString() });
    setEditing(null);
    setEditText('');
  };

  const handleEnter = ({ key }: KeyboardEvent, index: number) => {
    if (key === 'Enter') {
      if (editText) {
        handleSave(index);
      } else {
        setEditing(null);
      }
    }
  };

  return (
    <>
      {list.map((item, i) => {
        const elementId = `${idPrefix}${String(i)}`;

        return (
          <Form.Check className={styles.todoItem} type="checkbox" key={elementId}>
            <Form.Check.Input
              onChange={(event) => handleCheck(event, i)}
              checked={checked}
              id={elementId}
              type="checkbox"
            />
            {editing === i ? (
              <>
                <Form.Control
                  type="text"
                  autoFocus
                  value={editText || item}
                  onKeyUp={(event) => handleEnter(event, i)}
                  onChange={handleEdit}
                />

                <Button variant="outline-dark" onClick={() => handleDelete(i)}>
                  <FaTrash />
                </Button>
                <Button className={styles.saveEditBtn} variant="outline-dark" onClick={() => handleSave(i)}>
                  <FaCheck />
                </Button>
              </>
            ) : (
              <>
                <Form.Check.Label htmlFor={elementId}>{item}</Form.Check.Label>
                {!checked && <FaPen onClick={() => beginEdit(i)} className={styles.editPill} />}
              </>
            )}
          </Form.Check>
        );
      })}
    </>
  );
}
