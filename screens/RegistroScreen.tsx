import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setCorreo('');
                setContrasenia('');
                navigation.navigate("Login")
            })
            .catch((error) => {
                const errorCode = error.code;
                let titulo = "";
                let mensaje = "";

                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        titulo = "Correo en uso";
                        mensaje = "El correo electrónico ya está registrado.";
                        break;
                    case 'auth/invalid-email':
                        titulo = "Correo inválido";
                        mensaje = "Revisar que el email sea correcto.";
                        break;
                    case 'auth/operation-not-allowed':
                        titulo = "Operación no permitida";
                        mensaje = "La operación no está permitida.";
                        break;
                    case 'auth/weak-password':
                        titulo = "Contraseña débil";
                        mensaje = "La contraseña debe tener al menos 6 caracteres.";
                        break;
                    default:
                        titulo = "Error";
                        mensaje = "Revise las credenciales e inténtelo de nuevo.";
                        break;
                }

                console.log(errorCode);
                Alert.alert(titulo, mensaje);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>REGISTRO</Text>

            <TextInput
                placeholder='Ingresa tu correo electrónico'
                onChangeText={(texto) => setCorreo(texto)}
                value={correo}
                keyboardType='email-address'
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput
                placeholder='Ingresa contraseña'
                onChangeText={(texto) => setContrasenia(texto)}
                value={contrasenia}
                secureTextEntry
                style={styles.input}
            />

            <Button title='Registrar' onPress={registro} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});
