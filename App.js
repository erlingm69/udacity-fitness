import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
  KeyboardAvoidingView,
  Image
} from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History';

const store = createStore(reducer)

export default function App() {
  const [value, setValue] = useState(0)
  const [input, setInput] = useState("@erling")
  const [showInput, setShowInput] = useState(false)

  function handleToggleSwitch() {
    setShowInput((prev) => !prev)
  }

  function handleTextChange(text) {
    setInput(text)
  }

  // <History />

  return (
    <Provider store={store}>
      <View style={{ flex: '1' }}>
        <View style={{ height: 20 }}>
        </View>
      </View>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto'
  },
  img: {
    width: 100,
    height: 100
  }
});