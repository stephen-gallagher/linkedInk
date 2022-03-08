import React from 'react';
import Fade from 'react-reveal/Fade';

export default function SignUpToggle({ onChange }) {
  return (
    <>
      <Fade top duration={1000} delay={600} distance="30px">
        <div className="border border-white col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2">
          <h3 className="righteous-35">I am:</h3>
          <div className="d-flex justify-content-center">
            <h4 className="righteous">A tattoo artist</h4>
            <label className="toggle-switch">
              <input type="checkbox" onChange={onChange} />
              <span className="switch" />
            </label>
            <h4 className="righteous">Looking for a tattoo</h4>
          </div>
        </div>
      </Fade>
    </>
  );
}
