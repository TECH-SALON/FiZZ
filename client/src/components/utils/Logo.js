import React, { Component } from 'react';

const Logo = (props) => (
  <div className="logo">
    <img src={`/assets/utils/${props.src}.svg`}/>
  </div>
)

export default Logo
