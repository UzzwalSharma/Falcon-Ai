import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from "/src/assets/Components/Landingpage.jsx";
import Dashboard from "/src/assets/Components/Dashboard.jsx";
import Preview from './assets/Components/Preview';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import { ResumeProvider } from '/src/context/ResumeContext';
import { toast, Toaster } from 'react-hot-toast';
import AboutUs from './assets/Components/Aboutus';
import Feature from './assets/Components/Feature';
// ProtectedRoute component to wrap around authenticated routes
function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      // Show a toast message for unauthorized access
      toast.error('You must be signed in to access this page!');
      
      // Set a 2-second delay before redirecting
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
    }
    else {
      // Show a success toast message for authorized access
      toast.success('Successfully signed in!');
    }
  }, [isSignedIn]);

  // If redirect is true, navigate to login
  if (redirect) {
    return <Navigate to="/" replace />;
  }
  
  // Render children if the user is signed in
  return isSignedIn ? children : null;
}

export default function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <ResumeProvider>
      

          <Toaster position="top-center" reverseOrder={false} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/feature" element={<Feature />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/preview"
              element={
                <ProtectedRoute>
                  <Preview />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ResumeProvider>
      </BrowserRouter>
    </div>
  );
}
