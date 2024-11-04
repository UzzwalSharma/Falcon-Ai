import React, { useContext, useState, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { ResumeContext } from '/src/context/ResumeContext';
import toast, { Toaster } from 'react-hot-toast';

const PersonalDetailsForm = ({ enableNext }) => {
  const { formData, updateFormData } = useContext(ResumeContext);
  const [data, setData] = useState(formData.personalDetails || {
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation function for each field
  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      error = emailRegex.test(value) ? '' : 'Invalid email format';
    } else if (name === 'phone') {
      const phoneRegex = /^\d{10}$/;
      error = phoneRegex.test(value) ? '' : 'Phone must be 10 digits';
    } else if (value.trim() === '') {
      error = 'This field is required';
    }
    return error;
  };

  // Update data and validate fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Check form validity whenever data or errors change
  useEffect(() => {
    const isValid = Object.values(data).every((field) => field.trim() !== '') &&
      Object.values(errors).every((error) => error === '');
    setIsFormValid(isValid);
  }, [data, errors]);

  const handleSave = () => {
    if (isFormValid) {
      updateFormData('personalDetails', data);
      enableNext();
      toast.success("Personal details saved successfully!");
    } else {
      toast.error("Please fix the errors before saving.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Toaster position="top-center" reverseOrder={false} />

      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name || 'Enter your full name'}
        variant="outlined"
      />
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email || 'Enter a valid email address'}
        variant="outlined"
      />
      <TextField
        label="Phone"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone || 'Enter a 10-digit phone number'}
        variant="outlined"
      />
      <TextField
        label="Address"
        name="address"
        value={data.address}
        onChange={handleChange}
        error={!!errors.address}
        helperText={errors.address || 'Enter your address'}
        variant="outlined"
      />
      <TextField
        label="LinkedIn"
        name="linkedin"
        value={data.linkedin}
        onChange={handleChange}
        error={!!errors.linkedin}
        helperText={errors.linkedin || 'Enter your LinkedIn profile URL'}
        variant="outlined"
      />
      <TextField
        label="GitHub"
        name="github"
        value={data.github}
        onChange={handleChange}
        error={!!errors.github}
        helperText={errors.github || 'Enter your GitHub profile URL'}
        variant="outlined"
      />

      <Button 
        variant="contained" 
        onClick={handleSave} 
        disabled={!isFormValid} 
        sx={{ mt: 2 }}
      >
        SAVE
      </Button>
    </Box>
  );
};

export default PersonalDetailsForm;
