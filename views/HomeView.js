import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Image, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { LinearGradient } from 'expo-linear-gradient'

import db from '../db/db'

export default function HomeView() {

    const [km, setKm] = useState('0')
    const [priceTotal, setPriceTotal] = useState('0')
    const [litersAmount, setLitersAmount] = useState('0')
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)

    useEffect(() => {
        setDate(getDate())
        setTime(getTime())
        return
    }, [])

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
                  {text: 'OK'},
                ],
                {cancelable: false},
              )
        }
    }

    const sendData = () => {
        db.ref('stats/' + date + '/' + time).set({
            date: date,
            time: time,
            km: km,
            price: priceTotal,
            liters : litersAmount,
            rate: (priceTotal.replace(',', '.') / litersAmount.replace(',', '.')).toFixed(3)
        }, function(error) {
            if (error) {
                Alert.alert(
                    'Something went wrong.',
                    error,
                    [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {text: 'Try Again', onPress: () => sendData()},
                    ],
                    {cancelable: true},
                  )
            } else {
                Alert.alert(
                    'Data was saved!',
                    'Refresh the feed.',
                    [
                      {text: 'OK'},
                    ],
                    {cancelable: false},
                  )
                  Actions.pop()
            }
          })
    }

    const getDate = () => {
        today = new Date()
        dd = today.getDate()
        mm = today.getMonth()+1 //As January is 0.
        yyyy = today.getFullYear()
        
        if(dd<10) dd='0'+dd
        if(mm<10) mm='0'+mm
        return (dd+'-'+mm+'-'+yyyy)
    }

    const getTime = () => {
        today = new Date()
        hours = today.getHours()
        minutes = today.getMinutes()
        seconds = today.getSeconds()
        
        if(hours<10) hours='0'+hours
        if(minutes<10) minutes='0'+minutes
        if(seconds<10) seconds='0'+seconds
        return (hours+':'+minutes+':'+seconds)
    }

    const refreshTime = () => {
        setDate(getDate())
        setTime(getTime())
    }

    return (
        <View style={{flex:1}}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#1b89e4', '#0daeda']} start={[0, 0]} end={[1, 1]} style={{flexDirection: 'row', backgroundColor: '#FFF', paddingTop: 50, padding: 10}}>
                <TouchableOpacity style={{width: 26, height: 26, alignSelf: 'center', marginRight: 10,}} onPress={() => Actions.pop()}>
                    <Image style={{width: 26, height: 26, alignSelf: 'center'}} source={require('../assets/back.png')} />
                </TouchableOpacity>
                <Text style={styles.heading}>Add Gas Stats</Text>
            </LinearGradient>
            <ScrollView style={{flex: 1, paddingBottom: 20,}}>
                <View style={styles.container}>
                    <View>
                        <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
                            <View style={styles.form}>
                                <Text style={styles.label}>Datum (dd-mm-yyyy)</Text>
                                <TextInput
                                value={date}
                                returnKeyType='done'
                                style={styles.input}
                                onChangeText={value => setDate(value)}
                                placeholder="Bv. 31-12-1999"
                                />

                                <Text style={styles.label}>Tijd (hh:mm:ss)</Text>
                                <TextInput
                                value={time}
                                returnKeyType='done'
                                style={styles.input}
                                onChangeText={value => setTime(value)}
                                placeholder="Bv. 24:24:00"
                                />

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
                        </KeyboardAvoidingView>

                        <Text style={styles.rate}>Actuele prijs: {(priceTotal.replace(',', '.') / litersAmount.replace(',', '.')).toFixed(3)} €/L</Text>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button_refresh} onPress={() => refreshTime()}>
                            <Text style={styles.buttonText}>Ververs tijd</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button_save} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Opslaan</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        justifyContent: 'space-between',
    },
    heading: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 30,
        alignSelf: 'center',
    },
    label: {
        color: '#0c3759',
        fontSize: 16,
        paddingTop: 20,
        marginLeft: 10,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#fff',
        fontWeight: '400',
        fontSize: 16,
        padding: 14,
    },
    form: {
        alignSelf: 'center',
        width: '100%'
    },
    rate: {
        alignSelf: 'center',
        color: '#0c3759',
        fontSize: 16,
        paddingTop: 20,
        fontWeight: '600',
    },
    button_save: {
        width: '60%',
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#35e865',
        alignSelf: 'center',
        alignItems: 'center',
    },
    button_refresh: {
        width: '60%',
        padding: 12,
        borderRadius: 4,
        backgroundColor: '#34abeb',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 80,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 20,
        fontWeight: '500',
    },
});
