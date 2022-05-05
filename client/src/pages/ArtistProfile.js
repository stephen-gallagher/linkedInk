import React, { useState, useEffect } from 'react';
import ArtistBio from '../components/ArtistBio';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ArtistGallery from '../components/ArtistGallery';
import UploadTattoo from '../components/UploadTattoo';
import TattooView from '../components/TattooView';
import ArtistReviews from '../components/ArtistReviews';
import BookingForm from '../components/BookingForm';

export default function ArtistProfile({ user }) {
  const [artist, setArtist] = useState(null);
  const [showComponent, setShowComponent] = useState('artistWork');
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [tattooPopup, setTattooPopup] = useState(false);

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
          <ArtistReviews user={user} artist={artist} getArtist={getArtist} />
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
        {showComponent === 'imageUpload' && <UploadTattoo />}
      </div>
    </div>
  );
}
