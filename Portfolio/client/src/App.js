import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Spiner from './components/Spiner.js';

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Simulate loading state when route changes (for demonstration)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading state to false after 2 seconds (simulated)
    }, 1000); // Simulate 2 seconds loading time

    setLoading(true); // Set loading state to true when route changes
    return () => clearTimeout(timeout);
  }, [location.pathname]); // Re-run effect when location.pathname changes

  return (
    <>
      <Header />
      {loading ? ( // Conditionally render spinner based on loading state
        <Spiner text="Loading . . ." />
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
}

export default App;


