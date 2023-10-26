import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import BlogForm from "./components/BlogComponents/BlogForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SingleBlogPage from "./components/BlogComponents/SingleBlogPage";
import BrowseBlogs from "./components/BlogComponents/BrowseBlogs";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <h1>React Home Page</h1>
          </Route>
          <Route path='/blogs/:blogId'>
            <SingleBlogPage />
          </Route>
          <Route path='/topics/:topicId'>
            <BrowseBlogs />
          </Route>
          <ProtectedRoute>
            <Route exact path='/admin'>
              <h1>Admin Page</h1>
            </Route>
            <Route exact path='/admin/post-blog'>
              <BlogForm />
            </Route>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
