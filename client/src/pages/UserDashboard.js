import React, { useState, useEffect } from 'react';
import UserAppointmentsList from '../components/UserAppointmentsList';
import UserBio from '../components/UserBio';
import UserCollections from '../components/UserCollections';
import UserCollectionView from '../components/UserCollectionView';
import axios from 'axios';
import UserDashboardEdit from '../components/UserDashboardEdit';
import { useParams } from 'react-router-dom';

export default function UserDashboard() {
  const [showComponent, setShowComponent] = useState('userAppointments');
  const [backgroundColor, setBackgroundColor] = useState('#a7aba8');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [dashboardEditView, setDashboardEditView] = useState(false);
  const [collections, setCollections] = useState(null);
  const [user, setUser] = useState('');

  const { id } = useParams();

  const getUser = () => {
    // get request to the server
    axios
      .get(`/api/${id}/user-dashboard`)
      .then((response) => {
        console.log('this user', response.data);
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUser();
  }, []);

  const getUserCollections = () => {
    axios
      .get(`/api/user/collections`)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUserCollections();
  }, []);

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
        {!dashboardEditView && (
          <div className="col-8 offset-2 mt-5 ml-1">
            <UserBio
              user={user}
              setShowComponent={setShowComponent}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              setDashboardEditView={setDashboardEditView}
            />
          </div>
        )}
        {showComponent === 'userAppointments' && (
          <UserAppointmentsList
            user={user}
            getUser={getUser}
            backgroundColor={backgroundColor}
          />
        )}
        {showComponent === 'userCollections' && (
          <UserCollections
            user={user}
            backgroundColor={backgroundColor}
            showCollection={showCollection}
            getUserCollections={getUserCollections}
            collections={collections}
          />
        )}
        {showComponent === 'thisCollection' && (
          <UserCollectionView
            selectedCollection={selectedCollection}
            backgroundColor={backgroundColor}
          />
        )}
        {showComponent === 'editDashboard' && (
          <UserDashboardEdit
            user={user}
            backgroundColor={backgroundColor}
            dashboardEditView={dashboardEditView}
            setDashboardEditView={setDashboardEditView}
            getUser={getUser}
            getUserCollections={getUserCollections}
            collections={collections}
            setShowComponent={setShowComponent}
          />
        )}
      </div>
    </div>
  );
}
