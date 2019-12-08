import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'

import db from '../db/db'

export default function HomeView() {

    const [km, setKm] = useState('0')
    const [priceTotal, setPriceTotal] = useState('0')
    const [litersAmount, setLitersAmount] = useState('0')

    const handleSubmit = () => {
        if(km != 0 && priceTotal != 0 && litersAmount != 0) {
            Alert.alert(
                'Are you sure?',
                `- ${km} km's\n
                - €${priceTotal}\n
                - ${litersAmount} L`,
                [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {text: 'Yes', onPress: () => sendData()},
                ],
                {cancelable: true},
              )
        } else {
            Alert.alert(
                'Complete all fields',
                'Complete all fields to save data.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              )
        }
    }

    const sendData = () => {
        db.ref('stats/' + getDate()).set({
            km: km,
            price: priceTotal,
            liters : litersAmount,
            rate: (priceTotal.replace(',', '.') / litersAmount.replace(',', '.')).toFixed(3)
        });
    }

    const getDate = () => {
        today = new Date()
        hours = today.getHours()
        minutes = today.getMinutes()
        seconds = today.getSeconds()
        var dd = today.getDate()
        var mm = today.getMonth()+1 //As January is 0.
        var yyyy = today.getFullYear()
        
        if(dd<10) dd='0'+dd
        if(mm<10) mm='0'+mm
        return (dd+'-'+mm+'-'+yyyy+'/'+hours+':'+minutes+':'+seconds)
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Add Gas Stats</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Totaal aantal km's op teller</Text>
                    <TextInput
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={styles.input}
                    onChangeText={value => setKm(value)}
                    placeholder="Bv. 40000"
                    />

                    <Text style={styles.label}>Totale prijs (€)</Text>
                    <TextInput
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={styles.input}
                    onChangeText={value => setPriceTotal(value)}
                    placeholder="Bv. 50,35"
                    />

                    <Text style={styles.label}>Totaal aantal liter getankt</Text>
                    <TextInput
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={styles.input}
                    onChangeText={value => setLitersAmount(value)}
                    placeholder="Bv. 34,43"
                    />
                </View>

                <Text style={styles.rate}>Actuele prijs: {(priceTotal.replace(',', '.') / litersAmount.replace(',', '.')).toFixed(3)} €/L</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Opslaan</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
        padding: '4%',
        paddingTop: '12%',
        justifyContent: 'space-between',
    },
    heading: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 42
    },
    label: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 18,
        paddingTop: 20,
        fontWeight: '500'
    },
    input: {
        backgroundColor: '#fff',
        margin: 2,
        borderRadius: 4,
        fontWeight: '400',
        fontSize: 18,
        padding: 5,
    },
    form: {
        alignSelf: 'center',
        width: '96%'
    },
    rate: {
        alignSelf: 'center',
        color: '#fff',
        fontWeight: '400',
        fontSize: 18,
        paddingTop: 20,
        fontWeight: '500',
    },
    button: {
        width: '60%',
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#35e865',
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 20,
        fontWeight: '500',
    },
});
