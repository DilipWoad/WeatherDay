const Forecast =(props)=>{
    const ICON_URL = `https://openweathermap.org/img/wn/${props.Icon}@2x.png`
    return(
        <div className="bg-white h-36 w-24 rounded-lg grid place-content-center gap-2">
            <div className="bg-red-300 flex justify-center items-center">
                {props.Day}
            </div>
            <div className="bg-yellow-300 w-auto h-16 flex justify-center items-center">
                <img src={ICON_URL}/>
            </div> 
            <div className="bg-red-300 flex justify-center items-center">
                {props.minTemp}°/{props.maxTemp}°
            </div>   
        </div>
        
    )
}

export default Forecast;