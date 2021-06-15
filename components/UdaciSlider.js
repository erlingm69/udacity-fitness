import React from 'react'
import { View, Text  } from 'react-native'
import Slider from '@react-native-community/slider';

export default function UdaciSlider({ value, step, max, unit, onChange }) {    
    return (
        <View>
        <Slider value={value}
        step={step}
        maximumValue={max}
        minimumValue={0}
        onValueChange={(value) => onChange(value)}/>
        <Text>{value}</Text>
        <Text>{unit}</Text>
        </View>
    )
}