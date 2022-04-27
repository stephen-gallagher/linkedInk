import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import TattooView from './TattooView';

export default function TattooGallery({
  newList,
  setTattooPopup,
  setSelectedTattoo,
}) {
  const handleTattooShow = (tattoo) => {
    setSelectedTattoo(tattoo);
    setTattooPopup(true);
  };

  return (
    <div
      className="col-8 offset-2 d-flex flex-wrap justify-content-center pb-3 pt-3 mb-5 border border-white border-4"
      style={{ borderRadius: '25px', background: '#02060d' }}
    >
      {newList.map((tattoo) => {
        return (
          <Fade bottom duration={1000} delay={600} distance="30px">
            <div className="p-1">
              <div className="artist-grid">
                {tattoo.imageURL && (
                  <img
                    className="img-grid artist-image border border-white shadow"
                    src={tattoo.imageURL}
                    alt={`${tattoo.caption} by ${tattoo.artist}`}
                    style={{
                      width: '240px',
                      height: '240px',
                      borderRadius: '15px',
                    }}
                    onClick={() => handleTattooShow(tattoo)}
                  ></img>
                )}
              </div>
            </div>
          </Fade>
        );
      })}
      {/* {tattooPopup && (
        <TattooView selectedTattoo={selectedTattoo} tattooPopup={tattooPopup} />
      )} */}
    </div>
  );
}
