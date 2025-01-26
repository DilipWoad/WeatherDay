const ShimmerUi = ({ showForecast }) => {
  return (
    <div className="rounded-lg md:h-auto md:grid md:gap-3 ">
      <div className="bg-slate-200 h-96 md:h-72 rounded-lg  flex justify-center items-center shadow-2xl md:w-64"></div>
      <div className="h-full md:h-72 min-w-64 space-y-3">
        <div className=" bg-slate-200 h-28 mb-2 rounded-lg hidden md:block overflow-hidden"></div>
        <div className="bg-slate-200 h-auto rounded-lg py-3 md:h-40 md:min-w-[170px] shadow-lg ">
          <div className="space-y-1">
            <div className="bg-slate-300 mx-2 h-8 md:h-8 rounded-md py-1 px-3 flex justify-between md:min-w-[152px]"></div>
            <div className="bg-slate-300 mx-2 h-8 md:h-8 rounded-md py-1 px-3 flex justify-between md:min-w-[152px]"></div>
            <div className="bg-slate-300 mx-2 h-8 md:h-8 rounded-md py-1 px-3 flex justify-between md:min-w-[152px]"></div>
            <div className="bg-slate-300 mx-2 h-8 md:h-8 rounded-md py-1 px-3 flex justify-between md:min-w-[152px]"></div>
          </div>
        </div>
      </div>
      <div
        className={`${
          showForecast ? "" : "hidden"
        } md:block md:col-span-2 bg-slate-200 rounded-lg overflow-x-scroll md:overscroll-none `}
      >
        <div className="h-44 flex justify-center items-center gap-2 shadow-2xl px-3 ml-28 md:ml-0">
          <div className="bg-slate-300 h-36 min-w-24 rounded-lg grid place-content-center gap-2"></div>
          <div className="bg-slate-300 h-36 min-w-24 rounded-lg grid place-content-center gap-2"></div>
          <div className="bg-slate-300 h-36 min-w-24 rounded-lg grid place-content-center gap-2"></div>
          <div className="bg-slate-300 h-36 min-w-24 rounded-lg grid place-content-center gap-2"></div>
          <div className="bg-slate-300 h-36 min-w-24 rounded-lg grid place-content-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerUi;
