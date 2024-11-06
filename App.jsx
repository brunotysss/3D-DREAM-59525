import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import Header from './src/components/Header';
import { useEffect  , useState } from 'react';
import TabNavigator from './src/navigation/TabNavigator';


SplashScreen.preventAutoHideAsync();


export default function App() {


  /// libreria font si o si para que ande 
  const [loaded, error] = useFonts({

    'Montserrat': require('./assets/fonts/Montserrat-Variable.ttf'),
    'Rock3D': require('./assets/fonts/Rock3D-Regular-Static.ttf'),


  });
   //  [category, setCategory] = useState("")
   //const  [productId, setProductId] = useState(null)

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
   
   <TabNavigator/>
      <StatusBar style='auto'/>

    </>
  )

}

const styles = StyleSheet.create({})