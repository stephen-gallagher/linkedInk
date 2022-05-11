import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import { useParams } from 'react-router-dom';
import '../Starability.css';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

export default function ArtistReviews({ artist, user, getArtist, editReview }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [reviewDisplay, setReviewDisplay] = useState('reviewList');

  const { id } = useParams();

  const handleSubmit = (e) => {
    console.log('id', id);
    e.preventDefault();
    axios
      .post(`/api/${id}/artist-profile/reviews`, {
        reviewText,
        rating,
      })
      .then((response) => {
        setReviewText('');
        setRating(0);
        setMessage('Your review has been posted!');
        getArtist();
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const deleteReview = (reviewId) => {
    axios
      .delete(`/api/artist-profile/reviews/${id}/${reviewId}`)
      .then((response) => {
        getArtist();
      })
      .catch((err) => console.log(err));
  };

  if (artist === null) {
    return <></>;
  }
  return (
    <div
      className="col-md-10 col-md-10 offset-md-1 col-lg-5 offset-lg-0 mt-3 card mb-3 bg-dark border-4 border border-white"
      style={{ height: '86vh', overflowX: 'auto', borderRadius: '15px' }}
    >
      <Fade bottom duration={1000} delay={600} distance="30px">
        <div className="card shadow bg-dark border-white mt-3">
          <div className="bg-white bg-gradient border-dark col-12 p-2 rounded ">
            <h2 className="righteous text-dark">Reviews</h2>
          </div>

          {artist.reviews.length === 0 ? (
            <div>
              <h4 className="mt-4 righteous">This studio has no reviews</h4>{' '}
              <hr></hr>
            </div>
          ) : (
            <div>
              {artist.reviews.map((review) => {
                return (
                  <ReviewCard
                    user={user}
                    review={review}
                    deleteReview={deleteReview}
                    editReview={editReview}
                  />
                );
              })}
            </div>
          )}
          <ReviewForm
            getProfile={getArtist}
            reviewText={reviewText}
            setReviewText={setReviewText}
            setRating={setRating}
            setMessage={setMessage}
            message={message}
            handleSubmit={handleSubmit}
          />
        </div>
      </Fade>
    </div>
  );
}
