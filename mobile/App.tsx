
import { StatusBar, View } from 'react-native';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
}
  from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import React from 'react';
import { Home } from './src/screens/Home';


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
    <>
      <Home />
      <StatusBar barStyle={'light-content'} backgroundColor="transparent" translucent />
    </>

  );
}
