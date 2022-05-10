import React from 'react';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

export default function AllStudiosCard({ allStudios, search }) {
  let newList = allStudios.filter((studio) => {
    return `${studio.name}`.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Fade bottom duration={1000} delay={600} distance="30px">
      <div className="mt-5 offset-1 mb-5 d-flex flex-wrap justify-content-start align-items-start">
        {newList.map((studio) => {
          return (
            <div
              className="col-4  mb-5 offset-1 card bg-dark bg-gradient text-white border-white border-4 artist-grid"
              style={{ borderRadius: '15px' }}
            >
              <div className="d-flex flex-column img-grid">
                <Link className="text-dark" to={`/studio/${studio._id}`}>
                  <div className=" ml-50 ">
                    <img
                      className="img-fluid rounded mt-3"
                      src={studio.imageURL}
                      style={{ width: '550px', border: '5px solid white' }}
                    ></img>
                  </div>
                  <div className="col-md-10 offset-1 ">
                    <div className="card-body mt-2 ">
                      <h2 className="card-title righteous"> {studio.name}</h2>
                      <p className="card-text"> {studio.location}</p>
                      <button className="btn btn-light text-dark">
                        View this studio
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Fade>
  );
}
