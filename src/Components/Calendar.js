import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import AuthHeader from "../Services/AuthHeader";

const URL = process.env.REACT_APP_URL

export class Calendar extends Component {

    state = {
        data: [],
        dateFrom: '',
        dateTo: ''
    }

    fetchData() {
        new Promise(() => {
            let url = URL + '/fetchCalendar?dateFrom=' + this.state.dateFrom.toString() + '&dateTo=' + this.state.dateTo.toString();
            fetch(url, {headers: AuthHeader()})
                .then(response => response.json())
                .then(result => {
                    this.setState({ data: result });
                })
        })
    }

    changeDate = event => {
        setTimeout(() => {
            this.setState({
                dateFrom: event.view.activeStart.toISOString().split('T')[0],
                dateTo: event.view.activeEnd.toISOString().split('T')[0]
            })
        this.fetchData();
        }, 500)
    }

    showEvent = event => {
        alert("Description: " + event.title + "\n" +
            "Date from: " + event.startStr + "\n" +
            "Date to: " + event.endStr)
    }

    render() {
        return (
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={this.state.data}
                eventDisplay='list-item'
                firstDay="1"
                datesSet={arg => this.changeDate(arg)}
                eventClick={info => this.showEvent(info.event)}
            />
        )
    }
}

export default Calendar