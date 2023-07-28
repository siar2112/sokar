import React, { useState, useEffect } from 'react';
import { useParams, Link  } from 'react-router-dom';
import GameBoxInfo from "./GameBoxInfo";
import './stylesFiles/CompetitionInfo.css';
import LinkButton from "./linkButton";

const CompetitionInfoPage = () => {
    const [competitionTeams, setCompetitionTeams] = useState([]);
    const [competitionGames, setCompetitionGames] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    let { id, name } = useParams();

    useEffect(() => {
        const getAllCompetitionTeams = async () => {
            try {
                const response = await fetch('/getAllCompetitionTeams', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCompetitionTeams(data);
                } else {
                    throw new Error('An unexpected error occurred');
                }
            } catch (error) {
                console.error(error);
            }
        };

        const getAllCompetitionGames = async () => {
            try {
                const response = await fetch('/getAllCompetitionGames', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: id }),
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setCompetitionGames(data);
                } else {
                    throw new Error('An unexpected error occurred');
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllCompetitionTeams();
        getAllCompetitionGames();
    }, [id]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGames = competitionGames.filter(
        game =>
            (categoryFilter === "" || game.Category === categoryFilter) &&
            (game.Team1_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.Team2_Name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Helper function to group teams by category
    const groupByCategory = (teams) => {
        return teams.reduce((groupedTeams, team) => {
            (groupedTeams[team.Category] = groupedTeams[team.Category] || []).push(team);
            return groupedTeams;
        }, {});
    };

    const groupedTeams = groupByCategory(competitionTeams);

    return (
        <div>
            <div style={{textAlign:"center",backgroundImage:"linear-gradient(to bottom right,blue,black)",
                paddingTop:"2.5%",width:"80%",marginLeft:"10%",paddingBottom:"1%",borderRadius:"30px"}}>
                <h1>{name}</h1>
            </div>
            <h1 style={{marginTop:"5%", marginLeft:"2.5%"}}>Upcoming games</h1>
            <p style={{marginLeft:"2.5%"}}>Enter the name of a team to find its next 4 upcoming games</p>
            <div style={{ marginTop: "2%", marginLeft: "2.5%" }}>
                <input style={{borderRadius:"16px", width: '50%', padding: '10px', fontSize:"1.5vw"}}
                       type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            </div>

            <div style={{ marginTop: "2%", marginLeft: "2.5%" }}>
                <label htmlFor="category-filter">Filter by category: </label>
                <select id="category-filter" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                    <option value="">All</option>
                    {Object.keys(groupedTeams).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <ul style={{listStyleType:"none", display:"flex", flexWrap: "wrap", marginTop:"2.5%"}}>
                {filteredGames.slice(0, 4).map((game, index) => (
                    <li style={{width:"22.5%", margin: "1%"}} key={index}>
                        <GameBoxInfo team1={game.Team1_Name} team2={game.Team2_Name} competitionName={game.CompetitionName}
                        category={game.Category} team1_percentage={game.Team1_Win_percentage} team2_percentage={game.Team2_Win_percentage}
                        importance={game.Importance} location={game.Location} date={game.GameDate} duration={game.Duration}
                        gameID={game.GameID} team1_score={game.Team1_Goals} team2_score={game.Team2_Goals} type={game.Type} field={game.Field}/>
                    </li>
                ))}
            </ul>
            <div style={{marginTop:"5%",paddingLeft:"2.5%"}}>
                <LinkButton link={`/FullSchedule/${id}/${name}`} buttonText="Click here for full schedule"/>
            </div>
            <h1 style={{textAlign:"center", marginTop:"10%"}}>Standings</h1>
            <table style={{marginTop:"2.5%",width:"100%", fontSize:"25px"}}>
                {Object.keys(groupedTeams).map(category => (
                    <table key={category} style={{ marginBottom: "10%", textAlign: "center", width:"100%",lineHeight:"2"}}>
                        <caption style={{ captionSide: "top", fontWeight: "bold",color:"white", marginLeft:"2%" }}>Category: {category}</caption>
                        <thead>
                        <tr>
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
                        </thead>
                        <tbody>
                        {groupedTeams[category].map(team => (
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
                        </tbody>
                    </table>
                ))}
            </table>
        </div>
    );
};

export default CompetitionInfoPage;

