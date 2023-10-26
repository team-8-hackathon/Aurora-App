import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import TopSignup from "./components/signups/top_signup";
import BottomSignup from "./components/signups/bot_signup";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  // useEffect(() => {
  //   dispatch(authenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <h1>React Home Page</h1>
            <TopSignup/>
            <BottomSignup/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
