import React, { useState } from 'react'
import { createContext } from "react";
import todoService from './../services/todoService';

type ContextProps = {
    todoItems: todoItem[] | [],
    addTodo: () => void,

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
    addTodo: () => {},
  });

export const TodoContext_ : React.FC<Props> = (props) => {
    const [todoItems, setTodoItems] = useState<todoItem[] | []>(props.todoItems);
    const addTodo = async () => {
    const req: any = await todoService.getTodoItems();
    const getTodo = req.data;
    const newTodos: todoItem[] | [] = getTodo.todoItems;
    setTodoItems(newTodos);
    return true;
}
    

    return (
        <TodoContext.Provider
            value={{ todoItems, addTodo}}
            {...props}
        />
      )
  }
