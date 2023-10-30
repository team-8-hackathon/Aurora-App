import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";

import TestimonialForm from "./components/TestimonialComponents/TestimonialForms/Testimonial_form";
import TestimonialList from "./components/TestimonialComponents/TestimonialDisplay/TestimonialList";
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
import AdminBlogs from "./components/Admin/blog_index"
import SubsList from "./components/Admin/subs_list";



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
          <Route exact path="/">
            <SplashNavBar />
            <TopSignup />
            <TestimonialList />
            <BottomSignup />
            <Footer />
          </Route>

          <Route path="/admin">
            <ProtectedRoute>
              <AdminNavBar />
              <Switch>
                <Route exact path="/admin">
                  <AdminBlogs />
                </Route>
                <Route exact path="/admin/post-blog">
                  <BlogForm />
                </Route>
                <Route exact path="/admin/blogs/:blogId">
                  <SingleBlogPage type='admin' />
                </Route>
                <Route exact path="/admin/blogs/:blogId/edit">
                  <EditBlogForm />
                </Route>
                <Route exact path='/admin/topics/:topicId'>
                  <BrowseBlogs />
                </Route>
                <Route exact path="/admin/post-topic">
                  <TopicForm />
                </Route>
                <Route exact path="/admin/subs">
                  <SubsList />
                </Route>
              </Switch>
            </ProtectedRoute>
          </Route>

          <Route>
            <NavBar />
            <Switch>
              <Route path="/blogs/:blogId">
                <SingleBlogPage />
              </Route>
              <Route path="/topics/:topicId">
                <BrowseBlogs />
              </Route>
              <Route path='/testimonials/new'>
                <TestimonialForm />
              </Route>
              <Route>

              </Route>
            </Switch>
            <BottomSignup />
            <Footer />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
