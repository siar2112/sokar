import React from 'react';
import { Link } from 'react-router-dom';
import './stylesFiles/EventBox.css';

const EventBoxInfo = ({competitionName, type, location, startDate, link, style}) => {
    return (
        <div className="EventBoxContainer" style={style}>
            <a href="#">
                {competitionName}
            </a>
            <p className="event-location">{location}</p>
            <p className="event-type">{type}</p>
            {startDate}
        </div>
    );
};

export default EventBoxInfo;