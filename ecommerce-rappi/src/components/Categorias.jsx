import { useNavigate } from "react-router-dom";
import useEcommerceStore from "../store";



const categorias = [
  {name: 'Restaurantes', image: 'https://dl.memuplay.com/new_market/img/com.grability.rappi.sc0.2021-03-12-15-23-03_2x.jpg'},
  {name:'Supermecardo', image: 'https://elcomercio.pe/resizer/Rpw2JNQtEnU76o8X4lUMeKZl4NE=/620x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/DHRENUGUWBGKRJAFZTZVRXXSUI.jpg'},
  {name:'Farmacia', image: 'https://scontent.flim15-2.fna.fbcdn.net/v/t1.6435-9/101101457_1545902162280895_4811968082970935296_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=peeRNKNM1boAX8cQSS9&_nc_ht=scontent.flim15-2.fna&oh=00_AfBuHpPuC-hlmqw36vsgp7NljSVXDomg9NoNnKceSZC48A&oe=65F33054'},
];

const Categorias = () => {

  // const statecontadorVisitas = useEcommerceStore((state) => state.contadorVisitas);
  const navigate = useNavigate();

    // console.log('statecontadorVisitas', statecontadorVisitas);

    return (
        
        <div className="flex justify-center">
      

            {
                      categorias.map((item, index) => (
                        <div className="card w-96 bg-base-100 shadow-xl mx-3" key={index} onClick={() => navigate(`/${item.name}`)}  >
              <figure className="px-10 pt-10">
                <img src={item.image} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.name}</h2>
                <div className="card-actions">
                  <button className="btn btn-primary">Ver {item.name}</button>
                </div>
              </div>
            </div>
                    ) )
            
            }


        </div>
  
    )
}

export default Categorias;