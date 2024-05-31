"use client";
import Head from 'next/head';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import { BsSearch } from 'react-icons/bs'

export async function getStaticProps() {
    try {
        const city = 'chennai'; // Your city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

        const response = await axios.get(url);
        const initWeather = response.data;

        return {
            props: {
                initWeather,
            },
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return {
            props: {
                initWeather: null, // Return null data if an error occurs
            },
        };
    }
}


export default function Home({initWeather}) {

    console.log(initWeather)
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(initWeather);
    const [currentWeather, setCurrentWeather] = useState('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/app/images/up33.jpeg')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`  // API call, key in env

    const fetchWeather = (e) => {
        e.preventDefault();
        try {
            axios.get(url)
                .then((response) => {
                    setWeather(response.data);
                    setCity('');
                })
                .catch((error) => {
                    console.error('Error fetching weather data:', error);
                    // Handle the error here (e.g., display an error message)
                });
        } catch (error) {
            console.error('Failed to make API call:', error);
            // Handle any other errors (e.g., unexpected errors)
        }
    };
    // clouds, clear, mist + smoke, haze, dust, fog + sand, snow, rain, drizzle, thunderstorm
    useEffect(() => {
        if (weather.weather[0].main) {
            const weatherMain = weather.weather[0].main.toLowerCase();

            if (weatherMain.includes('clouds')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/clouds-ups.jpeg');
            }
            else if (weatherMain.includes('clear')) {   //change
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/clear-ups.jpeg');
            }
            else if (weatherMain.includes('mist') || weatherMain.includes('smoke')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/mist-ups.jpeg');
            }
            else if (weatherMain.includes('haze')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/haze-ups.jpeg');
            }
            else if (weatherMain.includes('dust')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/dust-ups.jpeg');
            }
            else if (weatherMain.includes('fog') || weatherMain.includes('sand')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/fog-ups.jpeg');
            }
            else if (weatherMain.includes('snow')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/snow-ups.jpeg');
            }
            else if (weatherMain.includes('rain')) { //change
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/rain-ups.jpeg');
            }
            else if (weatherMain.includes('drizzle')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/drizzle-ups.jpeg');
            }
            else if (weatherMain.includes('thunder storm')) {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/thunder-ups.jpeg');
            }
            else {
                setCurrentWeather('https://raw.githubusercontent.com/rengoku33/Celestial-Cast/main/images/up33.jpeg');
            }
            console.log(weather)
        }
    }, [weather]);

    return (
        <div>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Celestial Cast</title>
            </Head>
            {/* bak grnd img */}
            <div className="flex justify-center">
                <img
                    src={currentWeather}
                    className="fixed top-0 left-0 w-full h-full object-cover"
                    alt="Responsive Image"
                />
            </div>
            {/* search bar */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center max-w-[777px] w-full m-auto pt-9 px-1 text-white z-50'>
                <form
                    onSubmit={fetchWeather}
                    className='flex justify-between items-center w-full p-2 bg-transparent border-4 border-white text-white rounded-2xl'
                >
                    <div>
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            className='bg-transparent border-none text-white focus:outline-none text-3xl w-[777px] placeholder-white'
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

