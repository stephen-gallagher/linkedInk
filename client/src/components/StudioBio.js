import { useEffect, useState, useRef } from 'react';
import Fade from 'react-reveal/Fade';
import mapboxgl from 'mapbox-gl';
const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ';

export default function StudioBio({ studio, lng, lat }) {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const mapContainerStyle = {
    width: '90%',
    height: '250px',
  };

  useEffect(() => {
    if (lat !== null && lng !== null) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        accessToken: MAPBOX_TOKEN,
        style: 'mapbox://styles/stephengallagher/ckufe62dp408217mvz6kmroo5',
        center: [lng, lat],
        zoom: 14,
      });

      setMap(map);
    }
  }, [lat]);

  const Marker = ({ map }) => {
    const markerRef = useRef();

    useEffect(() => {
      const marker = new mapboxgl.Marker(markerRef)
        .setLngLat([lng, lat])
        .addTo(map);
    });
  };
  if (studio === null) {
    return <></>;
  }
  return (
    <div className="col-3 offset-2 mt-1 ml-1">
      <div
        className="card mb-3 border-white border-4 "
        style={{
          background: '#0c2112',
          height: '90vh',
          overflowX: 'auto',
        }}
      >
        <Fade left duration={1000} delay={600} distance="30px">
          <img
            src={studio.imageURL}
            className="card-img-top rounded mx-auto d-block mt-3 border border-white"
            style={{ width: '300px' }}
          />
          <h2 className="card-title righteous pt-3">{studio.name}</h2>
          <h5
            className="border-bottom pb-3 pt-2"
            style={{ width: '300px', textAlign: 'center' }}
          >
            {studio.location}
          </h5>
          <div className="card-body d-flex flex-column justify-content-start align-items-start p-3">
            <p>
              <strong>About:</strong> {studio.description}
            </p>
          </div>

          <div className="sidebar d-flex justify-content-center">
            {/* </div> */}
            <div
              ref={mapContainer}
              className="mapContainer ml-2 mb-5"
              style={{ width: '400px', height: '350px' }}
            />
          </div>
        </Fade>
      </div>
    </div>
  );
}
