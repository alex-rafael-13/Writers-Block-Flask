import { useHistory } from "react-router-dom"
import './index.css'
import React, { useState, useEffect, useRef } from "react";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
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
      history.push('/')
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
    const login = () => {
      history.push('/login')
    }
  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <div className='main-side-navbar'>
          <ul className="options-list">
            <li onClick={toHomePage} ref={ulRef} className="row">
              <div id="icon">
                <i className="fa-sharp fa-solid fa-house" />
              </div>
              <div id="text">
                Home
              </div>
            </li>
            {user ? (
              <>
                <li className='row' onClick={toCreateStory}>
                  <div id="icon">
                    <i className="fa-solid fa-book" />
                  </div>
                  <div id='text'>
                    Create Story
                  </div>
                </li>
                <li className='row' onClick={toProfilePage}>
                  <div id="icon">
                    <i className="fa-solid fa-user" />
                  </div>
                  <div id='text'>
                  Profile
                  </div>
                </li>
                <li className='row' onClick={handleLogout}>
                  <div id="icon">
                    <i className="fa-solid fa-right-from-bracket" />
                  </div>
                  <div id="text">
                    Logout
                  </div>
                </li>
              </>
              ):(
              <>
              <li className="row">
                <OpenModalMenuItem
                  className='nav-row'
                  itemText={<><div id="icon"><i className="fa-solid fa-user" /></div><div id="text">Login</div></>}
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />} 
                  />
              </li>
              <li className='row'>
                  <OpenModalMenuItem
                  className='nav-row'
                  itemText={<><div id="icon"><i className="fa-solid fa-user-plus" /></div><div id="text">Sign Up</div></>}
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />} 
                />
              </li>
              </>
            )}
          </ul>

            {/* <div className="side-bar-div-boxes">
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
           </div> */}
        </div>
    )
}

export default SideNavBar
