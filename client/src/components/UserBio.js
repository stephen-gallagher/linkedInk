import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import UserDashboardButtons from './UserDashboardButtons';

export default function UserBio({ user }) {
  const [showComponent, setShowComponent] = useState('userAppointments');

  const [backgroundColor, setBackgroundColor] = useState('#a7aba8');
  if (!user) {
    return <></>;
  }
  return (
    <div
      className=" d-flex border border-white border-4"
      style={{ background: backgroundColor }}
    >
      <Fade left duration={1000} delay={600} distance="30px">
        <div className="d-flex flex-column p-2">
          {/* <div className="bg-dark bg-gradient text-white  p-2 rounded"> */}
          <h3 className="righteous p-1">Welcome {user.username}</h3>
          {/* </div> */}
          <div className="d-flex flex-row align-items-center justify-content-center mt-1">
            <img
              className="border border-white border-4 mb-2"
              src={user.profilePicture}
              alt="profile"
              style={{ width: '180px' }}
            />
          </div>
        </div>
      </Fade>
      <div className="card-body d-flex justify-content-around align-items-center  ">
        <Fade top duration={1000} delay={600} distance="30px">
          <div className="vl2"></div>
          {user.city && (
            <div className="d-flex flex-column  border-right border-dark p-4 ">
              <h3 className="righteous">You live in:</h3>
              <h4>{user.city.toUpperCase()}</h4>
            </div>
          )}
          <div className="vl2"></div>
          <div className="d-flex flex-column border-right border-dark p-4">
            <h3 className="righteous">Your favourite tattoo style/s: </h3>
            {user.favouriteStyles.map((style) => {
              return <h4>{style.toUpperCase()} </h4>;
            })}
          </div>
          <div className="vl2"></div>
          <UserDashboardButtons
            setShowComponent={setShowComponent}
            setBackgroundColor={setBackgroundColor}
          />
        </Fade>
      </div>
    </div>
  );
}
