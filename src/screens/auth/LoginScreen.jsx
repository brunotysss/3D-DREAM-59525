import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors';
import { useState, useEffect } from 'react';
import { setUser } from '../../feactures/auth/authSilce';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/AuthService';
import { usePostReceiptMutation } from '../../services/receiptsService'; // Importa la mutación para guardar recibos
import Icon from 'react-native-vector-icons/MaterialIcons';
import { insertSession, clearSessions } from '../../db/index';

const textInputWidth = Dimensions.get('window').width * 0.7;

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const [triggerLogin, result] = useLoginMutation();
    const [triggerPostReceipt] = usePostReceiptMutation(); // Para guardar el recibo después del login

    const redirectTo = route.params?.redirectTo || "Cart"; // Redirigir al carrito por defecto
    const cart = route.params?.cart || []; // Productos del carrito
    const total = route.params?.total || 0; // Total del carrito

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email: result.data.email,
                    idToken: result.data.idToken,
                    localId: result.data.localId, // Incluye el localId del usuario autenticado
                })
            );
    
            // Guardar la sesión si "recordarme" está habilitado
            if (rememberMe) {
                clearSessions()
                    .then(() => console.log("Sesiones eliminadas"))
                    .catch((error) => console.log("Error al eliminar sesiones: ", error));
    
                insertSession({
                    email: result.data.email,
                    localId: result.data.localId, // Asegúrate de incluir el localId
                    token: result.data.idToken,
                })
                    .then((res) => console.log("Usuario insertado con éxito", res))
                    .catch((error) => console.log("Error al insertar usuario", error));
            }
    
            navigation.navigate(redirectTo); // Redirige al destino deseado
        }
    }, [result]);
    

    const onSubmit = () => {
        triggerLogin({ email, password });
    };

    return (
        <LinearGradient
            colors={['#FF9800', '#4CAF50', '#11001B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <Text style={styles.title}>3D Dream</Text>
            <Text style={styles.subTitle}>Ingresa</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setEmail}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={setPassword}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Password"
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.rememberMeContainer}>
                <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
                {rememberMe ? (
                    <Pressable onPress={() => setRememberMe(false)}>
                        <Icon name="toggle-on" size={48} color={colors.verdeNeon} />
                    </Pressable>
                ) : (
                    <Pressable onPress={() => setRememberMe(true)}>
                        <Icon name="toggle-off" size={48} color={colors.grisClaro} />
                    </Pressable>
                )}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={{ ...styles.whiteText, ...styles.underLineText }}>Crea una cuenta</Text>
                </Pressable>
            </View>
            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}>Iniciar sesión</Text>
            </Pressable>
            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={() => dispatch(setUser({ email: "demo@mundogeek.com", token: "demo" }))}>
                    <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: colors.blanco,
        fontFamily: "Montserrat",
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 20,
        color: colors.amarillo,
        fontWeight: '700',
        letterSpacing: 3,
        textAlign: "center",
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
        color: colors.blanco,
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16,
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.morado,
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
        marginTop: 64,
    },
    rememberMeContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
    },
});
