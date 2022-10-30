import React from 'react';
import "./loader.css";

const Loader = () => {
  return (
    <div className="pt-10 lds-ring flex items-center justify-center">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;