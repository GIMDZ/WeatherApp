import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import * as Location from 'expo-location';


export default function HomeScreen({ navigation }) {

  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Welcome to your Weather App!</Text>
      <Button
          // title="Add some cities"
          title="go see the current weather"
          onPress={() => navigation.navigate('Weather')
          }/>
      
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  
});
