import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/styles.css";
import { ModalDetail } from "../components/ModalDetail";
import useEcommerceStore from "../store";
import { TOKEN } from "../APIS";

const Productos = () => {
  // const [productos, setProductos] = useState({});
  const products = useEcommerceStore((state) => state.products);
  const productID = useEcommerceStore((state) => state.productID);
  const updateProductID = useEcommerceStore((state) => state.updateProductID);
  const updateProducts = useEcommerceStore((state) => state.updateProducts);
  const updateProductDetail = useEcommerceStore(
    (state) => state.updateProductDetail
  );

  const infoBrand = useEcommerceStore((state) => state.infoBrand);

  const { marcaID } = useParams();

  console.log("infoBrand", infoBrand);

  // console.log("logs estado productos", productos);

  useEffect(() => {
    console.log("productID", productID);
    window.history.pushState({}, "", `?productDetail=${productID}`);

    if (productID) {
      updateProductDetail(productID);
      document.getElementById("my_modal_product").showModal();
    }
  }, [productID]);

  useEffect(() => {
    const API = `https://services.rappi.pe/api/web-gateway/web/restaurants-bus/store/id/${marcaID}/`;

    axios.defaults.headers.common["Authorization"] = TOKEN;

    const payload = {
      lat: -12.145395,
      lng: -77.021936,
      store_type: "restaurant",
      is_prime: false,
      prime_config: { unlimited_shipping: false },
    };

    axios.post(API, payload).then((data) => {
      updateProducts(data.data);
    });
  }, []);

  return (
    <>
      <div className="flex my-5">
        <div className="w-3/12">
          <div className="card w-full bg-base-100 shadow-xl mx-1 relative">
            <figure className="">
              <img
                src={infoBrand.full_background}
                alt=""
              />
            
            </figure>
            <div className="card-body">
              <img
               className="absolute h-[70px] top-[125px] left-[10px] z-1"
               src={`https://images.rappi.pe/restaurants_logo/${infoBrand.logo}`}
                alt=""
              />

              <h2 className="card-title text-3xl">
                {infoBrand.brand_name}
                <div className="badge badge-secondary">Nuevo!</div>
              </h2>
              <p>Direccion: {infoBrand.address}</p>

              <div className="card-actions justify-end mt-2">
                <div className="badge badge-outline p-3">Delivery</div>
                <div className="badge badge-outline p-3">Retiro en tienda</div>
              </div>

              <ul className="menu  w-full rounded-box p-0 mt-3">
                {infoBrand?.corridors?.map((item) => (
                  <li><a>{item.name}</a></li>
                ))}
</ul>


            </div>
          </div>
        </div>

        <div className="w-full mx-3 justify-center">
          <div className="flex flex-wrap">
            {products.map((data, index) => (
              <div
                className="flex dojo-product shadow-xl"
                onClick={() => updateProductID(data.product_id)}
              >
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
          </div>
        </div>
      </div>

      <ModalDetail />
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
