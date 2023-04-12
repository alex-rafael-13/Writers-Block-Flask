import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SideNavBar from "./components/SideNavBar";
import ToggledNavBar from "./components/SideNavBar/toggledOn";
import NavBar from "./components/SideNavBar/navBar";
import SingleStory from "./components/SingleStory";
import ProfilePage from "./components/ProfilePage";
import StoryForm from "./components/StoryForm/storyForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [sideOpen, setSideOpen] = useState(false)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);



  const handleClicked = () => {
    setSideOpen(!sideOpen)
    console.log('!!!!!')
  }




  return (
    <>
      <NavBar handleClicked={handleClicked} sideOpen={sideOpen} />
      <div className="page-body">
      
          <SideNavBar/>
    
        <div className="content-body">

        {isLoaded && (
          <Switch>

            <Route path="/login" >
              <LoginFormPage />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/stories/:storyId'>
              <SingleStory />
            </Route>
            <Route path='/profile'>
              <ProfilePage />
              </Route>
            <Route path='/story-form'>
              <StoryForm />
            </Route>
          </Switch>
        )}
        </div>
      </div>
    </>
  );
}

export default App;
