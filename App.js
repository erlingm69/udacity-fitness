import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import AddEntry from './components/AddEntry';


export default function App() {
  return (
    <View>
      <AddEntry />
    </View>
  );
}
