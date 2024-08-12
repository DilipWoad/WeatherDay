import { useEffect, useState } from 'react'

import './App.css'

import Card from './component/Card'

function App() {
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className=" w-96 h-auto md:w-[50%] rounded-md md:max-w-xl md:h-auto shadow-2xl">
        <Card />
        </div> 
      </div>   
    </>
  )
}

export default App
