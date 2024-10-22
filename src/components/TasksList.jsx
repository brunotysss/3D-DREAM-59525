import { StyleSheet, Text, View,FlatList } from 'react-native'

const TasksList = ({tasksListDown,renderTaskItemUp}) => {
  return (
    <View style={styles.tasksContainer}>
          <Text style={styles.title}>Tareas pendientes:</Text>
          <FlatList
            data={tasksListDown}
            keyExtractor={item => item.id}
            renderItem={renderTaskItemUp}
          />
        </View>
  )
}

export default TasksList

const styles = StyleSheet.create({
    title: {
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 16
      },
      tasksContainer: {
        paddingTop: 15,
        gap: 20,
      },
})