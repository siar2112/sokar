import React from 'react';
import './stylesFiles/Gamebox.css';
import { Link } from 'react-router-dom';




const GameBoxInfo= ({competitionName,
                        team1,
                        team2,
                        team1_score,
                        team2_score,
                        team1_percentage,
                        team2_percentage,
                        date,
                        location,
                        category,
                        importance,
                        duration,
                        gameID,
                        field,
                        type,
                        style}) =>{

    const gameDate = new Date(date);
    const formattedDate = gameDate.toLocaleDateString();
    const startTime = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return(
        <div className="GameBoxContainer" style={style}>
           <Link to={`/game/${gameID}`}>
               {competitionName}
               <br/>
               <p1>{team1} vs {team2}</p1>
           </Link>
            <br/>
            <br/>
            <p2> Score: {team1_score} - {team2_score}</p2>
            <br/>Win percentage: {team1_percentage}% - {team2_percentage}%
            <br/>Category: {category}
            <br/>Location: {location}
            <br/>Field: {field}
            <br/> Importance: {importance}
            <br/> Type: {type}
            <br/> Date: {formattedDate}
            <br/>Start time: {startTime}
            <br/> Duration: {duration} min
        </div>
    );
}


export default GameBoxInfo;