const express = require('express');
const router = express.Router();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken =
  'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ';
const geocoder = mbxGeocoding({
  accessToken:
    'pk.eyJ1Ijoic3RlcGhlbmdhbGxhZ2hlciIsImEiOiJja25mdmVwN2wxYzd0Mm9vN3A2bjV1a2U1In0.2-AsAryWffIh9UqbCHW_GQ',
});

const User = require('../models/User');
const Tattoo = require('../models/Tattoo');
const Review = require('../models/Review');
const Studio = require('../models/Studio');
const Collection = require('../models/Collection');

const fileUploader = require('../config/cloudinary');
const { response } = require('express');
const { populate } = require('../models/User');

//   get all artists
router.get('/all-artists', (req, res, next) => {
  User.find({ role: 'Artist' })
    .then((artistsFromDB) => {
      res.status(200).json(artistsFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// get artist profile
router.get('/:id/artist-profile/user', (req, res, next) => {
  User.findById(req.params.id)
    .then((artistFromDB) => {
      res.status(200).json(artistFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// show Artist tatooo's
router.get('/:id/artist-profile', (req, res, next) => {
  Tattoo.find({ artist: req.params.id })
    .then((tattoos) => {
      res.status(200).json(tattoos);
    })
    .catch((err) => next(err));
});

// create review on artist page
router.post('/:id/artist-profile/reviews', (req, res, next) => {
  const { reviewText, rating } = req.body;
  Review.create({
    reviewText: reviewText,
    rating: rating,
    reviewArtist: req.params.id,
    reviewAuthor: req.session.user._id,
    reviewAuthorUsername: req.session.user.username,
  })
    .then((createdReview) => {
      User.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: createdReview._id } },
        { new: true }
      )
        .populate('reviews')
        .then((updatedUser) => {
          res.status(200).json(updatedUser);
          // code for updated
        });
    })
    .catch((err) => {
      next(err);
    });
});

// Delete artist review
router.delete('/artist-profile/reviews/:reviewId', (req, res, next) => {
  const { reviewId, id } = req.params;
  console.log('ids', reviewId, id);
  Review.findByIdAndDelete(reviewId, { new: true })
    .then((deletedReview) => {
      console.log('deletedReview', deletedReview);
      res.status(200).json(deletedReview);
    })
    .catch((err) => next(err));
});

// Show Artist reviews's
router.get('/:id/artist-profile/reviews', (req, res, next) => {
  Review.find({ reviewArtist: req.params.id })
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => next(err));
});

module.exports = router;
