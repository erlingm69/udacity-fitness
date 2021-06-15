import React, { Component } from 'react'
import { stylesheet, View, Text } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'

export default class AddEntry extends Component {

    render() {
        return (
            <View>
                <Text>Add Entry</Text>
                {getMetricMetaInfo('bike').getIcon()}
            </View>
        )        
    }

}