import React from 'react';
import Fade from 'react-reveal/Fade';

export default function ArtistGallery({
  artist,
  setSelectedTattoo,
  setTattooPopup,
}) {
  const handleTattooShow = (tattoo) => {
    setSelectedTattoo(tattoo);
    setTattooPopup(true);
  };
  if (!artist) {
    return <></>;
  }
  return (
    <div
      className="col-md-10 col-md-10 offset-md-1 col-lg-5 offset-lg-0 mt-3 card mb-3 bg-dark border-4 border border-white"
      style={{ height: '86vh', overflowX: 'auto', borderRadius: '15px' }}
    >
      {/* <div className="card border-white"> */}
      <div className="bg-white border border-dark bg-gradient col-12 text-white p-2 rounded mb-3 mt-3">
        <h2 className="righteous text-dark">{artist.firstName}'s work</h2>
      </div>
      <div className="d-flex flex-wrap bg-dark">
        {artist.artistCollection.map((tattoo) => {
          return (
            <Fade bottom duration={1000} delay={600} distance="30px">
              <div
                className="artist-grid bg-dark"
                onClick={() => handleTattooShow(tattoo)}
              >
                {/* <Link to={`/tattoos/${tattoo._id}`}> */}
                {tattoo.imageURL && (
                  <img
                    className="img-grid img-thumbnail img-fluid bg-dark"
                    src={tattoo.imageURL}
                    style={{ width: '190px', height: '190px' }}
                  ></img>
                )}
              </div>
            </Fade>
          );
        })}
      </div>
    </div>
  );
}
