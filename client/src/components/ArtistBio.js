import React from 'react';
import ArtistProfileButtons from './ArtistProfileButtons';

export default function ArtistBio({ user, artist, setShowComponent }) {
  if (!artist) {
    return <></>;
  }
  return (
    <div
      className="col-3 offset-2 mt-3 ml-1 "
      style={{ height: '86vh', overflowX: 'auto' }}
    >
      <div className="card text-center bg-dark border border-white border-4 mb-3 ">
        <div className="bg-white border border-dark bg-gradient text-white p-2 rounded m-3 ">
          <h2 className="righteous text-dark">{artist.firstName}'s profile</h2>
        </div>
        <img
          src={artist.profilePicture}
          className="card-img-top rounded mx-auto d-block border border-white"
          style={{ width: '200px' }}
        />
        <div className="card-body d-flex flex-column text-align-center justify-content-center align-items-center">
          <p className="border-bottom pb-1" style={{ width: '300px' }}>
            <strong>Name:</strong> {artist.firstName} {artist.lastName}
          </p>

          <p className="border-bottom pb-3 pt-2" style={{ width: '300px' }}>
            <strong>Bio:</strong> {artist.aboutMe}
          </p>
          <p>
            <strong>Tattoo Style/s:</strong>{' '}
            {artist.tattooStyle.map((style) => {
              return (
                <ul>
                  <li>{style}</li>
                </ul>
              );
            })}
          </p>
        </div>
        <ArtistProfileButtons
          setShowComponent={setShowComponent}
          user={user}
          artist={artist}
        />
      </div>
    </div>
  );
}
