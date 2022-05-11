import React from 'react';
import Fade from 'react-reveal/Fade';

export default function ExploreSearchBlock({ search, setSearch }) {
  return (
    <Fade top duration={1000} delay={600} distance="30px">
      <div className="border border-white border-4 col-6 offset-3 mb-3 ">
        <h1 className="righteous-35 mt-4">Explore</h1>
        <div className="col-6 offset-3">
          <h4 className="text-dark">
            Browse through the list of images below to find inspiration for your
            next tattoo
          </h4>
          <br />
        </div>
        <h3 className="righteous">Click an image for more information</h3>
        <label className="mt-4 p-2 text-dark">
          Search through the images using keywords:{' '}
        </label>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder="Search By Name"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {search && (
          <h4 className="text-dark userHeading mt-3">
            Showing search results for: "{search}"
          </h4>
        )}
      </div>
    </Fade>
  );
}
