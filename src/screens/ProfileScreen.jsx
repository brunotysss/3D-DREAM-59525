import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Actualizado
import { colors } from '../global/colors';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import CameraIcon from '../components/CameraIcon';
import { usePutUserMutation, useGetUserQuery } from '../services/userService';
import { setProfilePicture } from '../feactures/auth/authSilce';

const ProfileScreen = () => {
  const email = useSelector(state => state.authReducer.value.email);
  const localId = useSelector(state => state.authReducer.value.localId);
  const profilePicture = useSelector(
    state => state.authReducer.value.profilePicture
  );

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [image, setImage] = useState(profilePicture);

  const [putUser] = usePutUserMutation();
  const { data: userData } = useGetUserQuery(localId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setSurname(userData.surname || '');
      setPhone(userData.phone || '');
      setCountry(userData.country || '');
      setProvince(userData.province || '');
      setImage(userData.profilePicture || '');
    }
  }, [userData]);

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    return granted;
  };

  const pickImage = async () => {
    const permissionOk = await verifyCameraPermissions();
    if (permissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.7,
      });
      if (!result.canceled) {
        const newImage = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(newImage);
        dispatch(setProfilePicture(newImage));
      }
    } else {
      Alert.alert('Permiso denegado', 'No se puede acceder a la cámara.');
    }
  };

  const saveProfile = async () => {
    const userData = {
      email,
      name,
      surname,
      phone,
      country,
      province,
      profilePicture: image,
    };
    try {
      await putUser({ localId, userData });
      Alert.alert('Perfil actualizado', 'Tu información ha sido guardada.');
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
      Alert.alert('Error', 'No se pudo guardar tu información.');
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>
            {email.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            { opacity: pressed ? 0.9 : 1 },
            styles.cameraIcon,
          ]}
        >
          <CameraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {email}</Text>

      {/* Campos adicionales */}
      <TextInput
        style={styles.textInput}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Apellido"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Teléfono"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      {/* Selector de país */}
      <Picker
        selectedValue={country}
        onValueChange={itemValue => setCountry(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un país" value="" />
        <Picker.Item label="Argentina" value="Argentina" />
        <Picker.Item label="Chile" value="Chile" />
      </Picker>

      {/* Selector de provincia */}
      <Picker
        selectedValue={province}
        onValueChange={itemValue => setProvince(itemValue)}
        style={styles.picker}
        enabled={!!country}
      >
        <Picker.Item label="Selecciona una provincia" value="" />
        {country === 'Argentina' && (
          <>
            <Picker.Item label="Buenos Aires" value="Buenos Aires" />
            <Picker.Item label="Córdoba" value="Córdoba" />
          </>
        )}
        {country === 'Chile' && (
          <>
            <Picker.Item label="Santiago" value="Santiago" />
            <Picker.Item label="Valparaíso" value="Valparaíso" />
          </>
        )}
      </Picker>

      <Button title="Guardar perfil" onPress={saveProfile} color={colors.naranjaBrillante} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    justifyContent: 'center',
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: colors.morado,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  textProfilePlaceHolder: {
    color: colors.blanco,
    fontSize: 48,
  },
  profileData: {
    textAlign: 'center',
    paddingVertical: 16,
    fontSize: 16,
  },
  textInput: {
    width: '90%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.grisMedio,
    alignSelf: 'center',
  },
  picker: {
    width: '90%',
    marginVertical: 8,
    alignSelf: 'center',
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
