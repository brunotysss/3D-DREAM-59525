import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
        {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer:{
      backgroundColor: colors.grisMedio,
      shadowColor: colors.negro,
      shadowOpacity: 0.2, // Reduce la sombra para que sea más sutil
      shadowRadius: 3,
      shadowOffset: { width: 1, height: 2 },
      elevation: 3, // Menor elevación para que no se vea tan pronunciada
      borderRadius: 8,
      padding: 10, // Reduce el padding interno
      marginVertical: 5, // Menor margen entre tarjetas
      marginHorizontal: 10, // Ajusta el margen lateral para más espacio horizontal
    }
})