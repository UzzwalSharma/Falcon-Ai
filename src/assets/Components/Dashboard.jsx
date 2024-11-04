import React, { useContext, useRef, useState } from 'react';
import PrintIcon from '@mui/icons-material/Print';
import printJS from 'print-js';
import "/src/assets/Components/print.css"
import { Box, Button, Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert
import { useNavigate } from 'react-router-dom';
import { ResumeContext } from '/src/context/ResumeContext';
import PersonalDetailsForm from './forms/PersonalDetailsForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExpierenceForm';
import ProjectsForm from './forms/ProjectsForm';
import SkillsForm from './forms/SkillsForm';
import CertificationForm from './forms/CertificationForm';
import SummaryForm from './forms/SummaryForm';
import { motion } from 'framer-motion';
import LinearProgress from '@mui/material/LinearProgress';
import { SketchPicker } from 'react-color'; // Importing SketchPicker for color picking
import { ThemeContext } from '/src/context/ThemeContext'; // Import ThemeContext
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const { formData } = useContext(ResumeContext);
  const [activeForm, setActiveForm] = useState('personalDetails');
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  const [colorPickerOpen, setColorPickerOpen] = useState(false); // Toggle color picker
  const previewRef = useRef();
  const printContent = () => {
    printJS({
        printable: 'printableArea', // The ID of the element to print
        type: 'html',
        targetStyles: ['*'], // You can specify CSS styles to apply to the printed content
    });
};
  // Function to print the preview section only
//   const handlePrintPreview = useReactToPrint({
//     content: () => previewRef.current,  // Reference to the content to print
//     documentTitle: 'Resume Preview',
//     onAfterPrint: () => alert('Print successful!'), // Optional callback
// });

  
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    setActiveForm(section);
    setIsNextEnabled(false);
  };

  const enableNext = () => {
    setIsNextEnabled(true);
  };

  const getNextForm = () => {
    switch (activeForm) {
      case 'personalDetails':
        return 'education';
      case 'education':
        return 'experience';
      case 'experience':
        return 'projects';
      case 'projects':
        return 'skills';
      case 'skills':
        return 'certifications';
      case 'certifications':
        return 'summary';
      default:
        return 'personalDetails';
    }
  };

  const getPreviousForm = () => {
    switch (activeForm) {
      case 'education':
        return 'personalDetails';
      case 'experience':
        return 'education';
      case 'projects':
        return 'experience';
      case 'skills':
        return 'projects';
      case 'certifications':
        return 'skills';
      case 'summary':
        return 'certifications';
      default:
        return 'personalDetails';
    }
  };
  

  const renderForm = () => {
    const formVariants = {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    };
  
    return (
      <motion.div
        key={activeForm}
        variants={formVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4 }}
      >
        {(() => {
          switch (activeForm) {
            case 'personalDetails':
              return <PersonalDetailsForm enableNext={enableNext} />;
            case 'education':
              return <EducationForm enableNext={enableNext} />;
            case 'experience':
              return <ExperienceForm enableNext={enableNext} />;
            case 'projects':
              return <ProjectsForm enableNext={enableNext} />;
            case 'skills':
              return <SkillsForm enableNext={enableNext} />;
            case 'summary':
              return <SummaryForm enableNext={enableNext} />;
            case 'certifications':
              return <CertificationForm enableNext={enableNext} />;
            default:
              return <PersonalDetailsForm enableNext={enableNext} />;
          }
        })()}
      </motion.div>
    );
  };

  const handleFinish = () => {
    console.log("Finish button clicked");
    setSnackbarMessage('Resume submitted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    console.log("Snackbar opened:", true);

    // setTimeout(() => {
    //     console.log("Navigating to preview");
    //     navigate('/preview');
    // }, 5000);
};


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  const totalForms = 7; 
  const currentIndex = ['personalDetails', 'education', 'experience', 'projects', 'skills', 'certifications', 'summary'].indexOf(activeForm);
  const progress = ((currentIndex + 1) / totalForms) * 100;

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' , backgroundColor: '#f0f0f0'}} className="dashboard-container">
      <div style={{ flex: 1, padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} className="form-container">
                {/* Color Picker Button */} 
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }} className="color-picker-button">
                <Button
        variant="contained"
        onClick={() => setColorPickerOpen(!colorPickerOpen)}
        style={{
          backgroundColor: themeColor,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        startIcon={<ColorLensIcon />}
      >
        Choose Theme Color
      </Button>
      {colorPickerOpen && (
        <SketchPicker
          color={themeColor}
          onChangeComplete={(color) => setThemeColor(color.hex)}
        />
      )} <Button
      onClick={printContent}
      variant="contained"
      color="primary"
      startIcon={<PrintIcon />} // Add Material UI icon here
      style={{
        marginTop: 0, // Remove top margin to align with the other button
        backgroundColor: themeColor, // Optional: use theme color for consistency
      }}
     // Ensure this class name is correctly applied
    >
      Print or Save Preview as PDF
    </Button>
        </div>
{/* Yha se krna hai wapas aake  */}
        <h2 style={{ color: `${themeColor}` }}>Fill Out Your Resume</h2>
        <br />
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{
            height: 10, 
            borderRadius: 5,
            backgroundColor: '#E0E0E0', // Background color of the progress bar
            '& .MuiLinearProgress-bar': {
              backgroundcolor: `${themeColor}`, // Progress color
            },
          }} 
        />
        <br />
        {renderForm()}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }} className="button-container">
          {activeForm !== 'personalDetails' && (
            <Button variant="outlined" onClick={() => handleNavigation(getPreviousForm())} style={{ bordercolor: `${themeColor}` }}>
              Back
            </Button>
          )}
          {activeForm !== 'summary' && isNextEnabled && (
            <Button variant="contained" color="primary" onClick={() => handleNavigation(getNextForm())} style={{ backgroundcolor: `${themeColor}` }}>
              Next
            </Button>
          )}
          {activeForm === 'summary' && (
            <Button variant="contained" color="success" onClick={handleFinish} style={{ backgroundcolor: `${themeColor}` }}>
          <Link to="/about">Finish </Link>
            </Button>

            
          )}
          
        </div>
      </div>

     

      <div style={resumePreviewStyle} id="printableArea" className="resume-preview">
        <div style={{  textAlign: 'center',
  borderBottom: `2px solid ${themeColor}`,
  paddingBottom: '10px'}} ref={previewRef}>
          <h2 style={{fontSize: '28px',
  color: `${themeColor}`,}}>{formData.personalDetails.name || 'John Doe'}</h2>
          <div style={{ fontSize: '16px',
  color: `${themeColor}`,}}>
            <p>{formData.personalDetails.email || 'john.doe@example.com'} | {formData.personalDetails.phone || '(123) 456-7890'}</p>
            <p>{formData.personalDetails.address || '123 Main St, City, Country'}</p>
          </div>
          <div style={{ fontSize: '14px',
  color: `${themeColor}`,}}>
            <p>LinkedIn: {formData.personalDetails.linkedin || 'linkedin.com/in/johndoe'}</p>
            <p>GitHub: {formData.personalDetails.github || 'github.com/johndoe'}</p>
          </div>
        </div>

        <div style={resumeSectionStyle}>
          <h4 style={{ fontSize: '22px',
  color: `${themeColor}`,
  borderBottom: '1px solid #5D3F8C',
  paddingBottom: '5px'}}>Professional Summary</h4>
          <p style={summaryStyle}>
            {formData.summary || 'Experienced software developer with a proven track record in building high-performance applications.'}
          </p>
        </div>

        <div style={resumeSectionStyle}>
          <h4 style={{ fontSize: '22px',
  color: `${themeColor}`,
  borderBottom: '1px solid #5D3F8C',
  paddingBottom: '5px'}}>Skills</h4>
          <p style={skillsStyle}>{formData.skills.join(', ') || 'JavaScript, React, Node.js, REST APIs, Agile Methodologies'}</p>
        </div>

        <div style={resumeSectionStyle}>
          <h4 style={{ fontSize: '22px',
  color: `${themeColor}`,
  borderBottom: '1px solid #5D3F8C',
  paddingBottom: '5px'}}>Experience</h4>
          {formData.experience.map((exp, index) => (
            <div key={index} style={entryStyle}>
              <p><strong>{exp.position || 'Software Engineer'}</strong> at {exp.company || 'Company Name'} ({exp.startDate} - {exp.endDate || 'Present'})</p>
              <ul style={achievementListStyle}>
                <li>{exp.achievement1 || 'Developed a key feature that boosted engagement by 30%.'}</li>
                <li>{exp.achievement2 || 'Optimized backend processes, reducing load time by 20%.'}</li>
              </ul>
            </div>
          ))}
        </div>

        <div style={resumeSectionStyle}>
          <h4 style={{ fontSize: '22px',
  color: `${themeColor}`,
  borderBottom: '1px solid #5D3F8C',
  paddingBottom: '5px'}}>Projects</h4>
          {formData.projects.map((project, index) => (
            <div key={index} style={entryStyle}>
              <p><strong>{project.title || 'Project Title'}</strong></p>
              <p>{project.description || 'Project Description'}</p>
            </div>
          ))}
        </div>

        <div style={resumeSectionStyle}>
          <h4 style={{fontSize: '22px',
  color: `${themeColor}`,
  borderBottom: `1px solid ${themeColor}`,
  paddingBottom: '5px'}}>Education</h4>
          <p>
            <strong>{formData.education.degree || 'Bachelor of Science in Computer Science'}</strong> 
            {formData.education.fieldOfStudy ? ` in ${formData.education.fieldOfStudy}` : ''}, 
            {formData.education.school || 'University of Demo'}
            ({formData.education.startYear || '2020'} - {formData.education.endYear || '2024'})
          </p>
        </div>

        <div style={resumeSectionStyle}>
          <h4 style={{ fontSize: '22px',
  color: `${themeColor}`,
  borderBottom: '1px solid #5D3F8C',
  paddingBottom: '5px'}}>Certifications</h4>
          {formData.certifications.map((cert, index) => (
            <div key={index} style={{ margin: '10px 0',
              padding: '10px',
              border: '1px solid #E0E0E0',
              borderRadius: '5px',
              background: `${themeColor}`}}>
              <p><strong>{cert.title || 'Certification Title'}</strong> - {cert.organization || 'Organization'} ({cert.year || '2023'})</p>
            </div>
          ))}
        </div>
       {/* Button to Print the Preview */}
      {/* <Button onClick={handlePrintPreview} variant="outlined" color="primary"> */}
     



      <footer style={{
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        color: '#333',
        fontSize: '14px'
      }}>
        Made with <span style={{ color: 'red' }}>❤️</span> by Ujjwal
      </footer>
      </div>
        {/* Snackbar Component */}
        <Snackbar 
    open={snackbarOpen} 
    autoHideDuration={6000} 
    onClose={handleCloseSnackbar} 
    sx={{ 
        '& .MuiSnackbarContent-root': { 
            backgroundColor: '#4caf50', // Change background color
            borderRadius: '8px', // Rounded corners
            padding: '16px', // Padding inside the Snackbar
            color: '#fff', // Text color
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Shadow effect
        } 
    }}
>
    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', borderRadius: '8px' }}>
        {snackbarMessage}
    </Alert>
</Snackbar>

    </div>
  );
};

// Updated Styles

const resumePreviewStyle = {
  flex: 1,
  padding: '20px',
  maxWidth: '900px',
  background: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '10px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  overflowY: 'auto',
};



const resumeSectionStyle = {
  marginBottom: '20px',
};


const summaryStyle = {
  fontSize: '16px',
  color: '#333',
};

const skillsStyle = {
  fontSize: '16px',
  color: '#333',
};

const entryStyle = {
  margin: '10px 0',
  padding: '10px',
  border: '1px solid #E0E0E0',
  borderRadius: '5px',
  background: 'rgba(230, 224, 245, 0.9)'
};

const achievementListStyle = {
  marginLeft: '20px',
  color: '#555',
};

export default Dashboard;
