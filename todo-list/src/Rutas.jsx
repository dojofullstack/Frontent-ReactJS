import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import TodoList from "./views/TodoList";
import Login from "./views/Login";
import TodoAppContext, {todoAppList} from "./context";
import { useState } from "react";





const Rutas = () => {
    
    const [todoApp, setTodoApp] = useState(todoAppList);

    console.log('etado todoApp', todoApp);


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




    return (

        <TodoAppContext.Provider value={{
            todoApp,
            loadTask,
            updateCompletado,
            addTask,
            removeTask,
            updateTask
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