import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default function UserCollectionView({
  backgroundColor,
  selectedCollection,
}) {
  return (
    <div
      className="card d-flex flex-column col-8 offset-2 justify-content-around mt-3 border border-white border-4 mb-4"
      style={{ background: backgroundColor }}
    >
      <Fade bottom duration={1000} delay={600} distance="30px">
        {/* <h1 className="userHeading mt-3">My Appointments</h1> */}
        <div className="bg-dark bg-gradient col-12 text-white p-2 rounded">
          <h2 className="righteous">{selectedCollection.title}</h2>
        </div>
        <div className="card" style={{ background: backgroundColor }}>
          <Carousel>
            {selectedCollection !== null ? (
              selectedCollection.tattoos.map((image) => (
                <div style={{ background: backgroundColor }}>
                  <div className="col-8 offset-2 mt-3">
                    <img
                      className="border border-white border-4"
                      src={image.imageURL}
                      style={{ width: '600px' }}
                    />
                    {/* <p className="legend">{image.caption}</p> */}
                  </div>
                  <p>{image.caption}</p>
                  <Link
                    className="righteous-12"
                    to={`/${image.artist._id}/artist-profile`}
                  >
                    {image.artist.firstName} {image.artist.lastName}
                  </Link>
                  {/* <div>
                <img src="/tattoo-images/tattoo-arm-1.jpeg" />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img src="/tattoo-images/tattoo-arm-1.jpeg" />
                <p className="legend">Legend 3</p>
              </div> */}
                </div>
              ))
            ) : (
              <></>
            )}
          </Carousel>

          {/* <div>
          <h2>{collectionShow.title}</h2>
          <p>{collectionShow.description}</p>
          <button
            className="btn btn-success mb-4 mt-4 col-6"
            onClick={showAllCollectionsButton}
          >
            Back
          </button>
          {collectionShow !== null ? (
            collectionShow.tattoos.map((image) => (
              <div>
                <img
                  src={image.imageURL}
                  style={{ width: '300px' }}
                ></img>
                <h5>{image.caption}</h5>
                <p>
                  <strong>Done by: </strong>{' '}
                  <Link to={`/${image.artist._id}/artist-profile`}>
                    {image.artist.firstName} {image.artist.lastName}
                  </Link>
                </p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div> */}
        </div>
      </Fade>
    </div>
  );
}
