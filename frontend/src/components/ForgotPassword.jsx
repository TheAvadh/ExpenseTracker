import { useEffect } from 'react';
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
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
      className={`py-2 px-4 bg-base-200 hover:bg-base-200 text-black font-bold rounded ${className}`}
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

  const navigate = useNavigate();

  return (
    <div className="font-poppins antialiased text-gray-900 bg-gradient-to-b from-base-200 to-base-200 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-8 bg-white rounded-3xl shadow-lg" data-aos="fade-up">
        <div className="flex flex-col items-center space-y-2">
          <MountainIcon className="h-8 w-8" />
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="text-muted-foreground">Enter your email to reset your password.</p>
        </div>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" required />
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
        <p className="text-sm text-center mt-2">
          Back to <span className="text-base-200 cursor-pointer" onClick={() => navigate('/signup')}>Login</span>
        </p>
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

export default ForgotPasswordPage;
