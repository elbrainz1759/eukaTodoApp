import axios from 'axios';

 interface todoItem {
   id?: string;
   task: string;
   dueDate: string;
   status: string
}
 const todoService = {

    getTodoItems: async () => {
       try {
           console.log("Connect")
            return await axios.get('http://localhost:3000/api/todo');
         }catch(err) {
             return(err)
         }
    },
    getTodo : async(id: string) => {
        try {
            return await axios.get('http://localhost:3000/api/todo?id='+id);
         }catch(err) {
             return(err)
         }
    },
    addTodo :  async (item: todoItem) => {
        try {
           return await axios.post('/api/todo', item);
        }catch(err) {
            return(err)
        }
    },
    deleteTodo : async (id: string) => {
        try {
            return await axios.delete('/api/todo?id='+id);
         }catch(err) {
             return(err)
         }
    },
    editTodo : async (todoItem: todoItem, id:string) => {
        
        try {
            return await axios.patch('/api/todo?id='+id, todoItem);
         }catch(err) {
             return(err)
         }
    },
    changeStatus : async (id: string) => {
        
        try {
            return await axios.put('/api/todo?id='+id);
         }catch(err) {
             return(err)
         }
    }
}

export default todoService;
 