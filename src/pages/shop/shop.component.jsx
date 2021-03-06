import React from "react";

import SHOP_DATA from "./shop.data.js";
import "./shop.styles.scss";
import CollectionPreview from "../../components/collection-preview/collection-preview";
// import Slider from "../../components/slider/slider.component";
class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {/* <div className="slider">
          <Slider />
        </div> */}

        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
