import { Button, Image, StyleSheet, View, Alert, ActivityIndicator, Text } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/Config'; // Asegúrate de importar la configuración correcta

export default function CamaraScreen() {
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (image === "") {
            Alert.alert("No has seleccionado imagenes", "Por favor toma una foto primero.");
            return;
        }

        setUploading(true);
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${Date.now()}`);

        uploadBytes(storageRef, blob)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('Cargando', downloadURL);
                    Alert.alert("carga exitosa", "tu foto se3 ha cargado.");
                });
            })
            .catch((error) => {
                console.error("Error al subir la imagen: ", error);
                Alert.alert("no se subio", "no se subio la imagen.");
            })
            .finally(() => {
                setUploading(false);
                setImage(""); 
            });
    };

    return (
        <View style={styles.container}>
            <Button title="Toma una foto" onPress={pickImage} />
            {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
            <Button title="Subir foto" onPress={uploadImage} disabled={uploading} />
            {uploading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    loading: {
        marginTop: 20,
    },
    buttonContainer: {
        marginVertical: 10,
        width: '80%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    button: {
        padding: 15,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
