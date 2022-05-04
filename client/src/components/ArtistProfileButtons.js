import React from 'react';

export default function ArtistProfileButtons({
  setShowComponent,
  user,
  artist,
}) {
  return (
    <div>
      <button
        className="btn btn-success col-8 mb-2 mx-auto d-block"
        onClick={() => setShowComponent('artistWork')}
      >
        View work
      </button>
      <button
        className="btn btn-success col-8 mb-2 mx-auto d-block"
        onClick={() => setShowComponent('reviews')}
      >
        Reviews
      </button>

      <button
        className="btn btn-success col-8 mb-2 mx-auto d-block"
        onClick={() => setShowComponent('bookings')}
      >
        Booking form
      </button>
      {user && user._id === artist._id ? (
        <button
          className="btn btn-success col-8 mb-2 mx-auto d-block"
          onClick={() => setShowComponent('imageUpload')}
        >
          Upload an image
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
