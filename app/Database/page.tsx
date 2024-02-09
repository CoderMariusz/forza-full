'use client';
import React, { useState } from 'react';

const InputForm: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://127.0.0.1:5000/save-name', {
        // Adjust the URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, height })
      });
      setName('');
      setAge('');
      setHeight(''); // Reset fields after submission
      alert('Data saved!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>Name:</label>
      <input
        id='name'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor='age'>Age:</label>
      <input
        id='age'
        type='number'
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label htmlFor='height'>Height (cm):</label>
      <input
        id='height'
        type='number'
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default InputForm;
