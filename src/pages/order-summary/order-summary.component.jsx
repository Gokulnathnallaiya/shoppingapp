import React from "react";
import { connect } from "react-redux";
import { Tick } from "react-crude-animated-tick";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./order-summary.styles.scss";
const OrderSummary = ({ location }) => {
  const res = location.state.orderDetails;
  const { items, details } = res;
  console.log(items);
  console.log(details);
  return (
    <div className="order-summary">
      <div>
        <Tick size={75} />
      </div>
      <h5>Order Placed</h5>

      <div className="product-details">
        {items.map((cartItem) => (
          <CheckoutItem ordersummary key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <div className="user-details">
        <h5>Delivery adress</h5>
        <h4>{details.card.name}</h4><h4> 
        {details.card.address_line1}, 
        
          {details.card.address_city}-{details.card.address_zip}, 
        
        {details.card.address_country}, 
        {details.email}</h4>
      </div>
    </div>
  );
};

export default OrderSummary;
