import axios from 'axios';
import { create } from 'zustand'


const updateProducts = (set, products) => {
    const allProduct = products.corridors.map((item) => {
        // console.log('item.products', item.products)
        return item.products.map((product, index) => (
            product
        ))
        })
    
    let news = [];
    news = [].concat(...allProduct);
    // console.log('allProduct', news);

    return (
        set((state) => ({ products: news }))
    )

}



const updateProductDetail = (set, productID) => {
    return (
        set((state) => {
            const product = state.products.filter((item) => {
                                if (item.product_id === productID){
                                    return item
                                }
                            })

            return ({ productDetail: product[0] })
        } )
    )

}



const register = (set, name, email, password) => {
    const API_REGISTER  = 'https://api.dojopy.com/api/accounts/register/';

    const body = {
        "email": email,
        "first_name":name,
        "password": password,
        'username': email
    }

    axios.post(API_REGISTER, body).then((data) => {
        
        if (data.data.id){
            console.log('registro correcto', data.data.id);
            Login(set, email, password);
        }

    })



} 



const Login = (set, username, password) => {
    
    const API_LOGIN  = 'https://api.dojopy.com/api/token/';
    const API_PROFILE  = 'https://api.dojopy.com/api/accounts/me/';
    const body = {
        "username":username,"password":password
    }
    axios.post(API_LOGIN, body).then( (data) => {
        const Token = data.data.access;
        // guardar estado isLoginActive = true

        if (data.data.access){
            axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
            axios.get(API_PROFILE).then((data) =>  {
                console.log(data.data);
             // guardar estado user

             localStorage.setItem('token', Token);

            set((state) => ({ user: data.data.user, isLoginActive: true  }))
            })
        }

    })

}


const getUser = async (token) => {
    // luego este token lo recuperamos localStorage o memory temp;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const data = await axios.get('https://api.dojopy.com/api/accounts/me/');
    return data.data.user;
}


const checkLogin = async (set) => {
    console.log('comprobar si existe acces token');
    const token = localStorage.getItem('token');
    console.log(token);

    if (token !== null){
        console.log('si hay token, entonces acceder informacion user');
        const dataUser = await getUser(token);
        // guardar estado con set()
        set((state) => ({ user: dataUser, isLoginActive: true  }))

    }
}


const addCartItem = (set, product, cantidad) => {

    const item = {
        product: product,
        cantidad: cantidad
    }

    set((state) => ({cart: [...state.cart, item ]  }) )

}


const clearCart = (set) => {
    set((state) => ({cart: []  }) )
}



const loginClose = (set) => {
    localStorage.removeItem('token');
    set((state) => ({user: {}, isLoginActive: false} ));
}




const useEcommerceStore = create((set) => ({
    productID: 0,
    productDetail: {},
    updateProductDetail: (productID) => updateProductDetail(set, productID),
    updateProductID: (productID) => set((state) => ({ productID: productID})),
    products: [],
    updateProducts: (products) => updateProducts(set, products),
    detailProduct: [],
    user: {},
    isLoginActive: false,
    cart: [],
    contadorVisitas: 0,
    increasePopulation: () => set((state) => ({ contadorVisitas: state.contadorVisitas + 1 })),
    Login: (email, password) => Login(set, email, password),
    checkLogin: () => checkLogin(set),
    addCartItem: (product, cantidad) => addCartItem(set, product, cantidad),
    clearCart: () => clearCart(set),
    loginClose: () => loginClose(set),
    register: (name, email, password) => register(set, name, email, password)
  }))

export default useEcommerceStore;