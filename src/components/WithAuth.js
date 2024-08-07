
import React from "react";
import { Navigate } from "react-router-dom";

function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
}

export default withAuth;