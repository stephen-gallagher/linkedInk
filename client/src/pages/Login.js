import React from 'react';
import LoginForm from '../components/LoginForm';
import Fade from 'react-reveal/Fade';

export default function Login(props) {
  return (
    <div
      style={{
        background: `radial-gradient(circle, rgba(255,255,255,1), rgba(140, 166, 196,1))`,
        height: '90VH',
      }}
    >
      <div className="row background pt-10">
        <LoginForm setUser={props.setUser} />
        <div className="col-6 offset-1 relative-bottom">
          <Fade right duration={1000} delay={600} distance="30px">
            <img
              className=" mr-5 d-none d-xl-block"
              src="/tattoo-images/tattoo-boy-transparent-4.png"
              alt="tattoo-boy"
              style={{
                height: '730px',
                paddingTop: '200px',
                paddingRight: '75px',
              }}
              // className="card-img-top"
            ></img>
          </Fade>
        </div>
      </div>
    </div>
  );
}
