import { useFonts } from 'expo-font';
import * as SplashScreen from 'splash-screen';
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductScreen from './src/screens/ProductScreen';
import Header from './src/components/Header';
import { useEffect } from 'react';



SplashScreen.preventAutoHideAsync();


export default function App() {


  /// libreria font si o si para que ande 
  const [loaded, error] = useFonts({

    'Montserrat': require('./assets/fonts/Montserrat-Variable.ttf'),
    'Rock3D': require('./assets/fonts/Rock3D-Regular-Satic.ttf'),


  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
// aca termina la font



  return (
    <>
    <Header/>
    <ProductScreen/>
     
      <StatusBar style='auto'/>

    </>
  )
}

const styles = StyleSheet.create({})