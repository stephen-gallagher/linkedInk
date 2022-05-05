import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import Fade from 'react-reveal/Fade';
import AllStudiosSearch from '../components/AllStudiosSearch';
import AllStudiosCard from '../components/AllStudiosCard';

export default function StudioShow() {
  const [search, setSearch] = useState('');
  const [allStudios, setAllStudios] = useState([]);

  const getAllStudios = () => {
    axios
      .get(`/api/all-studios`)
      .then((response) => {
        setAllStudios(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllStudios();
  }, []);

  return (
    <div>
      <AllStudiosSearch search={search} setSearch={setSearch} />
      <AllStudiosCard allStudios={allStudios} search={search} />
    </div>
  );
}
