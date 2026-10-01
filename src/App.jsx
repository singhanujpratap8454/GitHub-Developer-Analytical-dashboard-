import { useState } from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import './App.css'
import './home.css'
import Home from './home'
import Profile from './Profile'
import Compare from './Compare'
import Navbar from './navbar'


const App = () => {
  const [dark, setDark] = useState(true)
  return(
    <div>
      <Navbar dark={dark} setDark={setDark} />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/profile/:username' element={<Profile/>}></Route>
        <Route path='/profile' element={<Navigate to='/' replace/>}></Route>
        <Route path='/Compare' element={<Compare/>}></Route>
      </Routes>
    </div>
  )
 
}
export default App
