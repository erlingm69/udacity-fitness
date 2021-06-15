import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'

export default function UdaciSteppers({ value, step, max, unit, onIncrement, onDecrement }) {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={onDecrement}>
                    <Text>
                        <FontAwesome name="minus" size={30} color={'black'} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}>
                    <Text>
                        <FontAwesome name="plus" size={30} color={'black'} />
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}