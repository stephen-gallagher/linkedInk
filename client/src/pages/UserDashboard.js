import React, { useState } from 'react';
import UserAppointmentsList from '../components/UserAppointmentsList';
import UserBio from '../components/UserBio';
import UserCollections from '../components/UserCollections';
import UserCollectionView from '../components/UserCollectionView';
import axios from 'axios';

export default function UserDashboard({ user }) {
  const [showComponent, setShowComponent] = useState('userAppointments');
  const [backgroundColor, setBackgroundColor] = useState('#a7aba8');
  const [selectedCollection, setSelectedCollection] = useState(null);

  const showCollection = (id) => {
    axios
      .get(`/api/mycollection/${id}`)
      .then((response) => {
        setSelectedCollection(response.data);
        setShowComponent('thisCollection');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="column">
        <div className="col-8 offset-2 mt-5 ml-1">
          <UserBio
            user={user}
            setShowComponent={setShowComponent}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
          />
        </div>
        {showComponent === 'userAppointments' && (
          <UserAppointmentsList user={user} backgroundColor={backgroundColor} />
        )}
        {showComponent === 'userCollections' && (
          <UserCollections
            user={user}
            backgroundColor={backgroundColor}
            showCollection={showCollection}
          />
        )}
        {showComponent === 'thisCollection' && (
          <UserCollectionView
            selectedCollection={selectedCollection}
            backgroundColor={backgroundColor}
          />
        )}
      </div>
    </div>
  );
}
