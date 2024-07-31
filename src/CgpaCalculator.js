import React, { useState } from 'react';

const gradePoints = {
  O: 10,
  E: 9,
  A: 8,
  B: 7,
  C: 6,
  D: 5,
  F: 4,
};

const CgpaCalculator = () => {
  const [subjects, setSubjects] = useState([{ name: '', grade: '', credits: '' }]);
  const [cgpa, setCgpa] = useState(null);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', grade: '', credits: '' }]);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
      const gradePoint = gradePoints[subject.grade] || 0;
      const credits = parseFloat(subject.credits) || 0;
      totalPoints += gradePoint * credits;
      totalCredits += credits;
    });

    const cgpa = totalPoints / totalCredits;
    setCgpa(totalCredits > 0 ? cgpa.toFixed(2) : '0.00');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-auto max-w-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">CGPA Calculator</h1>
        {subjects.map((subject, index) => (
          <div key={index} className="mb-4 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 w-full">
            <input
              type="text"
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
            />
            <select
              value={subject.grade}
              onChange={(e) => handleSubjectChange(index, 'grade', e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
            >
              <option value="">Select Grade</option>
              <option value="O">O</option>
              <option value="E">E</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <input
              type="number"
              placeholder="Credits"
              value={subject.credits}
              onChange={(e) => handleSubjectChange(index, 'credits', e.target.value)}
              className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
            />
            <button onClick={() => handleRemoveSubject(index)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-center space-x-4">
          <button onClick={handleAddSubject} className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800">Add Subject</button>
          <button onClick={calculateCgpa} className="bg-gray-700 text-white p-2 rounded-md hover:bg-gray-800">Calculate CGPA</button>
        </div>
        {cgpa && <h2 className="text-3xl font-bold text-gray-900 mt-8">Your CGPA is: {cgpa}</h2>}
      </div>
    </div>
  );
};

export default CgpaCalculator;
