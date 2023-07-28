import React, {useState,useEffect} from 'react';
import UserBoxInfo from './UserBoxInfo.js';
import GameBoxInfo from "./GameBoxInfo";
import {Link, useNavigate} from 'react-router-dom';
import { useUserSession } from './UserSession';


const UserProfile= () =>{
    const { userSession } = useUserSession();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null); // State to store user data
    const [teams,setTeams]=useState([]);
    const [games,setGames]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyUserSession = async () => {
            try {
                const response = await fetch('${process.env.REACT_APP_API_URL}/verify-session', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setData(data); // Store user data
                    setIsLoading(false);
                } else if (response.status === 401) {
                    throw new Error('Session verification failed');
                } else {
                    throw new Error('An unexpected error occurred');
                }
            } catch (error) {
                console.error(error);
                if (error.message === 'Session verification failed') {
                    navigate('/login');
                } else {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        };

        const getPlayerTeams= async()=>{
            try{
                const response = await fetch('${process.env.REACT_APP_API_URL}/getPlayerTeams', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const teams = await response.json();
                    setTeams(teams); // Store user data
                } else if (response.status === 401) {
                    throw new Error('Session verification failed');
                } else {
                    throw new Error('An unexpected error occurred');
                }

            }catch (error){
                console.error(error);
            }
        }


        const getPlayerGames= async()=>{
            try{
                const response = await fetch('${process.env.REACT_APP_API_URL}/getPlayerGames', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    const games = await response.json();
                    setGames(games); // Store user data
                } else if (response.status === 401) {
                    throw new Error('Session verification failed');
                } else {
                    throw new Error('An unexpected error occurred');
                }

            }catch (error){
                console.error(error);
            }
        }


        verifyUserSession();
        getPlayerTeams();
        getPlayerGames();
    }, [userSession, navigate]);

    if (isLoading) {
        return (
            <div>
                <h1 style={{marginTop:"15%",textAlign:"center",fontSize:"4vw",paddingBottom:"30%"}}>
                    Loading....
                </h1>
            </div>
        );
    } else if (error) {
        return (
            <div>
                <h1 style={{marginTop:"15%",textAlign:"center",fontSize:"4vw",paddingBottom:"30%"}}>
                    Error: {error}
                </h1>
            </div>
        );
    } else {
        return (
            <div>
                <UserBoxInfo style={{marginTop:"5%", width:"40%", marginLeft:"5%"}} firstName={data.firstName} lastName={data.lastName}
                             age="24" gender={data.gender} value={data.pValue}/>


                <h1 style={{marginTop:"10%"}}>Upcoming Games</h1>
                <ul style={{listStyleType:"none", display:"flex", flexWrap: "wrap", marginTop:"2.5%"}}>
                    {games.map((games, index) => (
                        <li style={{width:"22.5%", margin: "1%"}} key={index}>
                            <GameBoxInfo team1={games.Team1_Name} team2={games.Team2_Name} competitionName={games.CompetitionName}
                                         category={games.Category} team1_percentage={games.Team1_Win_percentage} team2_percentage={games.Team2_Win_percentage}
                                         importance={games.Importance} location={games.Location} date={games.GameDate} duration={games.Duration}
                                         gameID={games.GameID} team1_score={games.Team1_Goals} team2_score={games.Team2_Goals} type={games.Type} field={games.Field}/>
                        </li>
                    ))}
                </ul>

                <h1 style={{marginTop:"10%"}}>Teams in</h1>

                <table style={{width:"100%", marginTop:"5%", fontSize:"25px",borderTop:"solid 1px purple"}}>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <th>Name</th>
                        <th>$</th>
                        <th>W</th>
                        <th>L</th>
                        <th>D</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>+/-</th>
                        <th>PTS</th>
                    </tr>
                    {teams.map((team, index) => (
                        <tr style={{borderBottom: "1px solid silver"}} key={team.TeamID}>
                            <td style={{borderRight:"1px solid silver"}}><Link to={`/Team/${team.TeamID}`}>{team.Name}</Link></td>
                            <td>{team.Team_Value}</td>
                            <td>{team.Team_Wins}</td>
                            <td>{team.Team_Lose}</td>
                            <td>{team.Team_Draw}</td>
                            <td>{team.Team_Goals}</td>
                            <td>{team.Team_Goals_Against}</td>
                            <td>{team.Team_Goals - team.Team_Goals_Against}</td>
                            <td>{team.Points}</td>
                        </tr>
                    ))}
                </table>

                <table style={{marginTop:"5%", borderCollapse: "collapse", borderSpacing: "0",
                    width: "100%", color: "white",textAlign:"left",fontSize:"24px",lineHeight:"2"}}>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>GOALS</td>
                        <td style={{padding: "10px 10px"}}>{data.goals}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Clean sheets</td>
                        <td style={{padding: "10px 10px"}}>{data.cleanSheet}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Wins</td>
                        <td style={{padding: "10px 10px"}}>{data.win}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Lost</td>
                        <td style={{padding: "10px 10px"}}>{data.lose}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Draw</td>
                        <td style={{padding: "10px 10px"}}>{data.draw}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Total Game</td>
                        <td style={{padding: "10px 10px"}}>{data.totalGame}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Yellow Cards</td>
                        <td style={{padding: "10px 10px"}}>{data.yellowCards}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Red Cards</td>
                        <td style={{padding: "10px 10px"}}>{data.redCards}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Defensive rating</td>
                        <td style={{padding: "10px 10px"}}>{data.defRating}</td>
                    </tr>
                    <tr style={{borderBottom: "1px solid silver"}}>
                        <td style={{padding: "10px 10px"}}>Offensive rating</td>
                        <td style={{padding: "10px 10px"}}>{data.offensiveRating}</td>
                    </tr>
                </table>
            </div>
        );
    }
};

export default UserProfile;
