import Image from 'next/image';
import React from 'react';

const Weather = ({ data }) => {
  // console.log(data);
  return (
    <div className='relative flex flex-col justify-between max-w-[777px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10'>
      {/* Top */}
      <div className='relative flex justify-between bg-black/50 px-12 mt-16 py-12 w-[100%]'>
        <div className='flex flex-col items-center text-white'>
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt='/'
            width='100'
            height='100'
          />
          <p className='text-2xl'>{data.weather[0].description}</p>
        </div>
        <p className='text-9xl text-white'>{data.main.temp.toFixed(0)}&#176;</p>
      </div>
      {/* Bottom */}

<div className='bg-black/50 relative p-7 rounded-md'>
    <p className='text-2xl text-center pb-6 text-white'>Weather in {data.name}</p>
    <div className='flex justify-between text-center text-white'>
        <div>
            <p className='font-bold text-2xl color'>{data.main.feels_like.toFixed(0)}&#176;</p>
            <p className='text-xl'>Feels Like</p>
        </div>
        <div>
            <p className='font-bold text-2xl'>{data.main.humidity}%</p>
            <p className='text-xl'>Humidity</p>
        </div>
        <div>
            <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)} MPH</p>
            <p className='text-xl '>Winds</p>
        </div>
    </div>
</div>

    </div>
  );
};

export default Weather;