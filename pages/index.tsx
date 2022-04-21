
import {
  Container,
} from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Home.module.css";
import Tasks from "../components/tasks";
import CreateTodoForm from "../components/createTodoForm";
import Footer from "../components/footer";
import Header from "../components/header";
import HeadText from "../components/headText";
import todoService from "../services/todoService";
import { GetServerSideProps } from "next";
import { TodoContext_ } from "../contexts/todoContext";

interface todoItem {
  id?: string;
  task: string;
  dueDate: string;
  status: string;
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const req: any = await todoService.getTodoItems();
  const res = req.data;
  if (res.success) {
    const tasks = res.todoItems;
    return {
      props: { tasks },
    };
  }
  return {
    props: {},
  };
};

const Home: React.FC<{ tasks: todoItem[] | [] }> = ({ tasks }) => {

  return (
      <TodoContext_ todoItems={tasks} >
      <div className={styles.container}> 
        <ToastContainer />
        <Header /> 
        <Container maxWidth="md">
          <HeadText title="EukaPay Todo App" subTitle="" />
          <CreateTodoForm />
          <Tasks />
        </Container>
        <Footer />
      </div>
      </TodoContext_>
  );
};
export default Home;
