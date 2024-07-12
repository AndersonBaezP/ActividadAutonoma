import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../config/Config";

export default function WelcomeScreen({navigation}: any) {


  function cerrarSesion() {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: () => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                navigation.navigate("Login");
                
              })
              .catch((error) => {
                // An error happened.
                Alert.alert("Error", "Hubo un problema al cerrar sesión.");
              });
          }
        }
      ],
      { cancelable: false }
    );
  }


  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 800,
          marginBottom: 30,
          color: "#fff",
        }}
      >
        Volver y cerrar sesion
      </Text>
      <View style={styles.contentBtn}>
        <Button title="Volver" onPress={()=>navigation.navigate("Login")} />
        <Button title="Cerrar sesion" onPress={cerrarSesion} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0009",
    alignItems: "center",
    justifyContent: "center",
  },

  contentBtn: {
    padding: 10,
    width: "50%",
    height: 100,
    justifyContent: "space-between",
  },
});