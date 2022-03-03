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

// new collection
router.post('/collections/new', (req, res, next) => {
  const { collectionTitle, collectionDescription } = req.body;

  Collection.create({
    title: collectionTitle,
    description: collectionDescription,
    creator: req.session.user._id,
  })
    .then((createdCollection) => {
      User.findByIdAndUpdate(req.session.user._id, {
        $push: { userCollections: createdCollection._id },
      })
        .then((userFromDB) => {
          res.status(200).json(userFromDB);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// add tattoo to the collection
router.put('/tattoos/:id', (req, res, next) => {
  const { selectedCollection } = req.body;
  const tattooId = req.params.id;
  if (req.session.user) {
    Collection.findOneAndUpdate(
      { creator: `${req.session.user._id}`, title: `${selectedCollection}` },
      { $push: { tattoos: tattooId } },
      { new: true }
    )
      .then((collectionFromDB) => {
        console.log('this is the collection', collectionFromDB);
        res.status(200).json(collectionFromDB);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// get specific user collection
router.get('/collections/:id', (req, res, next) => {
  Collection.findById(req.params.id)
    .populate('tattoos')
    .then((collection) => {
      console.log('the collection', collection);
      res.status(200).json(collection);
    })
    .catch((err) => next(err));
});

// get specific user collection on page
router.get('/mycollection/:id', (req, res, next) => {
  const { id } = req.params;
  Collection.findById(req.params.id)
    .populate({
      path: 'tattoos',
      populate: {
        path: 'artist',
      },
    })
    .then((collection) => {
      console.log('the collection', collection);
      res.status(200).json(collection);
    })
    .catch((err) => next(err));
});

// Show User's collections's
router.get('/user/collections', (req, res, next) => {
  Collection.find({ creator: req.session.user._id })
    .populate('tattoos')
    .then((collections) => {
      res.status(200).json(collections);
    })
    .catch((err) => next(err));
});

// Delete collection
router.delete('/user-dashboard/collections/:id', (req, res, next) => {
  const collectionId = req.params.id;
  console.log('theCollectionID', collectionId);
  Collection.findByIdAndDelete(collectionId)
    .then((deletedReview) => {
      res.status(200).json(deletedReview);
    })
    .catch((err) => next(err));
});

module.exports = router;
