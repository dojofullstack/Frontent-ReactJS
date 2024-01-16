import axios from "axios";





export const loginUser = () => {

    
    const formLogin = {
        username: 'kminchelle',
        password: '0lelplR',
        expiresInMins: 60
      }


    axios.post('https://dummyjson.com/auth/login', formLogin ).then((data) => {
        console.log(data.data);
    })

}





const getUser = async () => {

    // luego este token lo recuperamos localStorage o memory temp;

    const Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcwNTM2NzUzMywiZXhwIjoxNzA1MzcxMTMzfQ._OeAve68Lk5z0paNwscCIT1xY2zx8BfSw718vWOIIX0";

    axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;

    const data = await axios.get('https://dummyjson.com/auth/me');
    // console.log('log asynwait',data.data);
    return data.data;

    // axios.get().then((data) => {
    //     if (Object.keys(data.data).length){
    //         return data.data;
    //     } else {
    //         return []
    //     }
    // })



}


export default getUser;