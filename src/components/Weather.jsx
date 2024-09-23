import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/search.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";

const Weather = () => {


  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": cloudIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }
  const search = async (city) => {
    if(city === ""){
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APPID}`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clearIcon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp) ,
        location: data.name,
        icon: icon
      })
      
      
    } catch (error) { 
      setWeatherData(false);
      console.log("error in fetching the data");
      
    }
  }
  useEffect(() =>{
    search()

  },[])
  return (
    <div
      className="flex flex-col weather items-center place-self-center p-[40px] rounded-[10px]"
      style={{ 
        backgroundImage: 'linear-gradient(45deg, #2f4680, #500ae4)',
      }}
    >
      <div className="search-bar flex flex-row items-center gap-[12px]">
        <input 
          type="text" 
          placeholder="search" 
          ref={inputRef}
          className="h-[50px] border-none outline-none rounded-[40px] pl-[25px] color-[#626262] bg-[#ebfffc] text-[18px]" 
        />
        <img 
          src={searchIcon} 
          alt="search" 
          onClick={()=>search(inputRef.current.value)}
          className="w-[50px] h-[50px] p-[15px] rounded-[50%] bg-[#ebfffc] cursor-pointer" 
        />
      </div>
      {weatherData?<>
        <img src={clearIcon} alt="" className="w-[150px] my-[30px] mx-[0px]"/>
      <p className="text-[#fff] text-[80px] line-h-[1px]">{weatherData.temperature}°C</p>
      <p className="text-[#fff] text-[40px]">{weatherData.location}</p>
      <div className="weather-data w-[100%] mt-[40px] text-[#fff] flex justify-between">
        <div className="col flex items-start gap-[12px] text-[22px]">
          <img src={humidityIcon} alt="" className="w-[26px] mt-[10px]" />
          <div>
            <p>{weatherData.humidity}%</p>
            <span className="block text-[16px]">humidity</span>
          </div>
        </div>
        <div className="col flex items-start gap-[12px] text-[22px]">
          <img src={windIcon} alt="" className="w-[26px] mt-[10px]"  />
          <div>
            <p>{weatherData.windSpeed} Km</p>
            <span className="block text-[16px]">wind speed</span>
          </div>
        </div>
      </div>
      </>
      : 
      <></>}

    </div>
  );
};

export default Weather;
