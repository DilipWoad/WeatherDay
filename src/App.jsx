import { useEffect, useState } from 'react'

import './App.css'

import Card from './component/Card'

function App() {
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className="bg-green-500 w-96 h-auto md:w-[50%] rounded-md md:max-w-xl md:h-auto ">
        <Card />
        </div> 
      </div>   
    </>
  )
}

export default App
