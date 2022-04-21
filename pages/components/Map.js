import { useEffect } from 'react';
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = 
'pk.eyJ1IjoiaGVucnlrYXkiLCJhIjoiY2t2bWo5ZzdvM2ZvczJvcWkwNDFzNmdiaCJ9.1OAafyv0rVXq2d46umCZpg';

const Map = (props) => {

     useEffect(() => {
        const map = new mapboxgl.Map({
          container: "map",
          style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
          center: [-99.29011, 39.39172],
          zoom: 3,
        });

        if(props.pickupCoordinates){
          addToMap(map, props.pickupCoordinates)
        }

        if(props.dropoffCoordinates){
          addToMap(map, props.dropoffCoordinates)
        }

        //auto zoom to fit or zoom into the cooordinates when user clicks the destination
        if(props.pickupCoordinates && props.dropoffCoordinates){

          map.fitBounds([
            props.dropoffCoordinates,
            props.pickupCoordinates
          ], {padding: 70 })
        }

      }, [props.pickupCoordinates, props.dropoffCoordinates]);


    const addToMap = (map, coordinates) => {
      const marker1 = new mapboxgl.Marker()
      .setLngLat(coordinates)
      .addTo(map);

    }


    return (
        <Wrapper id="map">
            
        </Wrapper>
    )
}

export default Map

const Wrapper = tw.div`
  flex-1 h-1/2
`