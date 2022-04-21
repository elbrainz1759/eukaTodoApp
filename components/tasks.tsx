import { useContext, createContext } from "react";
import { useRouter } from 'next/router'
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import {
  DeleteForever,
  Edit,
  CheckBox,
  CheckBoxOutlineBlank,
} from "@material-ui/icons";
import { TodoContext } from "../contexts/todoContext";
import todoService from "../services/todoService";
import { toast } from "react-toastify";

interface todoItem {
  id?: string;
  task: string;
  dueDate: string;
  status: string;
}


const Tasks: React.FC = () => {
  const todoContext = useContext(TodoContext);
  let { todoItems, addTodo } = todoContext;
  const router = useRouter();


  async function handleDelete(id: string) {
    const deleteApi = await todoService.deleteTodo(id);
    if (deleteApi) {
      for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].id == id) {
          todoItems.splice(i, 1);
          addTodo();
          break;
        }
      }
      toast.error("Deleted");
    }
  }

  async function handleStatusChange(id: string) {
    const statusApi = await todoService.changeStatus(id);
    if (statusApi) {
      addTodo();  
      toast.success("Updated Successfully");
    }
  }

  if (todoItems?.length === 0)
    return (
      <Typography
        style={{ textAlign: "center" }}
        gutterBottom
        variant="h5"
        component="div"
      >
        You currently do not have any task
      </Typography>
    );

  

  return (
    <>
      <hr />
      {todoItems?.map((item: todoItem) => (
            <Card
              key={item.id}
              style={{ maxWidth: "100%", marginBottom: "5%" }}
            >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.task}
                  </Typography>
                  <Typography variant="body2">
                    Due Date: {item.dueDate}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button onClick={() => handleStatusChange(item.id!)} size="small" color="primary">
                  {item.status ==="Done" && <CheckBox />} {item.status ==="Unfinished" && <CheckBoxOutlineBlank />} {item.status}
                </Button>
                <Button onClick={() => router.push(`/modifyTask/${item.id}`)} size="small" color="primary">
                  <Edit /> Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item.id!)}
                  size="small"
                  color="primary"
                >
                  <DeleteForever /> Delete
                </Button>
              </CardActions>
            </Card>
          ))}
    </>
  );
};

export default Tasks;
