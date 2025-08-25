import { useState } from "react";
import '../styles/wheel.css'
import { polar, calculateRotations, calculateLuminanceHex } from "../utils";

export default function WheelOfFortune({ sectors = [], size = 800, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rotation, setRotation] = useState(0);

  const sizeUnits = 100;
  const cx = sizeUnits / 2;
  const cy = sizeUnits / 2;
  const r = sizeUnits / 2 - 1;
  const sweep = 360 / sectors.length; // basically this results into central angle of sector

  const MAX_LABEL_LENGTH = 20

  // Start drawing from top of the circle (-90 deg)
  let startAngle = -90;

  function onSpinClick(e) {

    let [spinRotation, offset] = calculateRotations(10, 20)
    while( spinRotation === rotation) {
      [spinRotation, offset] = calculateRotations(10, 20)
    }    
    setRotation(spinRotation)

  }

  function calculateTextRotation(midAngle, offset) {
    let textRotation = midAngle + offset
    if( textRotation > 90 && textRotation < 270) {textRotation += 180}
    return textRotation
  }

  const paths = sectors.map((sector, i) => {
    const endAngle = startAngle + sweep;
    const starting_coordinates = polar(cx, cy, r, startAngle);
    const ending_coordinates = polar(cx, cy, r, endAngle);

    // SVG variable determines how overlapping arcs are drawn
    // See SVG documentation for more detail
    const largeArc = sweep > 180 ? 1 : 0

    // Again svg attributes 
    const d = [
      `M ${cx} ${cy}`, // Move to (cx, cy)
      `L ${starting_coordinates.x} ${starting_coordinates.y}`, // Draw line to (x, y)
      `A ${r} ${r} 0 ${largeArc} 1 ${ending_coordinates.x} ${ending_coordinates.y}`, // Elliptical arc more info in svg documentation
      'Z'
    ].join(' ');

    // Ensure that text is centered inside the sector properly
    const midAngle = startAngle + sweep / 2;
    const labelPos = {
      x: cx + (r * 0.5) * Math.cos((midAngle * Math.PI) / 180),
      y: cy + (r * 0.5) * Math.sin((midAngle * Math.PI) / 180),
      fontSize: 5
    }

    // Make sure that text is never upside down when writing text to wheel
    let textRotation = calculateTextRotation(midAngle, 0) 
    startAngle = endAngle;

    const limitedLabel = sector.label.length > MAX_LABEL_LENGTH
                          ? sector.label.slice(0, MAX_LABEL_LENGTH) + '...'
                          : sector.label
    return (
      <>
        <path
          key={i}
          d={d}
          fill={sector.color}
          className={`sector ${selectedIndex === i ? 'selected' : ''}`}
          onClick={() => {
            //setSelectedIndex(i);
            //if (onSelect) onSelect(sector, i);
          }}
        />
        <text 
          x={labelPos.x} 
          y={labelPos.y}
          textAnchor="middle"
          fill={calculateLuminanceHex(sector.color) < 96 ? 'white': 'black'}
          transform={`rotate(${textRotation} ${labelPos.x} ${labelPos.y})`}
          style={ {'--sector-font-size': `${labelPos.fontSize}px`} } 
          className="sector-label">{limitedLabel}</text>
      </>
    );
  });

  return (
    <>
      <div className="wheel" style={{ 'rotate': `${rotation}deg`, '--wheel-size': `${size}px` }}>
        <svg viewBox={`0 0 ${sizeUnits} ${sizeUnits}`}>{paths}</svg>
      </div>

      <div className="button-container container">
        <button onClick={onSpinClick}>Pyöräytä</button>
      </div>
    </>
  )
}   