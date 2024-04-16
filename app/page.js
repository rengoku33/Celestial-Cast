"use client";
import Head from 'next/head';
import axios from 'axios';
import React, { useState } from 'react';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';
import { BsSearch } from 'react-icons/bs'

export default function Home() {

  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=chennai&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`  // API call, key in env

  const fetchWeather = (e) => {                 // fn which makes the api call
    e.preventDefault()
    setLoading(true)
    axios.get(url).then((response) => {         // axios makes the api call
      setWeather(response.data)                 // json data
      console.log(response.data)
    })
    setCity('');
    setLoading(false);
  }

  if (loading) {
    return <Spinner />;
  } else {
    return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Celestial Cast</title>
      </Head>
      {/* bak grnd img */}
      <div className="flex justify-center">
        <img
          src='https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/app/images/up33.jpeg'
          className="fixed top-0 left-0 w-full h-full object-cover"
          alt="Responsive Image"
        />
      </div>

      {/* search bar */}
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10'>
          <form
            onSubmit={fetchWeather}
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl'
          >
            <div>
              <input
                onChange={(e) => setCity(e.target.value)}
                className='bg-transparent border-none text-white focus:outline-none text-2xl'
                type='text'
                placeholder='Search city'
              />
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {/* Weather */}
        {weather.main && <Weather data={weather} />}

    </div>
  );
}
}