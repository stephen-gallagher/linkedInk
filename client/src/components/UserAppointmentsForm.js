import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function UserAppointmentsForm({ getUserAppointments }) {
  const [allStudios, setAllStudios] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState(null);
  const [price, setPrice] = useState(0);
  const [artist, setArtist] = useState(null);

  const { id } = useParams();
  const animatedComponents = makeAnimated();

  const getAllArtists = () => {
    // get request to the server
    axios
      .get(`/api/all-artists`)
      .then((response) => {
        setAllArtists(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getAllStudios = () => {
    // get request to the server
    axios
      .get(`/api/all-studios`)
      .then((response) => {
        setAllStudios(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllArtists();
    getAllStudios();
  }, []);

  const handleArtistChange = (e) => {
    setArtist(e.value);
  };

  const handleStudioChange = (e) => {
    setLocation(e.value);
  };

  const handleSubmit = (e) => {
    console.log('price', price);
    e.preventDefault();
    axios
      .put(`/api/${id}/appointments`, {
        date: date,
        time: time,
        location: location,
        price: price,
        artist: artist,
      })
      .then((response) => {
        getUserAppointments();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  return (
    <div className="column mb-4">
      <h2 className="righteous text-center">Add a new appointment</h2>
      <div>
        <div className="card shadow">
          <div className="card-body bg-darkBlue">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="time">
                  Date:{' '}
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  value={date}
                  required
                  autoFocus
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="time">
                  Time:{' '}
                </label>
                <input
                  className="form-control"
                  type="time"
                  name="time"
                  value={time}
                  required
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="location">
                  Studio:{' '}
                </label>
                <Select
                  name="location"
                  components={animatedComponents}
                  options={allStudios.map((studio) => {
                    return {
                      value: `${studio._id}`,
                      label: `${studio.name}`,
                    };
                  })}
                  onChange={handleStudioChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="artist">
                  Artist:{' '}
                </label>
                <Select
                  name="artist"
                  components={animatedComponents}
                  options={allArtists.map((artist) => {
                    return {
                      value: `${artist._id}`,
                      label: `${artist.firstName} ${artist.lastName}`,
                    };
                  })}
                  onChange={handleArtistChange}
                />
                <div className="mb-3">
                  <label className="form-label" htmlFor="price">
                    Price (€):{' '}
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="price"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-success btn-block col-12"
                  type="submit"
                >
                  Add
                </button>
              </div>
              {/* {message && (
<h3>{message}</h3> */}
              {/* )} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
