import React from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import "/src/assets/Components/Herosection.css";
import { motion } from 'framer-motion'; // Import motion and AnimatePresence
import { Link } from "react-router-dom";
const GradientButton = styled(Button)({
  backgroundImage: 'linear-gradient(to right, #6a1b9a, #5FC3E4)',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'uppercase',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  transition: 'background 0.5s, transform 0.3s',
  '&:hover': {
    backgroundPosition: 'right center',
    transform: 'translateY(-2px)',
  },
});

const OutlineButton = styled(Button)({
  color: '#6a1b9a',
  border: '2px solid #6a1b9a',
  padding: '10px 20px',
  borderRadius: '8px',
  fontWeight: 500,
  fontSize: '16px',
  textTransform: 'uppercase',
  transition: 'background-color 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: 'rgba(106, 27, 154, 0.1)',
    transform: 'translateY(-2px)',
  },
});

const HeroSection = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #E3F2FD, #E1BEE7)',
        py: 10,
        px: 4,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',  // Added relative positioning
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left Section */}
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: '#333', mb: 2 }}>
            Transform Your Career with AI-Powered Resumes
          </Typography>
          <Typography variant="h6" sx={{ color: '#555', mb: 4 }}>
            Our AI-driven resume builder helps you create resumes that highlight your strengths, match job descriptions, and optimize for ATS software.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Link to="dashboard">
  <GradientButton className="z-10">Get Started</GradientButton>
</Link>
<a 
      href="https://youtu.be/P8ERBy91Y90?si=9wFRc7CH99IFM94x" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
            <OutlineButton className='z-10'
            >How It Works</OutlineButton>

            </a>
          </Box>
        </Grid>

        {/* Right Section with Larger Circular Image */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
  initial={{ x: 0, y: 0 }}
 
 
  transition={{ duration: 1.5 }}
  whileInView={{ x: 300, y: -500 }} // Adjusted path for in-view animation
  viewport={{ once: false }}
  className="absolute bottom-0 left-0 z-30"
>
            <img
              src="/aeroplane.png"
              width={500}
              height={500}
              alt="hero"
              className=" h-20 w-20"
            />
          </motion.div>
          <Box
            sx={{
              width: { xs: '250px', md: '350px' },
              height: { xs: '250px', md: '350px' },
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Box
              component="img"
              src="/front-view-young-female-student-white-t-shirt-grey-trousers-with-grey-document-her-hands-pink-background-student-lessons-university-college.png"
              alt="Resume Mockup"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Circles Background Below Hero Section */}
      <Box className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Box>
    </Box>
  );
};

export default HeroSection;
