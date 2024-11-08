import React, { useContext, useState } from 'react';
import { Button, CircularProgress, Card, CardContent, Typography } from '@mui/material';
import { ResumeContext } from '/src/context/ResumeContext';
import { chatSession } from '/src/assets/Components/gemini.js';

const InterviewQuestionsButton = () => {
  const { formData } = useContext(ResumeContext);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState('');

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setQuestions(''); // Clear previous questions
    
    try {
      const {
        name = "Candidate",
        experience = [],
        skills = [],
        projects = []
      } = formData.personalDetails || {};

      const prompt = `
        Based on the following resume details, generate a list of interview questions:
        Name: ${name}
        Experience: ${experience.map(exp => `${exp.position} at ${exp.company}`).join(', ') || "No experience listed"}
        Skills: ${skills.join(', ') || "No skills listed"}
        Projects: ${projects.map(project => project.title).join(', ') || "No projects listed"}
      `;

      const result = await chatSession.sendMessage(prompt);
      setQuestions(result.response?.text || 'No questions generated.');
      
    } catch (error) {
      console.error('Error generating interview questions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Button
        variant="contained"
        onClick={handleGenerateQuestions}
        disabled={loading}
        style={{
          backgroundColor: '#6a0dad',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '20px',
          transition: '0.3s',
        }}
      >
        {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Generate Interview Questions'}
      </Button>
      {questions && (
        <Card 
          style={{ 
            maxWidth: '700px', 
            margin: '0 auto', 
            backgroundColor: '#f8f8ff', 
            padding: '20px', 
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom style={{ color: '#6a0dad', fontWeight: 'bold' }}>
              Generated Interview Questions
            </Typography>
            {questions.split('\n').map((question, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                style={{ 
                  marginBottom: '10px', 
                  padding: '12px', 
                  backgroundColor: '#e6e0f8', 
                  borderRadius: '6px',
                  color: '#333'
                }}
              >
                {index + 1}. {question}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewQuestionsButton;
