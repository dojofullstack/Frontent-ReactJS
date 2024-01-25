import axios from "axios";
import { useContext, useEffect, useState } from "react";
import getUser, {loginUser} from "../assets/modules/Auth";
import Header from "../components/Header";
import TodoAppContext from "../context";




const Main = () => {

    const [inputTask, setInputTask] = useState('');
    const [inputEditTask, setInputEditTask] = useState('');

    // const [listTask, setListTask] = useState([]);
    const [edicionActive, setEdicionActive] = useState(false);
    const [idEdicion, setidEdicion] = useState(0);


    const {todoApp, loadTask, addTask, removeTask, updateTask} = useContext(TodoAppContext);


    console.log('consumer testing', todoApp);
    // console.log('User Info',user);


    // const getUserData = async () => {
    //     const data = await getUser();
    //     setUser(data);
    // }


    // useEffect(() => {
    //     getUserData();

    // }, []);


    useEffect(() => {
        if (todoApp.listTask.length === 0){
            axios.get('https://dummyjson.com/todos').then( data => {
                // console.log(data.data.todos);

            loadTask(data.data.todos);
            // setListTask(data.data.todos);
        })
        }
    }, []);




    // useEffect(() => {
    //     console.log('el estado inpustack ha sido modificoado');
    // }, [inputTask]);
    // por default el hhok useeffect depende de todos los estados del componentes
    // el hook useeffect con el segundo param con corchetes vacio inidica no depende de estados


    const AddTodoList = () => {
        // let newList = listTask;
        // newList.push(inputTask)
        // setListTask(newList);

        // setListTask( (listTask) => [ ...listTask,  newTask ] );

        const idRandom = parseInt(Math.random()*1000000);

        const newTask = {
            "id": idRandom,
            "todo": inputTask,
            "completed": false,
            "userId": 1
          }

        addTask(newTask);
        setInputTask('');

    }    



    const editartask = (task) => {

        setEdicionActive(true);
        setidEdicion(task.id);

        setInputEditTask(task.todo);

    }


    const editableTask = (itemTask, titleTask) => {

        // itemTask.todo = titleTask;

        // refactorizar con el operador spread
        const newTask = {...itemTask, todo: titleTask};

        updateTask(newTask);

        setEdicionActive(false);

    }




    return (
        <>  

            <Header dataUser={todoApp.user}  />

            <h1>TodoList</h1>   

            <input value={inputTask} className="addTodoList" placeholder="Agregar tarea" onChange={(e) => setInputTask(e.target.value)}  />

            <button onClick={() => AddTodoList() }  className="btn-todolist">Crear tarea</button>


            <div className="boxTareas">

                <ul>

                {todoApp.listTask.map((item, index) => (
                        
                        <li className="itemTask" key={index}>

                            <div className="d-flex">


                                {(!edicionActive || item.id !== idEdicion) &&  <p className="text-dark me-auto">{item.todo} </p>}
                                

                                {edicionActive && item.id === idEdicion &&
                                <input value={inputEditTask} className="addTodoList" onChange={(e) => setInputEditTask(e.target.value) }  />
                                }

                                {edicionActive && item.id == idEdicion && 
                                <button onClick={() =>  editableTask(item, inputEditTask) } className="btn btn-warning me-1">Guardar</button>
                                }


                                {(!edicionActive || item.id !== idEdicion) && 
                                <button onClick={() =>  editartask(item) } className="btn btn-warning me-1">Editar</button>
                                }



                                <button onClick={() => removeTask(item.id) } className="btn btn-danger">Eliminar</button>
                            </div>
                            
                            
                             </li>
                    ))}

                </ul>


            </div>

            <div className="footerTodolist">
                    <span>Total: {todoApp.listTask.length}</span>
                    
                    <div>
                        <button onClick={() => {}}>Eliminar tareas</button>
                    </div>
            </div>


        </>
    )
}


export default Main;