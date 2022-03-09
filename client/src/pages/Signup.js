import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import SignUpArtist from '../components/SignUpArtist';
import SignUpToggle from '../components/SignUpToggle';
import SignUpUser from '../components/SignUpUser';
import service from '../api/service';

export default function Signup(props) {
  const [toggled, setToggled] = useState(false);
  const [role, setRole] = useState('Artist');
  const [profilePicture, setProfilePicture] = useState('');

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

  const handleToggleChange = (e) => {
    setToggled(e.target.checked);
    setRole('User');
  };

  const handleFileUpload = (e) => {
    // const uploadData = new FormData()
    console.log('The file to be uploaded is: ', e.target.files[0]);

    const uploadData = new FormData();

    uploadData.append('imageURL', e.target.files[0]);

    service
      .handleUpload(uploadData)
      .then((response) => {
        setProfilePicture(response.secure_url);
      })
      .catch((err) => console.log('Error when uploading the file: ', err));
  };

  return (
    <div
      className="signupPage pt-5"
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
      }}
    >
      <SignUpToggle onChange={handleToggleChange} />
      {toggled ? (
        <SignUpUser
          handleFileUpload={handleFileUpload}
          profilePicture={profilePicture}
          tattooStyles={tattooStyles}
          setUser={props.setUser}
        />
      ) : (
        <SignUpArtist
          handleFileUpload={handleFileUpload}
          profilePicture={profilePicture}
          tattooStyles={tattooStyles}
          setUser={props.setUser}
        />
      )}
      <div className=" d-none d-lg-block col-md-4 col-lg-6 fixed-bottom">
        <Fade left duration={1000} delay={600} distance="30px">
          <img
            src="/tattoo-images/tattoo-girl-transparent-3.png"
            alt="tattoo-girl"
            style={{ height: '35rem' }}
            // className="card-img-top"
          ></img>
        </Fade>{' '}
      </div>
    </div>
  );
}
