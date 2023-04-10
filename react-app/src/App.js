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

<NavBar handleClicked={handleClicked} sideOpen={sideOpen}  />
    {!sideOpen?
      <SideNavBar />

      :<ToggledNavBar />
    }
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
        </Switch>
      )}
    </>
  );
}

export default App;
