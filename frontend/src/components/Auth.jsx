import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Amplify } from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const Label = ({ htmlFor, children, className, ...props }) => (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );

  Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  const Input = ({ id, type = 'text', className, ...props }) => (
    <input
      id={id}
      type={type}
      className={`mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-base-100 focus:border-base-200 sm:text-sm ${className}`}
      {...props}
    />
  );

  Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
  };

  const Button = ({ type = 'button', className, children, ...props }) => (
    <button
      type={type}
      className={`py-2 px-4 bg-base-100 hover:bg-base-200 text-black font-bold rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName?.value;

    try {
      setLoading(true);
      setError(null);

      if (isSignup) {
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Sign up with AWS Cognito
        await Amplify.Auth.signUp({
          username: email,
          password,
          attributes: {
            email,
            name: fullName,
          },
        });

        // Save user info in RDS
        await axios.post('http://localhost:8080/api/auth/register', {
          email,
          fullName,
        });

        setIsSignup(false);
      } else {
        // Sign in with AWS Cognito
        const user = await Amplify.Auth.signIn(email, password);
        // Get JWT token from Cognito
        const token = user.signInUserSession.idToken.jwtToken;

        // Send token to backend to store user info and authenticate
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          email,
          token,
        });

        // Handle response
        if (response.status === 200 || response.status === 201) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mt-3 space-y-6 p-8 bg-white rounded-2xl shadow-lg" data-aos="fade-up">
        <div className="flex flex-col items-center space-y-2">
          <MountainIcon className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Welcome to Expenger</h2>
          <p className="text-muted-foreground">Create an account or log in to get started.</p>
        </div>
        <div className="flex justify-around space-x-4">
          <Button
            type="button"
            className={`w-full ${isSignup ? 'bg-base-100 text-black' : 'bg-base-200 text-gray-700'}`}
            onClick={() => setIsSignup(true)}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            className={`w-full ${!isSignup ? 'bg-base-100 text-black' : 'bg-base-200 text-gray-700'}`}
            onClick={() => setIsSignup(false)}
          >
            Login
          </Button>
        </div>
        {isSignup ? (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter your full name" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" minLength="8" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" minLength="8" required />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <p className="text-sm text-center mt-2">
              Forgot your password? <span className="text-base-200 cursor-pointer text-blue-400" onClick={handleForgotPassword}>Reset here</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

export default AuthPage;
