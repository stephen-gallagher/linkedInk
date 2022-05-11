import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UserCollectionsEdit({
  user,
  getUser,
  getUserCollections,
  collections,
}) {
  const deleteCollection = (id) => {
    console.log(id);
    axios
      .delete(`/api/user-dashboard/collections/${id}`)
      .then((response) => {
        getUserCollections();
        getUser();
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  return (
    <div className="card bg-dark">
      <h2 className="righteous">Edit Collections</h2>

      {collections.map((collection) => {
        return (
          <div
            className="d-flex flex-row flex-wrap justify-content-center align-items-center mt-3"
            style={{ width: '200' }}
          >
            {collection.tattoos.slice(0, 4).map((tattoo) => {
              return (
                <div className="p-1">
                  <img
                    className="rounded border border-white"
                    src={tattoo.imageURL}
                    style={{ width: '100px', height: '100px' }}
                  ></img>
                </div>
              );
            })}
            <Link to={`/collections/${collection._id}`}>
              <p>{collection.title}</p>
            </Link>
            <button
              onClick={() => {
                deleteCollection(collection._id);
              }}
              className="btn btn-sm btn-danger ml-4"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
