import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './checkout.styles.scss';

toast.configure();


const CheckoutPage = ({ cartItems, total ,history}) => {


  async function handleToken(token, addresses) {
    const products = cartItems;
    console.log(products)
    const response = await axios.post(
      "http://localhost:8000/checkout",
      { token, total, products }
    );
    console.log(response.data)
    const { status} = response.data; 
    if (status === "success") {
      toast("Order placed! Check email for details", { type: "success" });
      history.push({pathname:'/ordersummary',state: { orderDetails: response.data }})
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  



  return(
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='buybutton'>
    <div className='total'>TOTAL: ₹ {total}</div>
    
    <StripeCheckout
        stripeKey="pk_test_51HbevCJNorcZJykENCUggOji2DKzPxgKy4TSeiQ1HteN8S566laJeHUj9L3dZZThVih4aRobWgErUwYXbIw3X4r700R4oE2Qst"
        token={handleToken}
        amount={total}
        name="Woo commerce"
        billingAddress
        shippingAddress>
        <CustomButton>Buy now</CustomButton>

        </StripeCheckout>
        
      
    </div>

    <div className="disclaimer">
      
    

      <span>*use address outside india for  test</span>
      <span>, use card number 4242424242424242</span>
      <span> and any future date/ any 3 digit cvv</span>
    </div>
    
  </div>
)};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
