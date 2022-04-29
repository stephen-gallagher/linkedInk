import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default function AllArtistsCard({ newList }) {
  return (
    <div className="col-10 offset-1 d-flex flex-wrap justify-content-center">
      {newList.map((artist) => {
        return (
          <div className="p-4 bg-image hover-overlay">
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div className="container">
                <Link to={`/${artist._id}/artist-profile`}>
                  <img
                    className="border border-white border-4"
                    src={artist.profilePicture}
                    style={{
                      width: '300px',
                      height: '400px',
                      borderRadius: '15px',
                    }}
                  ></img>
                  <div className="allArtistsOverlay">
                    <div className="allArtistsInformation">
                      {' '}
                      <h2 className="Righteous">
                        {' '}
                        {artist.firstName} {artist.lastName}
                      </h2>
                      <p></p>
                      {artist.tattooStyle.map((style) => {
                        return <p> &nbsp; {style}. </p>;
                      })}
                    </div>
                  </div>
                </Link>
              </div>
              <div
                className="mask"
                style={{
                  background:
                    'linear-gradient(45deg, rgba(29, 236, 197, 0.5), rgba(91, 14, 214, 0.5) 100%)',
                }}
              ></div>
            </Fade>
            \
          </div>
        );
      })}
    </div>
  );
}
