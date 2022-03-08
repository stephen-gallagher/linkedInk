import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { signup } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function SignUpUser(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tattooStyle, setTattooStyle] = useState('');
  const [favouriteStyles, setFavouriteStyles] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [role, setRole] = useState('Artist');
  const [userCollections, setUserCollections] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const handleTattooStyleChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setTattooStyle(newValuesArr);
  };

  const handleSubmitArtist = (e) => {
    e.preventDefault();

    signup(
      role,
      username,
      password,
      props.profilePicture,
      firstName,
      lastName,
      aboutMe,
      tattooStyle,
      favouriteStyles,
      userCollections
    )
      .then((response) => {
        if (response.message) {
          // reset the form
          setUsername('');
          setPassword('');
          // set the message
          setMessage(response.message);
        } else {
          // user is correctly signed up in the backend
          // add the user to the state of App.js
          props.setUser(response);
          // redirect to the projects overview
          navigate(`/${response._id}/artist-profile`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5 mb-5 col-lg-6 offset-lg-5 col-md-10 offset-md-1 col-sm-12">
      <Fade right duration={1000} delay={600} distance="30px">
        <div className="row">
          <h1 className="text-center">Create an artist account</h1>
          <div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3">
            <div className="card shadow border border-white">
              <div className="card-body bg-darkBlue">
                <h3 className="mb-3 righteous-35">Sign Up</h3>
                <h5 className="card-title">Enter your details here</h5>
                <form onSubmit={handleSubmitArtist}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Username:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Create password:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="profilePicture">
                      Profile picture:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      name="profilePicture"
                      onChange={props.handleFileUpload}
                    />
                    {props.profilePicture && (
                      <img
                        src={props.profilePicture}
                        alt=""
                        style={{ height: '200px' }}
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="firstName">
                      First Name:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="lastName">
                      Last Name:{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="tattooStyle">
                      Tattoo style:{' '}
                    </label>
                    <Select
                      className="tattoo-style"
                      name="tattooStyle"
                      components={animatedComponents}
                      isMulti
                      options={props.tattooStyles}
                      onChange={handleTattooStyleChange}
                      style={{ color: 'black', backgroundColor: 'black' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="aboutMe">
                      About Me:{' '}
                    </label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      name="aboutMe"
                      value={aboutMe}
                      // style={{height:"150px"}}
                      onChange={(e) => setAboutMe(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-success btn-block col-12"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  {message && <h4>{message}</h4>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
