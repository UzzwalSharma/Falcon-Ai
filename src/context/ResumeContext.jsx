import React, { createContext, useState } from 'react';

export const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalDetails: { 
      name: '', 
      email: '', 
      phone: '', 
      address: '', 
      linkedin: '', 
      github: '' 
    },
    education: { 
      school: '', 
      degree: '', 
      fieldOfStudy: '', 
      startYear: '', 
      endYear: '' 
    },
    experience: [
      { 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }
    ],
    projects: [
      { 
        title: '', 
        description: '', 
        technologies: '', 
        link: '' 
      }
    ],
    skills: [],
    certifications: [
      { 
        title: '', 
        organization: '', 
        year: '' 
      }
    ],
    languages: [],
    interests: [],
    summary: ''
  });

  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: data
    }));
  };

  return (
    <ResumeContext.Provider value={{ formData, updateFormData }}>
      {children}
    </ResumeContext.Provider>
  );
};
