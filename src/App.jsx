import { useState } from 'react'
import './styles/App.css'
import WheelOfFortune from './components/Wheel'
import SettingsMenu from './components/SettingsMenu';
import { generateUniqueID } from './utils';

function App() {

  const [showSettings, setShowSettings] = useState(false)
  const [sectors, setSectors] = useState([
    {id: generateUniqueID(), label: '', color: '#ffffff', active: true},
    {id: generateUniqueID(), label: '', color: '#ffffff', active: true},
  ])


  return (
    <>
      <div id='root' className='container'>
        <div className='content-page'>

          <div className='headline-container'>
            <h1>Viiniruletti</h1>
            <button 
              id='settings-button' 
              className={`settings-button ${showSettings ? 'active': ''}`}
              onClick={() => setShowSettings(!showSettings)}>⚙</button>
          </div>


          <div id='wheel-container' className='container'>
            <div id='knob-container' className='container'>
              <div id='knob' className='triangle-down'></div>
            </div>
            <WheelOfFortune
              sectors={sectors}
              size={800}
              onSelect={(sector, index) => alert(`Selected ${sector.label} (index ${index})`)}
            />
          </div>
        </div>
        <SettingsMenu sectors={sectors} setSectors={setSectors} showMenu={showSettings} />
      </div>
    </>
  );
};

export default App
