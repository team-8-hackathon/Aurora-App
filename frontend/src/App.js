import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";



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
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
