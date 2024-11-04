// src/components/Preview.js
import React, { useContext } from 'react';
import { ResumeContext } from '/src/context/ResumeContext';

const Preview = () => {
  const { formData } = useContext(ResumeContext);

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <h2>Resume Preview</h2>

      {/* Personal Details Section */}
      <section>
        <h3>{formData.personalDetails?.name || 'John Doe'}</h3>
        <p>{formData.personalDetails?.email || 'john.doe@example.com'}</p>
        <p>{formData.personalDetails?.phone || '(123) 456-7890'}</p>
        <p>{formData.personalDetails?.address || '123 Main St, City, Country'}</p>
      </section>

      {/* Professional Summary Section */}
      <section>
        <h3>Professional Summary</h3>
        <p>{formData.summary || 'Experienced software developer with a strong background in building scalable applications.'}</p>
      </section>

      {/* Skills Section */}
      <section>
        <h3>Skills</h3>
        <p>{formData.skills?.join(', ') || 'JavaScript, React, Node.js, MongoDB, Express'}</p>
      </section>

      {/* Education Section */}
      <section>
        <h3>Education</h3>
        {formData.education && formData.education.length > 0 ? (
          formData.education.map((edu, index) => (
            <div key={index}>
              <h4>{edu.degree || 'Bachelor of Science in Computer Science'}</h4>
              <p>{edu.institution || 'University of Technology'}</p>
              <p>{edu.year || '2023'}</p>
            </div>
          ))
        ) : (
          <p>Bachelor of Science in Computer Science, University of Technology, 2023</p>
        )}
      </section>

      {/* Experience Section */}
      <section>
        <h3>Experience</h3>
        {formData.experience && formData.experience.length > 0 ? (
          formData.experience.map((exp, index) => (
            <div key={index}>
              <h4>{exp.jobTitle || 'Software Engineer'}</h4>
              <p>{exp.company || 'Tech Solutions Inc.'}</p>
              <p>{exp.duration || 'Jan 2022 - Present'}</p>
              <p>{exp.description || 'Responsible for developing and maintaining web applications.'}</p>
            </div>
          ))
        ) : (
          <p>Software Engineer at Tech Solutions Inc. (Jan 2022 - Present) - Responsible for developing and maintaining web applications.</p>
        )}
      </section>

      {/* Projects Section */}
      <section>
  <h3>Projects</h3>
  {formData.projects && formData.projects.length > 0 ? (
    formData.projects.map((project, index) => (
      <div key={index}>
        <h4>{project.title || 'E-commerce Website'}</h4>
        <p>{project.description || 'An e-commerce platform for online shopping with payment integration.'}</p>
        <p>
          {Array.isArray(project.technologies) 
            ? project.technologies.join(', ') 
            : String(project.technologies || '').split(',').join(', ') || 'Technologies: React, Node.js, MongoDB, Express'}
        </p>
      </div>
    ))
  ) : (
    <p>E-commerce Website - An e-commerce platform for online shopping with payment integration (React, Node.js, MongoDB, Express).</p>
  )}
</section>


      {/* Certifications Section */}
      <section>
        <h3>Certifications</h3>
        {formData.certifications && formData.certifications.length > 0 ? (
          formData.certifications.map((cert, index) => (
            <div key={index}>
              <p>{cert.name || 'Certified JavaScript Developer'}</p>
              <p>{cert.institution || 'JavaScript Institute'}</p>
              <p>{cert.year || '2022'}</p>
            </div>
          ))
        ) : (
          <p>Certified JavaScript Developer - JavaScript Institute, 2022</p>
        )}
      </section>

      {/* Print Button */}
      <button onClick={() => window.print()}>Print Resume</button>
    </div>
  );
};

export default Preview;
