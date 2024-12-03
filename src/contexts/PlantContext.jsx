import { createContext, useState, useContext } from "react";
/* eslint-disable react/prop-types */

const PlantContext = createContext();

export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const [id, setId] = useState("산세베리아");
  const [plantName, setPlantName] = useState("토비");
  const [led, setLed] = useState(1);
  const [mode, setMode] = useState("manual");
  const [humidity, setHumidity] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [pump, setPump] = useState(false);

  const value = {
    id,
    setId,
    plantName,
    setPlantName,
    led,
    setLed,
    mode,
    setMode,
    humidity,
    setHumidity,
    brightness,
    setBrightness,
    pump,
    setPump,
  };

  return <PlantContext.Provider value={value}>{children}</PlantContext.Provider>;
};
