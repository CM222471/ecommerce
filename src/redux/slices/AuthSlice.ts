import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Usuario from "../../interfaces/Usuario";
import { obtenerUsuarioActivo } from "../../utils/auth";

interface authState {
    usuario: Usuario | null;
}

const initialState: authState = {
    usuario: obtenerUsuarioActivo(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        iniciarSesionRedux: (
            state,
            action: PayloadAction<Usuario>
        ) => {
            state.usuario = action.payload;
        },

        cerrarSesionRedux: (state) => {
            state.usuario = null;
        },
    },
});

export const {
    iniciarSesionRedux,
    cerrarSesionRedux,
} = authSlice.actions;

export default authSlice.reducer;