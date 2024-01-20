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



    return (

        <TodoAppContext.Provider value={{
            todoApp,
            loadTask,
            updateCompletado
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