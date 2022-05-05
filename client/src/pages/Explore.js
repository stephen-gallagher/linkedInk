import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Fade from 'react-reveal/Fade';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ExploreSearchBlock from '../components/ExploreSearchBlock';
import TattooGallery from '../components/TattooGallery';
import TattooView from '../components/TattooView';

export default function Explore() {
  const [tattoos, setTattoos] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [tattooPopup, setTattooPopup] = useState(false);

  const getAllTattoos = () => {
    // get request to the server
    axios
      .get(`/api/tattoos`)
      .then((response) => {
        console.log('tattoos', response.data);
        setTattoos(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllTattoos();
  }, []);

  let newList = tattoos.filter((tattoo) => {
    return `${tattoo.tags}`.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="pt-5 background">
      <ExploreSearchBlock search={search} setSearch={setSearch} />
      <TattooGallery
        newList={newList}
        setTattooPopup={setTattooPopup}
        setSelectedTattoo={setSelectedTattoo}
      />
      {tattooPopup && (
        <TattooView selectedTattoo={selectedTattoo} tattooPopup={tattooPopup} />
      )}
    </div>
  );
}
