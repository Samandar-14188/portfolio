import { Routes, Route, Link, useNavigate, BrowserRouter } from 'react-router-dom';
import './App.css';
import About from './component/About/indeex'
import Cart from './component/Cart/index';
import Products from './component/Product';
import Home from './component/Home';
import { GoSun } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useEffect } from 'react';
import { FaRegMoon } from "react-icons/fa";
function App() {
  
 useEffect(()=>{
  document.querySelector('body').setAttribute('data-theme', ('ligth'))
 }, [])

 function setDataMode (){
  document.querySelector('body').setAttribute('data-theme', 'dark')
 }
 function setLightMode (){
  document.querySelector('body').setAttribute('data-theme', ('ligth'))
 }
 function onchangeMode() {
  let moonElement = document.getElementById("Moon");
  let sunElement = document.getElementById("Sun");

  if (moonElement.style.display === "none") {
      moonElement.style.display = "block";
      sunElement.style.display = "none";
      setDataMode();
  } else {
      moonElement.style.display = "none";
      sunElement.style.display = "block";
      setLightMode();
  }
}


  return (
    <div className='container'>
      <BrowserRouter>
        <header className="header-container">
          <div className="Login">
            <ul>
              <li>
              <Link to='/login' >Sign in / Guest</Link>
              </li>
              <li>
                <Link to='/singin'>Create Accaunt</Link>
              </li>
            </ul>
          </div>
          <nav className='navbar-container'>
            <span>C</span>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
              </li>
              <li>
                <Link to='/cart'>Cart</Link>
              </li>
            </ul>
            <div className="icon-container">
              <GoSun className='icon' id='Sun'  onClick={onchangeMode} />
              <FaRegMoon className='icon' onClick={onchangeMode} id='Moon' />
              <MdOutlineShoppingCart className='icon' />
            </div>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Singin />}/>
          <Route path='/singin' element={<CreateAcc />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App