import React, { useContext, useState } from 'react';
import { ResumeContext } from '/src/context/ResumeContext';
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import toast, { Toaster } from 'react-hot-toast';
import { chatSession } from '/src/assets/Components/gemini.js';
import InterviewQuestionsButton from '../../InterviewQuestionsButton';

const SummaryForm = ({ enableNext }) => {
  const { formData, updateFormData } = useContext(ResumeContext);
  const [summary, setSummary] = useState(formData.summary || '');
  const [loading, setLoading] = useState(false);

  // Handle summary text input change
  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };

  // Save the current summary to the context
  const handleSave = () => {
    updateFormData('summary', summary);
    toast.success("Summary saved successfully!");
    enableNext();
  };

  // Generate a prompt based on previously entered form data
  const generatePrompt = () => {
    const { personalDetails, experience, skills, projects } = formData;

    const experienceYears = experience.length > 0 ? experience.length : "several";
    const skillsList = skills.length > 0 ? skills.join(', ') : "various technologies";
    const projectList = projects.length > 0 
      ? projects.map(project => project.title).join(', ') 
      : "numerous projects";

    return `Generate a professional summary for a software engineer named ${personalDetails.name || "the candidate"}, 
      with ${experienceYears} years of experience, skilled in ${skillsList}. They have worked on projects such as ${projectList}.`;
  };

  // Function to generate the summary dynamically
  const generateSummary = async () => {
    setLoading(true);
    try {
      const prompt = generatePrompt(); // Generate the prompt based on formData
      const result = await chatSession.sendMessage(prompt); // Send the prompt as a string

      const generatedSummary = result.response.text; // Ensure `result` is structured as expected
      setSummary(generatedSummary);
      updateFormData('summary', generatedSummary);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Enhance the existing summary for added impact
  const enhanceSummary = async () => {
    setLoading(true);
    try {
      const result = await chatSession.sendMessage(`${summary} Enhance this summary to make it more impactful.`);
      const enhancedSummary = result.response.text;
      setSummary(enhancedSummary);
      updateFormData('summary', enhancedSummary);
      toast.success("Summary enhanced successfully!");
    } catch (error) {
      console.error("Error enhancing summary:", error);
      toast.error("Failed to enhance summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={2}>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h6" gutterBottom>
        Professional Summary
      </Typography>
      
      <TextField
        label="Summary"
        fullWidth
        multiline
        rows={4}
        value={summary}
        onChange={handleSummaryChange}
        onBlur={handleSave}
      />

      <Box display="flex" gap={2} mt={2}>
        <Button 
          variant="contained" 
          onClick={generateSummary} 
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Summary"}
        </Button>

        <Button 
          variant="contained" 
          onClick={enhanceSummary} 
          disabled={loading || !summary}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Enhance Summary"}
        </Button>
      </Box>

      <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }} disabled={loading}>
        Save Summary
      </Button>
      <InterviewQuestionsButton/>
    </Box>
  );
};

export default SummaryForm;
