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
    console.log('allProduct', news);

    return (
        set((state) => ({ products: news }))
    )

}

const updateProduct =  (set, productID) => {


    return (
        set((state) => {
            console.log('state.products', state.products);
            const productDetail = state.products.map((item) => {
                if (item.id === productID){
                    return item
                }

            return (
                { productDetail: productDetail }
            )
        }
            )}
    ))

}


const useEcommerceStore = create((set) => ({
    productID: 0,
    productDetail: {},
    updateProductDetail: (productID) => updateProduct(set, productID),
    updateProductID: (productID) => set((state) => ({ productID: productID})),
    products: [],
    updateProducts: (products) => updateProducts(set, products),
    detailProduct: [],
    user: {},
    cart: {},
    contadorVisitas: 0,
    increasePopulation: () => set((state) => ({ contadorVisitas: state.contadorVisitas + 1 })),
  }))

export default useEcommerceStore;