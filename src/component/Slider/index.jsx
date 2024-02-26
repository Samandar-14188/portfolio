import React, { useState, useEffect } from 'react';
import sliderImageOne from '../../images/sliderRasm1.png';
import sliderImageTwo from '../../images/sliderRasm2.png';
import sliderImageThree from '../../images/sliderRasm3.png';
import sliderImageFour from '../../images/sliderRasm4.png'


export default function Slider() {
  const images = [sliderImageOne, sliderImageTwo, sliderImageThree, sliderImageFour];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <div className="slider-container">
      <div>
        <img src={images[currentImageIndex]} alt={`rasm-${currentImageIndex + 1}`} />
      </div>
    </div>
  );
}