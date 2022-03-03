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

// upload to profile picture
router.post(
  '/profile-picture/update',
  fileUploader.single('imageURL'),
  (req, res, next) => {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    // get the URL of the uploaded file and send it as a response.
    // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

    res.json({ secure_url: req.file.path });
  }
);

// add appointment to the user
router.put('/:id/appointments', (req, res, next) => {
  const { date, time, location, artist, price } = req.body;
  console.log('body', req.body);
  if (req.session.user) {
    User.findByIdAndUpdate(
      req.session.user._id,
      { $push: { myAppointments: { date, time, location, artist, price } } },
      { new: true }
    )
      .then((collectionFromDB) => {
        // console.log('this is the collection', collectionFromDB)
        res.status(200).json(collectionFromDB);
      })
      .catch((err) => {
        next(err);
      });
  }
});

// get current user
router.get('/users', (req, res, next) => {
  User.findById(req.session.user._id)
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// get user profile
router.get('/:id/user-dashboard', (req, res, next) => {
  User.findById(req.params.id)
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((err) => {
      next(err);
    });
});

// get user appointments
router.get('/user/appointments', (req, res, next) => {
  User.findById(req.session.user._id)
    .populate({
      path: 'myAppointments',
      populate: {
        path: 'artist',
      },
    })
    .populate({
      path: 'myAppointments',
      populate: {
        path: 'location',
      },
    })
    .then((appointments) => {
      res.status(200).json(appointments);
    })
    .catch((err) => next(err));
});

// edit user styles and profile picture
router.put('/:id/edit-user', (req, res, next) => {
  const { favouriteStyles, profilePicture } = req.body;
  User.findByIdAndUpdate(req.params.id, {
    favouriteStyles: favouriteStyles,
    profilePicture: profilePicture,
  })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => next(err));
});

// Delete appointment
router.delete('/user-dashboard/appointments/:date', (req, res, next) => {
  const appointmentDate = req.params.date;
  console.log('theAppointment', appointmentDate);
  if (req.session.user) {
    User.findByIdAndUpdate(
      req.session.user._id,
      { $pull: { myAppointments: { date: `${appointmentDate}` } } },
      { new: true }
    )
      .then((collectionFromDB) => {
        // console.log('this is the collection', collectionFromDB)
        res.status(200).json(collectionFromDB);
      })
      .catch((err) => {
        next(err);
      });
  }
});

module.exports = router;
