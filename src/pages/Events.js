import React, {Component} from 'react'
import Rsvp from '../components/Rsvp'

export class EventList extends Component {
    render() {
        return (<ul className="event-list">{this.children}</ul>)
    }
}

export class Event extends Component {
    render() {
        const {id, title, description, game_start, game_end, created_by, max_players, min_level, max_level} = this.state
        return (
            <li className="event-list-item">
                <h2>{title}</h2>
                <p>{description}</p>
                <div>{game_start} to {game_end}</div>
                <div>For {max_players} with characters {min_level} to {max_level}</div>
                <Rsvp props={{eventId: id}}/>
            </li>
        )
    }
}

export default {Event, EventList}