// Subject.tsx
import React from 'react';

// Define the props interface for the Subject component
interface SubjectProps {
    subjectNumber: string;
    dateOfReceipt: string;
    subject: string;
    associates: string,
    client: string,
    opponent: string;
}

// Create the Subject component using functional component syntax
const Subject: React.FC<SubjectProps> = ({ subjectNumber, dateOfReceipt, subject, associates, client, opponent }) => {
  return (
    <div>
      <h2>Subject number: {subjectNumber}</h2>
      <p>Date of receipt: {dateOfReceipt}</p>
      <p>Subject: {subject}</p>
      <p>Associates: {associates}</p>
      <p>Client: {client}</p>
      <p>Opponent: {opponent}</p>
    </div>
  );
};

export default Subject;