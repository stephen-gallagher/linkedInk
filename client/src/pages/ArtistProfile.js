import React, { useState, useEffect } from 'react';
import ArtistBio from '../components/ArtistBio';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ArtistGallery from '../components/ArtistGallery';
import UploadTattoo from '../components/UploadTattoo';
import TattooView from '../components/TattooView';
import ArtistReviews from '../components/ArtistReviews';
import BookingForm from '../components/BookingForm';
import ReviewEdit from '../components/ReviewEdit';

export default function ArtistProfile({ user, handleFileUpload, imageURL }) {
  const [artist, setArtist] = useState(null);
  const [showComponent, setShowComponent] = useState('artistWork');
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [tattooPopup, setTattooPopup] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);

  const { id } = useParams();

  const getArtist = () => {
    axios
      .get(`/api/${id}/artist-profile/artist`)
      .then((response) => {
        console.log('userdata', response.data);
        setArtist(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getArtist();
  }, []);

  const editReview = (reviewId) => {
    axios
      .get(`/api/editReview/${reviewId}`)
      .then((response) => {
        setReviewToEdit(response.data);
        setShowComponent('editReview');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="row bg-gradient">
        <ArtistBio
          user={user}
          artist={artist}
          setShowComponent={setShowComponent}
        />
        {showComponent === 'artistWork' && (
          <ArtistGallery
            artist={artist}
            setSelectedTattoo={setSelectedTattoo}
            setShowComponent={setShowComponent}
            setTattooPopup={setTattooPopup}
          />
        )}
        {showComponent === 'reviews' && (
          <ArtistReviews
            user={user}
            artist={artist}
            getArtist={getArtist}
            editReview={editReview}
          />
        )}
        {showComponent === 'editReview' && (
          <div
            className="col-md-10 col-md-10 offset-md-1 col-lg-5 offset-lg-0 mt-3 card mb-3 bg-dark border-4 border border-white"
            style={{ height: '86vh', overflowX: 'auto', borderRadius: '15px' }}
          >
            <ReviewEdit
              reviewToEdit={reviewToEdit}
              setShowComponent={setShowComponent}
              getArtist={getArtist}
            />
          </div>
        )}
        {tattooPopup && (
          <TattooView
            selectedTattoo={selectedTattoo}
            user={user}
            artist={artist}
            setTattooPopup={setTattooPopup}
          />
        )}
        {showComponent === 'bookings' && <BookingForm />}
        {showComponent === 'imageUpload' && (
          <UploadTattoo
            handleFileUpload={handleFileUpload}
            imageURL={imageURL}
            setShowComponent={setShowComponent}
          />
        )}
      </div>
    </div>
  );
}
