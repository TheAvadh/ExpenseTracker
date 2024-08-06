import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmSignUp } from 'aws-amplify/auth';
import axios from 'axios';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const fullName = location.state?.fullName || ''; // Retrieve Name from state
  const password = location.state?.password || ''; // Retrieve password from state


  const [confirmationCode, setConfirmationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Email retrieved from state:', email); // Log the email value

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      if (isSignUpComplete) {
        // Add user to RDS after successful confirmation
        try {
          console.log('Adding user info to RDS with payload:', { email, password, fullName });
          await axios.post('http://localhost:8080/api/auth/register', {
            email,
            fullName,
            password,
            confirmPassword: password,
          });
          navigate('/dashboard');
        } catch (error) {
          console.error('Error adding user info to RDS:', error);
          setError('An error occurred while saving user info.');
        }
      }
    } catch (error) {
      console.error('Error confirming sign up:', error);
      setError(error.message || 'An error occurred during confirmation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mt-3 space-y-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold">Confirm Your Account</h2>
          <p className="text-muted-foreground">Enter the confirmation code sent to your email.</p>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700">
              Confirmation Code
            </label>
            <input
              id="confirmationCode"
              type="text"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-base-100 focus:border-base-200 sm:text-sm"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-base-100 hover:bg-base-200 text-black font-bold rounded"
            disabled={loading}
          >
            {loading ? 'Confirming...' : 'Confirm'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ConfirmationPage;
