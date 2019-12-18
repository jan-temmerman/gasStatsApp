import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, StatusBar } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { LinearGradient } from 'expo-linear-gradient'

export default function DetailView(props) {
    const [data, setData] = useState({})
    const [stats, setStats] = useState({})

    useEffect(() => {
        setData(props.data)
        setStats(props.stats)
        return
    }, [])

    if(stats == 0)
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle="light-content" />
                <LinearGradient colors={['#1b89e4', '#0daeda']} start={[0, 0]} end={[1, 1]} style={{flexDirection: 'row', backgroundColor: '#FFF', paddingTop: 50, padding: 10}}>
                    <TouchableOpacity style={{width: 26, height: 26, alignSelf: 'center', marginRight: 10}} onPress={() => Actions.pop()}>
                        <Image style={{width: 26, height: 26, alignSelf: 'center'}} source={require('../assets/back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Details</Text>
                </LinearGradient>
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.card}>
                        <View style={styles.subheadingContainer}>
                            <Text style={styles.subheading}>Details Tankbeurt</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Datum</Text>
                            <Text style={styles.data}>{data.date}</Text>

                            <Text style={styles.label}>Tijd</Text>
                            <Text style={styles.data}>{data.time}</Text>

                            <Text style={styles.label}>Aantal Km's</Text>
                            <Text style={styles.data}>{data.km} km</Text>

                            <Text style={styles.label}>Totale Prijs</Text>
                            <Text style={styles.data}>€{data.price}</Text>

                            <Text style={styles.label}>Liters Getankt </Text>
                            <Text style={styles.data}>{data.liters} L</Text>

                            <Text style={styles.label}>Prijs / Liter</Text>
                            <Text style={styles.data}>€{data.rate}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );

    if(stats != 0)
        return (
            <View style={{flex:1}}>
                <StatusBar barStyle="light-content" />
                <LinearGradient colors={['#1b89e4', '#0daeda']} start={[0, 0]} end={[1, 1]} style={{flexDirection: 'row', backgroundColor: '#FFF', paddingTop: 50, padding: 10}}>
                    <TouchableOpacity style={{width: 26, height: 26, alignSelf: 'center', marginRight: 10}} onPress={() => Actions.pop()}>
                        <Image style={{width: 26, height: 26, alignSelf: 'center'}} source={require('../assets/back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Details</Text>
                </LinearGradient>
                <ScrollView style={{flex: 1,}}>
                    <View style={styles.card}>
                        <View style={styles.subheadingContainer}>
                            <Text style={styles.subheading}>Details Tankbeurt</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Datum</Text>
                            <Text style={styles.data}>{data.date}</Text>

                            <Text style={styles.label}>Tijd</Text>
                            <Text style={styles.data}>{data.time}</Text>

                            <Text style={styles.label}>Aantal Km's</Text>
                            <Text style={styles.data}>{data.km} km</Text>

                            <Text style={styles.label}>Totale Prijs</Text>
                            <Text style={styles.data}>€{data.price}</Text>

                            <Text style={styles.label}>Liters Getankt </Text>
                            <Text style={styles.data}>{data.liters} L</Text>

                            <Text style={styles.label}>Prijs / Liter</Text>
                            <Text style={styles.data}>€{data.rate}</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.subheadingContainer}>
                            <Text style={styles.subheading}>Stats</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.label}>Afstand afgelegd</Text>
                            <Text style={styles.data}>Je hebt <Text style={{fontWeight: '700'}}>{stats.kmDifference} km</Text> gereden sinds de vorige keer dat je hebt getankt.</Text>

                            <Text style={styles.label}>Verbruik</Text>
                            <Text style={styles.data}>Je had een gemiddeld verbruik van <Text style={{fontWeight: '700'}}>{stats.economy} L/100km </Text>.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 7,
        },
        shadowOpacity: 0.18,
        shadowRadius: 9.11,
        elevation: 14,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'space-between',
    },
    heading: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 30,
        alignSelf: 'center',
    },
    subheading: {
        color: '#0c3759',
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
    },
    subheadingContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(12, 55, 89, 0.2)',
    },
    label: {
        textTransform: 'capitalize',
        color: '#0c3759',
        fontSize: 16,
        fontWeight: '600',
    },
    data: {
        color: '#0c3759',
        fontWeight: '400',
        fontSize: 14,
        marginBottom: 20,
    },
    dataContainer: {
        backgroundColor: '#FFF',
        width: '100%',
        marginBottom: 2,
        padding: 10,
        paddingLeft: '4%',

    },
    form: {
        alignSelf: 'center',
        width: '96%'
    },
    rate: {
        alignSelf: 'center',
        color: '#FFF',
        fontWeight: '400',
        fontSize: 18,
        paddingTop: 20,
        fontWeight: '500',
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


