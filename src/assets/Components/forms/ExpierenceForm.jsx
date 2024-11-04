import React, { useContext, useState } from 'react';
import { Box, TextField, Button, CircularProgress, Typography, Card, CardContent, IconButton } from '@mui/material';
import { ResumeContext } from '/src/context/ResumeContext';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast, { Toaster } from 'react-hot-toast';

const ExperienceForm = ({ enableNext }) => {
  const { formData, updateFormData } = useContext(ResumeContext);
  const [experienceList, setExperienceList] = useState(formData.experience || []);
  const [currentExperience, setCurrentExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievement1: '',
    achievement2: '',
  });
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track index of experience being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateExperience = () => {
    if (currentExperience.company && currentExperience.position) {
      const updatedExperienceList = [...experienceList];
      if (editIndex !== null) {
        updatedExperienceList[editIndex] = currentExperience;
        setEditIndex(null);
        toast.success("Experience updated successfully!");
      } else {
        updatedExperienceList.push(currentExperience);
        toast.success("Experience added successfully!");
      }
      setExperienceList(updatedExperienceList);
      updateFormData('experience', updatedExperienceList);
      setCurrentExperience({ company: '', position: '', startDate: '', endDate: '', description: '', achievement1: '', achievement2: '' });
      enableNext();
    } else {
      toast.error("Please fill in the required fields.");
    }
  };

  const handleEdit = (index) => {
    setCurrentExperience(experienceList[index]);
    setEditIndex(index);
    toast.info("Edit mode enabled.");
  };

  const handleDelete = (index) => {
    const updatedExperienceList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedExperienceList);
    updateFormData('experience', updatedExperienceList);
    toast.success("Experience deleted successfully!");
  };

  const handleSave = () => {
    updateFormData('experience', experienceList);
    toast.success("All experiences saved successfully!");
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Input fields for experience data */}
      <TextField label="Company" name="company" value={currentExperience.company} onChange={handleChange} />
      <TextField label="Position" name="position" value={currentExperience.position} onChange={handleChange} />
      <TextField label="Start Date" name="startDate" value={currentExperience.startDate} onChange={handleChange} />
      <TextField label="End Date" name="endDate" value={currentExperience.endDate} onChange={handleChange} />
      {/* <TextField label="Description" name="description" value={currentExperience.description} onChange={handleChange} /> */}
      
      {/* Achievement fields */}
      <TextField label="Achievement 1" name="achievement1" value={currentExperience.achievement1} onChange={handleChange} />
      <TextField label="Achievement 2" name="achievement2" value={currentExperience.achievement2} onChange={handleChange} />

      <Button variant="contained" onClick={handleAddOrUpdateExperience} sx={{ mt: 2, background: '#4CAF50', color: '#fff' }}>
        {editIndex !== null ? "Update Experience" : "Add Experience"}
      </Button>
      
      {experienceList.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Experience Entries:
          </Typography>
          {experienceList.map((exp, index) => (
            <Card key={index} variant="outlined" sx={{ mt: 2, backgroundColor: '#f9f9f9' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="div">
                    {exp.position} at {exp.company}
                  </Typography>
                  <Box>
                    <IconButton color="primary" aria-label="edit experience" onClick={() => handleEdit(index)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete experience" onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </Typography>
                <Typography variant="body2" mt={1}>
                  {exp.description}
                </Typography>
                <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                  <li>{exp.achievement1 || 'Developed a key feature that boosted engagement by 30%'}</li>
                  <li>{exp.achievement2 || 'Optimized backend processes, reducing load time by 20%'}</li>
                </ul>
              </CardContent>
            </Card>
          ))}
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            Save All Experiences
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ExperienceForm;
