import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { isNameValid, getLocations } from './mock-api/apis.js';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    // Fetch location options from the mock API
    getLocations()
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    // Validate name against the mock API as the user types
    isNameValid()
      .then((isValid) => {
        if (!isValid) {
          setNameError('This name has already been taken');
        } else {
          setNameError('');
        }
      })
      .catch((error) => console.error('Error validating name:', error));
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to the mock API or perform other actions
    console.log('Form submitted with name:', name, 'and location:', location);
  };

  const handleClear = () => {
    //clear the form fields when button is clicked
    //allows user to easily reset the form when needed
    setName('');
    setLocation('');
    setNameError('');
  };

  return (
    <div className='App'>
      <h1></h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={handleNameChange}
            required
          />
          {nameError && <span className='error'>{nameError}</span>}
        </div>
        <div>
          <label htmlFor='location'>Location:</label>
          <select
            id='location'
            value={location}
            onChange={handleLocationChange}
            required
          >
            <option value=''>Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <button type='button' onClick={handleClear}>
          Clear
        </button>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;
