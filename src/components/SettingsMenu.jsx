import { useState } from "react"
import { generateLinearGradient, generateRandomHexColor, generateUniqueID, hexToRgb, rgbToHex } from "../utils"
import { DEFAULT_WHEEL_BACKGROUND } from "../utils/const";

const MIN_SECTORS = 2;
const MAX_SECTORS = 20;

const Row = ({ sectors, obj, onLabelChange, onColorChange, onRowRemove, headerComponent}) => {
  return (
    <div className='sector-setting-row'>
      {headerComponent ? headerComponent: <></>}
      <input className='settings-input text' headline='Nimi' onChange={(e) => onLabelChange(e, obj.id)} value={obj.label} placeholder="" />
      <input className='settings-input text' headline='Väri' onChange={(e) => onColorChange(e, obj.id)} value={obj.color} placeholder='#ffffff' />
      <button
        disabled={sectors.length <= MIN_SECTORS ? true: false}
        onClick={onRowRemove} 
        className="remove-specific-row-button">🗙</button>
    </div>
  )
}


export default function SettingsMenu({ sectors, setSectors, showMenu = false }) {

  //if (!showMenu) { return <></> }

  const [gradientInput, setGradientInput] = useState({start: "", end: ""})


  function _addRow() {
    if (sectors.length >= MAX_SECTORS) return;
    setSectors((prev) => ([...prev, { id: generateUniqueID(), label: "", color: DEFAULT_WHEEL_BACKGROUND }]))
  }

  function _removeRow() {
    if (sectors.length <= MIN_SECTORS) return;
    setSectors((prev) => prev.slice(0, -1))
  }

  function onRowRemove(index) {
    if (sectors.length <= MIN_SECTORS) return;
    setSectors((prev) => {

      const newArr = prev.filter((item, prevIndex) => {
        if( index !== prevIndex ) {
          return item
        }
      })

      return newArr
    })
  }

  function onLabelChange(e, sectorId) {
    setSectors((prev) => {
      const prevCopy = [...prev]
      return prevCopy.map((sector) => {

        if (sector.id === sectorId) {
          return { ...sector, label: e.target.value }
        }

        return sector
      })
    })
  }

  function onColorChange(e, sectorId) {
    setSectors((prev) => {
      const prevCopy = [...prev]
      return prevCopy.map((sector) => {
        if(sector.id === sectorId) {
          return {...sector, color: e.target.value}
        }

        return sector
      })
    })
  }

  function onGradientStartChange(e) {setGradientInput((prev) => ({...prev, start: e.target.value}))}
  function onGradientEndChange(e) {setGradientInput((prev) => ({...prev, end: e.target.value}))}

  function onGradientGenerationClick() {

    if( !gradientInput.start ) {gradientInput.start = '#000000'}
    if( !gradientInput.end ) {gradientInput.end = '#ffffff'}

    setSectors((prev) => {
      return generateLinearGradient(gradientInput.start, gradientInput.end, prev, true)
    })
  }

  function randomGradientGeneration() {
    setSectors((prev) => {
      const start = generateRandomHexColor()
      const end =  generateRandomHexColor()

      return generateLinearGradient(start, end, prev, true)
    })
  }


  function SectorHeadlines() {
    return(
      <div id='sector-headline-container' className="settings-headline-container">
        <h4 id='label-headline' className="settings-subheadline">Nimi</h4>
        <h4 id='color-headline' className="settings-subheadline">Väri</h4>
      </div>
    )
  }

  return (
    <div id='settings-menu-container' className={showMenu ? '' : 'hidden'}>

      
      <h3>Sektorit ({sectors.length}/{MAX_SECTORS})</h3>

      <div id='settings-menu-row-container' className="row-container">

        {sectors.map((obj, index) => (
          <>
            <Row key={obj.id}
              sectors={sectors}
              obj={obj}
              onLabelChange={onLabelChange}
              onColorChange={onColorChange}
              onRowRemove={() => onRowRemove(index)}
              headerComponent={index < 1 ? <SectorHeadlines />: null}/>
          
          </>
        ))}

      </div>

      <div className="settings-button-container">
        <button
          id='add-row-button'
          className="settings-menu-button"
          disabled={sectors.length >= MAX_SECTORS}
          onClick={_addRow}>+</button>
        <button id='remove-row-button'
          style={sectors.length > MIN_SECTORS ? { display: 'block' } : { display: 'none' }}
          className="settings-menu-button"
          onClick={_removeRow}>-</button>
      </div>

      <h3>Gradientti</h3>
      <div id="gradient-settings-container" className="row-container">
        <div id='gradient-settings' className="sector-setting-row">

          <div id='auto-gradient-update-container' style={{marginBottom: '20px'}}>
            <input type='checkbox' className='settings-input checkbox'/>
            <label className="settings-label">Automaattinen gradientin päivitys (WiP)</label>
          </div>

          <div id='gradient-headline-container' className="settings-headline-container">
            <h4 className="settings-subheadline">Start</h4>
            <h4 className="settings-subheadline">End</h4>
          </div> 
          <input
            onChange={onGradientStartChange}
            value={gradientInput.start} 
            className="settings-input text"
          />

          <input
            onChange={onGradientEndChange}
            value={gradientInput.end}
            className="settings-input text"
          />
        </div>
      </div>

      <div className="settings-button-container">
        <button 
          id='generate-gradient-button'
          className="settings-menu-button"
          onClick={onGradientGenerationClick}>Luo gradientti</button>
      </div>
      <div className="settings-button-container">
        <button 
          id='generate-random-gradient-button' 
          className="settings-menu-button"
          onClick={randomGradientGeneration}>Satunnainen gradientti</button>
      </div>
    </div>
  )

}