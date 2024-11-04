import React, { useContext, useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ResumeContext } from '/src/context/ResumeContext';
import toast, { Toaster } from 'react-hot-toast';

const EducationForm = ({ enableNext }) => {
  const { formData, updateFormData } = useContext(ResumeContext);
  const [data, setData] = useState(formData.education || {
    school: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
  });
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate fields to enable the Save button
  useEffect(() => {
    const isValid = data.school && data.degree && data.fieldOfStudy && data.startYear && data.endYear;
    setIsSaveEnabled(isValid);

    // Validate fields for errors
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = 'This field is required';
      }
    });
    setErrors(newErrors);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (isSaveEnabled) {
      updateFormData('education', data);
      enableNext();
      toast.success("Education details saved successfully!");
    } else {
      toast.error("Please fill all the required fields.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h6" gutterBottom>
        Education Details
      </Typography>

      <TextField
        label="School/University"
        name="school"
        value={data.school}
        onChange={handleChange}
        error={!!errors.school}
        helperText={errors.school || 'Enter the name of your school or university'}
        variant="outlined"
      />
      <TextField
        label="Degree"
        name="degree"
        value={data.degree}
        onChange={handleChange}
        error={!!errors.degree}
        helperText={errors.degree || 'Enter your degree'}
        variant="outlined"
      />
      <TextField
        label="Field of Study"
        name="fieldOfStudy"
        value={data.fieldOfStudy}
        onChange={handleChange}
        error={!!errors.fieldOfStudy}
        helperText={errors.fieldOfStudy || 'Enter your field of study'}
        variant="outlined"
      />
      <TextField
        label="Start Year"
        name="startYear"
        value={data.startYear}
        onChange={handleChange}
        error={!!errors.startYear}
        helperText={errors.startYear || 'Enter your start year (YYYY)'}
        variant="outlined"
      />
      <TextField
        label="End Year"
        name="endYear"
        value={data.endYear}
        onChange={handleChange}
        error={!!errors.endYear}
        helperText={errors.endYear || 'Enter your end year (YYYY)'}
        variant="outlined"
      />

      <Button
        variant="contained"
        onClick={handleSave}
        disabled={!isSaveEnabled} // Disable Save button until all fields are filled
        sx={{ mt: 2 }}
      >
        Save
      </Button>
    </Box>
  );
};

export default EducationForm;
