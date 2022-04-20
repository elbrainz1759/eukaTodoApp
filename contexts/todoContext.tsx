import { PropTypes } from '@material-ui/core';
import React, { useState } from 'react'
import { createContext } from "react";

type ContextProps = {
    todoItems: todoItem[] | [],
    addTodo?: (item: todoItem) => void,

}

interface todoItem {
    id?: string;
    task: string;
    dueDate: string;
    status: string;
  }
  
type Props = { children: React.ReactNode } & ContextProps;

  export const TodoContext = createContext<ContextProps>({
    todoItems: [] as todoItem[] | [],
    // updateTodo: (item: todoItem) => {},
  });

export const TodoContext_ : React.FC<Props> = (props) => {
    const [todoItems, setTodoItems] = useState<todoItem[] | []>(props.todoItems);
    
    const addTodo = (item: todoItem) => {
        setTodoItems(item);
    }
    

    return (
        <TodoContext.Provider
            value={{ todoItems, addTodo}}
            {...props}
        />
      )
  }
