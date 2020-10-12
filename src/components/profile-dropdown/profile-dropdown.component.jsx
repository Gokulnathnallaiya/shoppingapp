import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter,Link } from "react-router-dom";

import { selectCartHidden,selectProfileHidden } from '../../redux/cart/cart.selectors';
import { toggleCartHidden,toggleProfileHidden} from '../../redux/cart/cart.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {setCurrentUser} from "../../redux/user/user.actions";
import { auth } from '../../firebase/firebase.utils';

import "./profile-dropdown.styles.scss";

const ProfileDropDown = ({ currentUser,setCurrentUser,toggleProfileHidden }) => (
  <div className="profile-dropdown">
    <div className="userdetails">
      <img
        src="https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png"
        alt="Avatar"
        className="avatar"
      ></img>
      <h4>{currentUser}</h4>
    </div>
    {currentUser ? (
        <div className='option' onClick={() => {setCurrentUser(null);auth.signOut()}}>
          SIGN OUT
        </div>
      ) : (
        <Link onClick={toggleProfileHidden} className='option' to='/signin'>
          SIGN IN
        </Link>
      )} 
  </div>
);


const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser,
  cartHidden: selectCartHidden,
  profileHidden: selectProfileHidden,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
    toggleCartHidden: () => dispatch(toggleCartHidden()),
    toggleProfileHidden: () => dispatch(toggleProfileHidden())
  
  });

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProfileDropDown));
