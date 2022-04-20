import {
    Container,
  } from "@material-ui/core";
  import { useRouter } from 'next/router'
  import { Typography, Button } from "@material-ui/core";
  import { Cancel } from "@material-ui/icons";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import styles from "../../styles/Home.module.css";
  import EditTodoForm from "../../components/editTodoForm";
  import Footer from "../../components/footer";
  import Header from "../../components/header";
  import HeadText from "../../components/headText";
  import todoService from "../../services/todoService";
  import { GetServerSideProps } from "next";
  import { TodoContext_ } from "../../contexts/todoContext";
  
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


  
  const ModifyTask: React.FC<{ tasks: todoItem[] | [] }> = ({ tasks }) => {
    const router = useRouter();
    return (
        <TodoContext_ todoItems={tasks}>
        <div className={styles.container}> 
          <ToastContainer />
          <Header /> 
          <Container maxWidth="md">
            <HeadText title="Edit Todo" subTitle="" />
            <EditTodoForm />
            <Button variant="contained"  onClick={() => router.push("/")} size="large" style={{backgroundColor:"#20418d", color:"white"}}><Cancel /> Cancel </Button>         
          </Container>
          <Footer />
        </div>
        </TodoContext_>
    );
  };
  export default ModifyTask;
  