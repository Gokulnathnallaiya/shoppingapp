import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./slider.styles.scss";
function Slider() {
  return (
    <div className="container">
      <AliceCarousel
        autoPlay
        autoPlayInterval="3000"
        className="images"
      >
        <img
          src="https://i.ibb.co/PFWfBcy/Baby-Apparel-Etsy-Banner.png"
          className="sliderimg"
          alt="banner1"
        />
        <img
          src="https://rukminim1.flixcart.com/flap/844/140/image/1d42a4fc5c672191.jpg?q=100"
          className="sliderimg"
          alt="banner2"
        />
      </AliceCarousel>
    </div>
  );
}

export default Slider;
