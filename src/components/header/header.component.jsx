import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import ProfileDropdown from '../profile-dropdown/profile-dropdown.component';
import { selectCartHidden,selectProfileHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { ReactComponent as Logo } from '../../assets/woocommerce.svg';
import {setCurrentUser} from "../../redux/user/user.actions";

import './header.styles.scss';

const Header = ({ currentUser, cartHidden,setCurrentUser,profileHidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/'>
        HOME
      </Link>
      
      {/* {currentUser ? (
        <div className='option' onClick={() => setCurrentUser(null)}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}  */}
      <CartIcon />

    </div>
    {cartHidden ? null : <CartDropdown />}
    {profileHidden ? null : <ProfileDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartHidden: selectCartHidden,
  profileHidden: selectProfileHidden,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  
});

export default connect(mapStateToProps,mapDispatchToProps)(Header);
