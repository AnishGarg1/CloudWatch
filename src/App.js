import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <div className='font-bold text-blue-600'>CloudWatch App</div>
      <Routes>
        <Route path='/' element={<h1>Home Page</h1>}/>
        <Route path='/contact' element={<h1>Contact Us</h1>}/>
        <Route path='*' element={"404 Not Found"}/>
      </Routes>
    </div>
  );
}

export default App;
