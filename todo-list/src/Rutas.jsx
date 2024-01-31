import { BrowserRouter, Route, RouterProvider, Routes, useNavigate } from "react-router-dom";
import TodoList from "./views/TodoList";
import Login from "./views/Login";
import TodoAppContext, {todoAppList} from "./context";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Rutas = () => {
    
    const [todoApp, setTodoApp] = useState(todoAppList);

    console.log('etado todoApp', todoApp);


    const notifyError = () => toast.error("Credenciales incorrectas");

    const notifyOk = () => toast.success("Iniciando sesion!");



    const loadTask = (tasks) => {

        setTodoApp(
            todoApp => (
                {
                    ...todoApp,
                    listTask: tasks
                }
            )
        )

    }


    const updateCompletado = (tasks) => {
        setTodoApp(
            todoApp => (
                {
                    ...todoApp,
                    completados: tasks
                }
            )
        )
    }


    const addTask = (tasks) => {

        setTodoApp( todoApp => ({
            ...todoApp,
            listTask: [...todoApp.listTask, tasks]
        })
        )
    }


    const removeTask = (idTask) => {

        const tasksNews = todoApp.listTask.filter( task => task.id !== idTask );

        setTodoApp(
            todoApp => (
                {
                    ...todoApp,
                    listTask: tasksNews
                }
            )
        )

    }



    const updateTask = (task) => {

        // const updatedTasks = todoApp.listTask.map((item => {
        //         if (task.id === item.id){
        //             return task
        //         } else {
        //             return item
        //         }

        // }))

        // code refactoring
        const updatedTasks = todoApp.listTask.map(item => (item.id === task.id ? task : item));


        // console.log(tasksNews);

        setTodoApp(
            todoApp => (
                {
                    ...todoApp,
                    listTask: updatedTasks
                }
            )
        )
        

    }



    const loginUser = (username, password) => {

        // notifyOk();


        // setTimeout(() => {
        //     notifyOk()
        // }, 1000);
        


        const formLogin = {
            username,
            password,
            expiresInMins: 60
          }
    
    
        axios.post('https://dummyjson.com/auth/login', formLogin ).then((data) => {
            console.log(data.data.token);

            localStorage.setItem('token', data.data.token);


            notifyOk();


            setTodoApp(
                todoApp => (
                    {
                        ...todoApp,
                        user: data.data,
                        isLogin: true
                    }
                )
            )



        })
    
    }



    const getUser = async (token) => {
        // luego este token lo recuperamos localStorage o memory temp;
        // const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwNTM2NzUzMywiZXhwIjoxNzA1MzcxMTMzfQ._OeAve68Lk5z0paNwscCIT1xY2zx8BfSw718vWOIIX0";
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const data = await axios.get('https://dummyjson.com/auth/me');
        // console.log('log asynwait',data.data);
        return data.data;
        // axios.get('https://dummyjson.com/auth/me').then((data) => {
        //     if (Object.keys(data.data).length > 0){
        //         return data.data;
        //     } else {
        //         return {}
        //     }
        // })
    
    }


    const checkLogin = async () => {

        console.log('comprobar si existe acces token');
        // comprobar si existe acces token
        const token = localStorage.getItem('token');
        console.log(token);

        if (token !== null){
            console.log('si hay token, entonces acceder informacion user');
            const dataUser = await getUser(token);
            // console.log('dataUser',dataUser);

            setTodoApp(
                todoApp => (
                    {
                        ...todoApp,
                        user: dataUser,
                        isLogin: true
                    }
                )
            )


        }


    }


    const closeLogin = () => {
        localStorage.removeItem('token');
        setTodoApp(
            todoApp => (
                {
                    ...todoApp,
                    user: {},
                    isLogin: false
                }
            )
        );
    }
    
    




    return (

        <TodoAppContext.Provider value={{
            todoApp,
            loadTask,
            updateCompletado,
            addTask,
            removeTask,
            updateTask,
            loginUser,
            checkLogin,
            closeLogin
        }} >

                <BrowserRouter>

                <Routes>

                    <Route  path="/"  element={ <TodoList/> } />
                    <Route  path="/login"  element={ <Login/> } />
                    <Route  path="/registro"  element={ <TodoList/> } />
                    <Route  path="/app"  element={ <TodoList/> } />

                </Routes>

                </BrowserRouter>


        </TodoAppContext.Provider>

     

    )
}


export default Rutas;