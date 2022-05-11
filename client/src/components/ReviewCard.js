import React from 'react';

export default function ReviewCard({ review, user, deleteReview, editReview }) {
  return (
    <div className="card mt-3 col-6 offset-3 align-content-center mb-3 d-flex flex-column justify-content-center align-items-center bg-dark border-white">
      <div className="card-body ">
        <h5 className="card-title righteous">
          Username: {review.reviewAuthorUsername}
        </h5>
        <p
          className="starability-result align-items-center d-flex justify-content-center margin-1"
          data-rating={`${review.rating}`}
        >
          Rated: {`${review.rating}`} stars
        </p>
        <p className="card-text">Review: {review.reviewText}</p>

        {/* ({review.reviewAuthor} === {user._id} ?  */}

        {user && user._id === review.reviewAuthor ? (
          <div>
            <button
              onClick={() => {
                deleteReview(review._id);
              }}
              className="btn btn-sm btn-danger m-1"
            >
              Delete
            </button>
            <button
              onClick={() => {
                editReview(review._id);
              }}
              className="btn btn-sm btn-info m-1"
            >
              Edit
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
