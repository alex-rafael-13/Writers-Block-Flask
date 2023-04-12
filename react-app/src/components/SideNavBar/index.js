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
  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    return (
        <div className='main-side-navbar'>
            <div className="side-bar-div-boxes">
            <button onClick={toHomePage}><i className="fa-sharp fa-solid fa-house"></i>
                <p>Home</p>
            </button>

            </div>
            <div className="side-bar-div-boxes">
                <button  onClick={openMenu}><i className="fa-solid fa-user"></i>
                <p>User</p>
                </button>
           </div>

           <div className="side-bar-div-boxes">
                <button onClick={toProfilePage}>
                <p>Profile</p>
                </button>
           </div>
       <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
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

        </div>
    )
}

export default SideNavBar
