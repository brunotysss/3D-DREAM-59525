import { StyleSheet, Text, View , TextInput} from 'react-native'
import { colors } from '../global/colors'

const Search = ({setSearch}) => {
  return (
   <TextInput 
   placeholder="Busca un producto"
   onChangeText={(text)=>setSearch(text)}
   style={styles.searchInput}
 />

  )
}

export default Search

const styles = StyleSheet.create({
    searhImput:{
 margin:5,
 borderWidth:1,
 borderColor: colors.girsMedio,
 borderRadius:15,
 paddin:5,
 paddingLeft:10,
    }
})