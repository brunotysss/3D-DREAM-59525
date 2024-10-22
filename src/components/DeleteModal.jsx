import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'

const DeleteModal = ({modalVisibleDown,taskSelectedDown,handleDeleteTaskUp,setModalVisibleUp}) => {
  return (
    <Modal
        animationType='fade'
        visible={modalVisibleDown}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={()=>setModalVisibleUp(false)}>
            <Text style={styles.closeText}>x</Text>
          </Pressable>
          <View style={styles.textsContainer}>
            <Text style={styles.modalTitle}>Confirmar eliminación</Text>
            <Text style={styles.modalText}>{taskSelectedDown.value}</Text>
            <Text style={styles.modalDeleteTextWarning}>
              Esta acción no se puede deshacer
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={styles.cancelBtn}
              onPress={()=>setModalVisibleUp(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={styles.deleteBtn}
              onPress={handleDeleteTaskUp}
            >
              <Text style={styles.deleteText}>Si, eliminar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

export default DeleteModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#464646",
        flex: 1,
      },
      closeButton:{
        alignSelf: 'flex-end',
        padding:30
      },
      closeText:{
        color:"#fff",
        fontSize:30
      },
      textsContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      },
      modalTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
      },
      modalText: {
        color: "#fff",
        fontSize: 14,
      },
      modalDeleteTextWarning: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 12,
      },
      buttonsContainer: {
        padding: 30,
        flexDirection:'row',
        gap:10
      },
      deleteBtn: {
        backgroundColor: "#c71919",
        width: "48%",
        padding: 10,
        borderRadius: 15,
      },
      deleteText: {
        textAlign: "center",
        fontSize: 14,
        color: "#fff",
        fontWeight:'bold'
      },
      cancelBtn: {
        backgroundColor: "#C5C5C5",
        width: "48%",
        padding: 10,
        borderRadius: 15,
      },
      cancelText: {
        textAlign: "center",
        fontSize: 14,
        color: "#474646",
      },
})