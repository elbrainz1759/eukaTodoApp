import { useContext, useState } from "react";
import {
  Button,
  CardActionArea,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  TextField,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { TodoContext } from "../contexts/todoContext";
import todoService from "../services/todoService";

interface todoItem {
  id?: string;
  task: string;
  dueDate: string;
  status: string;
}


const CreateTodoForm: React.FC = () => {
  const todoContext = useContext(TodoContext);
  let { addTodo } = todoContext;

  let [task, setTask] = useState("");
  let [dueDate, setDueDate] = useState("");

  function getTask({ currentTarget: input }: { currentTarget: any }) {
    setTask(input.value);
  }

  function getDueDate({ currentTarget: input }: { currentTarget: any }) {
    setDueDate(input.value);
  }
  async function saveTask() {
    const data: todoItem = {
      task,
      dueDate,
      status: "Pending",
    };
    if(task === "") return toast.error("Task is compulsory");
    try{
      const saveTodo = await todoService.addTodo(data);
      if (!saveTodo) toast.error("Error occured");
      toast.info("Todo Saved Successfully");
      const req: any = await todoService.getTodoItems();
      const getTodo = req.data;
      const newTodos: todoItem[] | [] = getTodo.todoItems;
      addTodo(newTodos);
    }catch(err){
      toast.error(err)
    }

  }

  return (
    <>
          <Card style={{ maxWidth: "100%", marginBottom: "5%" }}>
            <CardActionArea>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      multiline
                      variant="outlined"
                      style={{ width: "100%" }}
                      aria-label="Enter Task"
                      minRows={4}
                      placeholder="Enter Task "
                      id="newTask"
                      name="newTask"
                      value={task}
                      onChange={getTask}
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <Grid item xs={12}>
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      variant="outlined"
                      name="dueDate"
                      minRows={4}
                      label=""
                      type="date"
                      value={dueDate}
                      onChange={getDueDate}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <input
                      style={{
                        height: "55px",
                        width: "100%",
                        marginTop: "5px",
                        backgroundColor:"#20418d",
                        color:"white",
                        cursor:"pointer"
                      }}
                      color="primary"
                      value="Create New Todo"
                      readOnly
                      type="button"
                      onClick={saveTask}
                    
                      
                    />
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
    </>
  );
};

export default CreateTodoForm;
