import { useContext, useState,  } from "react";
import {  useRouter } from "next/router";
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


const EditTodoForm: React.FC = () => {
  const todoContext = useContext(TodoContext);
  const router = useRouter()
  let { addTodo } = todoContext;
  let [task, setTask] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [text, setText] = useState("");
  let [dateData, setDateData] = useState("");
  const taskId: string | undefined = router.query.id;


  async function getTodoDetail(id: string){
    const {data} = await todoService.getTodo(id);
    setText(data.todoItem.task)
    setDateData(data.todoItem.dueDate)
  //  setDueDate(data.todoItem.dueDate)
    return data
    }

    getTodoDetail(taskId)
  

  function getTask({ currentTarget: input }: { currentTarget: any }) {
    setTask(input.value);
  }

  function getDueDate({ currentTarget: input }: { currentTarget: any }) {
    setDueDate(input.value);
  }

  async function saveTask() {
    if(task === "") return toast.error("Task is compulsory");
    const data: todoItem = {
      task,
      dueDate,
      status: "Pending",
    };
    try{
      const saveTodo = await todoService.editTodo(data, taskId);
      if (!saveTodo) toast.error("Error occured");
      toast.success("Todo Edited Successfully");
      const req: any = await todoService.getTodoItems();
      const getTodo = req.data;
      const newTodos: todoItem[] | [] = getTodo.todoItems;
      addTodo(newTodos);
      router.push("/");
    }catch(err){
      toast.error("Error occured, try again later")
    }
  }

  return (
    <>
          <Card style={{ maxWidth: "100%", marginBottom: "5%" }}>
            <CardActionArea>
            <Typography
    variant="h6"
    align="center"
    gutterBottom
    >
    <p style={{color:"green"}}>Todo ID: {taskId}</p>
    </Typography>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <p>Current Text: {text}</p>
                    <TextField
                      multiline
                      variant="outlined"
                      style={{ width: "100%" }}
                      aria-label="Update Current Task"
                      minRows={4}
                      placeholder="Update Current Task "
                      id="newTask"
                      name="newTask"
                      value={task}
                      required
                      onChange={getTask}
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <p>Current Date: {dateData}</p>
                    <TextField
                      style={{ width: "100%" }}
                      id="outlined-basic"
                      variant="outlined"
                      name="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={getDueDate}
                    />
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
                      value="Update Todo"
                      readOnly
                      type="button"
                      onClick={saveTask}
                    
                      
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
    </>
  );
};

export default EditTodoForm;
