const MainInfo=(props)=>{
    return(
        <div className=" mx-2 rounded-md py-[3px] px-2 flex justify-between md:min-w-[152px] border-[1px] border-gray-400">
            <div className="text-gray-700 font-semibold">
                {`${props.name}:`} 
            </div>
            <div className="text-gray-500 font-semibold">
                {props.value}{props.units}
            </div>
        </div>
    );
}

export default MainInfo;