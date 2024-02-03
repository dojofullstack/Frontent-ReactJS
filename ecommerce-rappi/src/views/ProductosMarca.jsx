import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/styles.css";

const Productos = () => {
  const [productos, setProductos] = useState({});
  const { marcaID } = useParams();

  console.log("marca", marcaID);

  console.log("logs estado productos", productos);

  useEffect(() => {
    const API =
      "https://services.rappi.pe/api/web-gateway/web/restaurants-bus/store/id/8418/";

    const access_token =
      "Bearer ft.gAAAAABlvnh3kh0lZbMgWPr-SoyP1_xqP9vKvHnyWvEdNKv4oKH2aJsX1rI6gMZJjz4SzA6ItgrkqhzA_CmBTnowgJ6Ivifqh_9Q0GQnszUn-JvAtHDJEO_kiPP7icIPR0cjCp1OKWFqVoxFDPSMcVRSA-RcVkhyjZiypoecaQ3QbFuMqKWsZxBdunL_DYUMidOLVnFcBbvwJ4O2-51VhaqcJiO_bF4jY4BCJP5LWkrp-4LZ6ROgGdxwu53F_tbFzBoVlOSggQaDq7_TvHpt_nDO9H3IeYW_24Zhzq7gCM35EoDtST9rzs0yfn4o_2yFMUBLBorFnhyrm27ukur8t90ndWey4W0suVtZev4GVoK2IS7kwVmeOtg=";
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    const payload = {
      lat: -13.5223702,
      lng: -71.9748688,
      store_type: "restaurant",
      is_prime: false,
      prime_config: { unlimited_shipping: false },
    };

    axios.post(API, payload).then((data) => {
      setProductos(data.data);
    });
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        {productos?.corridors?.map((data, index) => (
          <>
            {data.products.map((data, index) => (
              <div className="flex dojo-product">
                <div>
                  <p className="text-2xl font-bold">{data.name}</p>
                  <p>{data.description}</p>
                  <p>${data.price}</p>
                </div>

                <img
                  width={"100px"}
                  src={`https://images.rappi.pe/products/${data.image}`}
                />
              </div>
            ))}
          </>
        ))}
      </div>
    </>
  );
};

const ProductosMarca = () => {

  return (
    <>
      <Header />
      <Productos />
      <Footer />
    </>
  );
};

export default ProductosMarca;
