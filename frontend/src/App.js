import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import TestimonialForm  from "./components/TestimonialComponents/Testimonial_form";
import TestimonialList from "./components/TestimonialComponents/TestimonialList"



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
            <TestimonialForm/>
            <TestimonialList/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
