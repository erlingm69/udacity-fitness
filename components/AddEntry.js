import React, { Component } from 'react'
import { StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { purple, white } from '../utils/colors'

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {

        const { max, step } = getMetricMetaInfo(metric)

        this.setState((prev) => {
            const count = prev[metric] + step
            return {
                ...prev,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        this.setState((prev) => {
            const count = prev[metric] - getMetricMetaInfo(metric).step
            return {
                ...prev,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState({
            [metric]: value
        })
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        //  Update redux
        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        // Navigate to home

        // Save to DB
        submitEntry(key, entry)

        // Clear local modifications

    }

    reset = () => {
        const key = timeToString()

        //  Update redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))


        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        // Navigate to home

        // Save to DB
        removeEntry(key)

        // Clear local modifications
    }

    render() {
        const metaInfo = getMetricMetaInfo()

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons name={Platform.OS === "ios" ? "ios-happy-outline" : "md-happy" } size={100} />
                    <Text>You've already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        RESET
                    </TextButton>
                </View>
            )

        }

        return (
            <View style={styles.container}>
                <DateHeader date={new Date().toLocaleDateString()} />
                {
                    Object.keys(metaInfo).map((key) => {
                        const { getIcon, type, ...rest } = metaInfo[key]
                        const value = this.state[key]
                        return (<View key={key} style={styles.row}>
                            {getIcon()}
                            {
                                type === 'slider' ?
                                    <UdaciSlider value={value}
                                        onChange={(value) => this.slide(key, value)}
                                        {...rest} /> :
                                    <UdaciSteppers value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest} />
                            }
                        </View>)
                    })
                }
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        marginRight: 40,
        marginLeft: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
        marginRight: 30,
        marginLeft: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30
    }
})

function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && state[key].today === undefined
    }
}

export default connect(mapStateToProps)(AddEntry)