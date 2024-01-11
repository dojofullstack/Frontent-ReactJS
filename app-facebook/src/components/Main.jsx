import { useState } from "react";
import '../assets/css/styles.css';



const Main = ({imagen, slogan}) => {

    const [contadorVisitas, setContadorVisitas ]  = useState(0);
    const [nameBrand, setNameBrand ]  = useState('');


    

    console.log('Log contadorVisitas:',contadorVisitas);
    console.log('Log nameBrand:',nameBrand);

    // const actualizarVisitas = () => {
    //     setContadorVisitas(contadorVisitas + 1 );
    // }


    return (
        <div className="main" >
            <h1>{imagen.titulo}</h1>
            <p> <b>  {slogan}</b></p>
            <img src={imagen.url} />

            <button onClick={() => setContadorVisitas(contadorVisitas + 1 )}  className="btn-visitas">Actualizar visitas</button>

            <p >El # de visitas es: <b>  {contadorVisitas}</b></p>

            <p>Nombre de marca: <b>  {nameBrand} </b></p>


            <input className="brand" placeholder="ingresa el brand" onChange={(e) => setNameBrand(e.target.value)}  />


        </div>
    )
}


export default Main;
