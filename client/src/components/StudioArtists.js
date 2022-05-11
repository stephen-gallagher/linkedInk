import axios from 'axios';
import Fade from 'react-reveal/Fade';
import { useParams, Link } from 'react-router-dom';
import '../Starability.css';

export default function StudioArtists({ studio, user, getStudio }) {
  const { id } = useParams();

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/studio/${id}`)
      .then((response) => {
        console.log('joindata', response.data);
        getStudio();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };
  if (studio === null) {
    return <></>;
  }
  return (
    <div>
      <Fade top duration={1000} delay={600} distance="30px">
        <div className="border border-white border-4 m-2">
          <div className="bg-white border border-dark col-10 offset-1 text-white p-2 rounded mt-3">
            <h2
              className="righteous"
              style={{
                color: '#0c2112',
              }}
            >
              Artists at this studio
            </h2>
          </div>
          {studio.artists.length === 0 ? (
            <h3>No artists have joined this studio yet!</h3>
          ) : (
            <div className="d-flex flex-wrap align-items-center justify-content-center pt-5">
              {studio.artists.map((artist) => {
                return (
                  <div className="p-2 artist-grid">
                    <Link to={`/${artist._id}/artist-profile`}>
                      <img
                        className="artist-image rounded border border-white shadow pb-2 img-grid"
                        src={artist.profilePicture}
                        style={{
                          width: '150px',
                          height: '250px',
                        }}
                      ></img>
                    </Link>
                    <h5
                      className="righteous"
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      {' '}
                      {artist.firstName} {artist.lastName}
                    </h5>
                  </div>
                );
              })}
            </div>
          )}
          {user && user.role === 'Artist' ? (
            <form onSubmit={handleJoinSubmit}>
              <button type="submit" className="btn btn-success mt-3 mb-3">
                Join this studio
              </button>
            </form>
          ) : (
            <>test</>
          )}
        </div>
      </Fade>
    </div>
  );
}
