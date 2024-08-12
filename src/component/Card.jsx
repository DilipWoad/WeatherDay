import { useState} from "react";

import { weatherdata,latLon } from '../weather-api'
import MainInfo from "./MainInfo";
import Forecast from "./Forecast";

const Card=()=>{
    const [country,setCountry] = useState("");
    const [currentTemp,setCurrentTemp] = useState(null);
    const [aqi,setAqi] = useState(null);
    const [forecast,setForecast] = useState(null);

    const weekdDay = ["Sun","Mon","Tue","Wed","Thu","Fir","Sat"];

    const date = new Date();
    const day = date.getDay();
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        latAndLon();
        setCountry("");
    }
    const handleChange = (e) => {
        setCountry(e.target.value); // Update the search input
    };
    
    const latAndLon = async()=>{
        const data = await latLon(country);

        const current_forecast = await weatherdata(data.lat,data.lon,country);

        setForecast(current_forecast[1]);
        setCurrentTemp(current_forecast[0]);
        setAqi(current_forecast[2])
        
    }
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div className="flex px-3 my-5">
                <input 
                type="text"
                placeholder="Search City..."
                className="w-full h-10 mr-3 px-3 rounded-md bg-stone-300 placeholder:text-slate-600 outline-gray-400"
                value={country}
                onChange={handleChange}
                ></input>
                <button 
                type="submit"
                className="bg-blue-500 rounded-md px-3"
                >Find</button>
            </div>
        </form>
        {currentTemp && (
            <div className=" bg-sky-400 p-3 space-y-4 mx-3 rounded-lg md:h-auto md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                <div className="bg-red-400 h-96 rounded-lg md:h-72 flex justify-center items-center shadow-2xl">
                    <div className=" ">
                        <div className=" h-8  text-center">
                            <div className="text-xl font-semibold mb-5 ">
                                {`${currentTemp.name}/${currentTemp.sys.country}`}
                            </div>
                        </div>
                        <div className=" flex justify-center items-center mt-8">
                            <div className="">
                                <div className=" h-32 pl-4 flex justify-center items-center">
                                    <div className="text-7xl font-semibold mb-8 flex ">
                                        {`${Math.round(currentTemp.main.temp)}`}
                                        <div className="text-lg ">°C</div>
                                    </div>       
                                                            
                                </div>
                                <div className="text-xl text-center my-3 font-semibold">
                                    {`${currentTemp.weather[0].main} ${Math.round(currentTemp.main.temp_max)}°/${Math.round(currentTemp.main.temp_min)}°`}
                                </div>
                                <div className="flex justify-center">
                                    <div className={ `${aqi.aqi <50 ? "bg-green-400":"bg-red-600"} text-center w-20 rounded-2xl py-1 text-base` }>
                                        AQI {aqi.aqi}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-emerald-400 h-full space-y-3">
                    <div className=" bg-indigo-400 h-28 mb-2 rounded-lg hidden md:block overflow-hidden">
                        <div className="h-8 text-center font-semibold text-xl">
                            Today
                        </div>
                        <div className="bg-yellow-200 h-20 w-full justify-between items-center flex px-3 ">
                            <div className=" ">
                                <img className="h-16" src={`https://openweathermap.org/img/wn/${currentTemp.weather[0].icon}@2x.png`} alt="Today's Icon" />
                            </div>
                            <div>
                                <div className="flex justify-end pr-1">
                                    <div className="font-semibold text-xl">
                                        {currentTemp.weather[0].main}
                                    </div>
                                </div> 
                                <div className="flex">
                                    <img src="https://cdn-icons-png.flaticon.com/32/1171/1171289.png" alt="" />
                                    <div className="flex justify-center items-center m-1 font-semibold">{currentTemp.wind.speed}<span className="ml-1 font-normal text-sm">km/s</span></div>
                                    
                                </div>    
                            </div>    
                        </div>
                    </div>
                    <div className="bg-orange-400 h-auto rounded-lg py-3 md:h-auto md:min-w-[170px] ">
                        <div className="space-y-1">
                            <MainInfo name="Feels Like" value={Math.round(currentTemp.main.feels_like)} units="°C" />
                            <MainInfo name="Humidity" value={Math.round(currentTemp.main.humidity)} units="%"/>
                            <MainInfo name="Pressure" value={Math.round(currentTemp.main.pressure)} units="mbar"/>
                            <MainInfo name="Wind" value={Math.round(currentTemp.wind.speed)} units="km/s"/>
                        </div>    
                    
                    </div>

                </div>
                <div className="hidden md:block md:col-span-2">
                    <div className="bg-pink-600  rounded-lg h-44 flex justify-center items-center gap-2 shadow-2xl px-3">
                    <Forecast Day={weekdDay[(day+1)%7]} Icon={forecast.max_min_icon[0]} maxTemp={Math.round(forecast.maxValues[0])} minTemp={Math.round(forecast.minValues[0])}/>  
                    <Forecast Day={weekdDay[(day+2)%7]} Icon={forecast.max_min_icon[1]} maxTemp={Math.round(forecast.maxValues[1])} minTemp={Math.round(forecast.minValues[1])}/>
                    <Forecast Day={weekdDay[(day+3)%7]} Icon={forecast.max_min_icon[2]} maxTemp={Math.round(forecast.maxValues[2])} minTemp={Math.round(forecast.minValues[2])}/>
                    <Forecast Day={weekdDay[(day+4)%7]} Icon={forecast.max_min_icon[3]} maxTemp={Math.round(forecast.maxValues[3])} minTemp={Math.round(forecast.minValues[3])}/>
                    <Forecast Day={weekdDay[(day+5)%7]} Icon={forecast.max_min_icon[4]} maxTemp={Math.round(forecast.maxValues[4])} minTemp={Math.round(forecast.minValues[4])}/>
                </div>
                </div>
            </div>
        )}
        
        </div>
    )
}

export default Card;