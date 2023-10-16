import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const api = {
  url: process.env.EXPO_PUBLIC_API_URL,
  keys: process.env.EXPO_PUBLIC_API_KEY,
  icons: process.env.EXPO_PUBLIC_ICONS_URL,
};

const Weather = ({ latitude, longitude }) => {
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const API_URL = `${api.url}lat=${latitude}&lon=${longitude}&units=metric&appid=${api.keys}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setTemp(data.main.temp);
        setDescription(data.weather[0].description);
        setIcon(`${api.icons}${data.weather[0].icon}@2x.png`);
      })
      .catch((error) => {
        setDescription('Error retrieving weather information.');
        console.log(error);
      });
  }, [latitude, longitude]);

  return (
    <View>
      <Text style={styles.temp}>{temp} °C</Text>
      {icon && <Image source={{ uri: icon }} style={styles.icon} />}
      <Text>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
});

export default Weather;