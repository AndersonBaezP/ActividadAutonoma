import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { db } from '../config/Config'

export default function MascotaScreen() {
    const [id, setid] = useState("")
    const [nombre, setnombre] = useState("")
    const [especie, setespecie] = useState("")
    const [edad, setedad] = useState("")

    function guardarMascota() {
        
        set(ref(db, 'mascotas/' + id), {
          name: nombre,
          especie: especie,
          edad:edad
        });
      }

      function editar (){
        update(ref(db, 'mascotas/' + id), {
            name: nombre,
            especie: especie,
            edad:edad
          }); 

      }

      function leerMascota(){
        const starCountRef = ref(db, 'mascotas/' + id);
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);


        if(data==null){
            Alert.alert('error', 'elemento no encontrado')
            setnombre(''),
        setespecie(''),
        setedad('')
        }else{

        setnombre(data.name),
        setespecie(data.especie),
        setedad(data.edad)}

        });
    }

    function eliminar(){
        remove(ref(db,'mascotas/' + id))

    }
    return (
        <View>
            {/*------------------ GUARDAR -------------------------- */}
            <View style={styles.guardar}>
                <Text style={styles.tiulos}>GUARDAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.txt}
                    onChangeText={(texto)=> setid(texto)}
                />
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.txt}
                    onChangeText={(texto)=> setnombre(texto)}

                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.txt}
                    onChangeText={(texto)=> setespecie(texto)}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.txt}
                    onChangeText={(texto)=> setedad(texto)}
                />
                <Button title='Guardar' onPress={()=>guardarMascota()} />
            </View>

            <View style={styles.separador} />

            {/*------------------ EDITAR-------------------------- */}
            <View style={styles.editar}>
                <Text style={styles.tiulos}>EDITAR</Text>
                <View style={styles.fila}>
                    <TextInput
                        placeholder='Ingresar id'
                        style={{ width: '25%', backgroundColor: '#6666', borderRadius: 10 }}
                        onChangeText={(texto)=> setid(texto)}
                    />
                    <Button title='buscar' color={'#299979'} onPress={()=>leerMascota()} />
                </View>
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.txt}
                    onChangeText={(texto)=> setnombre(texto)}
                    value={nombre}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.txt}
                    onChangeText={(texto)=> setespecie(texto)}
                    value={especie}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.txt}
                    onChangeText={(texto)=> setedad(texto)}
                    value={edad}
                />
                <Button title='Editar' color={'green'} onPress={()=>editar()}/>
            </View>

            <View style={styles.separador} />

            {/*------------------ ELIMINAR------------------------- */}
            <View style={styles.eliminar}>
                <Text style={styles.tiulos}>ELIMINAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.txt}
                    onChangeText={(texto)=> setid(texto)}

                />

                <Button title='ELIMINAR' color={'red'} onPress={()=>eliminar()} />
            </View>

            <View style={styles.separador} />

        </View>
    )
}

const styles = StyleSheet.create({
    separador: {
        borderWidth: 1,
        width: '90%',
        alignItems:'center'
    },
    tiulos: {
        fontSize: 25
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    guardar: {
        backgroundColor: '#a1c5f7',
        justifyContent: 'center',
        borderRadius: 30,
        alignItems:'center'
    },
    editar: {
        backgroundColor: '#b5f7a1',
        justifyContent: 'center',
        borderRadius: 30,
        alignItems:'center'
    },
    eliminar: {
        backgroundColor: '#f7a1a1',
        justifyContent: 'center',
        borderRadius: 30,
        alignItems:'center'
    },
    txt: {
        width: '70%',
        backgroundColor: '#6666',
        height: 35,
        borderRadius: 10,
        margin:1
    }
    
})