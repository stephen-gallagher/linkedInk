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

// add artist to studio and studio to artist
router.put('/studio/:id', (req, res, next) => {
  const studioId = req.params.id;
  if (req.session.user) {
    Studio.findByIdAndUpdate(
      req.params.id,
      { $push: { artists: req.session.user._id } },
      { new: true }
    ).then((studioFromDB) => {
      console.log(studioFromDB);
      res.status(200).json(studioFromDB);
      User.findByIdAndUpdate(
        req.session.user._id,
        { $push: { myStudio: studioId } },
        { new: true }
      )
        .then((userFromDB) => {
          res.status(200).json(userFromDB);
        })
        .catch((err) => {
          next(err);
        })
        .catch((err) => {
          next(err);
        });
    });
  }
});

// get all artists in the studio
router.get('/studios/:id', (req, res, next) => {
  User.find({ myStudio: req.params.id })
    .then((tattooArtists) => {
      res.status(200).json(tattooArtists);
    })
    .catch((err) => next(err));
});

// get all studios
router.get('/all-studios', (req, res, next) => {
  Studio.find()
    .then((studiosFromDB) => {
      res.status(200).json(studiosFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// create new Studio
router.post('/new-studio', async (req, res, next) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();
  const { name, location, description, imageURL } = req.body;
  console.log(geoData.body);
  // User.findById(req.params.id)
  // .then(studio => {
  Studio.create({
    name: name,
    location: location,
    geometry: geoData.body.features[0].geometry,
    description: description,
    imageURL: imageURL,
  })
    .then((createdStudio) => {
      res.status(200).json(createdStudio);
    })
    .catch((err) => next(err));
});
// })

// studio show page
router.get('/studio/:id', (req, res, next) => {
  Studio.find({ _id: req.params.id })
    .then((studio) => {
      res.status(200).json(studio);
    })
    .catch((err) => next(err));
});

// create review on studio page
router.post('/studio/:id/reviews', (req, res, next) => {
  const { reviewText, rating } = req.body;
  Review.create({
    reviewText: reviewText,
    rating: rating,
    reviewArtist: req.params.id,
    reviewAuthor: req.session.user._id,
    reviewAuthorUsername: req.session.user.username,
  })
    .then((createdReview) => {
      Studio.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: createdReview._id } },
        { new: true }
      )
        .populate('reviews')
        .then((updatedStudio) => {
          res.status(200).json(updatedStudio);
          // code for updated
        });
    })
    .catch((err) => {
      next(err);
    });
});

// Delete studio review
router.delete('/studio/reviews/:reviewId', (req, res, next) => {
  const reviewId = req.params.reviewId;
  Review.findByIdAndDelete(reviewId, { new: true })
    .then((deletedReview) => {
      res.status(200).json(deletedReview);
    })
    .catch((err) => next(err));
});

// Show studio reviews's
router.get('/studio/:id/reviews', (req, res, next) => {
  Review.find({ reviewArtist: req.params.id })
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => next(err));
});

module.exports = router;
