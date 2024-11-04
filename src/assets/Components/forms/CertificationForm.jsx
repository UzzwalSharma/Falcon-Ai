import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

const CertificationForm = ({ enableNext }) => {
  const [certifications, setCertifications] = useState([{ title: '', organization: '', year: '' }]);

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...certifications];
    newCertifications[index][field] = value;
    setCertifications(newCertifications);
  };

  const addCertification = () => {
    setCertifications([...certifications, { title: '', organization: '', year: '' }]);
  };

  const removeCertification = (index) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (certifications.some(cert => !cert.title || !cert.organization || !cert.year)) {
      toast.error("Please fill in all fields for each certification.");
      return;
    }

    // Save certifications logic can be added here
    // For now, we'll just show a success toast
    toast.success("Certifications saved successfully!");
    enableNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toaster position="top-center" reverseOrder={false} />
      <Typography variant="h6" gutterBottom>
        Certifications
      </Typography>
      {certifications.map((cert, index) => (
        <Box key={index} mb={2} display="flex" alignItems="center" flexDirection="column" gap={1}>
          <Box display="flex" width="100%">
            <TextField
              label={`Certification Title ${index + 1}`}
              value={cert.title}
              onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              label={`Organization`}
              value={cert.organization}
              onChange={(e) => handleCertificationChange(index, 'organization', e.target.value)}
              fullWidth
              variant="outlined"
              required
              style={{ marginLeft: '10px' }}
            />
            <TextField
              label={`Year`}
              value={cert.year}
              onChange={(e) => handleCertificationChange(index, 'year', e.target.value)}
              fullWidth
              variant="outlined"
              required
              style={{ marginLeft: '10px' }}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => removeCertification(index)}
              style={{ marginLeft: '10px' }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ))}
      <Button variant="outlined" onClick={addCertification} style={{ marginBottom: '10px' }}>
        Add Certification
      </Button>
      <Box>
        <Button variant="contained" type="submit">
          Save Certifications
        </Button>
      </Box>
    </form>
  );
};

export default CertificationForm;
