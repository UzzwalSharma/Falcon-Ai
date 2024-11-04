import React, { useContext, useState } from 'react';
import { ResumeContext } from '/src/context/ResumeContext';
import { TextField, Button, Typography, Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const SkillsForm = ({ enableNext }) => {
  const { formData, updateFormData } = useContext(ResumeContext);
  const [skills, setSkills] = useState(formData.skills || []);

  const handleSkillsChange = (event) => {
    const updatedSkills = event.target.value.split(',').map(skill => skill.trim());
    setSkills(updatedSkills);
  };

  const handleSave = () => {
    if (skills.length === 0) {
      toast.error("Please enter at least one skill.");
      return;
    }
    updateFormData('skills', skills);
    toast.success("Skills saved successfully!");
    enableNext();
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h5">Skills</Typography>
      <TextField
        label="Skills (comma-separated)"
        fullWidth
        value={skills.join(', ')} // Display as a comma-separated string
        onChange={handleSkillsChange}
        onBlur={handleSave} // Save on blur
        placeholder="e.g., JavaScript, React, Node.js"
      />
      <Button 
        onClick={handleSave} 
        variant="contained" 
        style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: '#fff' }}>
        Save Skills
      </Button>
    </Box>
  );
};

export default SkillsForm;
