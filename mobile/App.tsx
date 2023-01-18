
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
}
  from '@expo-google-fonts/inter';
import { Loading } from './src/assets/components/Loading';
import React from 'react';


export default function App() {

  const [fontsLoads] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoads) {
    return (<Loading />);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open  App.tsx to start working on your app!</Text>
      <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: "Inter_800ExtraBold"
  }
});