import React from 'react';
import './stylesFiles/Gamebox.css';


const GameBoxInfo= ({competitionName, team1, team2, team1_score,
                        team2_score, team1_percentage, team2_percentage,
                        time, location, category, importance, duration, link, style}) =>{


    return(
        <div className="GameBoxContainer" style={style}>
            <a href={link}>
                {competitionName}:
                <br/>
                <p1>{team1} vs {team2}</p1>
            </a>
            <br/>
            <p2> Score: {team1_score} - {team2_score}</p2>
            <br/>Win percentage: {team1_percentage}% - {team2_percentage}%
            <br/>Category: {category}
            <br/>Start time: {time}
            <br/>Location: {location}
            <br/> Type:{importance}
            <br/> Duration: {duration} min
        </div>
    );
}


export default GameBoxInfo;