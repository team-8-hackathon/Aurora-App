import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

import TestimonialForm from "./components/TestimonialComponents/Testimonial_form";
import TestimonialList from "./components/TestimonialComponents/TestimonialList";
import SplashNavBar from './components/Navbar/SplashNavBar'
import Footer from './components/Footer/footer'
import TopSignup from "./components/signups/top_signup";
import BottomSignup from "./components/signups/bot_signup";
import BlogForm from "./components/BlogComponents/BlogForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SingleBlogPage from "./components/BlogComponents/SingleBlogPage";
import BrowseBlogs from "./components/BlogComponents/BrowseBlogs";
import NavBar from "./components/Navbar/Navbar";
import EditBlogForm from "./components/BlogComponents/EditBlogForm";
import AdminNavBar from "./components/Navbar/AdminNavBar"
import TopicForm from "./components/Topics/TopicForm"



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
            <SplashNavBar />
            <TestimonialForm />
            <TestimonialList />
            <TopSignup />
            <BottomSignup />
            <Footer />
          </Route>

          <Route path={['/blogs/:blogId', '/topics/:topicId']} >
            <NavBar />
            <Switch>
              <Route path='/blogs/:blogId'>
                <SingleBlogPage />
              </Route>
              <Route path='/topics/:topicId'>
                <BrowseBlogs />
              </Route>
            </Switch>
            <BottomSignup />
            <Footer />
          </Route>

          <ProtectedRoute>
            <Switch>
              <Route exact path='/admin'>
                <AdminNavBar/>
                <h1>Admin Page</h1>
              </Route>
              <Route exact path='/admin/post-blog'>
                <BlogForm />
              </Route>
              <Route exact path='/admin/edit-blog'>
                <EditBlogForm />
              </Route>
              <Route exact path='/admin/post-topic'>
                <TopicForm />
              </Route>
            </Switch>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  );
}

export default App;
