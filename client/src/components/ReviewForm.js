import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReviewForm({
  getProfile,
  handleSubmit,
  setReviewText,
  setRating,
  setMessage,
  reviewText,
  message,
}) {
  return (
    <div>
      {' '}
      <h3 className="mt-4 righteous">LEAVE A REVIEW</h3>
      {/* {user && ( */}
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
              defaultChecked
              aria-label="No rating."
            />
            <input
              type="radio"
              id="first-rate1"
              name="review[rating]"
              value="1"
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
            value={reviewText}
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
  );
}
