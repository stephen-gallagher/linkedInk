import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudioBio from '../components/StudioBio';
import StudioArtists from '../components/StudioArtists';
import StudioReviews from '../components/StudioReviews';

export default function StudioShow({ user }) {
  const [studio, setStudio] = useState(null);
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);

  const { id } = useParams();

  const getStudio = () => {
    // get request to the server
    axios
      .get(`/api/studio/${id}`)
      .then((response) => {
        setStudio(response.data);
        setLng(response.data.geometry.coordinates[0]);
        setLat(response.data.geometry.coordinates[1]);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getStudio();
  }, []);

  console.log('studio', studio);
  return (
    <div>
      <div className="row">
        <StudioBio studio={studio} lng={lng} lat={lat} />

        <div className="col-5 mt-1 mb-3">
          <div
            className="card border border-white border-4"
            style={{
              background: '#0c2112',
              height: '90vh',
              overflowX: 'auto',
            }}
          >
            <StudioArtists studio={studio} user={user} getStudio={getStudio} />

            <StudioReviews studio={studio} user={user} getStudio={getStudio} />
          </div>
        </div>
      </div>
    </div>
  );
}
