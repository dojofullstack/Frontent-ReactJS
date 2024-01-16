import axios from "axios";
import { useEffect, useState } from "react";
import getUser, {loginUser} from "../assets/modules/Auth";
import Header from "../components/Header";




const Main = () => {

    const [inputTask, setInputTask] = useState('');
    const [listTask, setListTask] = useState([]);
    const [user, setUser] = useState({});

    console.log('User Info',user);


    const getUserData = async () => {
        const data = await getUser();
        setUser(data);
    }

    

    useEffect(() => {
        getUserData();

    }, []);


    useEffect(() => {
        if (listTask.length === 0){
            axios.get('https://dummyjson.com/todos').then( data => {
                console.log(data.data.todos);
            setListTask(data.data.todos);
        })
        }
    }, []);




    useEffect(() => {
        console.log('el estado inpustack ha sido modificoado');
    }, [inputTask]);
    // por default el hhok useeffect depende de todos los estados del componentes
    // el hook useeffect con el segundo param con corchetes vacio inidica no depende de estados


    const AddTodoList = () => {
        // let newList = listTask;
        // newList.push(inputTask)
        // setListTask(newList);

        const newTask = {
            "todo": inputTask,
            "completed": false,
            "userId": 1
          }

        setListTask( (listTask) => [ ...listTask,  newTask ] );
        setInputTask('');

    }    

    return (
        <>  

            <Header dataUser={user}  />

            <h1>TodoList</h1>   

            <input value={inputTask} className="addTodoList" placeholder="Agregar tarea" onChange={(e) => setInputTask(e.target.value)}  />

            <button onClick={AddTodoList}  className="btn-todolist">crear tarea</button>


            <div className="boxTareas">

                <ul>

                {listTask.map((item, index) => (

                        <li className="itemTask" key={index}> {item.todo} </li>
                    ))}

                </ul>


            </div>

            <div className="footerTodolist">
                    <span>Total: {listTask.length}</span>
                    
                    <div>
                        <button onClick={() => setListTask((listTask) => [])}>Eliminar tareas</button>
                    </div>
            </div>


        </>
    )
}


export default Main;