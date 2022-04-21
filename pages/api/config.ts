interface todoItem {
  id?: string;
  task: string;
  dueDate: string;
  status: string
}
const fs = require('fs');
const path = require('path');
const db = require('./connect');
const databaseLink = path.resolve('./pages/api/database.json');

const writeDb = (obj:any) => {
    try {
        fs.writeFileSync(databaseLink, JSON.stringify(obj));
        return true;
    }catch(err) {
        console.log(err)
        return false;
    }
}

const config = {
    save: (item: todoItem): (todoItem | boolean) => {
        let todos : todoItem[] = db.todos;
      todos.push(item);
        if (writeDb(db)) return item;
        return false;

    },

    findAll : () : (todoItem[] | []) => {
        return db.todos
    },

    findOne : (id: string) : (todoItem | boolean ) => {
       for (let item of db.todos) {
           if (item.id == id) {
               return item;
           }
       }
       return false
    },

    updateTodo : (todoItem: todoItem, id: string) : (todoItem | false) => {

        const todos: todoItem[] = db.todos;

        for (let item of todos) {
            if (item.id == id) {
                item.task = todoItem.task;
                if(todoItem.dueDate !== "") item.dueDate = todoItem.dueDate;
                if(writeDb(db)) return item;
            }
        }

        return false;

    },

    updateStatus : (id: string) : boolean => {
        const todos : todoItem[] = db.todos;
        for (let item of todos) {
            if (item.id == id) {
                let changer = "Unfinished";
                if(item.status === "Unfinished"){
                    changer = "Done";
                }
                item.status = changer;
                if(writeDb(db)) return true;
            }
        }

        return false;
    },

    delete : (id: string) : boolean => {
        const todos : todoItem[] = db.todos;
        for (let i = 0; i<todos.length; i++) {
            if (todos[i].id == id) {
                todos.splice(i, 1);
                if(writeDb(db)) return true;
            }
        }

        return false;
    },

    deleteAll : () : boolean =>  {
        db.todos = [];
        if(writeDb(db)) return true;
        return false;
    }


}

export default config;

module.exports = config;