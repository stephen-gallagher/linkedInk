import axios from 'axios';
import { useState, useEffect } from 'react';
import AllArtistsCard from '../components/AllArtistsCard';
import AllArtistsSearch from '../components/AllArtistsSearch';

export default function AllArtists() {
  const [allArtists, setAllArtists] = useState([]);
  const [nameSearch, setNameSearch] = useState('');
  const [styleSearch, setStyleSearch] = useState('');

  const getAllArtists = () => {
    axios
      .get(`/api/all-artists`)
      .then((response) => {
        setAllArtists(response.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllArtists();
  }, []);

  let newList = allArtists.filter((artist) => {
    return `${artist.tattooStyle}`
      .toLowerCase()
      .includes(styleSearch.toLowerCase());
  });
  if (nameSearch !== '') {
    newList = allArtists.filter((artist) => {
      return `${artist.firstName}${artist.lastName}`
        .toLowerCase()
        .includes(nameSearch.toLowerCase());
    });
  }

  if (allArtists === []) {
    return <></>;
  }

  return (
    <div className="pt-5 background">
      <div className="border border-white border-4 col-6 offset-3">
        <h1 className="exploreHeadingText mt-4">Find an Artist</h1>
        <div className="col-6 offset-3">
          <h4 className="text-dark">
            Browse through the list of our registered artists to find the
            perfect match for your next tattoo idea. Click on the image below to
            view their profile
          </h4>
          <br />
        </div>
        <AllArtistsSearch
          nameSearch={nameSearch}
          setNameSearch={setNameSearch}
          styleSearch={styleSearch}
          setStyleSearch={setStyleSearch}
        />
        <AllArtistsCard newList={newList} />
      </div>
    </div>
  );
}
