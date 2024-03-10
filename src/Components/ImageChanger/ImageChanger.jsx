// ImageChanger.js
import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./ImageChanger.css"; 

const ImageChanger = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  // console.log(images)

  const getRandomImage = () => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
    }, 3000);
  };

  useEffect(() => {
    getRandomImage();
  });

  return (
    <div>
      <CSSTransition
        in={true}
        timeout={3000} // Adjust the duration of the transition
        classNames="image-fade"
        unmountOnExit
      >
        <div className="dash-picture-cover custom-center">
          <img
            key={currentImage}
            src={currentImage}
            alt="Random Image"
            className="dash-picture custom-center"
          />
        </div>
      </CSSTransition>
    </div>
  );
};

export default ImageChanger;
