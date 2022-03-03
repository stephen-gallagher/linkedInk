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

// create a new tattoo
router.post('/tattoos/create', (req, res, next) => {
  const { imageURL, caption, tags } = req.body;
  if (req.session.user) {
  }
  if (req.session.user) {
    Tattoo.create({
      imageURL: imageURL,
      tags: tags,
      caption: caption,
      artist: req.session.user._id,
    })
      .then((createdTattoo) => {
        console.log('tattoo', createdTattoo);
        User.findByIdAndUpdate(
          req.session.user._id,
          { $push: { artistCollection: createdTattoo._id } },
          { new: true }
        )
          .populate('artistCollection')
          .then((userFromDB) => {
            res.status(200).json(userFromDB);
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
});

// get all tattoos
router.get('/tattoos', (req, res, next) => {
  Tattoo.find()
    .then((tattoosFromDB) => {
      res.status(200).json(tattoosFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// get specific tattoo
router.get('/tattoos/:id', (req, res, next) => {
  Tattoo.findById(req.params.id)
    .then((tattooFromDB) => {
      res.status(200).json(tattooFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
