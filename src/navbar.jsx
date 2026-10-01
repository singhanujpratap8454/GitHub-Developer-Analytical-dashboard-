import './App.css'
import {NavLink} from 'react-router-dom'
import { Moon , Sun } from 'lucide-react'
import './home.css'


const navbar = ({dark , setDark}) => {
  return (
    <div>
      <header className='navbar'>
        {/*LOGO*/}
        <NavLink to='/' className='brand' />
          <div className='brand-icon'>
            <span />
            <span />
            <span />
          </div>
          <div className='brandname'>Mainline</div>
          <div className='brand-subtitle'>GitHub analytics</div>

        {/*NAVIGATION*/} 
        <nav className='nav-links'>
          <NavLink to='/'>Home</NavLink>
            <NavLink to='/profile/'>Profile</NavLink>
          <NavLink to='/compare'>Compare</NavLink>
        </nav>

        {/*THEME*/}
        <button className='theme-button' onClick={()=>{
          setDark(!dark)}} arial-label="Toggle theme"
        >{dark ? <Sun size={19} /> : <Moon size={19}/>}</button>
      </header>
    </div>
  )
}
export default navbar