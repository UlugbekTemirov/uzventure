import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const cities = ['Bukhara', 'Samarkand', 'Tashkent', 'Khiva'];

const TypewriterText = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentCity = cities[currentCityIndex];
    if (charIndex < currentCity.length) {
      const timer = setTimeout(() => {
        setCurrentText((prev) => prev + currentCity[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 150); // Adjust typing speed here

      return () => clearTimeout(timer);
    } else {
      // Pause before erasing
      const pauseBeforeErase = setTimeout(() => {
        setCurrentText('');
        setCharIndex(0);
        setCurrentCityIndex((prev) => (prev + 1) % cities.length); // Loop through cities
      }, 4000); // Pause duration between words

      return () => clearTimeout(pauseBeforeErase);
    }
  }, [charIndex, currentCityIndex]);

  return <Text style={{fontWeight: 'bold',
    color: 'black', fontSize: 40, minHeight: 40}}>{currentText}</Text>;
};

export default TypewriterText;
