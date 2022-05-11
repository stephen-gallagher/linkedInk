import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';

export default function UserAppointmentsEdit({ user, getUser }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(0);
  const [artist, setArtist] = useState(null);
  const [allStudios, setAllStudios] = useState([]);
  const [allArtists, setAllArtists] = useState([]);

  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/${id}/appointments/edit`, {
        date: date,
        time: time,
        location: location,
        price: price,
        artist: artist,
      })
      .then((response) => {
        getUser();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  const deleteAppointment = (date) => {
    axios
      .delete(`/api/user-dashboard/appointments/${date}`)
      .then((response) => {
        getUser();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };
  if (allStudios === '') {
    return <></>;
  }
  return (
    <div className="card bg-dark">
      <h2 className="righteous">Edit Appointments</h2>

      {user.myAppointments.map((appointment) => {
        return (
          <div className="d-flex flex-column border-bottom border-top border-white col-4 offset-4">
            <div className="d-flex">
              <h5 className="righteous">Artist:&nbsp;&nbsp;&nbsp;&nbsp; </h5>
              <Link
                className="text-success"
                to={`/${appointment.artist._id}/artist-profile`}
              >
                {' '}
                {appointment.artist.firstName} {appointment.artist.lastName}
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
            <button
              onClick={() => {
                deleteAppointment(appointment.date);
              }}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
