"use client";

import Image from 'next/image'
import { Inter } from 'next/font/google'
import React, { useState, ChangeEvent, FormEvent } from "react";
import Form from '../components/Form/Form';
import MainCard from '../components/Card/Main';
import MiniCard from '../components/Card/Mini';

let InputArray: { placeholder: string, type: string }[] = [
  { 
    placeholder: "Enter Location", 
    type: "text"
  }
];

interface Forecast {
    temp: {
      min: number,
      max: number,
    };
    weather: Array<{icon: string; description: string;}>
    dt: number;
  }

interface ForecastData {
  daily: Array<Forecast>
}

interface WeatherData {
  name: string;
  coord: {
    lon: number;
    lat: number;
  };
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  }
  timezone: number;
  weather: Array<{icon: string; description: string;}>
}

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const getForecastData = async (lat:number, lon:number) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`)
      const data = await response.json();
      
      if (response.ok) {
        setForecastData(data);
        setError(null);
      } else {
        throw new Error(data.message);
      }
    } catch (error:any) {
      console.error(error);
      setForecastData(null);
      setError(error.message);
    }
  }
  const getWeatherData = async (location:string) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&units=metric`)
      const data = await response.json();
      
      if (response.ok) {
        setWeatherData(data);
        setError(null);
        return data
      } else {
        throw new Error(data.message);
      }
    } catch (error:any) {
      console.error(error);
      setWeatherData(null);
      setForecastData(null)
      setError(error.message);
    }
  }
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let weather = await getWeatherData(location)
    if (!weather) {
      return
    } else {
      let {lat,lon} = weather.coord;
      await getForecastData(lat, lon)
    }
    
  };


  return (
      <div className="container h-full w-full p-y-12 mx-auto flex flex-col items-center justify-center">
        
        <div className="py-8 text-center md:rounded-lg ">
          
          <h1 className="text-2xl text-white font-semibold mb-4">
            Discover the weather in your city
          </h1>
          <Form 
            submitFunction={handleFormSubmit} 
            onChangeFunction={handleLocationChange}
            location={location} 
            inputs={InputArray} 
          />
          {
            error && (
              <p className="text-red mt-4 font-semibold">{error}</p>
            )
          }
        </div>
        {
          weatherData && (
            <MainCard 
              location={weatherData.name} 
              stats={weatherData.main} 
              wind={weatherData.wind.speed}
              currentWeather={weatherData.weather[0]} 
              timezone={weatherData.timezone}
              sunrise={weatherData.sys.sunrise} 
              sunset={weatherData.sys.sunset} 
            />
          )
        }

        {
          forecastData && forecastData.daily.length > 0 && (
            <div className="container py-8 text-center container flex flex-col">
              <h2 className="text-2xl font-semibold text-white">
                  Forecast
              </h2>
              <div className="py-6 grid gap-2 place-items-stretch grid-cols-2 md:grid-cols-4 lg:grid-cols-8 ">
                {
                  forecastData.daily.map((day, i)=> (
                    <MiniCard
                      key={i} 
                      date={day.dt} 
                      weather={day.weather[0]} 
                      temperature={day.temp} 
                    />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

  );
};

export default WeatherApp;

