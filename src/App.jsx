import { useState } from 'react'
import './styles/App.css'
import WheelOfFortune from './components/Wheel'
import SettingsMenu from './components/SettingsMenu';
import { generateUniqueID } from './utils';
import { DEFAULT_WHEEL_BACKGROUND } from './utils/const';

function App() {

  const [showSettings, setShowSettings] = useState(false)
  const [sectors, setSectors] = useState([
    {id: generateUniqueID(), label: '', color: DEFAULT_WHEEL_BACKGROUND},
    {id: generateUniqueID(), label: '', color: DEFAULT_WHEEL_BACKGROUND},
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
              onSelect={(sector, index) => console.log(`Selected ${sector.label} (index ${index})`)}
            />
          </div>
        </div>
        <SettingsMenu sectors={sectors} setSectors={setSectors} showMenu={showSettings} />
      </div>
    </>
  );
};

export default App
