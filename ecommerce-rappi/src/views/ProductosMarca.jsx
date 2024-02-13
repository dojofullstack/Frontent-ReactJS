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
  const products =  useEcommerceStore((state) =>  state.products);
  const productID =  useEcommerceStore((state) =>  state.productID);
  const updateProductID =  useEcommerceStore((state) =>  state.updateProductID);
  const updateProducts =  useEcommerceStore((state) =>  state.updateProducts);
  const updateProductDetail =  useEcommerceStore((state) =>  state.updateProductDetail);
  
  const { marcaID } = useParams();

  console.log("products", products);

  // console.log("logs estado productos", productos);


  useEffect(() => {
    console.log('productID', productID);
    window.history.pushState({}, '', `?productDetail=${productID}`);
    


    if (productID){
      updateProductDetail(productID);
      document.getElementById('my_modal_product').showModal();
    }
    

  }, [productID]);


  useEffect(() => {
    const API =
      `https://services.rappi.pe/api/web-gateway/web/restaurants-bus/store/id/${marcaID}/`;


      axios.defaults.headers.common["Authorization"] = TOKEN;

    const payload = {
      lat:-12.145395,
      lng:-77.021936,
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

      <div className="flex flex-wrap">

      {products.map((data, index) => (
              <div className="flex dojo-product" onClick={ () => updateProductID(data.product_id) } >
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

        {/* {products?.corridors?.map((data, index) => (
          <>
            {data.products.map((data, index) => (
              <div className="flex dojo-product" onClick={ () => updateProductID(data.product_id) } >
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
        ))} */}

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
