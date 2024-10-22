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
        fontWeight: 'bold',
        color: colors.amarillo
      }

})