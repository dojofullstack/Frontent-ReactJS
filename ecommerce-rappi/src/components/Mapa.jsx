import {
  LoadScript,
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
  StandaloneSearchBox,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useCallback, useRef, useState } from "react";
import useEcommerceStore from "../store";

export const Mapa = () => {

  const updatedAddressPrincipal = useEcommerceStore((state) => state.updatedAddressPrincipal);

  const inputRef = useRef();
  const [myaddres, setmyaddres] = useState("");
  const [zoom, setZoom] = useState(14);
  const [positionMap, setpositionMap] = useState({
    lat: -12.099167,
    lng: -77.010972,
  });

  const handlePlaceChanged = () => {
    console.log(inputRef.current.getPlaces());
    const [place] = inputRef.current.getPlaces();
    if (place) {
      // console.log(place);
      console.log(place.formatted_address);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());

      setmyaddres(place.formatted_address);
      setpositionMap({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setZoom(15);
    }
  };

  //   const { isLoaded } = useJsApiLoader({
  //     id: "google-map-script",
  //     googleMapsApiKey: "AIzaSyAwt0cTFqs0gTyEEI9epnxmqyRpHQva1WQ",
  //   });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(positionMap);
    map.fitBounds(bounds);

    setpositionMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setpositionMap(null);
  }, []);

  return (
    <div className="py-5 mx-auto flex justify-center items-center flex-col">
      <LoadScript
        googleMapsApiKey="AIzaSyAwt0cTFqs0gTyEEI9epnxmqyRpHQva1WQ"
        libraries={["places"]}
      >
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={() => handlePlaceChanged()}
        >
          <input
            className="my-2 input input-bordered input-success w-full max-w-xs"
            type="text"
            placeholder="Ingresa tu direccion de entrega"
          />

        </StandaloneSearchBox>


        <div className="mb-3">
          <button onClick={() => updatedAddressPrincipal(myaddres)} className="btn btn-success text-white">Guardar direccion</button>
        </div>

        <GoogleMap
          mapContainerStyle={{
            width: "500px",
            height: "450px",
            marginTop: '10px',
            marginBottom: '100px'
          }}
          center={positionMap}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <MarkerF id={1} position={positionMap}>
            {myaddres && (
              <InfoWindowF>
                <p>{myaddres}</p>
              </InfoWindowF>
            )}
          </MarkerF>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
