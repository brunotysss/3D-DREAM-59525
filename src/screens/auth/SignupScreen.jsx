import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/AuthService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../feactures/auth/authSilce';
import { validationSchema } from '../../validations/validationSchema';




const textInputWidth = Dimensions.get('window').width * 0.7



const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser,setErrorAddUser] = useState(false)


    const [triggerSignup, result] = useSignupMutation()

    const dispatch = useDispatch()

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error al agregar el usuario:", JSON.stringify(result.error, null, 2));
        } else if (result.status === "fulfilled") {
            console.log("Usuario agregado con éxito");
            dispatch(setUser(result.data));
        }
    }, [result]);
    

    const onsubmit = () => {
        try {
            validationSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignup({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    console.log(error.message)
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    setGenericValidationError(error.message)
                    break
            }
        }
    }

    return (
        <LinearGradient
        colors={['#FF9800', '#4CAF50', '#11001B']} // Degradado de naranja vibrante, verde y un fondo oscuro
        start={{ x: 0, y: 0 }} // Esquina superior izquierda
        end={{ x: 1, y: 1 }}   // Esquina inferior derecha
        style={styles.gradient}
    >
        <Text style={styles.title}>3D DREAM</Text>
        <Text style={styles.subTitle}>Registrate</Text>
        <View style={styles.inputContainer}>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="#EBEBEB"
                placeholder="Email"
                style={styles.textInput}
            />
            {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#EBEBEB"
                placeholder='Password'
                style={styles.textInput}
                secureTextEntry
            />
             {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                placeholderTextColor="#EBEBEB"
                placeholder='Repetir password'
                style={styles.textInput}
                secureTextEntry
            />
             {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
        </View>
        <View style={styles.footTextContainer}>
            <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={
                    {
                        ...styles.whiteText,
                        ...styles.underLineText
                    }
                }>
                    Iniciar sesión
                </Text>
            </Pressable>
        </View>

        <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
        {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
        <View style={styles.guestOptionContainer}>
            <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
            <Pressable onPress={() => dispatch(setUser({ email: "demo@mundogeek.com", token: "demo" }))}>
                <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
            </Pressable>
        </View>
    </LinearGradient>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 18,
        color: colors.amarillo,
        fontWeight: '700',
        letterSpacing: 2,
        textAlign: "center",
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',
    },
    textInput: {
        padding: 10,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.grisOscuro, // Más oscuro para resaltar
        width: textInputWidth,
        color: colors.blanco,
        fontSize: 16,
    },
    error: {
        color: colors.morado, // Rojo-naranja cálido para errores
        fontSize: 14,
        fontWeight: "600",
        marginTop: -10,
        marginBottom: 10,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
    },
    whiteText: {
        color: colors.blanco,
        fontSize: 14,
    },
    underLineText: {
        textDecorationLine: 'underline',
        fontWeight: '600',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16,
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.naranjaBrillante, // Cambiado para destacar
        borderRadius: 16,
        marginTop: 32,
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700',
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 48,
    },
});
