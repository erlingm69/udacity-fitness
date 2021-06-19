import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { addEntry, receiveEntries } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

class History extends Component {
    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarResults()
            .then((entries) => dispatch(receiveEntries(entries)))
            .then(({ entries }) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString]: getDailyReminderValue()
                    }))
                }
            })
    }

    renderItem = ({ today, ...TextMetrics }, formattedDate, key) => (
        <View>
            {
                today
                    ? <Text>{JSON.stringify(today)}</Text>
                    : <Text>{JSON.stringify(metrics)}</Text>
            }
        </View>
    )

    renderEmptyDay(formattedDate) {
        return (
            <View>
                <Text>No Data for this day</Text>
            </View>
        )
    }

    render() {
        const { entries } = this.props

        return (
            <View>
                <UdaciFitnessCalendar
                    items={entries}
                    renderItem={(item, firstItemInDay) => this.renderItem(selectedDate, item, firstItemInDay)}
                    renderEmptyDate={this.renderEmptyDate}
                />
            </View>
        )
    }
}

function mapStateToProps(entries) {
    return entries
}

export default connect(mapStateToProps)(History)