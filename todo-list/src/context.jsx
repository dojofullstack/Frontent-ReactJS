import React from 'react';




export const todoAppList = {
    listTask: [],
    completados: [],
    eliminados: [],
    user: {}
}


const TodoAppContext =  React.createContext(todoAppList);

export default TodoAppContext;