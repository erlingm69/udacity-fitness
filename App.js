import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import AddEntry from './components/AddEntry';


export default function App() {
  const [value, setValue] = useState(0)

  return (
    <View>
      <AddEntry />
    </View>
  );
}
