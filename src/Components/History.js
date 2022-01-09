import React, {Component} from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import MenuItem from "@material-ui/core/MenuItem";
import {TextField} from "@material-ui/core";
import AuthHeader from "../Services/AuthHeader";


const URL = process.env.REACT_APP_URL
class History extends Component {

    state = {
        plants:[],
        data: [],
        dateFrom: '',
        dateTo: '',
        plantId: ''
    }
    componentDidMount() {
        this.fetchPlants()
    }

    fetchPlants() {
        new Promise(() => {
            let url = URL + '/fetchCalendar/fetchPlants'
            fetch(url, {headers: AuthHeader()})
                .then(response => response.json())
                .then(result => {
                    this.setState({ plants: result });
                })
        })
    }

    fetchData() {
        if (this.state.plantId !== '') {
            new Promise(() => {
                let url = URL + '/fetchCalendarForHistory?dateFrom=' + this.state.dateFrom.toString() + '&dateTo=' + this.state.dateTo.toString() + '&plantId=' + this.state.plantId
                fetch(url, {headers: AuthHeader()})
                    .then(response => response.json())
                    .then(result => {
                        this.setState({data: result});
                        console.log(this.state.data)
                    })
            })
        }
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
        console.log(event)
        alert("Description: " + event.title + "\n" +
            "Date from: " + event.startStr + "\n" +
            "Date to: " + event.endStr)
    }

    handleChangePlant = event => {
        setTimeout( () => {
        this.setState({ plantId: event.target.value })
        this.fetchData();
        }, 500)
    }

    render() {
        return (
            <div>
                <TextField
                    fullWidth
                    value={this.state.plants}
                    select
                    variant="standard"
                    label="Plant"
                    onChange={this.handleChangePlant}>
                    {this.state.plants.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
        <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={this.state.data}
                eventDisplay='block'
                firstDay="1"
                datesSet={arg => this.changeDate(arg)}
                eventClick={info => this.showEvent(info.event)}
            />
            </div>
        )
    }
}

export default History;