import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useEcommerceStore from "../store";
import { TOKEN } from "../APIS";


const RestaurantCategorys = [
  {name: 'Sushi', image: 'https://images.rappi.pe/rests_taxonomy/afc20b37-c45a-4ecd-8908-56d9a2f9cced.png?e=webp&q=10&d=10x10'},
  {name: 'Chifa', image: 'https://images.rappi.pe/rests_taxonomy/peruana___ceviche.png?e=webp&q=10&d=10x10'},
  {name: 'Experiencias C.', image: 'https://images.rappi.pe/rests_taxonomy/6cb809c0-c4ce-445b-84f1-eb283ce72044.png?e=webp&q=10&d=10x10'},
  {name: 'Polleria', image: 'https://images.rappi.pe/rests_taxonomy/ec283484-41c4-47b8-a6b3-ca9df5236d9e.png?e=webp&q=10&d=10x10'},
  {name: 'Pescados y Mariscos', image: 'https://images.rappi.pe/rests_taxonomy/11b486d4-bf21-4591-b650-12cb6949692e.png?e=webp&q=10&d=10x10'},
  {name: 'Criolla', image: 'https://images.rappi.pe/rests_taxonomy/casera.png?e=webp&q=10&d=10x10'},
  {name: 'Asiatica', image: 'https://images.rappi.pe/rests_taxonomy/9371b617-c8aa-47c2-afb3-cb963d6281a8.png?e=webp&q=10&d=10x10'},
  {name: 'Hamburgesa', image: 'https://images.rappi.pe/rests_taxonomy/b2f87daf-ea61-471f-8e32-3b09e4644a3c.png?e=webp&q=10&d=10x10'},
  {name: 'Carnes', image: 'https://images.rappi.pe/rests_taxonomy/668ccecc-fb0f-4ce8-b87f-3e486308409a.png?e=webp&q=10&d=10x10'},
  {name: 'Poke', image: 'https://images.rappi.pe/rests_taxonomy/de8c99f6-8e01-41f2-9a0b-dedf92111df6.png?e=webp&q=10&d=10x10'},
]

const Restaurant = () => {
  const [marcas, setMarcas] = useState([]);
  const navigate =  useNavigate();
  // const statecontadorVisitas = useEcommerceStore((state) => state.contadorVisitas);



  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = TOKEN;

    const payload = {
      lat: -13.5223702,
      lng: -71.9748688,
      store_type: "restaurant",
      store_ids: [
        5190, 4947, 33838, 5050, 10475, 4936, 4943, 18676, 15828, 25616, 47517,
        20444, 35464, 45087, 48711, 50889, 52342, 22953, 48950, 49215, 51159,
        20448, 40443, 44361, 5439, 8344, 13077, 25370, 36593, 40917,
      ],
      is_prime: false,
      states: ["opened", "unavailable", "closed"],
      prime_config: { unlimited_shipping: false },
    };
    axios
      .post(
        "https://services.rappi.pe/api/web-gateway/web/restaurants-bus/stores/",
        payload
      )
      .then((data) => {
        // console.log(data.data);
        setMarcas(data.data);
      });
  }, []);


  return (
    <>



      <div className="flex flex-wrap mx-5 justify-center">

      <h1 className="text-3xl font-bold my-2 mx-10 w-full text-red-500">Restaurantes Cerca de Mi</h1>

        <div className="flex justify-center w-full mb-2 ">
          {RestaurantCategorys.map(item => (
<div className="mx-1 w-[90px] menu-order">
<img className="h-[70px] mx-auto" src={item.image}/>
<p className="font-bold text-center mt-1">{item.name}</p>
</div>
          ))}
      

        </div>

        {marcas.length > 0 &&
          marcas.map((data, index) => (
            <div className="card w-96 bg-base-100 shadow-xl m-3 cursor-pointer" key={index} onClick={() => navigate(`/Restaurantes/${data.store_id}`)}>
              <figure>  
                <img src={data.full_background} alt="" />
              </figure>
              <div className="card-body">
                <div className="flex space-x-5 ">
                  <img
                    width={"45px"}
                    src={`https://images.rappi.pe/restaurants_logo/${data.logo}`}
                  />

                  <div className="mx-2">
                    <h2 className="card-title ">{data.brand_name}</h2>
                    <p>{data.eta}  -  ${parseInt(data.delivery_price)} USD </p>
                  </div>

                  <div className="badge badge-secondary">{data.rating.score}</div>


                </div>

                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const Restaurante = () => {
  return (
    <>
      <Header />


      <Restaurant />

      <Footer />
    </>
  );
};

export default Restaurante;
