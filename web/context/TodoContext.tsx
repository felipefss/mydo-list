import React, { createContext, useEffect, useState } from "react";

interface IAction {
  type: string;
  payload: string;
}

interface ITodoContext {
  todos: string[];
  addRemoveTodo: (action: IAction) => void;
  editTodo: (index: number, newValue: string) => void;
  checked: string[];
  addChecked: (action: IAction) => void;
}

const reducer = (state: string[], { type, payload }: IAction): string[] => {
  switch (type) {
    case 'NEW_LIST':
      return payload.split(',');
    case 'ADD_TODO':
    case 'CHECK':
      return [...state, payload];
    case 'REMOVE_TODO':
    case 'UNCHECK':
      return state.filter((_, index) => index !== Number(payload));
    case 'WIPE_LIST':
      return [];
  }
};

export const TodoContext = createContext({} as ITodoContext);

export const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

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

  const addRemoveTodo = ({ type, payload }: IAction) => {
    setTodos(state => reducer(state, { type, payload }));
  };

  const editTodo = (index: number, newValue: string) => {
    setTodos(state => {
      const newState = [...state];
      newState[index] = newValue;
      return newState;
    });
  };

  const addChecked = ({ type, payload }: IAction) => {
    setChecked(state => reducer(state, { type, payload }));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addRemoveTodo,
        editTodo,
        checked,
        addChecked
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};