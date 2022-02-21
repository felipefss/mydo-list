import { BaseSyntheticEvent } from "react";
import { Form } from "react-bootstrap";

// Styles
import styles from "./CheckList.module.scss";

interface CheckListProps {
  list: string[];
  idPrefix: string;
  handleCheck: (event: BaseSyntheticEvent, i: number) => void;
  checked?: boolean;
}

export default function CheckList({ list, idPrefix, handleCheck, checked = false }: CheckListProps) {
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
              <Form.Check.Label>{item}</Form.Check.Label>
            </Form.Check>
          );
      })}
    </>
  );
}
