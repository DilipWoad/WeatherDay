const API_KEY = 'ff45f0623e2a0fa85c372a8a65935da4';
const AQI_API_KEY = '6066c59e6b7fd15bd606f5a0ba049799de1dd570';

//Getting Lat and Lon value from geocoding api
// const cityName ="mumbai";
const latLon = async(cityName)=>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    const cityData = await fetch(URL)
    .then((res)=>res.json())
    .then((data)=>data);
    
    const {lat,lon} = cityData.coord;

    return{
        lat,
        lon
    }
}

const weatherdata = async(lat,lon,city,units = "metric")=>{
    const date =new Date();
    const currentDate = date.getDate();
    
    const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    const AQI_URL = `https://api.waqi.info/feed/${city}/?token=${AQI_API_KEY}`
    
    const currentData = await fetch(CURRENT_URL)
    .then((res)=>res.json())
    .then((data)=>data);

    const fiveDayMax = [];
    const fiveDayMin = [];
    const fiveDayIcon =[];

    const forecasteData = await fetch(FORECAST_URL)
    .then((res)=>res.json())
    .then((data)=>
    {const forecasts = data.list;
        
        const foreCast = forecasts.map((forecast)=>{
            delete forecast.clouds;
            delete forecast.pop;
            delete forecast.sys;
            delete forecast.wind;
            delete forecast.rain;
            
            var dat = forecast.dt_txt.split(" ")[0].split("-")[2];
            return Object.defineProperty(forecast, "dt_txt", {value:dat});
        }).filter((fore)=>fore.dt_txt>currentDate)
        
        for(var i=currentDate+1;i<=currentDate+5;i++){
            let loopMaxTemp =[];
            let loopMinTemp =[];
            let loopIcon = [];
            for(var j=0;j<foreCast.length;j++){
                if(foreCast[j].dt_txt==i){
                    loopMaxTemp.push(foreCast[j].main.temp_max);
                    loopMinTemp.push(foreCast[j].main.temp_min);
                    loopIcon.push(foreCast[j].weather[0].icon);
                }
            }
            fiveDayMax.push(loopMaxTemp);
            fiveDayMin.push(loopMinTemp);
            fiveDayIcon.push(loopIcon);

        }
        let maxValues = fiveDayMax.map(array => Math.max(...array));
        let minValues = fiveDayMax.map(array => Math.min(...array));
        let max_min_icon = fiveDayIcon.map(array => {
            return array[parseInt(array.length/2)];
        })
        
        return {maxValues,minValues,max_min_icon};

    }
    );

    const aqiData = await fetch(AQI_URL)
    .then((res)=>res.json())
    .then((aqidata)=> aqidata.data)

    return [currentData,forecasteData,aqiData]

}

export { latLon, weatherdata };