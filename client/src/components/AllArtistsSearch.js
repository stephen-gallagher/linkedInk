import React from 'react';

export default function AllArtistsSearch({
  nameSearch,
  setNameSearch,
  styleSearch,
  setStyleSearch,
}) {
  const handleNameSearchChange = (event) => {
    event.preventDefault();
    setNameSearch(event.target.value);
  };

  const handleStyleSearchChange = (event) => {
    event.preventDefault();
    setStyleSearch(event.target.value);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex p5 justify-content-around mb-4 ">
        <div className="p5 ml-3">
          <label className="searchText text-dark">Search by name:&nbsp; </label>
          <input
            className="border border-white pl-3"
            type="text"
            name="search"
            id="search"
            value={nameSearch}
            placeholder="e.g John Smith"
            onChange={handleNameSearchChange}
          />
        </div>
        <div>
          <label className="searchText text-dark">
            Search by style: &nbsp;
          </label>
          <input
            className="border border-white pl-3"
            type="text"
            name="search"
            id="search"
            value={styleSearch}
            placeholder="e.g Traditional"
            onChange={handleStyleSearchChange}
          />
        </div>
      </div>
      <div>
        <h2>
          Search: {nameSearch} {styleSearch}
        </h2>
      </div>
    </div>
  );
}
