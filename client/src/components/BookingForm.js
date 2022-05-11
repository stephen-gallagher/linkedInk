import React, { useState } from 'react';
import axios from 'axios';

import Fade from 'react-reveal/Fade';
import service from '../api/service';

export default function BookingForm() {
  const [bodyPart, setBodyPart] = useState('');
  const [tattooSize, setTattooSize] = useState('');
  const [tattooDescription, setTattooDescription] = useState('');
  const [referenceImage, setReferenceImage] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleFileUpload = (e) => {
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append('imageURL', e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        setImageURL(response.secure_url);
      })
      .catch((err) => console.log('Error when uploading the file: ', err));
  };

  const handleBookingSubmit = (e) => {
    setBookingMessage('Your request has been sent!');
    setBodyPart('');
    setTattooSize('');
    setTattooDescription('');
    setReferenceImage('');
  };

  return (
    <div
      className="col-5 mt-3 card mb-3 bg-dark border border-white border-4"
      style={{ height: '86vh', overflowX: 'auto' }}
    >
      <Fade bottom duration={1000} delay={600} distance="30px">
        <div className="card shadow mt-3">
          <div className=" bg-gradient col-10 offset-1  text-dark p-2 rounded">
            <h2 className="righteous text-dark">Send a booking request</h2>
          </div>
          <div className="card-body bg-dark">
            <form
              className="bg-dark col-8 offset-2"
              onSubmit={handleBookingSubmit}
            >
              <div className="mb-3">
                <label className="form-label righteous" htmlFor="username">
                  Where do you want the tattoo?{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="bodyPart"
                  value={bodyPart}
                  required
                  autoFocus
                  onChange={(e) => setBodyPart(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label righteous" htmlFor="tattooSize">
                  Roughly what size would you like it?{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="size"
                  value={tattooSize}
                  required
                  onChange={(e) => setTattooSize(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label righteous"
                  htmlFor="tattooDescription"
                >
                  Describe your idea{' '}
                </label>
                <textarea
                  cols="30"
                  rows="3"
                  className="form-control"
                  type="text-area"
                  name="size"
                  value={tattooDescription}
                  height="200px"
                  required
                  onChange={(e) => setTattooDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label righteous"
                  htmlFor="profilePicture"
                >
                  Add reference images{' '}
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="rerefenceImage"
                  onChange={handleFileUpload}
                />
                {referenceImage && (
                  <img
                    src={referenceImage}
                    alt=""
                    style={{ height: '200px' }}
                  />
                )}
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-success btn-block col-12"
                  type="submit"
                >
                  Send request
                </button>
              </div>
              {bookingMessage && <h3>{bookingMessage}</h3>}
            </form>
          </div>
        </div>
      </Fade>
    </div>
  );
}
