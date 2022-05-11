import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import UserAppointmentsForm from './UserAppointmentsForm';

export default function UserAppointmentsList({
  user,
  getUser,
  backgroundColor,
}) {
  const [showForm, setShowForm] = useState(false);

  if (!user) {
    return <></>;
  }
  return (
    <div
      className="card d-flex flex-column col-8 offset-2 justify-content-around mt-3 border border-white border-4 mb-4"
      style={{
        background: backgroundColor,
        height: '55vh',
        overflowX: 'auto',
      }}
    >
      <Fade bottom duration={1000} delay={600} distance="30px">
        <h1 className="righteous mt-3">My Appointments</h1>
        <div className="d-flex flex-row justify-content-around mt-4">
          {user.myAppointments.length === 0 ? (
            <h3 className="righteous">You currently have no appointments.</h3>
          ) : (
            <div>
              {user.myAppointments.map((appointment) => {
                return (
                  <div className="d-flex flex-column border-bottom border-top border-white p-3">
                    <div className="d-flex">
                      <h5 className="righteous">
                        Artist:&nbsp;&nbsp;&nbsp;&nbsp;{' '}
                      </h5>
                      <Link
                        className="text-success"
                        to={`/${appointment.artist._id}/artist-profile`}
                      >
                        {' '}
                        {appointment.artist.firstName}{' '}
                        {appointment.artist.lastName}
                      </Link>
                    </div>
                    <div className="d-flex">
                      <h5 className="righteous">Studio:&nbsp; &nbsp; </h5>
                      <Link
                        className="text-success"
                        to={`/studio/${appointment.location._id}`}
                      >
                        {appointment.location.name}
                      </Link>
                    </div>
                    <div className="d-flex">
                      <h5 className="righteous">
                        Date:&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      </h5>
                      <p>{appointment.date}</p>
                    </div>
                    <div className="d-flex">
                      <h5 className="righteous">
                        Time: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </h5>
                      <p>{appointment.time}</p>
                    </div>
                    <div className="d-flex">
                      <h5 className="righteous">
                        Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'       '}
                      </h5>
                      <p> €{appointment.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="vl"></div>

          <div className="d-flex flex-column justify-content-start align-items-center">
            <div>
              <button
                className="btn btn-success mb-4 col-10"
                onClick={() => setShowForm(!showForm)}
              >
                Add a new appointment
              </button>
            </div>

            {showForm && <UserAppointmentsForm getUser={getUser} />}
          </div>
        </div>
      </Fade>
    </div>
  );
}
