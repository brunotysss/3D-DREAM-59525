import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { useEffect, useState } from 'react'
import DeleteModal from './src/components/DeleteModal';
import TaskInput from './src/components/TaskInput';
import TasksList from './src/components/TasksList';

export default function App() {
  const [taskInput, setTaskInput] = useState("")
  const [tasksList, setTasksList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [taskSelected, setTaskSelected] = useState({})


  //Convención a fines didacticos:
  //Voy a usar el sufijo Down para las props que van padre->hijo y el sufijo UP para las props que van hijo->padre
  
  const handlerAddItemToList = () => {
    //setTask([...tasksList, setTasksList])
    setTasksList(prevTasksList => [...prevTasksList, { "id": Math.random(), "value": taskInput }])
    setTaskInput("")
  }

  //useEffect(()=>{console.log("TasksList y taskInput: ", tasksList)},[tasksList,taskInput])

  const handleDeleteTask = ()=>{
    
    setTasksList(tasksList.filter((task)=>task.id != taskSelected.id))
    setModalVisible(false)
  }

  const handleSelectedTask = (item)=>{
    //console.error("Esto no debería estar pasando")
    setTaskSelected(item)
    setModalVisible(true)
  }

  const renderTaskItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{item.value}</Text>
        <Button title="x" color="#C71919" onPress={()=>handleSelectedTask(item)} />
      </View>
    )
  }


  return (
    <>
      <View style={styles.container}>
        <TaskInput 
          taskInputDown={taskInput}
          handlerAddItemToListUp={handlerAddItemToList}
          setTaskInputUp={setTaskInput}
        />
        <TasksList 
          tasksListDown={tasksList}
          renderTaskItemUp={renderTaskItem}
        />
      </View>
      <DeleteModal 
        modalVisibleDown={modalVisible}
        taskSelectedDown={taskSelected}
        handleDeleteTaskUp={handleDeleteTask}
        setModalVisibleUp={setModalVisible}
      />
      <StatusBar style="light" />
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
    paddingHorizontal: 20,
  },
  taskText: {
    color: "#fff"
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    paddingBottom: 8,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
})

