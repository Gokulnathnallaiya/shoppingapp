import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./slider.styles.scss";
function Slider() {
  return (
    <div className="container">
      <AliceCarousel
        
        autoPlay
        disableButtonsControls
        autoPlayInterval="3000"
        
      >
        <img
          src="https://assetscdn1.paytm.com/images/catalog/view_item/621452/1602242761678.jpg?imwidth=1600&impolicy=hq"
          className="sliderimg"
          alt="banner2"
        />
      </AliceCarousel>
    </div>
  );
}

export default Slider;
