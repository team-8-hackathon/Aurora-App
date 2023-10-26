import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import LoginModal from './LoginModal';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user)? props.children  : <LoginModal />}
    </Route>
  )
};


export default ProtectedRoute;
