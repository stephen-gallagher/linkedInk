import React from 'react';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

export default function StudioShowSearch({ search, setSearch }) {
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  return (
    <Fade top duration={1000} delay={600} distance="30px">
      <div className="border border-white border-4 col-6 offset-3 mb-3 mt-5 p-4">
        <h1 className="righteous-35">Find a Studio</h1>
        <div className="col-6 offset-3">
          <h3>All participating studios are listed below</h3>
          <h5 className="text-dark">
            Would you like to add your studio?{' '}
            <Link className="righteous" to="/new-studio">
              Click here
            </Link>
          </h5>
        </div>

        <input
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder="Search By Name"
          onChange={handleSearchChange}
        />
      </div>
    </Fade>
  );
}
