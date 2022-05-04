import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import { useParams } from 'react-router-dom';
import '../Starability.css';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

export default function StudioReviews({ studio, user, getStudio }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/studio/${id}/reviews`, {
        reviewText,
        rating,
      })
      .then((response) => {
        //  console.log('reviewData', response.data)
        setReviewText('');
        setRating(0);
        setMessage('Your review has been posted!');
        getStudio();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const deleteReview = (reviewId) => {
    axios
      .delete(`/api/artist-profile/reviews/${id}/${reviewId}`)
      .then((response) => {
        getStudio();
      })
      .catch((err) => console.log(err));
  };

  if (studio === null) {
    return <></>;
  }
  return (
    <Fade bottom duration={1000} delay={600} distance="30px">
      <div className="border border-white border-4 m-2">
        <div className="bg-white border border-dark col-10 offset-1 text-white p-2 rounded mt-3">
          <h2
            className="userHeading "
            style={{
              color: '#0c2112',
            }}
          >
            Reviews
          </h2>
        </div>
        {studio.reviews.length === 0 ? (
          <h3>This studio has no reviews</h3>
        ) : (
          <div>
            {studio.reviews.map((review) => {
              return (
                <ReviewCard
                  user={user}
                  review={review}
                  deleteReview={deleteReview}
                />
              );
            })}
          </div>
        )}
        <ReviewForm
          getProfile={getStudio}
          reviewText={reviewText}
          setReviewText={setReviewText}
          setRating={setRating}
          setMessage={setMessage}
          message={message}
          handleSubmit={handleSubmit}
        />
      </div>
    </Fade>
  );
}
