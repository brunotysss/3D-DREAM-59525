import { StyleSheet, Text, View , FlatList , Image, Pressable} from 'react-native'
import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'



const CategoriesScreen = ({setCategory}) => {

const renderCategoryItem = ({item, index}) =>{
  return (
    <Pressable onPress={()=>setCategory(item.title)}>
    <FlatCard style={
        //uso de operador ternario condicion? si es verdadero : si falso
        index%2==0 
        ?
        {...styles.categoryItemContainer,...styles.row}
        :
        {...styles.categoryItemContainer,...styles.rowReverse}
        }>
        <Image
        source={{ uri: item.image}}
        style= {styles.image}
        resizeMode='contain'    
        onError={(error) => console.log("Error loading image for", item.title, error.nativeEvent.error)}

        />
        <Text style={styles.categoryTitle}>{item.title}</Text>
    </FlatCard>
    </Pressable>
  )
} 

  return (
    <>
        <FlatList
            data={categories}
            keyExtractor={item=>item.id}
            renderItem={renderCategoryItem}
        
        />

    </>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    categoryItemContainer:{
            padding: 20,
            justifyContent : "space-between",
            alignItems : "center",
            marginHorizontal : 10,
            marginVertical : 5,
        },
        categoryTitle:{
                fontSize : 24,
                fontWeight :"bold",
        },
        image:{
            width:150,
            height:80,
        },
        row:{
            flexDirection: 'row',
        },
        rowReverse:{
            flexDirection: 'row-reverse',
        }


})