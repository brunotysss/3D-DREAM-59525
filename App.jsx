import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import Header from './src/components/Header';
export default function App() {
  return (
    <>
    <Header/>
    <CategoriesScreen/>
     
      <StatusBar style='auto'/>

    </>
  )
}

const styles = StyleSheet.create({})