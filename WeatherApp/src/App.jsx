import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=7&aqi=yes&alerts=yes`
        );
        setWeatherData(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (submitClicked && location) {
      fetchData();
    }
  }, [location, submitClicked]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitClicked(true);
  };

  console.log(weatherData);

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'> Weather App</h1>
        <form className='input-container' onSubmit={handleSubmit}>
          <input
            className='location-input'
            type='text'
            placeholder='select state'
            value={location}
            onChange={handleLocationChange}
          />
          <button type='submit' className='btn-primary'>
            Select
          </button>
        </form>
      </div>

      {weatherData && (
        <div className='weather-container'>
          {weatherData.forecast.forecastday.map((day) => (
            <div className='day-container' key={day.date}>
              <h2 className='date'> {day.date} </h2>
              <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text}></img>
              <p className='temperature'> {day.day.avgtemp_f} °F</p>
              <p className='temperature'> {day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
