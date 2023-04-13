import { useHistory } from "react-router-dom"
import './index.css'
import React, { useState, useEffect, useRef } from "react";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useDispatch } from "react-redux";

function SideNavBar({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory();
  
    const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener("click", closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
    };

    const toHomePage = () => { 
       history.push('/')
    }

    const toProfilePage = () => { 
      history.push('/profile')
    }
  
    const toCreateStory = () => { 
      history.push('/stories/story-form')
    }
  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <div className='main-side-navbar'>
            <div className="side-bar-div-boxes">
            <button className='navbar-button'onClick={toHomePage}><i className="fa-sharp fa-solid fa-house"></i>
                <p>Home</p>
            </button>

            </div>
            {user?
           <div className="side-bar-div-boxes">
                <button className='navbar-button' onClick={toProfilePage}>
                <p>Profile</p>
                </button>
                <button  className='navbar-button'onClick={toCreateStory}>
                  <p>Create Story</p>
                  </button>
           </div>
          :null}
       <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
              <button onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
        </ul>
            <div className="side-bar-div-boxes">
                <button className='navbar-button' onClick={openMenu}><i className="fa-solid fa-user"></i>
                <p>User</p>
                </button>
           </div>
        </div>
    )
}

export default SideNavBar
