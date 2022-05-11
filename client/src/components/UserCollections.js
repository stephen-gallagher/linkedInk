import React, { useState, useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import axios from 'axios';

export default function UserCollections({
  user,
  backgroundColor,
  showCollection,
  collections,
}) {
  if (!user) {
    return <></>;
  }
  return (
    <div
      className="col-8 offset-2 mt-3"
      style={{ background: backgroundColor }}
    >
      <Fade bottom duration={1000} delay={600} distance="30px">
        <div
          className="card d-flex flex-wrap mb-4 border border-white border-4"
          style={{ background: backgroundColor }}
        >
          <div className="bg-dark bg-gradient col-6 offset-3 text-white p-2 rounded mb-3 mt-3">
            <h2 className="righteous p-1 ">My collections</h2>
          </div>
          {/* <img src={collections[0].tattoos[0].imageUrl}></img> */}
          <div className="d-flex col-12 flex-wrap mb-4">
            {collections === null ? (
              <h3 className="righteous offset-4">
                You currently have no collections.
              </h3>
            ) : (
              <div className="d-flex col-4 flex-row flex-wrap justify-content-around mb-4">
                {collections.map((collection) => {
                  return (
                    <div
                      className="d-flex flex-column  flex-wrap p-2 bg-dark border border-white border-4 pl-4"
                      style={{ borderRadius: '15px' }}
                      // style={{
                      //   border: '1px solid lightGrey',
                      //   margin: '20px',
                      //   padding: '15px',
                      // }}
                    >
                      <div className="collectionAlbum d-flex flex-row flex-wrap justify-content-center align-items-center mt-3">
                        {collection.tattoos.slice(0, 4).map((tattoo) => {
                          return (
                            <div className="album2 d-flex p-1 bg-dark ">
                              <img
                                className="collectonThumbnail border border-white"
                                src={tattoo.imageURL}
                                style={{
                                  width: '100px',
                                  height: '100px',
                                  borderRadius: '15px',
                                }}
                              ></img>
                            </div>
                          );
                        })}
                      </div>
                      <div className="p-3">
                        <button
                          onClick={() => {
                            showCollection(collection._id);
                          }}
                          className="btn btn-md btn-primary"
                        >
                          {collection.title}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Fade>
    </div>
  );
}
