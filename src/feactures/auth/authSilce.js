import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email: null,
            token: null,
            localId: null, // Identificador único del usuario
            profilePicture: "",
            isLoggedIn: false, // Indica si el usuario está logueado
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.value.email = action.payload.email;
            state.value.token = action.payload.idToken; // Asigna el token
            state.value.localId = action.payload.localId; // Asigna el localId
            state.value.isLoggedIn = true; // Cambia el estado de login a true
        },
        clearUser: (state) => {
            state.value.email = null;
            state.value.token = null;
            state.value.localId = null; // Limpia el localId
            state.value.isLoggedIn = false; // Cambia el estado de login a false
        },
        setProfilePicture: (state, action) => {
            state.value.profilePicture = action.payload; // Actualiza la foto de perfil
        },
    },
});

export const { setUser, clearUser, setProfilePicture } = authSlice.actions;

export default authSlice.reducer;
