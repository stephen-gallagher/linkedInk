import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import service from '../api/service';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function UserBioEdit({
  user,
  setShowComponent,
  getUser,
  dashboardEditView,
  setDashboardEditView,
}) {
  const [username, setUsername] = useState('');
  const [favouriteStyles, setFavouriteStyles] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const { id } = useParams();
  const animatedComponents = makeAnimated();

  const tattooStyles = [
    { value: 'Traditional', label: 'Traditional/Old School' },
    { value: 'NeoTraditional', label: 'Neo Traditional' },
    { value: 'Stick & Poke', label: 'Stick & Poke' },
    { value: 'Tribal', label: 'Tribal' },
    { value: 'WaterColor', label: 'Water Color' },
    { value: 'Blackwork', label: 'Blackwork' },
    { value: 'Realism', label: 'Realism' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Geometric', label: 'Geometric' },
    { value: 'MicroTattoo', label: 'Micro Tattoo' },
    { value: 'Abstract', label: 'Abstract' },
    { value: '3D', label: '3D' },
    { value: 'Cartoon', label: 'Cartoon' },
    { value: 'Portrait', label: 'Portrait' },
    { value: 'Continuous Line', label: 'Continuous Line' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Sketch', label: 'Sketch' },
    { value: 'Other', label: 'Other' },
  ];

  const handleFileUpload = (e) => {
    // const uploadData = new FormData()
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append('imageURL', e.target.files[0]);

    service
      .handleProfileUpload(uploadData)
      .then((response) => {
        console.log('uploading', response.secure_url);
        setProfilePicture(response.secure_url);
      })
      .catch((err) => console.log('Error when uploading the file: ', err));
  };

  const handleFavouriteStyleChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setFavouriteStyles(newValuesArr);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const requestBody = { favouriteStyles, profilePicture, username };
    axios
      .put(`/api/${id}/edit-user`, requestBody)
      .then((response) => {
        getUser();
        setDashboardEditView(false);
        // return response.data;
      })
      .catch((err) => {
        return err;
      });
  };

  const handleEditFinish = () => {
    setShowComponent('userAppointments');
    setDashboardEditView(false);
  };

  if (!user) {
    return <></>;
  }
  return (
    <div className=" d-flex border border-white border-4 justify-content-around bg-dark">
      <div className="d-flex flex-column p-2 bg-dark">
        <h3 className="righteous p-1">Edit Profile</h3>
        <div className="d-flex flex-row align-items-center justify-content-center mt-1">
          {dashboardEditView && (
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Username:{' '}
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  required
                  autoFocus
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="form-label" htmlFor="profilePicture">
                  Profile picture:{' '}
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="profilePicture"
                  // value={user.profilePicture}
                  onChange={handleFileUpload}
                />
                {!profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt=""
                    style={{ width: '180px' }}
                  />
                ) : (
                  <img src={profilePicture} alt="" style={{ width: '180px' }} />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="favouriteStyles">
                  Favourite tattoo styles:{' '}
                </label>
                <Select
                  name="favouriteStyles"
                  components={animatedComponents}
                  isMulti
                  defaultValue={user.favouriteStyles.map((style) => {
                    return {
                      value: `${style}`,
                      label: `${style}`,
                    };
                  })}
                  options={tattooStyles}
                  onChange={handleFavouriteStyleChange}
                />
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-success btn-block col-12"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>

        <p>
          <strong>Your favourite tattoo tyle/s:</strong>{' '}
          {user.favouriteStyles.map((style) => {
            return (
              <ul>
                <li>{style}</li>
              </ul>
            );
          })}
        </p>
        <div>
          <button className="btn btn-primary" onClick={handleEditFinish}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
