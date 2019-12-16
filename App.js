import React from 'react'
import { StatusBar } from 'react-native'
import {Router, Scene, Stack} from 'react-native-router-flux'

import HomeView from './views/HomeView'
import StatsView from './views/StatsView'
import DetailView from './views/DetailView'

export default function App() {
  return (
      <Router sceneStyle={{flex: 1, backgroundColor: '#eee'}}>
        <Stack key="root">
          <Scene hideNavBar={true} key="home" component={HomeView} />
          <Scene hideNavBar={true} init initial key="stats" component={StatsView} />
          <Scene hideNavBar={true} key="detail" component={DetailView} />
        </Stack>
      </Router>
  );
}
