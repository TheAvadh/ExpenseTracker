import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../src/index.css";
import contactImage from './assets/expenger-logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from './components/Auth';
import ForgotPasswordPage from './components/ForgotPassword';
import Footer from './components/Footer';
import DashboardPage from './components/Dashboard';
import ConfirmationPage from './components/ConfirmationPage';
import TransactionPage from './components/Transaction';
import HistoryPage from './components/History';
import AccountPage from './components/Setting';
import AuthGuard from './components/AuthGuard'; // Import the AuthGuard component

Amplify.configure(awsmobile);

const useShouldDisplayHeaderFooter = () => {
  const location = useLocation();
  return !['/signup', '/forgot-password'].includes(location.pathname);
};

const Header = ({ sticky, toggleMenu, isOpen }) => (
  <header className={`bg-base-100 text-black py-4 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 z-10 top-0 ${sticky ? "shadow-md bg-base-200" : ""}`}>
    <nav className="mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={contactImage} alt="Expense Manager" className="w-40 h-30 md:w-15 md:h-15 rounded-full" />
      </div>
      <div className="flex md:hidden">
        <button className="text-black p-2 focus:outline-none" onClick={toggleMenu}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className={`md:flex flex-grow items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
        <div className="text-white md:flex md:justify-end md:space-x-4">
          <div className="md:flex items-center justify-end space-x-4">
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'bg-white rounded-box block px-4 py-2 text-black font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Home</NavLink>
            <NavLink to="/add-transacion" className={({ isActive }) => isActive ? 'bg-white rounded-box block px-4 py-2 text-black font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Add a Transaction</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'bg-white rounded-box block px-4 py-2 text-black font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>History</NavLink>
            <NavLink to="/setting" className={({ isActive }) => isActive ? 'bg-white rounded-box block px-4 py-2 text-black font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>Account Setting</NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? 'bg-white rounded-box block px-4 py-2 text-black font-bold hover:bg-base-200' : 'block px-4 py-2 text-black font-bold hover:bg-base-200'}>About</NavLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

const MainContent = ({ sticky, toggleMenu, isOpen }) => {
  const shouldDisplayHeaderFooter = useShouldDisplayHeaderFooter();

  return (
    <div className="font-poppins antialiased text-gray-900 bg-gray-100">
      {shouldDisplayHeaderFooter && (
        <Header sticky={sticky} toggleMenu={toggleMenu} isOpen={isOpen} />
      )}

      <main className="mx-auto">
        <Routes>
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route element={<AuthGuard />}> {/* Protect these routes with AuthGuard */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/add-transacion" element={<TransactionPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/setting" element={<AccountPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/signup" />} />
        </Routes>
      </main>

      {shouldDisplayHeaderFooter && <Footer />}
    </div>
  );
};

function App() {
  const [sticky, setSticky] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Router>
      <MainContent sticky={sticky} toggleMenu={toggleMenu} isOpen={isOpen} />
      <ToastContainer />
    </Router>
  );
}

export default App;
