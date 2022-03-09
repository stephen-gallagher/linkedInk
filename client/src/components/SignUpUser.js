import React, { useState } from 'react';
import { signup } from '../services/auth';
import Fade from 'react-reveal/Fade';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';

export default function SignUpArtist(props) {
  console.log('login', props);
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

  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const handleFavouriteStyleChange = (e) => {
    const newValuesArr = e ? e.map((item) => item.value) : [];
    setFavouriteStyles(newValuesArr);
  };

  const handleSubmitUser = (e) => {
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
          navigate(`/${response._id}/user-dashboard`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5 mb-5 col-lg-6 offset-lg-5 col-md-10 offset-md-1 col-sm-12">
        <Fade right duration={1000} delay={600} distance="30px">
          <div className="row">
            <h1 className="text-center">Create a user account</h1>
            <div className="col-md-6 offset-md-3 col-xl-6 offset-xl-3 col-sm-10">
              <div className="card shadow border border-white">
                {/* <img
                    src="/tattoo-images/tattoo-group-1.jpeg"
                    alt="tattoo-girl"
                    className="card-img-top"
                  ></img> */}
                <div className="card-body bg-darkBlue">
                  <h3 className="mb-3 background righteous-35">Sign Up</h3>
                  <h5 className="card-title">Enter your details here</h5>
                  <form onSubmit={handleSubmitUser}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Username:{' '}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        name="username"
                        value={username}
                        required
                        autoFocus
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
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="valid-feedback">Looks good!</div>
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
                      <label className="form-label" htmlFor="favouriteStyles">
                        Favourite tattoo styles:{' '}
                      </label>
                      <Select
                        name="favouriteStyles"
                        components={animatedComponents}
                        isMulti
                        options={props.tattooStyles}
                        onChange={handleFavouriteStyleChange}
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
                    {message && <h3>{message}</h3>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}
