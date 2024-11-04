import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const Feedbackform = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form Validation
  const validateForm = () => {
    if (!name || !email || !comments) {
      alert('Please fill out all fields');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const response = await fetch('https://formspree.io/f/mldedaoq', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, rating, comments }),
    });

    setLoading(false);
    if (response.ok) {
      setSubmitted(true);
    } else {
      console.error('Form submission failed.');
    }
  };

  return (
    <div className="feedback-section p-10 bg-gray-100">
      {submitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">Thank You for Your Feedback, {name}!</h3>
          <p className="text-gray-700 mt-4">
            We truly appreciate you taking the time to provide us with your thoughts and suggestions. Your feedback helps us improve and serve you better.
          </p>
          <p className="text-gray-700 mt-2">
            If you have any more ideas or need further assistance, feel free to reach out to us at <strong>uzzwal7505@gmail.com</strong>.
          </p>
          <p className="text-blue-500 font-semibold mt-4">
            Stay tuned for updates and new features based on your input!
          </p>
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Image Section */}
          <div className="mb-10 lg:mb-0 lg:w-1/2">
            <img src="/rb_2148952275.png" alt="Feedback Illustration" className="w-full h-auto" />
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-4 lg:ml-8">
            <h2 className="text-2xl font-bold mb-4">Make Falcon a better place by giving your feedback!</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
            />
            <div>
              <label className="block mb-2">Rating:</label>
              <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                <Rating
                  name="hover-feedback"
                  value={rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {rating !== null && (
                  <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                )}
              </Box>
            </div>

            <textarea
              placeholder="Your Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="border p-2 w-full h-32"
            ></textarea>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
             
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Feedbackform;
