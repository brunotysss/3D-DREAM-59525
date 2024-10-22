import { StyleSheet,TextInput,Button, View } from 'react-native'

const TaskInput = ({taskInputDown,handlerAddItemToListUp,setTaskInputUp}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder='Añade una tarea'
                onChangeText={(text) => { setTaskInputUp(text) }}
                value={taskInputDown}
            />
            <Button title="+" color="#1D9225" onPress={handlerAddItemToListUp} />
        </View>
    )
}

export default TaskInput

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'space-between',
        borderBottomColor: "#FFF",
        borderBottomWidth: 2,
      },
      textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        backgroundColor: "#ccc",
        width: '90%'
      },
})