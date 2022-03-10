import React, { useState, useEffect } from 'react';
import ArtistBio from '../components/ArtistBio';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ArtistGallery from '../components/ArtistGallery';

export default function ArtistProfile({ user }) {
  const [artist, setArtist] = useState(null);
  const [showComponent, setShowComponent] = useState('artistWork');
  const [selectedTattoo, setSelectedTattoo] = useState(null);

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
    <div
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
        height: '90VH',
      }}
    >
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
          />
        )}
      </div>
    </div>
  );
}
