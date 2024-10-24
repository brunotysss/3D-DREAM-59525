import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'
const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>3D DREAMS</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
      headerContainer:{
        height:150,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : colors.grisOscuro
      },
      title:{
        fontSize:16,
       // fontWeight: 'bold', // cuidado ver que fuente es aceptado o no en este caso el profe con bold no acepta yo debo ver mi caso
        color: colors.amarillo,
        fontFamily : 'Rock3D',
      }

})