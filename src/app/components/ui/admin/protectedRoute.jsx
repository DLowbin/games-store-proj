import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser.isAdmin) {
          return (
            <div className="box">
              <div className="cat_pan-button">
                <span>Недостаточно прав</span>
              </div>
            </div>
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
