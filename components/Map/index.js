import { useState } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow }
  from 'react-google-maps';

import styles from './index.module.scss';

const Map = withScriptjs(withGoogleMap((props) => {

  const [selected, setSelected] = useState(null);

  return (
    <GoogleMap
      defaultCenter={{ lat: 19.083189, lng: 72.891482 }}
      defaultZoom={10}
    >
      {props.markerPositions.map(pos =>
        <Marker position={{ ...pos }}
          onClick={() => setSelected(pos)}
        />)}
      {selectedPark && (<InfoWindow position={{ ...pos }}>
        Thai Details
      </InfoWindow>)}
    </GoogleMap>
  );
}));

function MapWrapper() {
  return (
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      markerPositions={[{ lat: 19.177090, lng: 72.843239 }]}
    >
    </Map>
  );
}

export default MapWrapper;
