import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { h1 } from 'framer-motion/client';

const Feature = () => {
  const [isExploded, setIsExploded] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const pieces = [
    { id: 1, x: -120, y: -120, text: 'Feature 1', content: 'Details about Feature 1' },
    { id: 2, x: 120, y: -120, text: 'Feature 2', content: 'Details about Feature 2' },
    { id: 3, x: -120, y: 120, text: 'Feature 3', content: 'Details about Feature 3' },
    { id: 4, x: 120, y: 120, text: 'Feature 4', content: 'Details about Feature 4' },
  ];

  const openPieceCard = (piece) => {
    setSelectedPiece(piece);
  };

  return (
   
 
    <Box 
  display="flex" 
  flexDirection="column" 
  justifyContent="center" 
  alignItems="center" 
  minHeight="100vh" 
  
>
<h1
  className="text-white"
  style={{
    fontFamily: 'Roboto, sans-serif', // Clean, professional font
    fontSize: '2.5rem',
    color: '#ffffff',
    // Removed the gradient and replaced it with a solid dark background for better visibility
    backgroundColor: '#0d47a1', // Dark blue background for contrast
    padding: '10px 20px', // Added padding for better spacing
    borderRadius: '8px', // Slightly rounded corners
    letterSpacing: '1px',
    fontWeight: '700', // Increased font weight for better emphasis
    textAlign: 'center',
    textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)', // Enhanced shadow for depth
    marginBottom: '1.5rem',
  }}
>
  Explore Falcon's Features
</h1>


      {/* Main Feature Block */}
      <motion.div
  onClick={() => setIsExploded(!isExploded)}
  style={{
    width: '220px',
    height: '220px',
    background: isExploded 
      ? 'linear-gradient(135deg, #ff6b6b, #5FC3E4)' 
      : 'linear-gradient(135deg, #6a1b9a, #9c27b0)', // Updated gradient for gaming look
    borderRadius: '20px',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: isExploded
      ? '0px 0px 30px rgba(255, 77, 77, 0.7), 0px 0px 40px rgba(95, 195, 228, 0.5)'
      : '0 0 20px rgba(106, 27, 154, 0.5)', // Added glow effect for the inactive state
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background 0.5s ease, transform 0.5s ease',
    transform: isExploded ? 'scale(1.05) rotate(5deg)' : 'scale(1)',
    animation: isExploded ? 'none' : 'pulse 1.5s infinite alternate', // Pulse animation when not exploded
  }}
>
  <style>{`
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.02);
      }
    }
  `}</style>

  {!isExploded ? (
    <Typography
      variant="h6"
      textAlign="center"
      style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.8rem',
        letterSpacing: '1px',
        color: '#ffeb3b',
        textShadow: '0 0 10px rgba(255, 235, 59, 0.8)', // Added text shadow for glowing effect
      }}
    >
      Don't Touch it !!
    </Typography>
  ) : (
    pieces.map((piece) => (
      <motion.div
        key={piece.id}
        onClick={() => openPieceCard(piece)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          x: isExploded ? piece.x : 0,
          y: isExploded ? piece.y : 0,
          rotate: isExploded ? Math.random() * 15 - 7.5 : 0, // slight tilt
          scale: isExploded ? 1 : 0.8,
        }}
        transition={{
          type: 'spring',
          stiffness: 80,
          damping: 12,
          duration: 0.8,
        }}
        style={{
          width: '90px',
          height: '90px',
          backgroundColor: '#101026',
          border: '3px solid #ff4d4d',
          borderRadius: '12px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transformOrigin: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ff4d4d',
          fontWeight: 'bold',
          fontSize: '14px',
          textAlign: 'center',
          boxShadow: '0 8px 16px rgba(255, 77, 77, 0.6)',
          fontFamily: 'Orbitron, sans-serif',
          cursor: 'pointer',
          padding: '10px',
          transition: 'transform 0.3s ease',
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: '0 10px 20px rgba(255, 77, 77, 0.8)',
          backgroundColor: '#1f1f3a',
        }}
      >
        {piece.text}
      </motion.div>
    ))
  )}
</motion.div>



      {/* Message to Click Again to Close */}
      {isExploded && (
        <Typography variant="body1" color="#ff4d4d" marginTop="16px" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          Click again to close
        </Typography>
      )}

      {/* Gaming Card Modal with Blinking and Pop-out Effect */}
      <AnimatePresence>
  {selectedPiece && (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
      }}
      exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
      transition={{
        duration: 0.4,
        type: 'spring',
        damping: 20,
      }}
      style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '400px',
        background: 'linear-gradient(145deg, #3a3a50, #1e1e2f)',
        borderRadius: '16px',
        boxShadow: '0px 0px 20px rgba(255, 77, 77, 0.5)',
        border: '2px solid #ff4d4d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        zIndex: 1000,
      }}
    >
      <Typography variant="h5" style={{ color: '#ff4d4d', fontFamily: 'Orbitron, sans-serif', marginBottom: '16px' }}>
        {selectedPiece.text}
      </Typography>
      <Typography variant="body1" style={{ color: '#ffffff', textAlign: 'center', flex: 1, fontSize: '14px' }}>
        {selectedPiece.content}
      </Typography>
      <motion.button
        onClick={() => setSelectedPiece(null)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#ff4d4d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '14px',
          boxShadow: '0px 0px 10px rgba(255, 77, 77, 0.7)',
        }}
      >
        Close
      </motion.button>
    </motion.div>
  )}
</AnimatePresence>


      {/* Overlay */}
      {selectedPiece && (
        <motion.div
          onClick={() => setSelectedPiece(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 999,
          }}
        />
      )}
    </Box>
   
  );
};

export default Feature;
