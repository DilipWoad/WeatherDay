import { useEffect, useState} from "react";

import { weatherdata,latLon } from '../weather-api'
import MainInfo from "./MainInfo";
import Forecast from "./Forecast";
import ShimmerUi from "./ShimmerUi";

const Card=()=>{
    const [country,setCountry] = useState("");
    const [currentTemp,setCurrentTemp] = useState(null);
    const [aqi,setAqi] = useState(null);
    const [forecast,setForecast] = useState(null);
    const [showForecast,setShowForecast] = useState(false);
    const [showShimmer,setShowShimmer] = useState(false);

    const weekdDay = ["Sun","Mon","Tue","Wed","Thu","Fir","Sat"];

    const date = new Date();
    const day = date.getDay();
   
    const handleSubmit=(e)=>{
        e.preventDefault();
        setShowShimmer(!showShimmer);
        latAndLon();
        setCountry("");
    }
    const handleChange = (e) => {
        setCountry(e.target.value); // Update the search input
    };
    
    const latAndLon = async()=>{
        const data = await latLon(country);

        const current_forecast = await weatherdata(data.lat,data.lon,country);
        // console.log(current_forecast)
        sessionStorage.setItem("forecastData",JSON.stringify(current_forecast));
        // console.log(forecast)
        setForecast(current_forecast[1]);
        setCurrentTemp(current_forecast[0]);
        setAqi(current_forecast[2])
        
    }
    useEffect(()=>{
        const currentDataStr =sessionStorage.getItem("forecastData");
        const currentData = JSON.parse(currentDataStr);
        // console.log(currentData);
        if(!currentTemp){
            if(currentData!== null){
                setForecast(currentData[1]);
                setCurrentTemp(currentData[0]);
                setAqi(currentData[2])
            }
        }
        
        
    },[])

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <div className="flex px-3 my-5">
                <input 
                type="text"
                placeholder="Search City..."
                className="w-full h-10 mr-3 px-3 rounded-md border-2 border-gray-300 placeholder:text-slate-600 outline-gray-400 shadow-lg"
                value={country}
                onChange={handleChange}
                ></input>
                <button 
                type="submit"
                className="border-2 border-gray-400 bg-gray-200 rounded-md px-3 text-gray-700 hover:bg-gray-300 hover:text-white"
                >Find</button>
            </div>
        </form>
        
            <div className="  p-3 space-y-4 mx-3 rounded-lg md:h-auto md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                {!currentTemp ? showShimmer && <ShimmerUi showForecast={showForecast}/> : (
                    <><div className="bg-white border-2 border-gray-400  h-96 rounded-lg md:h-72 flex justify-center items-center shadow-xl">
                    <div className=" ">
                        <div className=" h-8  text-center">
                            <div className="text-xl font-semibold mb-5 text-gray-700">
                                {`${currentTemp.name}/${currentTemp.sys.country}`}
                            </div>
                        </div>
                        <div className=" flex justify-center items-center mt-8">
                            <div className="">
                                <div className=" h-32 pl-4 flex justify-center items-center">
                                    <div className="text-7xl font-semibold mb-8 flex text-gray-500 ">
                                        {`${Math.round(currentTemp.main.temp)}`}
                                        <div className="text-lg text-gray-900">°C</div>
                                    </div>       
                                                            
                                </div>
                                <div className="text-xl text-center my-3 font-semibold text-gray-700">
                                    {`${currentTemp.weather[0].main} ${Math.round(currentTemp.main.temp_max)}°/${Math.round(currentTemp.main.temp_min)}°`}
                                </div>
                                <div className="flex justify-center">
                                    <div className={ `${aqi.aqi <50 ? "bg-green-300":"bg-red-400"} border-[1px] border-gray-500 text-center w-20 rounded-2xl py-1 text-base` }>
                                        AQI {aqi.aqi}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full space-y-3">
                    <div className="  h-28 mb-2 rounded-lg hidden md:block overflow-hidden border-2 border-gray-400 shadow-xl">
                        <div className="h-8 text-center font-semibold text-xl text-gray-700">
                            Today
                        </div>
                        <div className=" h-20 w-full justify-between items-center flex px-3 border-t-[1px] border-gray-400 ">
                            <div className=" ">
                                <img className="h-16" src={`https://openweathermap.org/img/wn/${currentTemp.weather[0].icon}@2x.png`} alt="Today's Icon" />
                            </div>
                            <div>
                                <div className="flex justify-end pr-1">
                                    <div className="font-semibold text-xl text-gray-700">
                                        {currentTemp.weather[0].main}
                                    </div>
                                </div> 
                                <div className="flex">
                                    <img src="https://cdn-icons-png.flaticon.com/32/1171/1171289.png" alt="" />
                                    <div className="flex justify-center items-center m-1 font-semibold ">{currentTemp.wind.speed}<span className="ml-1 font-normal text-sm text-gray-500">km/s</span></div>
                                    
                                </div>    
                            </div>    
                        </div>
                    </div>
                    <div className=" h-auto rounded-lg py-[9px] md:h-auto md:min-w-[170px] border-2 border-gray-400 shadow-xl">
                        <div className="space-y-1">
                            <MainInfo name="Feels Like" value={Math.round(currentTemp.main.feels_like)} units="°C" />
                            <MainInfo name="Humidity" value={Math.round(currentTemp.main.humidity)} units="%"/>
                            <MainInfo name="Pressure" value={Math.round(currentTemp.main.pressure)} units="mbar"/>
                            <MainInfo name="Wind" value={Math.round(currentTemp.wind.speed)} units="km/s"/>
                        </div>    
                    
                    </div>

                </div>
                
                <div className={`${showForecast ? "":"hidden"} md:block md:col-span-2  rounded-lg overflow-x-scroll md:overscroll-none border-2 border-gray-400 shadow-xl`}>
                <div className="h-44 flex justify-center items-center gap-2 shadow-2xl px-3 ml-28 md:ml-0">
                    <Forecast Day={weekdDay[(day+1)%7]} Icon={forecast.max_min_icon[0]} maxTemp={Math.round(forecast.maxValues[0])} minTemp={Math.round(forecast.minValues[0])}/>  
                    <Forecast Day={weekdDay[(day+2)%7]} Icon={forecast.max_min_icon[1]} maxTemp={Math.round(forecast.maxValues[1])} minTemp={Math.round(forecast.minValues[1])}/>
                    <Forecast Day={weekdDay[(day+3)%7]} Icon={forecast.max_min_icon[2]} maxTemp={Math.round(forecast.maxValues[2])} minTemp={Math.round(forecast.minValues[2])}/>
                    <Forecast Day={weekdDay[(day+4)%7]} Icon={forecast.max_min_icon[3]} maxTemp={Math.round(forecast.maxValues[3])} minTemp={Math.round(forecast.minValues[3])}/>
                    <Forecast Day={weekdDay[(day+5)%7]} Icon={!forecast.max_min_icon[4] ? forecast.max_min_icon[2] :forecast.max_min_icon[4]} 
                    maxTemp={Math.round(forecast.maxValues[4] ==-Infinity || Infinity?forecast.maxValues[2] :forecast.maxValues[4])} 
                    minTemp={Math.round(forecast.minValues[4]== -Infinity || Infinity?  forecast.minValues[2] :forecast.minValues[4])}/>
                </div>
                </div>
                <div onClick={()=>setShowForecast(!showForecast)} className="border-2 border-gray-400 text-xl text-center py-3 rounded-l-full rounded-r-full md:hidden shadow-xl text-gray-700">
                    <span>{showForecast ? "Hide":"Show"}</span> Five day Forecast
                </div>
                    </>
                )}
                
            </div>
        
        </div>
    )
}

export default Card;