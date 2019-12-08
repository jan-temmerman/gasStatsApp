import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeView from './views/HomeView'

export default function App() {
  return (
    <HomeView/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
