import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../config/Config'

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        setCorreo('');
        setContrasenia('');
        navigation.navigate("Drawer")
      })
      .catch((error) => {
        const errorCode = error.code;
        let titulo = "";
        let mensaje = "";

        switch (errorCode) {
          case 'auth/invalid-email':
            titulo = "Correo inválido";
            mensaje = "Revisar que el email sea correcto";
            break;
          case 'auth/user-not-found':
            titulo = "Error de usuario";
            mensaje = "El usuario no está registrado";
            break;
          case 'auth/wrong-password':
            titulo = "Error de contraseña";
            mensaje = "Escriba bien la contraseña";
            break;
          default:
            titulo = "Error";
            mensaje = "Revise credenciales";
            break;
        }

        console.log(errorCode)
        Alert.alert(titulo, mensaje)
      });
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Login</Text>

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

      <Button title='Ingresar' onPress={login} />

      <Text style={styles.registerLink} onPress={() => navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
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
  registerLink: {
    marginTop: 20,
    color: 'blue',
  },
});
