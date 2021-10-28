import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import * as Location from 'expo-location';

import DateTime from './components/DateTime';
import WeatherScroll from './components/WeatherScroll';

const API_KEY ='21c470e700fa843132199959e3bb71cd';
const img = require('./assets/img.jpg')

export default function WeatherScreen({ navigation }) {
  const [data,setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  return (
    <View style={styles.container}>
    <ImageBackground source = {img} style={styles.image}>
      {/* <Text>Hello World!</Text> */}
      <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon= {data.lon}/>
      <Button
          title="Back to home"
          onPress={() => navigation.navigate('Home')
          }
        />
      <WeatherScroll  weatherData={data.daily}/>
      
      <StatusBar style="auto" />
    </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1,
    resizeMode:"cover",
    justifyContent: "center"
  }
});
