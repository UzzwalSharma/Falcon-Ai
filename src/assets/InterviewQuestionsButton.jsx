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
      // Extract fields from formData with safe fallback values
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

      // Call chatSession (assuming it has a similar API to generateText)
      const result = await chatSession.sendMessage(prompt);
      
      // Assume the response format is { text: "generated questions..." }
      setQuestions(result.response?.text || 'No questions generated.');
      
    } catch (error) {
      console.error('Error generating interview questions:', error);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Button
        variant="contained"
        onClick={handleGenerateQuestions}
        disabled={loading}
        style={{ marginBottom: '20px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Interview Questions'}
      </Button>
      {questions && (
        <Card 
          style={{ 
            maxWidth: '600px', 
            margin: '0 auto', 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '8px' 
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom style={{ color: '#3f51b5' }}>
              Generated Interview Questions
            </Typography>
            {questions.split('\n').map((question, index) => (
              <Typography 
                key={index} 
                variant="body1" 
                style={{ 
                  marginBottom: '10px', 
                  padding: '10px', 
                  backgroundColor: '#e0e7ff', 
                  borderRadius: '5px' 
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
