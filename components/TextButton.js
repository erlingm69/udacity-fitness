import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, } from '../utils/colors'

export default function TextButton({ children, onPress, style={} }) {
    return (
        <TouchableOpacity
            style={[styles.reset, styles]}
            onPress={onPress}>
            <Text>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple
    }
})