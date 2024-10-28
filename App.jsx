import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductScreen from './src/screens/ProductScreen';
import Header from './src/components/Header';
export default function App() {
  return (
    <>
    <Header/>
    <ProductScreen/>
      <StatusBar style='auto'/>

    </>
  )
  
}

const styles = StyleSheet.create({})