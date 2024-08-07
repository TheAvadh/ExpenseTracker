import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

// Define a custom AuthGuard component
const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While checking authentication, you might want to display a loader or similar
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signup" />;
};

export default AuthGuard;
