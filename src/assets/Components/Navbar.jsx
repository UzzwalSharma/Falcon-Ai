import React, { useEffect, useState } from 'react';
import "/src/assets/Components/Landinpage.css";
import { NavLink, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function Navbar() {
  // Dark and light mode functionality
  const [darkMode, setDarkMode] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Set initial theme on load
    document.body.classList.toggle("dark-mode", darkMode);
    document.body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Falcon Ai</h1>
        
      </div>

      <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
        <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
        <NavLink to="/about" className="nav-link" activeClassName="active">About Us</NavLink>
        <NavLink to="/Feature" className="nav-link" activeClassName="active">Features</NavLink>
      </div>

      <div className="actions">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Get Started Button */}
          <Button
            variant="solid"
            sx={{
              backgroundImage: 'linear-gradient(to right, #E55D87 0%, #5FC3E4 51%, #E55D87 100%)',
              color: '#ffffff',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              padding: '10px 30px',
              textTransform: 'uppercase',
              backgroundSize: '200% auto',
              boxShadow: '0 0 15px rgba(238, 238, 238, 0.6)',
              transition: '0.5s, transform 0.2s ease',
              '&:hover': {
                backgroundPosition: 'right center',
                transform: 'translateY(-2px)',
                textDecoration: 'none',
              },
              '@media (max-width: 768px)': {
                fontSize: '12px',
                padding: '8px 25px',
                borderRadius: '8px',
              },
            }}
          >
            <Link to="dashboard">Get Started!</Link>
          </Button>

          {/* Sign In / User Button */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outlined"
                sx={{
                  color: '#6a1b9a',
                  borderImage: '10px linear-gradient(45deg, #E55D87, #5FC3E4) 1',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '8px 20px',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(106, 27, 154, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  '@media (max-width: 768px)': {
                    fontSize: '12px',
                    padding: '6px 18px',
                    borderRadius: '8px',
                  },
                }}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Dark Mode Toggle Button */}
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Hamburger Icon */}
        <IconButton
          className="hamburger-icon"
          onClick={toggleNav}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {isNavOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>
    </nav>
  );
}

export default Navbar;
