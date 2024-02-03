import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const [marcas, setMarcas] = useState([]);
  const navigate =  useNavigate();


  console.log("log estado", marcas);

  useEffect(() => {
    const access_token =
      "Bearer ft.gAAAAABlvnh3kh0lZbMgWPr-SoyP1_xqP9vKvHnyWvEdNKv4oKH2aJsX1rI6gMZJjz4SzA6ItgrkqhzA_CmBTnowgJ6Ivifqh_9Q0GQnszUn-JvAtHDJEO_kiPP7icIPR0cjCp1OKWFqVoxFDPSMcVRSA-RcVkhyjZiypoecaQ3QbFuMqKWsZxBdunL_DYUMidOLVnFcBbvwJ4O2-51VhaqcJiO_bF4jY4BCJP5LWkrp-4LZ6ROgGdxwu53F_tbFzBoVlOSggQaDq7_TvHpt_nDO9H3IeYW_24Zhzq7gCM35EoDtST9rzs0yfn4o_2yFMUBLBorFnhyrm27ukur8t90ndWey4W0suVtZev4GVoK2IS7kwVmeOtg=";
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

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
      <div className="flex flex-wrap">
        {marcas.length > 0 &&
          marcas.map((data, index) => (
            <div className="card w-96 bg-base-100 shadow-xl m-2" key={index} onClick={() => navigate(`/Restaurantes/${data.brand_id}`)}>
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

      <h1 className="text-3xl font-bold my-2 mx-1">Restaurantes</h1>

      <Restaurant />

      <Footer />
    </>
  );
};

export default Restaurante;
