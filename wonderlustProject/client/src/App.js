import { useContext } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Settings from "./Pages/Settings/Settings";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from "./Context/Context";
import About from "./Pages/About/About";


function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/register' element={user ? <Home/> : <Register/>}/>
        <Route path='/login' element={user ? <Home/> : <Login/>}/>
        <Route path='/write' element={user ? <Write/> : <Register/>}/>
        <Route path='/settings' element={user ? <Settings/> : <Register/>}/>
        <Route path='/post/:postId' element={<Single/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
