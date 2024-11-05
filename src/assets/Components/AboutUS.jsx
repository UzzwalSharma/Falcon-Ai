import React from 'react';
import { Container, Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Meet the Team Behind the Project
        </Typography>
      </Box>
      
      <Grid container spacing={4} justifyContent="center">
        
        {/* Ujjwal's Profile */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 12, boxShadow: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="center" mt={-6}>
              <Avatar
                alt="Ujjwal's photo"
                src="/WhatsApp Image 2024-07-18 at 10.12.39_30e74f22.jpg"
                sx={{ width: 120, height: 120, border: '3px solid white' }}
              />
            </Box>
            <CardContent>
              <Typography variant="h5" textAlign="center" fontWeight="600" gutterBottom>
                Ujjwal
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Full-Stack Developer (MERN) | AI & Cloud Enthusiast | Google Arcade Diamond League Winner | Commudle Top Builder
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Ujjwal specializes in the MERN stack, with extensive experience in building dynamic applications. He’s passionate about leveraging AI and cloud technologies to create impactful solutions. His recent projects, such as Silk Route (an e-commerce web app), demonstrate his drive to innovate and deliver practical applications.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Rinni's Profile */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 12, boxShadow: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="center" mt={-6}>
              <Avatar
                alt="Rinni's photo"
                src="/WhatsApp Image 2024-11-05 at 22.11.06_2dd43961.jpg"
                sx={{ width: 120, height: 120, border: '3px solid white' }}
              />
            </Box>
            <CardContent>
              <Typography variant="h5" textAlign="center" fontWeight="600" gutterBottom>
                Rimmy
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center">
                Data Scientist | Functional Strategist | Skilled in Data Analysis & UI/UX
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary">
                  With a strong foundation in data science, Rinni brings analytical insight to every project. Her data-driven approach enhances functionality and optimizes user experience. Rinni is also involved in ideating features, ensuring each element is both user-friendly and functionally robust.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Project Information */}
      <Box mt={8} textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Project: Combining Innovation with Usability
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={2}>
          This project was developed with a focus on merging advanced functionality with a clean, user-centric design. Utilizing the MERN stack, it incorporates the latest technologies to provide an intuitive and effective user experience. Together, we combined our unique skill sets to deliver a platform that balances technical depth with visual appeal.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
