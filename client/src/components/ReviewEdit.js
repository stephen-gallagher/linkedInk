import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

export default function ReviewEdit({
  reviewToEdit,
  setShowComponent,
  getArtist,
  getStudio,
}) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api/editReview/${reviewToEdit._id}`, {
        reviewText,
        rating,
      })
      .then((response) => {
        setReviewText('');
        setRating(0);
        setMessage('Your review has been updated!');
        getArtist ? getArtist() : getStudio();
        setShowComponent('reviews');
      })
      .catch((err) => {
        return err.response.data;
      });
  };
  console.log('edit', reviewToEdit);
  return (
    <Fade bottom duration={1000} delay={600} distance="30px">
      <div className="card shadow bg-dark border-white mt-3 col-12">
        <div className="bg-white bg-gradient border-dark col-12 p-2 rounded ">
          <h2 className="righteous text-dark">Edit your review</h2>
        </div>
        <form className="mb-3 col-6 offset-3" onSubmit={handleSubmit}>
          <div className="mb-3 offset-3">
            <fieldset className="starability-fade">
              <legend>Rating:</legend>
              <input
                type="radio"
                id="no-rate"
                className="input-no-rate"
                name="rating"
                value="0"
                aria-label="No rating."
                {...(reviewToEdit.rating === 0 ? { defaultChecked: true } : {})}
              />
              <input
                type="radio"
                id="first-rate1"
                name="review[rating]"
                value="1"
                {...(reviewToEdit.rating === 1 ? { defaultChecked: true } : {})}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="first-rate1" title="Terrible">
                1 star
              </label>
              <input
                type="radio"
                id="first-rate2"
                name="review[rating]"
                value="2"
                {...(reviewToEdit.rating === 2 ? { defaultChecked: true } : {})}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="first-rate2" title="Not good">
                2 stars
              </label>
              <input
                type="radio"
                id="first-rate3"
                name="review[rating]"
                value="3"
                {...(reviewToEdit.rating === 3 ? { defaultChecked: true } : {})}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="first-rate3" title="Average">
                3 stars
              </label>
              <input
                type="radio"
                id="first-rate4"
                name="review[rating]"
                value="4"
                {...(reviewToEdit.rating === 4 ? { defaultChecked: true } : {})}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="first-rate4" title="Very good">
                4 stars
              </label>
              <input
                type="radio"
                id="first-rate5"
                name="review[rating]"
                value="5"
                {...(reviewToEdit.rating === 5 ? { defaultChecked: true } : {})}
                onChange={(e) => setRating(e.target.value)}
              />
              <label htmlFor="first-rate5" title="Amazing">
                5 stars
              </label>
            </fieldset>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="body">
              Your review:
            </label>
            <textarea
              className="form-control"
              name="review[body]"
              cols="30"
              rows="3"
              defaultValue={reviewToEdit.reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button className="btn btn-success col-6" type="submit">
              Submit your review
            </button>
          </div>
          {message && <h5 className="righteous mt-2">{message}</h5>}
        </form>
      </div>
    </Fade>
  );
}
