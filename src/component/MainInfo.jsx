const MainInfo=(props)=>{
    return(
        <div className="bg-red-500 border-2 mx-3 mb-2 rounded-md py-1 px-3 flex justify-between md:min-w-[152px]">
            <div>
                {`${props.name}:`} 
            </div>
            <div>
                {props.value}{props.units}
            </div>
        </div>
    );
}

export default MainInfo;