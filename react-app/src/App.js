import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/SideNavBar/navBar";
import SingleStory from "./components/SingleStory";
import ProfilePage from "./components/ProfilePage";
import StoryForm from "./components/StoryForm/storyForm";
import UpdateStoryForm from "./components/UpdateStoryForm/updateStoryForm";
import UsersProfile from "./components/ProfilePage/otherUser";
import ScrollToTopButton from "./components/ScrollUp/scrolltoTop";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);




  return (
    <>
      <NavBar />
      <div className="page-body">
        <div className="side-bar-cont">
          <Navigation isLoaded={isLoaded} />
        </div>
        <div className="content-body">
        <ScrollToTopButton />
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
              <Route exact path='/stories/story-form'>
                <StoryForm />
              </Route>
              <Route exact path='/stories/:storyId'>
                <SingleStory />
              </Route>
              <Route path='/profile'>
                <ProfilePage />
              </Route>
              <Route path='/stories/:storyId/update-form'>
                <UpdateStoryForm />
              </Route>
              <Route  path='/:userId/profile'>
                <UsersProfile />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
