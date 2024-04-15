"use client";  
import Head from 'next/head';
import axios from 'axios';
import React,{ useState } from 'react';

import { BsSearch } from 'react-icons/bs'

export default function Home() {
  
  const [city,setCity] = useState('');
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

  return (
  <div>
    <Head>
      <title>Celestial Cast</title>
    </Head>
    {/* <img src={require('./images/up33.jpeg')} alt='star-forger' height={100}/> */}
    <img
          src='https://images.unsplash.com/photo-1601134467661-3d775b999c8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2575&q=80'
          
        />

    <button onClick={fetchWeather}>Fetch data</button>
  </div>
      );
}
