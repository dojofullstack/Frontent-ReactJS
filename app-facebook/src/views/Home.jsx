import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";



const Home = () => {

    const imagen = {
        titulo: 'gato jugando',
        url: 'https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/seo/noticias/los-gatos-se-protegen-contra-las-plagas-de-insectos-al-danar-ciertas-plantas/9621844-10-esl-MX/Los-gatos-se-protegen-contra-las-plagas-de-insectos-al-danar-ciertas-plantas.jpg'
    }

    return (
        <>

            <Header/>


             <Main imagen={imagen}  slogan={'compran nikes en 2024'} />


            <Footer/>


        </>
    )
}


export default Home;