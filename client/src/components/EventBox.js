import React from 'react';
import { Link } from 'react-router-dom';
import './stylesFiles/EventBox.css';

const EventBoxInfo = ({competitionID,competitionName, type,gameType, location, startDate, style}) => {
    // Create a new Date object using the startDate
    const date = new Date(startDate);

    // Format date to 'YYYY-MM-DD'
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    return (
        <div className="EventBoxContainer" style={style}>
            <h3><Link to={`/competition/${competitionID}/${competitionName}`}>{competitionName}</Link></h3>
            <p className="event-location">{location}</p>
            <p className="event-type">{type} {gameType}</p>
            Start: {formattedDate}
        </div>
    );
};

export default EventBoxInfo;