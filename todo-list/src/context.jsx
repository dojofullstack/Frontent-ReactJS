import React from 'react';




export const todoAppList = {
    listTask: [],
    completados: [],
    eliminados: [],
    user: {},
    isLogin: false
}


const TodoAppContext =  React.createContext(todoAppList);

export default TodoAppContext;