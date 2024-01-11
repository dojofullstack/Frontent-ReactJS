import { useState } from "react";




const Main = () => {

    const [inputTask, setInputTask] = useState('');
    const [listTask, setListTask] = useState([]);

    // console.log('lista de tareas',listTask);

    const AddTodoList = () => {

        // let newList = listTask;
        // newList.push(inputTask)
        // setListTask(newList);

        setListTask( (listTask) => [ ...listTask,  inputTask ] );
        setInputTask('');

    }    

    return (
        <>

            <h1>TodoList</h1>

            <input value={inputTask} className="addTodoList" placeholder="Agregar tarea" onChange={(e) => setInputTask(e.target.value)}  />

            <button onClick={AddTodoList}  className="btn-todolist">crear tarea</button>


            <div className="boxTareas">

                <ul>

                {listTask.map((item, index) => (

                        <li className="itemTask" key={index}> {item} </li>
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