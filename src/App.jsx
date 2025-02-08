import Card from './component/Card'

function App() {
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center bg-gray-200'>
        <div className=" w-96 h-auto md:w-[50%] rounded-md md:max-w-xl md:h-auto shadow-2xl bg-white">
        <Card />
        </div> 
      </div>   
    </>
  )
}

export default App
