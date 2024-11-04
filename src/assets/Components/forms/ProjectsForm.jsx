import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import { ContentCopy, AutoAwesome as AutoAwesomeIcon } from '@mui/icons-material';
import { ResumeContext } from '/src/context/ResumeContext';
import toast, { Toaster } from 'react-hot-toast';
import { chatSession } from '/src/assets/Components/gemini.js';

const ProjectsForm = ({ enableNext }) => {
  const { formData, updateFormData } = useContext(ResumeContext);
  const [project, setProject] = useState(formData.projects ? formData.projects[0] : {
    title: '',
    description: '',
    technologies: '',
    link: '',
  });
  const [loading, setLoading] = useState(false);
  const [enhancedDescription, setEnhancedDescription] = useState(''); // New state for enhanced description

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (project.title && project.description && project.technologies && project.link) {
      updateFormData('projects', [project]);
      toast.success("Project saved successfully!");
      enableNext();
    } else {
      toast.error("Please fill in all fields before saving.");
    }
  };

  const handleEnhanceDetails = async () => {
    if (!project.title || !project.description || !project.technologies) {
      toast.error("Please fill in title, description, and technologies to enhance details.");
      return;
    }
  
    setLoading(true);
    
    try {
      const prompt = `Please improve this project description: 
      Title: ${project.title}, 
      Technologies: ${project.technologies}, 
      Description: ${project.description}`;
  
      const result = await chatSession.sendMessage(prompt);
      
      const generatedText = result.response?.text || 'No enhancement generated.';
      setEnhancedDescription(generatedText); // Update enhanced description state
    } catch (error) {
      console.error("Error enhancing details:", error);
      toast.error("An error occurred while enhancing details.");
    } finally {
      setLoading(false); // Stop loading state
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancedDescription)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Failed to copy."));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Toaster position="top-center" reverseOrder={false} />
      
      <Typography variant="h5" component="h2">
        Project Details
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={project.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={project.description}
        onChange={handleChange}
        required
        multiline
        rows={4}
      />
      <TextField
        label="Technologies"
        name="technologies"
        value={project.technologies}
        onChange={handleChange}
        required
        placeholder="e.g., React, Node.js, MongoDB"
      />
      <TextField
        label="Link"
        name="link"
        value={project.link}
        onChange={handleChange}
        required
        placeholder="e.g., https://github.com/your-project"
      />

      <Box display="flex" gap={2} mt={2}>
        <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#4CAF50', color: '#fff' }}>
          Save Project
        </Button>
        <Button
          variant="contained"
          onClick={handleEnhanceDetails}
          disabled={loading}
          startIcon={<AutoAwesomeIcon style={{ color: '#FFD700' }} />}
          sx={{
            background: 'linear-gradient(135deg, #6D5FFD, #3F51B5)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Enhance Details"}
        </Button>
      </Box>

      {enhancedDescription && (
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <TextField
            label="Enhanced Description"
            value={enhancedDescription}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true, // Make this read-only if the user only needs to view it
            }}
          />
          <IconButton onClick={handleCopy} color="primary">
            <ContentCopy />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProjectsForm;
