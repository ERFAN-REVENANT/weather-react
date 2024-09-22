import React from "react";
import searchIcon from "../assets/search.png";

const Weather = () => {
  return (
    <div className="weather self-center p-[40px] rounded-[10px] bg-linear[()]">
      <div className="search-bar">
        <input type="text" placeholder="search" />
        <img src={searchIcon} alt="" />
      </div>
    </div>
  );
};

export default Weather;
