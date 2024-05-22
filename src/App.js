import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
// import WeatherPage from './components/WeatherPage';

function App() {
  return (
    <div className='relative h-screen w-screen'>
      <div id='stars' className='z-0'></div>
      <div id='stars2' className='z-0'></div>
      <div id='stars3' className='z-0 bg-transparent'></div>

      <div className='z-10 w-full min-h-screen top-[35%] translate-x-[-50%] translate-y-[-50%] left-[50%] flex justify-center mt-11 fixed'>
        <div className='flex flex-col justify-center items-center gap-8 mb-20 w-8/12 text-white space-y-4'>
          <div id='title'>
            <span>
              CloudWatch App
            </span>
          </div>

          {/* <div className='font-bold text-blue-600 md:font-bold'>CloudWatch App</div> */}
          <Routes>
            <Route path='/' element={<Home/>}/>
            {/* <Route path='/city/:cityName' element={<WeatherPage/>}/> */}
            <Route path='/about' element={<h1>Contact Us</h1>}/>
            <Route path='*' element={"404 Not Found"}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
