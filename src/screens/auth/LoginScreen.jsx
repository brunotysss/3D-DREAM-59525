import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { setUser } from '../../feactures/auth/authSilce';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/AuthService';
import  Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../../db/index';





const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()

  /*  useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al iniciar sesión", result)
        }else if(result.status==="fulfilled"){
            console.log("Usuario logueado con éxito")
            dispatch(setUser(result.data))
        }
    },[result])*/

    useEffect(() => {
        //result?.isSuccess
        //console.log("Remember me: ", rememberMe)
        if (result.isSuccess) {
          console.log("Usuario logueado con éxito")
          console.log(result.data)
          dispatch(setUser(result.data))
          
          if (rememberMe) {
            clearSessions().then(() => console.log("sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
            console.log("result data:", result.data)
            insertSession({
              localId: result.data.localId,
              email: result.data.email,
              token: result.data.idToken
            })
              .then(res => console.log("Usuario insertado con éxito",res))
              .catch(error => console.log("Error al insertar usuario",error))
          }
    
        }
      }, [result,rememberMe])


    const onsubmit = ()=>{
        //console.log(email,password)       
        triggerLogin({email,password})
    }







    return (
        <LinearGradient
        colors={['#FF9800', '#4CAF50', '#11001B']} // Degradado de naranja vibrante, verde y un fondo oscuro
        start={{ x: 0, y: 0 }} // Esquina superior izquierda
        end={{ x: 1, y: 1 }}   // Esquina inferior derecha
        style={styles.gradient}
    >
            <Text style={styles.title}>3D Dream</Text>
            <Text style={styles.subTitle}>Ingresa</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />

            </View>
            <View style={styles.rememberMeContainer}>
                <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
                {
                    rememberMe
                    ?
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-on" size={48} color={colors.verdeNeon} /></Pressable>
                    :
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="toggle-off" size={48} color={colors.grisClaro} /></Pressable>
                }
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una cuenta 
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch(setUser({email:"demo@mundogeek.com",token:"demo"}))}>
                  <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.blanco, // Cambiado a blanco para mejor visibilidad
        fontFamily: "Montserrat",
        fontSize: 36, // Incrementado para mayor prominencia
        fontWeight: "bold", // Resalta el título
        textAlign: "center", // Alineación al centro
        marginBottom: 8,
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 20, // Ligero incremento para acompañar el título
        color: colors.amarillo, // Amarillo dorado para contraste
        fontWeight: '700',
        letterSpacing: 3,
        textAlign: "center", // Alineación al centro
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: "#95859E",
        width: textInputWidth,
        color: colors.blanco,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.blanco
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    rememberMeContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
      }
})