import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import './stylesFiles/CompetitionInfo.css';


const Game = () => {
    const [gameInfo, setGameInfo] = useState(null);
    const [allPlayers, setAllPlayers]= useState([]);
    const [team1Players, setTeam1Players] = useState([]);
    const [team2Players, setTeam2Players] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { gameID } = useParams();


    useEffect(() => {
        const getAllPlayers = async () => {
            const response = await fetch('${process.env.REACT_APP_API_URL}/getPlayersInGame', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameID: gameID }),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('An unexpected error occurred');
            }
        };

        const getGameInfo = async () => {
            const response = await fetch('${process.env.REACT_APP_API_URL}/getGameInfo', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ gameID: gameID }),
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('An unexpected error occurred');
            }
        };

        const setTeams = (players, game) => {
            setTeam1Players(players.filter(player => player.TeamID === game.Team1_ID));
            setTeam2Players(players.filter(player => player.TeamID === game.Team2_ID));
        }

        Promise.all([getAllPlayers(), getGameInfo()])
            .then(([playersData, gameInfoData]) => {
                setAllPlayers(playersData);
                setGameInfo(gameInfoData);
                setTeams(playersData, gameInfoData[0]);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [gameID]);


    if (loading) {
        return <div>
            <h1 style={{marginTop:"15%",textAlign:"center",fontSize:"4vw",paddingBottom:"30%"}}>
                Loading....
            </h1>
        </div>
    }

    if (error) {
        return <div>
            <h1 style={{marginTop:"15%",textAlign:"center",fontSize:"4vw",paddingBottom:"30%"}}>
                Error: {error}
            </h1>
        </div>
    }

    if(gameInfo && allPlayers.length>0) {
        const game=gameInfo[0]
        const gameDate = new Date(game.GameDate);
        const formattedDate = gameDate.toLocaleDateString();
        const startTime = gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return (
            <div>
                <div style={{
                    textAlign: "center", borderRight: "4px solid white", borderLeft: "4px solid white",
                    borderBottom: "4px solid white", marginLeft: "20%", marginRight: "20%"
                }}>
                    <h1>{game.Importance}</h1>
                    <h1>{game.Team1_Name} VS {game.Team2_Name}</h1>
                    <h1>{game.Team1_Goals} - {game.Team2_Goals}</h1>
                    <h1>{formattedDate}</h1>
                    <h1>Start: {startTime}</h1>
                </div>
                <h1 style={{marginTop:"5%",marginLeft:"2%"}}>Location: {game.Location}</h1>
                <br/>
                <h1 style={{marginLeft:"2%"}}>Field: {game.Field}</h1>
                <div>
                    <table style={{marginTop: "5%", float: "left", width: "45%", padding: "5px"}}>
                        <tr>
                            <th colSpan="2">
                                {game.Team1_Name}
                            </th>
                            <th>
                                Goals
                            </th>
                            <th>
                                <i className="bi bi-stop-fill" style={{color: "yellow"}}></i>
                            </th>
                            <th>
                                <i className="bi bi-stop-fill" style={{color: "red"}}></i>
                            </th>
                            <th>
                                <i className="bi bi-chevron-double-up"></i>
                            </th>
                        </tr>
                        {team1Players.map((member, index) => (
                            <tr key={index} style={{borderBottom: "1px solid silver"}}>
                                <td>{member.Position}</td>
                                <td>{member.First_Name + " " + member.Last_Name}</td>
                                <td>{member.Player_score}</td>
                                <td>{member.Player_yellow_card}</td>
                                <td>{member.Player_red_card}</td>
                                <td>{member.Player_value_gain}</td>
                            </tr>
                        ))}
                    </table>

                    <table style={{marginTop: "5%", float: "left", width: "45%",marginLeft:"10%", padding: "5px"}}>
                        <tr>
                            <th>
                                <i className="bi bi-chevron-double-up"></i>
                            </th>
                            <th>
                                <i className="bi bi-stop-fill" style={{color: "red"}}></i>
                            </th>
                            <th>
                                <i className="bi bi-stop-fill" style={{color: "yellow"}}></i>
                            </th>
                            <th>
                                Goals
                            </th>
                            <th colSpan="2" className="Game_team_title_2">
                                {game.Team2_Name}
                            </th>
                        </tr>
                        {team2Players.map((member, index) => (
                            <tr key={index} style={{borderBottom: "1px solid silver"}}>
                                <td>{member.Player_score}</td>
                                <td>{member.Player_yellow_card}</td>
                                <td>{member.Player_red_card}</td>
                                <td>{member.Player_value_gain}</td>
                                <td>{member.First_Name + " " + member.Last_Name}</td>
                                <td>{member.Position}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        );
    }
};

export default Game;