import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GameBoxInfo from "./GameBoxInfo";

const TeamMemberPage = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [teamGames, setTeamGames] = useState([]);
    const [teamInfo, setTeamInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { teamID } = useParams();

    useEffect(() => {
        const getAllTeamMembers = async () => {
            try {
                const response = await fetch('${process.env.REACT_APP_API_URL}/getAllTeamMembers', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamID: teamID }),
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Error fetching team members');
                const data = await response.json();
                setTeamMembers(data);
            } catch (error) {
                setError(error.message);
            }
        };

        const getTeamGames = async () => {
            try {
                const response = await fetch('${process.env.REACT_APP_API_URL}/getTeamGames', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamID: teamID }),
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Error fetching team games');
                const data = await response.json();
                setTeamGames(data);
            } catch (error) {
                setError(error.message);
            }
        };

        const getTeamInfo = async () => {
            try {
                const response = await fetch('${process.env.REACT_APP_API_URL}/getTeamInfo', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamID: teamID }),
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Error fetching team info');
                const data = await response.json();
                setTeamInfo(data);
            } catch (error) {
                setError(error.message);
            }
        };

        Promise.all([getAllTeamMembers(), getTeamGames(), getTeamInfo()])
            .then(() => setLoading(false))
            .catch((error) => setError(error.message));
    }, [teamID]);

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

    if (teamInfo && teamInfo[0]) {
        const team = teamInfo[0];
        return (
            <div>
                <h1 style={{textAlign:"center",marginTop:"5%"}}>{team.Name}</h1>
                <h2 style={{textAlign:"center"}}> VALUE: {team.Team_Value}M $</h2>
                <table style={{width:"100%", marginTop:"5%", fontSize:"25px"}}>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <th>$</th>
                        <th>W</th>
                        <th>L</th>
                        <th>D</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>+/-</th>
                        <th>Clean<br/>sheets</th>
                        <th>PTS</th>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td>{team.Team_Value}M</td>
                        <td>{team.Team_Wins}</td>
                        <td>{team.Team_Lose}</td>
                        <td>{team.Team_Draw}</td>
                        <td>{team.Team_Goals}</td>
                        <td>{team.Team_Goals_Against}</td>
                        <td>{team.Team_Goals - team.Team_Goals_Against}</td>
                        <td>{team.Team_Clean_sheets}</td>
                        <td>{team.Points}</td>
                    </tr>
                </table>

                <table style={{width:"100%", marginTop:"5%", fontSize:"25px",borderTop:"solid 1px purple"}}>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <th>POSITION</th>
                        <th>NAME</th>
                        <th>GOALS</th>
                        <th>Games<br/>Played</th>
                        <th>W</th>
                        <th>L</th>
                        <th>D</th>
                        <th><i className="bi bi-stop-fill" style={{color: "yellow"}}></i></th>
                        <th><i className="bi bi-stop-fill" style={{color: "red"}}></i></th>
                        <th><i className="bi bi-chevron-double-up"></i></th>
                    </tr>
                    {teamMembers.map((member, index) => (
                        <tr key={index} style={{borderBottom: "1px solid silver"}}>
                            <td>{member.Position}</td>
                            <td>{member.First_Name+" "+ member.Last_Name}</td>
                            <td>{member.Goals_for_team}</td>
                            <td>{member.Game_Played_for_Team}</td>
                            <td>{member.Win}</td>
                            <td>{member.Lose}</td>
                            <td>{member.Draw}</td>
                            <td>{member.Yellow_Cards_for_team}</td>
                            <td>{member.Red_Cards_for_team}</td>
                            <td>{member.Improvement}</td>
                        </tr>
                    ))}
                </table>

                <h1 style={{marginTop:"5%"}}>Upcoming games</h1>

                <ul style={{listStyleType:"none", display:"flex", flexWrap: "wrap", marginTop:"5%"}}>
                    {teamGames.slice(0, 4).map((game, index) => (
                        <li style={{width:"22.5%", margin: "1%"}} key={index}>
                            <GameBoxInfo team1={game.Team1_Name} team2={game.Team2_Name} competitionName={game.CompetitionName}
                                         category={game.Category} team1_percentage={game.Team1_Win_percentage} team2_percentage={game.Team2_Win_percentage}
                                         importance={game.Importance} location={game.Location} date={game.GameDate} duration={game.Duration}
                                         gameID={game.GameID} team1_score={game.Team1_Goals} team2_score={game.Team2_Goals} type={game.Type} field={game.Field}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
};

export default TeamMemberPage;

