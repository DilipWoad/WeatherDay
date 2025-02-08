const Forecast =(props)=>{
    const ICON_URL = `https://openweathermap.org/img/wn/${props.Icon}@2x.png`
    return(
        <div className="bg-white h-36 min-w-20 rounded-lg grid place-content-center gap-2 border-2 border-gray-400">
            <div className=" flex justify-center items-center text-gray-700 font-semibold">
                {props.Day}
            </div>
            <div className=" w-auto h-16 flex justify-center items-center">
                <img src={ICON_URL}/>
            </div> 
            <div className=" flex justify-center items-center">
                {props.minTemp}°/<span className="font-semibold text-gray-800">{props.maxTemp}°</span>
            </div>   
        </div>
        
    )
}
export default Forecast;