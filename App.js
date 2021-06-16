import { StatusBar } from 'expo-status-bar'
import React, { useState} from 'react';
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

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image style={styles.img} source={require('./udacity-logo.png')} />
      <Image style={styles.img} source={{ uri: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'}} />
      <Switch value={showInput} onValueChange={handleToggleSwitch} />
      { showInput &&
      <TextInput value={input}
      onChangeText={handleTextChange}
      />}
      <AddEntry />
    </KeyboardAvoidingView>
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